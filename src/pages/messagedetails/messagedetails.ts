import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController,NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators,FormControl} from "@angular/forms";
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {BlankPage} from '../blank/blank';
import {MessageDealerPage} from '../messagedealer/messagedealer';
import {MessageAddPage} from '../messageadd/messageadd';


@Component({
  selector: 'page-messagedetails',
  templateUrl: 'messagedetails.html'
})
export class MessageDetailsPage {

  public adminUrl = 'http://influxiq.com:8003/';
  public dataForm:FormGroup;

  public username;
  public dealerusername;
  public dealerdetails;

  public msgid;

  public msgList;
  public customerList;
  public dealerList;


  public messagedetails;
  public replymessage;
  public totalreply;

  public replytoid;
  public replytoname;

  public showReplybox:number;

  public messageaddpage=MessageAddPage;

  constructor(public navCtrl: NavController,public navparam: NavParams,public toastCtrl: ToastController,public popoverCtrl: PopoverController,private _http: Http, public storage: Storage,public fb: FormBuilder) {

    this.msgid = this.navparam.get('id');
    this.showReplybox = 0;

    this.storage.get('userdetails').then((value) => {
      if(value!=null) {
        this.username = value.username;
      }else{
        this.navCtrl.push(BlankPage);
      }
    });

    this.dataForm = fb.group({
      msgbody: ['', Validators.required]
    });
  }

  ionViewDidEnter() {
    this.storage.get('userdetails').then((value) => {
      if(value!=null) {
        this.username = value.username;
        this.dealerusername = value.dealerusername;
        this.getDealerDetails();
        this.getMsgList();
      }else{
        this.navCtrl.push(BlankPage);
      }
    });

  }

  getDealerDetails(){
    var link = this.adminUrl+'editdealerbyusername';
    var data = {'username':this.dealerusername};

    this._http.post(link, data)
        .subscribe(data => {

          let data2 = data.json();

          this.dealerdetails = data2[0];


        }, error => {

          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });
  }

  getMsgList(){

    var ind = 0;

    var link = this.adminUrl+'messagelist';

    this._http.get(link)
        .subscribe(data => {
          var data2 = data.json();

          this.msgList = data2;

          ind = ind+1;

          this.getFMsgList(ind);


        }, error => {
          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });

    var link1 = this.adminUrl+'customerlist';

    this._http.get(link1)
        .subscribe(data => {
          var data2 = data.json();

          this.customerList = data2;
          ind = ind+1;
          this.getFMsgList(ind);


        }, error => {
          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });

    var link2 = this.adminUrl+'dealerlist';

    this._http.get(link2)
        .subscribe(data => {
          var data2 = data.json();

          this.dealerList = data2;
          ind = ind+1;
          this.getFMsgList(ind);

        }, error => {
          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });

  }

  getFMsgList(ind){
    if(ind == 3){
      this.replymessage=[];
      var tempval=[];


      var x: any;
      for (x in this.msgList) {

        if (this.msgList[x]._id == this.msgid) {
          this.messagedetails = this.msgList[x];

          if (this.msgList[x].from == this.username) {
            this.replytoid = this.msgList[x].to;
            this.replytoname = this.getuserinfo(this.msgList[x].to);
          } else {
            this.replytoid = this.msgList[x].from;
            this.replytoname = this.getuserinfo(this.msgList[x].from);
          }

        }

        if (this.msgList[x].parentid == this.msgid) {
          this.msgList[x].fromfullname = this.getuserinfo(this.msgList[x].from);
          tempval[this.msgList[x]._id]=(this.msgList[x]);
        }

      }

      for ( var key in tempval ){
        this.replymessage.push(tempval[key]);
      }

      this.totalreply = this.replymessage.length;

    }
  }

  getuserinfo(from){
    var y:any;
    for(y in this.customerList){
      if(from==this.customerList[y].username){
        return this.customerList[y].fname+' '+this.customerList[y].lname+' ( '+this.customerList[y].username+' ) ';
      }
    }
    var z:any;
    for(z in this.dealerList){
      if(from==this.dealerList[z].username){
        return this.dealerList[z].fname+' '+this.dealerList[z].lname+' ( '+this.dealerList[z].username+' ) ';
      }

    }
    return '';
  }

  goback(){
    //this.navCtrl.pop();
    this.navCtrl.setRoot(MessageDealerPage);
  }

  gettimestr(item){
    var addtime:any = new Date(item.addedon);
    var timestr:any;

    var mon:any = addtime.getMonth();
    mon = mon+1;
    var hours:any = addtime.getHours();
    var meridian:any = 'am';
    if(hours >= 12){
      meridian = 'pm';
    }
    if(hours > 12){
      hours = hours -12;
    }

    if(hours == 0){
      hours = 12;
    }

    timestr = mon+'/'+addtime.getDate()+'/'+addtime.getFullYear()+' '+hours+':'+addtime.getMinutes()+' '+meridian;


    return timestr;

  }

  gettimestr1(item){
    var cdate:any = new Date();
    var addtime:any = new Date(item.addedon);
    var differ = cdate-addtime;
    var timestr;

    var monstr:any = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];


    //return d.getDate();

    //return Math.floor(differ/1000/60/60/24);

    if(cdate.getFullYear() > addtime.getFullYear()){
      var mon = addtime.getMonth();
      mon = mon+1;
      timestr = mon+'/'+addtime.getDate()+'/'+addtime.getFullYear();
    }else if(Math.floor(differ/1000/60/60/24)){
      timestr = monstr[addtime.getMonth()]+' '+addtime.getDate();
    }else{
      var hours = addtime.getHours();
      var meridian = 'am';
      if(hours >= 12){
        meridian = 'pm';
      }
      if(hours > 12){
        hours = hours -12;
      }

      if(hours == 0){
        hours = 12;
      }

      timestr = hours+':'+addtime.getMinutes()+' '+meridian;
    }

    return timestr;

  }


  getBodyText(item){
    var bodystr = item.body.replace(/<[^>]+>/gm, '');
    bodystr= bodystr.replace(/&nbsp/g, " ");

    return bodystr;
  }

  addMessage(formaval){

    if(this.dataForm.valid){

      var link = this.adminUrl+'addmessage';
      var formdata = {'to':this.replytoid,'subject':this.messagedetails.subject,'body':formaval.msgbody,'parentid':this.msgid,'from':this.username};

      this._http.post(link,formdata)
          .subscribe(data => {
            this.navCtrl.push(MessageDealerPage);
          }, error => {
            let toast = this.toastCtrl.create({
              message: 'Database error occurred. Try again!',
              duration: 2000
            });
            toast.present();
          });



    }else{
      var errortxt;
      if(this.dataForm.controls['msgsubject'].hasError('required')){
        errortxt = 'Subject is required';
      }else if(this.dataForm.controls['msgbody'].hasError('required')){
        errortxt = 'Message body is required';
      }

      let toast = this.toastCtrl.create({
        message: errortxt,
        duration: 2000
      });
      toast.present();
    }

  }


}
