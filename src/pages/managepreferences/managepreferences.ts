import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {ManagePreferences2Page} from '../managepreferences2/managepreferences2';
import {BlankPage} from '../blank/blank';


@Component({
  selector: 'page-managepreferences',
  templateUrl: 'managepreferences.html'
})
export class ManagePreferencesPage {

  public send_mail;
  public retail_calculator;
  public userdetails;
  public username;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController,private _http: Http, public storage: Storage) {
    this.storage.get('userdetails').then((value) => {
      if(value!=null) {
        this.userdetails = value;
        this.username = value.username;
      }else{
        this.navCtrl.push(BlankPage);
      }
    });
  }

  ionViewDidEnter() {
    this.storage.get('userdetails').then((value) => {
      if(value!=null) {
        this.userdetails = value;
        this.username = value.username;
        this.getUserdetails();
      }else{
        this.navCtrl.push(BlankPage);
      }
    });
  }

  getUserdetails(){
    var link = 'http://influxiq.com:8001/editdcustomerbyusername';
    var formdata = {username:this.username};

    this._http.post(link,formdata)
        .subscribe(data => {
          var data2 = data.json();
          if(data2.length){
            data2 = data2[0];

            if(typeof(data2.send_mail) != 'undefined'){
              this.send_mail = data2.send_mail;
            }

            if(typeof(data2.retail_calculator) != 'undefined'){
              this.retail_calculator = data2.retail_calculator;
            }

          }


        }, error => {
          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });

  }

  cngSendmail(rval){
    this.send_mail = rval;
  }

  cngretailCalc(rval){
    this.retail_calculator = rval;
  }

  chkSendmail(rval){
    if(this.send_mail == rval){
      return true;
    }
    return false;
  }

  chkretailCalc(rval){
    if(this.retail_calculator == rval){
      return true;
    }
    return false;
  }

  gotonext(){

    if(typeof(this.send_mail) == 'undefined'){
      let toast = this.toastCtrl.create({
        message: 'Please choose email alerts type.',
        duration: 2000
      });
      toast.present();
    }else if(typeof(this.retail_calculator) == 'undefined'){
      let toast = this.toastCtrl.create({
        message: 'Please choose smart retail calculator type.',
        duration: 2000
      });
      toast.present();
    }else{

      var link = 'http://influxiq.com:8001/updatecustomerformobile';
      var formdata = {send_mail:this.send_mail,retail_calculator:this.retail_calculator,username:this.username};

      this._http.post(link,formdata)
          .subscribe(data => {
            this.navCtrl.push(ManagePreferences2Page);
          }, error => {
            let toast = this.toastCtrl.create({
              message: 'Database error occurred. Try again!',
              duration: 2000
            });
            toast.present();
          });
    }

  }

  gotoskip(){
    this.navCtrl.push(ManagePreferences2Page);
  }

}
