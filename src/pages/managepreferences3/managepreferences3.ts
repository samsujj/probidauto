import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {BlankPage} from '../blank/blank';
import {ManagePreferences2Page} from '../managepreferences2/managepreferences2';
import {ManagePreferences4Page} from '../managepreferences4/managepreferences4';


@Component({
  selector: 'page-managepreferences3',
  templateUrl: 'managepreferences3.html'
})
export class ManagePreferences3Page {

  public adminUrl = 'http://influxiq.com:8003/';

  public userdetails;
  public username;
  public base_price;
  public base_price_list;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController,private _http: Http, public storage: Storage) {

    this.base_price = [];

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
        this.getBasePriceList();
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

            if(typeof(data2.base_price) != 'undefined'){
              this.base_price = data2.base_price;
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

  getBasePriceList(){
    var link = this.adminUrl+'basepricelist';

    this._http.get(link)
        .subscribe(data => {
          var data2 = data.json();

          this.base_price_list = data2;


        }, error => {
          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });
  }

  gotoprev(){
    this.navCtrl.push(ManagePreferences2Page);
  }

  gotoskip(){
    this.navCtrl.push(ManagePreferences4Page);
  }


  gotonext(){
    if(typeof(this.base_price) == 'undefined' || this.base_price.length == 0){
      let toast = this.toastCtrl.create({
        message: 'Please choose at least one.',
        duration: 2000
      });
      toast.present();
    }else{
      var link = this.adminUrl+'updatecustomerformobile';
      var formdata1 = {base_price:this.base_price};
      var formdata = {arg:formdata1,username:this.username};

      this._http.post(link,formdata)
          .subscribe(data => {
            this.navCtrl.push(ManagePreferences4Page);
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
      if(this.base_price.indexOf(rval) < 0){
        this.base_price.push(rval);
      }
    }else{
      if(this.base_price.indexOf(rval) >= 0){
        this.base_price.splice(this.base_price.indexOf(rval), 1);
      }
    }

  }

  chkBasePrice(rval){

    if(this.base_price.indexOf(rval) >  -1){
      return true;
    }
    return false;
  }

}
