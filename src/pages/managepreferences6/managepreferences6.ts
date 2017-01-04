import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {BlankPage} from '../blank/blank';
import {ManagePreferences5Page} from '../managepreferences5/managepreferences5';
import {ManagePreferences7Page} from '../managepreferences7/managepreferences7';


@Component({
  selector: 'page-managepreferences6',
  templateUrl: 'managepreferences6.html'
})
export class ManagePreferences6Page {

  public adminUrl = 'http://influxiq.com:8003/';

  public userdetails;
  public username;
  public color_opiton;
  public color_list;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController,private _http: Http, public storage: Storage) {

    this.color_opiton = [];

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
        this.getColorList();
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

            if(typeof(data2.color_opiton) != 'undefined'){
              this.color_opiton = data2.color_opiton;
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

  getColorList(){
    var link = this.adminUrl+'colorlist';

    this._http.get(link)
        .subscribe(data => {
          var data2 = data.json();

          this.color_list = data2;


        }, error => {
          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });
  }

  gotoprev(){
    this.navCtrl.push(ManagePreferences5Page);
  }

  gotoskip(){
    this.navCtrl.push(ManagePreferences7Page);
  }

  gotonext(){
    if(typeof(this.color_opiton) == 'undefined' || this.color_opiton.length == 0){
      let toast = this.toastCtrl.create({
        message: 'Please choose at least one.',
        duration: 2000
      });
      toast.present();
    }else{
      var link = this.adminUrl+'updatecustomerformobile';
      var formdata1 = {color_opiton:this.color_opiton};
      var formdata = {arg:formdata1,username:this.username};

      this._http.post(link,formdata)
          .subscribe(data => {
            this.navCtrl.push(ManagePreferences7Page);
          }, error => {
            let toast = this.toastCtrl.create({
              message: 'Database error occurred. Try again!',
              duration: 2000
            });
            toast.present();
          });
    }
  }


  cngColor(rval,isChk){
    if(isChk){
      if(this.color_opiton.indexOf(rval) < 0){
        this.color_opiton.push(rval);
      }
    }else{
      if(this.color_opiton.indexOf(rval) >= 0){
        this.color_opiton.splice(this.color_opiton.indexOf(rval), 1);
      }
    }

  }

  chkColor(rval){

    if(this.color_opiton.indexOf(rval) >  -1){
      return true;
    }
    return false;
  }


}
