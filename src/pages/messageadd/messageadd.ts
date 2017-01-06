import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators,FormControl} from "@angular/forms";
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {BlankPage} from '../blank/blank';
import {MessageDealerPage} from '../messagedealer/messagedealer';


@Component({
  selector: 'page-messageadd',
  templateUrl: 'messageadd.html'
})
export class MessageAddPage {

  public adminUrl = 'http://influxiq.com:8003/';
  public dataForm:FormGroup;

  public username;
  public dealerusername;
  public dealerdetails;


  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController,private _http: Http, public storage: Storage,public fb: FormBuilder) {
    this.storage.get('userdetails').then((value) => {
      if(value!=null) {
        this.username = value.username;
      }else{
        this.navCtrl.push(BlankPage);
      }
    });

    this.dataForm = fb.group({
      toname: [''],
      msgsubject: ['', Validators.required],
      msgbody: ['', Validators.required]
    });

  }


  ionViewDidEnter() {
    this.storage.get('userdetails').then((value) => {
      if(value!=null) {
        this.username = value.username;
        this.dealerusername = value.dealerusername;
        this.getDealerDetails();
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

          (<FormControl>this.dataForm.controls['toname']).setValue(this.dealerdetails.fname+' '+this.dealerdetails.lname+' ('+this.dealerusername+')');

        }, error => {

          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });
  }



  goback(){
    //this.navCtrl.pop();
    this.navCtrl.setRoot(MessageDealerPage);
  }

  addMessage(formaval){

    if(this.dataForm.valid){

      var link = this.adminUrl+'addmessage';
      var formdata = {'to':this.dealerusername,'subject':formaval.msgsubject,'body':formaval.msgbody,'parentid':0,'from':this.username};

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
