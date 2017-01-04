import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators,FormControl} from "@angular/forms";
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {BlankPage} from '../blank/blank';
import {Financing2Page} from '../financing2/financing2';
import {Financing4Page} from '../financing4/financing4';

@Component({
  selector: 'page-financing3',
  templateUrl: 'financing3.html'
})
export class Financing3Page {

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
      address: ['', Validators.required],
      addressline2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      primary_residence_year: [''],
      primary_residence_month: [''],
      primary_residence_type: [''],
      primary_residence_monthly_payment: [''],
      primary_year_homeowner: [''],
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


            if(typeof(data2.address) != 'undefined'){
              (<FormControl>this.dataForm.controls['address']).setValue(data2.address);
            }
            if(typeof(data2.addressline2) != 'undefined'){
              (<FormControl>this.dataForm.controls['addressline2']).setValue(data2.addressline2);
            }
            if(typeof(data2.city) != 'undefined'){
              (<FormControl>this.dataForm.controls['city']).setValue(data2.city);
            }
            if(typeof(data2.state) != 'undefined'){
              (<FormControl>this.dataForm.controls['state']).setValue(data2.state);
            }
            if(typeof(data2.zip) != 'undefined'){
              (<FormControl>this.dataForm.controls['zip']).setValue(data2.zip);
            }
            if(typeof(data2.primary_residence_year) != 'undefined'){
              (<FormControl>this.dataForm.controls['primary_residence_year']).setValue(data2.primary_residence_year);
            }
            if(typeof(data2.primary_residence_month) != 'undefined'){
              (<FormControl>this.dataForm.controls['primary_residence_month']).setValue(data2.primary_residence_month);
            }
            if(typeof(data2.primary_residence_type) != 'undefined'){
              (<FormControl>this.dataForm.controls['primary_residence_type']).setValue(data2.primary_residence_type);
            }
            if(typeof(data2.primary_residence_monthly_payment) != 'undefined'){
              (<FormControl>this.dataForm.controls['primary_residence_monthly_payment']).setValue(data2.primary_residence_monthly_payment);
            }
            if(typeof(data2.primary_year_homeowner) != 'undefined'){
              (<FormControl>this.dataForm.controls['primary_year_homeowner']).setValue(data2.primary_year_homeowner);
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
    this.navCtrl.push(Financing2Page);
  }

  gotoskip(){
    this.navCtrl.push(Financing4Page);
  }

  gotonext(formaval){
    if(this.dataForm.valid){

      var link = this.adminUrl+'updatecustomerformobile';
      var formdata1 = {address : formaval.address,addressline2:formaval.addressline2,city : formaval.city,state : formaval.state,zip : formaval.zip,primary_residence_year :formaval.primary_residence_year,primary_residence_month : formaval.primary_residence_month,primary_residence_type : formaval.primary_residence_type,primary_residence_monthly_payment : formaval.primary_residence_monthly_payment,primary_year_homeowner : formaval.primary_year_homeowner}
      var formdata = {arg:formdata1,username:this.username};

      this._http.post(link,formdata)
          .subscribe(data => {
            this.navCtrl.push(Financing4Page);
          }, error => {
            let toast = this.toastCtrl.create({
              message: 'Database error occurred. Try again!',
              duration: 2000
            });
            toast.present();
          });



    }else{
      var errortxt;
      if(this.dataForm.controls['address'].hasError('required')){
        errortxt = 'Address is required';
      }else if(this.dataForm.controls['city'].hasError('required')){
        errortxt = 'City is required';
      }else if(this.dataForm.controls['state'].hasError('required')){
        errortxt = 'State is required';
      }else if(this.dataForm.controls['zip'].hasError('required')){
        errortxt = 'Zip is required';
      }

      let toast = this.toastCtrl.create({
        message: errortxt,
        duration: 2000
      });
      toast.present();
    }
  }

}
