import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {BlankPage} from '../blank/blank';
import {Financing8Page} from '../financing8/financing8';
import {Financing10Page} from '../financing10/financing10';

@Component({
  selector: 'page-financing9',
  templateUrl: 'financing9.html'
})
export class Financing9Page {

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
      listing_id: [''],
      location_id: [''],
      license_number: [''],
      loan_down_payment: [''],
      loan_vehicle_cost: [''],
      loan_payment_amount: [''],
      loan_repayment_term: [''],
      loan_month: [''],
      loan_check: ['']
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

            if(typeof(data2.listing_id) != 'undefined'){
              (<FormControl>this.dataForm.controls['listing_id']).setValue(data2.listing_id);
            }
            if(typeof(data2.location_id) != 'undefined'){
              (<FormControl>this.dataForm.controls['location_id']).setValue(data2.location_id);
            }
            if(typeof(data2.license_number) != 'undefined'){
              (<FormControl>this.dataForm.controls['license_number']).setValue(data2.license_number);
            }
            if(typeof(data2.loan_down_payment) != 'undefined'){
              (<FormControl>this.dataForm.controls['loan_down_payment']).setValue(data2.loan_down_payment);
            }
            if(typeof(data2.loan_vehicle_cost) != 'undefined'){
              (<FormControl>this.dataForm.controls['loan_vehicle_cost']).setValue(data2.loan_vehicle_cost);
            }
            if(typeof(data2.loan_payment_amount) != 'undefined'){
              (<FormControl>this.dataForm.controls['loan_payment_amount']).setValue(data2.loan_payment_amount);
            }
            if(typeof(data2.loan_repayment_term) != 'undefined'){
              (<FormControl>this.dataForm.controls['loan_repayment_term']).setValue(data2.loan_repayment_term);
            }
            if(typeof(data2.loan_month) != 'undefined'){
              (<FormControl>this.dataForm.controls['loan_month']).setValue(data2.loan_month);
            }
            if(typeof(data2.loan_check) != 'undefined'){
              (<FormControl>this.dataForm.controls['loan_check']).setValue(data2.loan_check);
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
    this.navCtrl.push(Financing8Page);
  }


  gotoskip(){
    this.navCtrl.push(Financing10Page);
  }

  gotonext(formaval){

    var link = this.adminUrl+'updatecustomerformobile';
    var formdata1 = {listing_id: formaval.listing_id, location_id: formaval.location_id, license_number: formaval.license_number, loan_down_payment: formaval.loan_down_payment, loan_vehicle_cost: formaval.loan_vehicle_cost, loan_payment_amount: formaval.loan_payment_amount, loan_repayment_term: formaval.loan_repayment_term, loan_month: formaval.loan_month, loan_check: formaval.loan_check};
    var formdata = {arg:formdata1,username:this.username};

    this._http.post(link,formdata)
        .subscribe(data => {
          this.navCtrl.push(Financing10Page);
        }, error => {
          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });

  }


}
