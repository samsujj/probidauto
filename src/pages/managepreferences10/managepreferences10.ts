import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {BlankPage} from '../blank/blank';
import {ManagePreferences9Page} from '../managepreferences9/managepreferences9';
import {ManagePreferences11Page} from '../managepreferences11/managepreferences11';


@Component({
  selector: 'page-managepreferences10',
  templateUrl: 'managepreferences10.html'
})
export class ManagePreferences10Page {

  public adminUrl = 'http://influxiq.com:8003/';

  public userdetails;
  public username;
  public car_body_style;
  public carbodystylelist;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController,private _http: Http, public storage: Storage) {
    this.car_body_style = [];

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
        this.getcarbodystylelist();
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

            if(typeof(data2.car_body_style) != 'undefined'){
              this.car_body_style = data2.car_body_style;
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

  getcarbodystylelist(){
    var link = this.adminUrl+'carbodystylelist';

    this._http.get(link)
        .subscribe(data => {
          var data2 = data.json();

          this.carbodystylelist = data2;




        }, error => {
          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });
  }


  gotoprev(){
    this.navCtrl.push(ManagePreferences9Page);
  }

  gotoskip(){
    this.navCtrl.push(ManagePreferences11Page);
  }


  gotonext(){
    if(typeof(this.car_body_style) == 'undefined' || this.car_body_style.length == 0){
      let toast = this.toastCtrl.create({
        message: 'Please choose at least one.',
        duration: 2000
      });
      toast.present();
    }else{
      var link = this.adminUrl+'updatecustomerformobile';
      var formdata1 = {car_body_style:this.car_body_style};
      var formdata = {arg:formdata1,username:this.username};

      this._http.post(link,formdata)
          .subscribe(data => {
            this.navCtrl.push(ManagePreferences11Page);
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
      if(this.car_body_style.indexOf(rval) < 0){
        this.car_body_style.push(rval);
      }
    }else{
      if(this.car_body_style.indexOf(rval) >= 0){
        this.car_body_style.splice(this.car_body_style.indexOf(rval), 1);
      }
    }

  }

  chkcarbodystyle(rval){

    if(this.car_body_style.indexOf(rval) >  -1){
      return true;
    }
    return false;
  }

}
