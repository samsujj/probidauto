import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {BlankPage} from '../blank/blank';
import {Financing9Page} from '../financing9/financing9';
import {Financing11Page} from '../financing11/financing11';

@Component({
  selector: 'page-financing10',
  templateUrl: 'financing10.html'
})
export class Financing10Page {

  public adminUrl = 'http://influxiq.com:8003/';
  public dataForm:FormGroup;

  public userdetails;
  public username;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController,private _http: Http, public storage: Storage,public fb: FormBuilder) {
    this.storage.get('userdetails').then((value) => {
      if(value!=null) {
        this.userdetails = value;
        this.username = value.username;
      }else{
        this.navCtrl.push(BlankPage);
      }
    });

    this.dataForm = fb.group({
      comment: ['']
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
    var link = this.adminUrl+'editdcustomerbyusername';
    var formdata = {username:this.username};

    this._http.post(link,formdata)
        .subscribe(data => {
          var data2 = data.json();
          if(data2.length){
            data2 = data2[0];

            this.userdetails = data2;

            if(typeof(data2.comment) != 'undefined'){
              (<FormControl>this.dataForm.controls['comment']).setValue(data2.comment);
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

  gotoprev(){
    this.navCtrl.push(Financing9Page);
  }


  gotoskip(){
    this.navCtrl.push(Financing11Page);
  }

  gotonext(formaval){

    var link = this.adminUrl+'updatecustomerformobile';
    var formdata1 = {comment: formaval.comment};
    var formdata = {arg:formdata1,username:this.username};

    this._http.post(link,formdata)
        .subscribe(data => {
          this.navCtrl.push(Financing11Page);
        }, error => {
          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });

  }

}
