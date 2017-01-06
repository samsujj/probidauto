import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {BlankPage} from '../blank/blank';
import {Financing4Page} from '../financing4/financing4';
import {Financing6Page} from '../financing6/financing6';

@Component({
  selector: 'page-financing5',
  templateUrl: 'financing5.html'
})
export class Financing5Page {

  public adminUrl = 'http://influxiq.com:8003/';
  public dataForm:FormGroup;

  public userdetails;
  public username;
  public statelist;

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
      mailing_address: [''],
      mailing_addressline2: [''],
      mailing_city: [''],
      mailing_state: [''],
      mailing_zip: ['']
    });


  }

  ionViewDidEnter() {
    this.storage.get('userdetails').then((value) => {
      if(value!=null) {
        this.userdetails = value;
        this.username = value.username;
        this.getUserdetails();
        this.getStateList();
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


            if(typeof(data2.mailing_address) != 'undefined'){
              (<FormControl>this.dataForm.controls['mailing_address']).setValue(data2.mailing_address);
            }
            if(typeof(data2.mailing_addressline2) != 'undefined'){
              (<FormControl>this.dataForm.controls['mailing_addressline2']).setValue(data2.mailing_addressline2);
            }
            if(typeof(data2.mailing_city) != 'undefined'){
              (<FormControl>this.dataForm.controls['mailing_city']).setValue(data2.mailing_city);
            }
            if(typeof(data2.mailing_state) != 'undefined'){
              (<FormControl>this.dataForm.controls['mailing_state']).setValue(data2.mailing_state);

              if(data2.mailing_state == null){
                (<FormControl>this.dataForm.controls['mailing_state']).setValue('');
              }

            }
            if(typeof(data2.mailing_zip) != 'undefined'){
              (<FormControl>this.dataForm.controls['mailing_zip']).setValue(data2.mailing_zip);
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

  getStateList(){
    var link = this.adminUrl+'getusastates';

    this._http.get(link)
        .subscribe(data => {
          var data2 = data.json();

          this.statelist = data2;


        }, error => {
          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });
  }

  gotoprev(){
    this.navCtrl.push(Financing4Page);
  }

  gotoskip(){
    this.navCtrl.push(Financing6Page);
  }

  gotonext(formaval){

    var link = this.adminUrl+'updatecustomerformobile';
    var formdata1 = {mailing_address : formaval.mailing_address,mailing_addressline2:formaval.mailing_addressline2,mailing_city : formaval.mailing_city,mailing_state : formaval.mailing_state,mailing_zip : formaval.mailing_zip}
    var formdata = {arg:formdata1,username:this.username};

    this._http.post(link,formdata)
        .subscribe(data => {
          this.navCtrl.push(Financing6Page);
        }, error => {
          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });

  }


}
