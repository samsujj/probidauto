import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController,ModalController } from 'ionic-angular';
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {BlankPage} from '../blank/blank';
import {MessageAddPage} from '../messageadd/messageadd';
import {MessageDetailsPage} from '../messagedetails/messagedetails';


@Component({
  selector: 'page-messagedealer',
  templateUrl: 'messagedealer.html'
})
export class MessageDealerPage {

  public adminUrl = 'http://influxiq.com:8003/';

  public messageaddpage = MessageAddPage;

  public msgType;
  public username;

  public msgList;
  public customerList;
  public dealerList;
  public fMsgList;


  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController,public modalCtrl: ModalController,private _http: Http, public storage: Storage) {
    this.msgType = 1;
    this.fMsgList = [];
    this.storage.get('userdetails').then((value) => {
      if(value!=null) {
        this.username = value.username;
      }else{
        this.navCtrl.push(BlankPage);
      }
    });
  }

  ionViewDidEnter() {
    this.storage.get('userdetails').then((value) => {
      if(value!=null) {
        this.username = value.username;
        this.getMsgList();
      }else{
        this.navCtrl.push(BlankPage);
      }
    });
  }

  getMsgList(){
    var link = this.adminUrl+'messagelist';

    this._http.get(link)
        .subscribe(data => {
          var data2 = data.json();

          this.msgList = data2;
          this.getFMsgList();


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
          this.getFMsgList();


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
          this.getFMsgList();

        }, error => {
          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });

  }

  getFMsgList(){
    this.fMsgList=[];
    var tempval = [];

    var x: any;
    for (x in this.msgList) {
      if(this.msgList[x].parentid!=0) this.msgList[x]._id=this.msgList[x].parentid;
      if (this.msgList[x].to == this.username) {
        this.msgList[x].fromfullname = this.getuserinfo(this.msgList[x].from);
        tempval[this.msgList[x]._id]=(this.msgList[x]);
      }
    }

    for ( var key in tempval ){
      this.fMsgList.push(tempval[key]);
    }
  }

  getSentMsgList(){
    this.fMsgList=[];
    var tempval = [];

    var x: any;
    for (x in this.msgList) {
      if(this.msgList[x].parentid!=0) this.msgList[x]._id=this.msgList[x].parentid;
      if (this.msgList[x].from == this.username) {
        this.msgList[x].fromfullname = this.getuserinfo(this.msgList[x].from);
        tempval[this.msgList[x]._id]=(this.msgList[x]);

      }
    }

    for ( var key in tempval ){
      this.fMsgList.push(tempval[key]);
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

  goDetails(item){
    //let modal = this.modalCtrl.create(MessageDetailsPage);
    //modal.present();
    this.navCtrl.push(MessageDetailsPage,{id:item._id});
  }

  cngMsgType(ev){
    if(ev == 2){
      this.getSentMsgList();
    }else{
      this.getFMsgList();
    }
  }

  getBodyText(item){
    var bodystr = item.body.replace(/<[^>]+>/gm, '');
    bodystr= bodystr.replace(/&nbsp/g, " ");
    var estr = '';
    if(bodystr.length > 125){
      estr = '...';
    }
    bodystr = bodystr.substring(0,125);

    return bodystr+estr;
  }

  gettimestr(item){
    var cdate:any = new Date();
    var addtime:any = new Date(item.addedon);
    var differ = cdate-addtime;
    var timestr;

    var monstr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];


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

}
