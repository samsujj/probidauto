import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {ManagePreferencesPage} from '../managepreferences/managepreferences';
import {ManagePreferences3Page} from '../managepreferences3/managepreferences3';
import {BlankPage} from '../blank/blank';


@Component({
  selector: 'page-managepreferences2',
  templateUrl: 'managepreferences2.html'
})
export class ManagePreferences2Page {

  public userdetails;
  public username;
  public purchase_time;
  public purchasetimelist;

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
        this.getPurchaseTimeList();
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
            console.log(data2);

            if(typeof(data2.purchase_time) != 'undefined'){
              this.purchase_time = data2.purchase_time;
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

  getPurchaseTimeList(){
    var link = 'http://influxiq.com:8001/purchasetimelist';

    this._http.get(link)
        .subscribe(data => {
          var data2 = data.json();

          this.purchasetimelist = data2;


        }, error => {
          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });
  }

  gotoprev(){
    this.navCtrl.push(ManagePreferencesPage);
  }

  gotoskip(){
    this.navCtrl.push(ManagePreferences3Page);
  }


  gotonext(){
    if(typeof(this.purchase_time) == 'undefined'){
      let toast = this.toastCtrl.create({
        message: 'Please choose purchase time type.',
        duration: 2000
      });
      toast.present();
    }else{
      console.log(this.purchase_time);
/*
      var link = 'http://influxiq.com:8001/updatecustomerformobile';
      var formdata = {purchase_time:this.purchase_time,username:this.username};

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
*/    }

  }

  cngPurTime(rval){
    this.purchase_time = rval;
  }

  chkPurTime(rval){
    if(this.purchase_time == rval){
      return true;
    }
    return false;
  }


}
