import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {BlankPage} from '../blank/blank';
import {ManagePreferences7Page} from '../managepreferences7/managepreferences7';
//import {ManagePreferences9Page} from '../managepreferences9/managepreferences9';
import {ManagePreferences10Page} from '../managepreferences10/managepreferences10';


@Component({
  selector: 'page-managepreferences8',
  templateUrl: 'managepreferences8.html'
})
export class ManagePreferences8Page {

  public adminUrl = 'http://influxiq.com:8003/';

  public userdetails;
  public username;
  public upcoming_auction;
  public carlogolist;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController,private _http: Http, public storage: Storage) {
    this.upcoming_auction = [];

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
        this.getcarlogolist();
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

            if(typeof(data2.upcoming_auction) != 'undefined'){
              this.upcoming_auction = data2.upcoming_auction;
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

  getcarlogolist(){
    var link = this.adminUrl+'carlogolist';

    this._http.get(link)
        .subscribe(data => {
          var data2 = data.json();

          this.carlogolist = data2;


        }, error => {
          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });
  }


  gotoprev(){
    this.navCtrl.push(ManagePreferences7Page);
  }

  gotoskip(){
    this.navCtrl.push(ManagePreferences10Page);
  }


  gotonext(){
    if(typeof(this.upcoming_auction) == 'undefined' || this.upcoming_auction.length == 0){
      let toast = this.toastCtrl.create({
        message: 'Please choose at least one.',
        duration: 2000
      });
      toast.present();
    }else{
      var link = this.adminUrl+'updatecustomerformobile';
      var formdata1 = {upcoming_auction:this.upcoming_auction};
      var formdata = {arg:formdata1,username:this.username};

      this._http.post(link,formdata)
          .subscribe(data => {
            this.navCtrl.push(ManagePreferences10Page);
          }, error => {
            let toast = this.toastCtrl.create({
              message: 'Database error occurred. Try again!',
              duration: 2000
            });
            toast.present();
          });
    }
  }

  selectClass(rval){

    if(this.upcoming_auction.indexOf(rval) >  -1){
      return 'carlogoselected';
    }
    return '';
  }

  selectCar(rval){
    if(this.upcoming_auction.indexOf(rval) < 0){
      this.upcoming_auction.push(rval);
    }else{
      this.upcoming_auction.splice(this.upcoming_auction.indexOf(rval), 1);
    }

  }

}
