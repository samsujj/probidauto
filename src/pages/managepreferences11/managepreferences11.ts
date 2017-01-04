import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {BlankPage} from '../blank/blank';
import {ManagePreferences10Page} from '../managepreferences10/managepreferences10';
import {DashboardPage} from '../dashboard/dashboard';
import { FinancingPage } from '../financing/financing';


@Component({
  selector: 'page-managepreferences11',
  templateUrl: 'managepreferences11.html'
})
export class ManagePreferences11Page {

  public adminUrl = 'http://influxiq.com:8003/';

  public userdetails;
  public username;
  public car_feature;
  public carfeaturelist;
  public finance_check;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController,private _http: Http, public storage: Storage) {
    this.car_feature = [];
    this.finance_check = 0;

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
        this.getcarfeaturelist();
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

            if(typeof(data2.car_feature) != 'undefined'){
              this.car_feature = data2.car_feature;
            }

            if(typeof(data2.finance_check) != 'undefined'){
              this.finance_check = data2.finance_check;
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

  getcarfeaturelist(){
    var link = this.adminUrl+'listcarfeature';

    this._http.get(link)
        .subscribe(data => {
          var data2 = data.json();

          this.carfeaturelist = data2;




        }, error => {
          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });
  }

  gotoprev(){
    this.navCtrl.push(ManagePreferences10Page);
  }

  gotoskip(){
    this.navCtrl.push(DashboardPage);
  }

  gotonext(){
    if(typeof(this.car_feature) == 'undefined' || this.car_feature.length == 0){
      let toast = this.toastCtrl.create({
        message: 'Please choose at least one.',
        duration: 2000
      });
      toast.present();
    }else{
      var link = this.adminUrl+'updatecustomerformobile';
      var formdata1 = {car_body_style:this.car_feature,finance_check:this.finance_check};
      var formdata = {arg:formdata1,username:this.username};

      this._http.post(link,formdata)
          .subscribe(data => {

            if(this.finance_check == 1){
              this.navCtrl.push(FinancingPage);
            }else{
              this.navCtrl.push(DashboardPage);
            }

          }, error => {
            let toast = this.toastCtrl.create({
              message: 'Database error occurred. Try again!',
              duration: 2000
            });
            toast.present();
          });
    }
  }

  cngcarbodystyle(rval,isChk){
    if(isChk){
      if(this.car_feature.indexOf(rval) < 0){
        this.car_feature.push(rval);
      }
    }else{
      if(this.car_feature.indexOf(rval) >= 0){
        this.car_feature.splice(this.car_feature.indexOf(rval), 1);
      }
    }

  }

  chkcarbodystyle(rval){

    if(this.car_feature.indexOf(rval) >  -1){
      return true;
    }
    return false;
  }

  cngFinaceCheck(rval){
    this.finance_check = rval;
  }

  chkFinaceCheck(rval){
    if(this.finance_check == rval){
      return true;
    }
    return false;
  }

}
