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
    var link = 'http://influxiq.com:8001/editdcustomerbyusername';
    var formdata = {username:this.username};

    this._http.post(link,formdata)
        .subscribe(data => {
          var data2 = data.json();
          if(data2.length){
            data2 = data2[0];
            console.log(data2);

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
    var link = 'http://influxiq.com:8001/basepricelist';

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
    this.navCtrl.push(ManagePreferences4Page);
  }

  cngBasePrice(rval){
    //this.cngBasePrice = rval;
    console.log(rval);
  }

  chkBasePrice(rval){
    return false;
    /*if(this.base_price.indexOf(rval) >  -1){
      return true;
    }
    return false;*/
  }

}
