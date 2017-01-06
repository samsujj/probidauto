import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {BlankPage} from '../blank/blank';
import {Financing7Page} from '../financing7/financing7';
import {Financing9Page} from '../financing9/financing9';

@Component({
  selector: 'page-financing8',
  templateUrl: 'financing8.html'
})
export class Financing8Page {

  public adminUrl = 'http://influxiq.com:8003/';
  public dataForm:FormGroup;

  public userdetails;
  public username;

  public checking_account;
  public saving_account;
  public co_applicant;
  public vehicle_trade;

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
      other_monthly_income: [''],
      checking_account: [''],
      checking_account_balance: [''],
      saving_account: [''],
      saving_account_balnace: [''],
      other_bank_name: [''],
      other_liquid_asset: [''],
      other_income_source: [''],
      other_liquid_asset_source: [''],
      co_applicant: [''],
      vehicle_trade: [''],
      application_info_check: ['']
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

            if(typeof(data2.other_monthly_income) != 'undefined'){
              (<FormControl>this.dataForm.controls['other_monthly_income']).setValue(data2.other_monthly_income);
            }
            if(typeof(data2.co_applicant) != 'undefined'){
              (<FormControl>this.dataForm.controls['co_applicant']).setValue(data2.co_applicant);
            }
            if(typeof(data2.checking_account) != 'undefined'){
              (<FormControl>this.dataForm.controls['checking_account']).setValue(data2.checking_account);
              this.checking_account = data2.checking_account;
            }
            if(typeof(data2.checking_account_balance) != 'undefined'){
              (<FormControl>this.dataForm.controls['checking_account_balance']).setValue(data2.checking_account_balance);
            }
            if(typeof(data2.saving_account) != 'undefined'){
              (<FormControl>this.dataForm.controls['saving_account']).setValue(data2.saving_account);
              this.saving_account = data2.saving_account;
            }
            if(typeof(data2.saving_account_balnace) != 'undefined'){
              (<FormControl>this.dataForm.controls['saving_account_balnace']).setValue(data2.saving_account_balnace);
            }
            if(typeof(data2.other_bank_name) != 'undefined'){
              (<FormControl>this.dataForm.controls['other_bank_name']).setValue(data2.other_bank_name);
            }
            if(typeof(data2.other_liquid_asset) != 'undefined'){
              (<FormControl>this.dataForm.controls['other_liquid_asset']).setValue(data2.other_liquid_asset);
            }
            if(typeof(data2.other_income_source) != 'undefined'){
              (<FormControl>this.dataForm.controls['other_income_source']).setValue(data2.other_income_source);
            }
            if(typeof(data2.other_liquid_asset_source) != 'undefined'){
              (<FormControl>this.dataForm.controls['other_liquid_asset_source']).setValue(data2.other_liquid_asset_source);
            }
            if(typeof(data2.co_applicant) != 'undefined'){
              (<FormControl>this.dataForm.controls['co_applicant']).setValue(data2.co_applicant);
              this.co_applicant = data2.co_applicant;
            }
            if(typeof(data2.vehicle_trade) != 'undefined'){
              (<FormControl>this.dataForm.controls['vehicle_trade']).setValue(data2.vehicle_trade);
              this.vehicle_trade = data2.vehicle_trade;
            }
            if(typeof(data2.application_info_check) != 'undefined'){
              (<FormControl>this.dataForm.controls['application_info_check']).setValue(data2.application_info_check);
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
    this.navCtrl.push(Financing7Page);
  }


  gotoskip(){
    this.navCtrl.push(Financing9Page);
  }

  gotonext(formaval){

    var link = this.adminUrl+'updatecustomerformobile';
    var formdata1 = {other_monthly_income: formaval.other_monthly_income, checking_account: formaval.checking_account, checking_account_balance: formaval.checking_account_balance, saving_account: formaval.saving_account, saving_account_balnace: formaval.saving_account_balnace, other_bank_name: formaval.other_bank_name, other_liquid_asset: formaval.other_liquid_asset, other_income_source: formaval.other_income_source, other_liquid_asset_source: formaval.other_liquid_asset_source, co_applicant: formaval.co_applicant, vehicle_trade: formaval.vehicle_trade, application_info_check: formaval.application_info_check};
    var formdata = {arg:formdata1,username:this.username};

    this._http.post(link,formdata)
        .subscribe(data => {
          this.navCtrl.push(Financing9Page);
        }, error => {
          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });

  }

  cngChkAcc(rval){
    (<FormControl>this.dataForm.controls['checking_account']).setValue(rval);
  }

  chkChkAcc(rval){
    if(this.checking_account == rval){
      return true;
    }
    return false;
  }

  cngSbAcc(rval){
    (<FormControl>this.dataForm.controls['saving_account']).setValue(rval);
  }

  chkSbAcc(rval){
    if(this.saving_account == rval){
      return true;
    }
    return false;
  }

  cngcoApplicant(rval){
    (<FormControl>this.dataForm.controls['co_applicant']).setValue(rval);
  }

  chkcoApplicant(rval){
    if(this.co_applicant == rval){
      return true;
    }
    return false;
  }

  cngvehicleTrade(rval){
    (<FormControl>this.dataForm.controls['vehicle_trade']).setValue(rval);
  }

  chkvehicleTrade(rval){
    if(this.vehicle_trade == rval){
      return true;
    }
    return false;
  }


}
