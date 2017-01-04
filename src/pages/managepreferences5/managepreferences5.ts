import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {BlankPage} from '../blank/blank';
import {ManagePreferences4Page} from '../managepreferences4/managepreferences4';
import {ManagePreferences6Page} from '../managepreferences6/managepreferences6';


@Component({
  selector: 'page-managepreferences5',
  templateUrl: 'managepreferences5.html'
})
export class ManagePreferences5Page {

  public adminUrl = 'http://influxiq.com:8003/';

  public userdetails;
  public username;
  public car_mileage;
  public car_mileage_list;

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
        this.getMileageList();
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

            if(typeof(data2.car_mileage) != 'undefined'){
              this.car_mileage = data2.car_mileage;
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

  getMileageList(){
    var link = this.adminUrl+'listcarautomileage';

    this._http.get(link)
        .subscribe(data => {
          var data2 = data.json();

          this.car_mileage_list = data2;


        }, error => {
          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });
  }




  gotoprev(){
    this.navCtrl.push(ManagePreferences4Page);
  }

  gotoskip(){
    this.navCtrl.push(ManagePreferences6Page);
  }

  gotonext(){
    if(typeof(this.car_mileage) == 'undefined'){
      let toast = this.toastCtrl.create({
        message: 'Please choose purchase time type.',
        duration: 2000
      });
      toast.present();
    }else{
      var link = this.adminUrl+'updatecustomerformobile';
      var formdata1 = {car_mileage:this.car_mileage};
      var formdata = {arg:formdata1,username:this.username};

      this._http.post(link,formdata)
          .subscribe(data => {
            this.navCtrl.push(ManagePreferences6Page);
          }, error => {
            let toast = this.toastCtrl.create({
              message: 'Database error occurred. Try again!',
              duration: 2000
            });
            toast.present();
          });
    }
  }

  cngMileage(rval){
    this.car_mileage = rval;
  }

  chkMileage(rval){
    if(this.car_mileage == rval){
      return true;
    }
    return false;
  }

}
