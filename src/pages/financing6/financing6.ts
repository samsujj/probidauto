import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {BlankPage} from '../blank/blank';
import {Financing5Page} from '../financing5/financing5';
import {Financing7Page} from '../financing7/financing7';

@Component({
  selector: 'page-financing6',
  templateUrl: 'financing6.html'
})
export class Financing6Page {

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
      occupation: [''],
      employer: [''],
      payment_type: [''],
      hire_date: [''],
      work_phone: [''],
      gross_monthly_income: [''],
      employment_year: [''],
      employment_month: [''],
      employment_address: [''],
      employment_addressline2: [''],
      employment_city: [''],
      employment_state: [''],
      employment_zip: [''],
      self_employed: ['']
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


            if(typeof(data2.occupation) != 'undefined'){
              (<FormControl>this.dataForm.controls['occupation']).setValue(data2.occupation);
            }
            if(typeof(data2.employer) != 'undefined'){
              (<FormControl>this.dataForm.controls['employer']).setValue(data2.employer);
            }
            if(typeof(data2.payment_type) != 'undefined'){
              (<FormControl>this.dataForm.controls['payment_type']).setValue(data2.payment_type);
            }
            if(typeof(data2.hire_date) != 'undefined'){
              (<FormControl>this.dataForm.controls['hire_date']).setValue(data2.hire_date);
            }
            if(typeof(data2.work_phone) != 'undefined'){
              (<FormControl>this.dataForm.controls['work_phone']).setValue(data2.work_phone);
            }
            if(typeof(data2.gross_monthly_income) != 'undefined'){
              (<FormControl>this.dataForm.controls['payment_type']).setValue(data2.gross_monthly_income);
            }
            if(typeof(data2.employment_year) != 'undefined'){
              (<FormControl>this.dataForm.controls['employment_year']).setValue(data2.employment_year);
            }
            if(typeof(data2.employment_month) != 'undefined'){
              (<FormControl>this.dataForm.controls['employment_month']).setValue(data2.employment_month);
            }
            if(typeof(data2.employment_address) != 'undefined'){
              (<FormControl>this.dataForm.controls['employment_address']).setValue(data2.employment_address);
            }
            if(typeof(data2.employment_addressline2) != 'undefined'){
              (<FormControl>this.dataForm.controls['employment_addressline2']).setValue(data2.employment_addressline2);
            }
            if(typeof(data2.employment_city) != 'undefined'){
              (<FormControl>this.dataForm.controls['employment_city']).setValue(data2.employment_city);
            }

            if(typeof(data2.employment_state) != 'undefined'){
              (<FormControl>this.dataForm.controls['employment_state']).setValue(data2.employment_state);

              if(data2.employment_state == null){
                (<FormControl>this.dataForm.controls['employment_state']).setValue('');
              }


            }
            if(typeof(data2.employment_zip) != 'undefined'){
              (<FormControl>this.dataForm.controls['employment_zip']).setValue(data2.employment_zip);
            }
            if(typeof(data2.self_employed) != 'undefined'){
              (<FormControl>this.dataForm.controls['self_employed']).setValue(data2.self_employed);
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
    this.navCtrl.push(Financing5Page);
  }

  gotoskip(){
    this.navCtrl.push(Financing7Page);
  }

  gotonext(formaval){

    var link = this.adminUrl+'updatecustomerformobile';
    var formdata1 = {occupation : formaval.occupation,employer:formaval.employer,payment_type : formaval.payment_type,hire_date : formaval.hire_date,work_phone : formaval.work_phone,gross_monthly_income :formaval.gross_monthly_income,employment_year : formaval.employment_year,employment_month : formaval.employment_month,employment_address : formaval.employment_address,employment_addressline2 : formaval.employment_addressline2,employment_city : formaval.employment_city,employment_state : formaval.employment_state,employment_zip : formaval.employment_zip,self_employed : formaval.self_employed}
    var formdata = {arg:formdata1,username:this.username};

    this._http.post(link,formdata)
        .subscribe(data => {
          this.navCtrl.push(Financing7Page);
        }, error => {
          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });

  }

}
