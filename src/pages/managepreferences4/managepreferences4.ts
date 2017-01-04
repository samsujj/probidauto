import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {BlankPage} from '../blank/blank';
import {ManagePreferences3Page} from '../managepreferences3/managepreferences3';
import {ManagePreferences5Page} from '../managepreferences5/managepreferences5';


@Component({
  selector: 'page-managepreferences4',
  templateUrl: 'managepreferences4.html'
})
export class ManagePreferences4Page {


  public adminUrl = 'http://influxiq.com:8003/';

  public userdetails;
  public username;
  public car_auto_year;
  public auto_year_list;


  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController,private _http: Http, public storage: Storage) {
    this.car_auto_year = [];

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
        this.getAutoYearList();
      }else{
        this.navCtrl.push(BlankPage);
      }
    });
  }

  getUserdetails(){
    var link = this.adminUrl+'editdcustomerbyusername';
    var formdata = {username:this.username};

    this._http.post(link,formdata)
        .subscribe(data => {
          var data2 = data.json();
          if(data2.length){
            data2 = data2[0];

            if(typeof(data2.car_auto_year) != 'undefined'){
              this.car_auto_year = data2.car_auto_year;
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

  getAutoYearList(){
    var link = this.adminUrl+'carautoyearlist';

    this._http.get(link)
        .subscribe(data => {
          var data2 = data.json();

          this.auto_year_list = data2;


        }, error => {
          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });
  }


  gotoprev(){
    this.navCtrl.push(ManagePreferences3Page);
  }

  gotoskip(){
    this.navCtrl.push(ManagePreferences5Page);
  }

  gotonext(){
    if(typeof(this.car_auto_year) == 'undefined' || this.car_auto_year.length == 0){
      let toast = this.toastCtrl.create({
        message: 'Please choose at least one.',
        duration: 2000
      });
      toast.present();
    }else{
      var link = this.adminUrl+'updatecustomerformobile';
      var formdata1 = {car_auto_year:this.car_auto_year};
      var formdata = {arg:formdata1,username:this.username};

      this._http.post(link,formdata)
          .subscribe(data => {
            this.navCtrl.push(ManagePreferences5Page);
          }, error => {
            let toast = this.toastCtrl.create({
              message: 'Database error occurred. Try again!',
              duration: 2000
            });
            toast.present();
          });
    }
  }

  cngBasePrice(rval,isChk){
    if(isChk){
      if(this.car_auto_year.indexOf(rval) < 0){
        this.car_auto_year.push(rval);
      }
    }else{
      if(this.car_auto_year.indexOf(rval) >= 0){
        this.car_auto_year.splice(this.car_auto_year.indexOf(rval), 1);
      }
    }

  }

  chkBasePrice(rval){
    if(this.car_auto_year.indexOf(rval) >  -1){
      return true;
    }
    return false;
  }

}
