import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {BlankPage} from '../blank/blank';
import {Financing6Page} from '../financing6/financing6';
import {Financing8Page} from '../financing8/financing8';

@Component({
  selector: 'page-financing7',
  templateUrl: 'financing7.html'
})
export class Financing7Page {

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
      previous_employer: [''],
      previous_employment_address: [''],
      previous_employment_addressline2: [''],
      previous_employment_month: [''],
      previous_employment_year: [''],
      previous_employment_city: [''],
      previous_employment_state: [''],
      previous_employment_zip: ['']
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


            if(typeof(data2.previous_employer) != 'undefined'){
              (<FormControl>this.dataForm.controls['previous_employer']).setValue(data2.previous_employer);
            }
            if(typeof(data2.previous_employment_address) != 'undefined'){
              (<FormControl>this.dataForm.controls['previous_employment_address']).setValue(data2.previous_employment_address);
            }
            if(typeof(data2.previous_employment_addressline2) != 'undefined'){
              (<FormControl>this.dataForm.controls['previous_employment_addressline2']).setValue(data2.previous_employment_addressline2);
            }
            if(typeof(data2.previous_employment_month) != 'undefined'){
              (<FormControl>this.dataForm.controls['previous_employment_month']).setValue(data2.previous_employment_month);
            }
            if(typeof(data2.previous_employment_year) != 'undefined'){
              (<FormControl>this.dataForm.controls['previous_employment_year']).setValue(data2.previous_employment_year);
            }
            if(typeof(data2.previous_employment_city) != 'undefined'){
              (<FormControl>this.dataForm.controls['previous_residence_year']).setValue(data2.previous_employment_city);
            }
            if(typeof(data2.previous_employment_state) != 'undefined'){
              (<FormControl>this.dataForm.controls['previous_employment_state']).setValue(data2.previous_employment_state);

              if(data2.previous_employment_state == null){
                (<FormControl>this.dataForm.controls['previous_employment_state']).setValue('');
              }
            }
            if(typeof(data2.previous_employment_zip) != 'undefined'){
              (<FormControl>this.dataForm.controls['previous_employment_zip']).setValue(data2.previous_employment_zip);
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
    this.navCtrl.push(Financing6Page);
  }

  gotoskip(){
    this.navCtrl.push(Financing8Page);
  }

  gotonext(formaval){

    var link = this.adminUrl+'updatecustomerformobile';
    var formdata1 = {previous_employer : formaval.previous_employer,previous_employment_address:formaval.previous_employment_address,previous_employment_addressline2 : formaval.previous_employment_addressline2,previous_employment_month : formaval.previous_employment_month,previous_employment_year : formaval.previous_employment_year,previous_employment_city :formaval.previous_employment_city,previous_employment_state : formaval.previous_employment_state,previous_employment_zip : formaval.previous_employment_zip}
    var formdata = {arg:formdata1,username:this.username};

    this._http.post(link,formdata)
        .subscribe(data => {
          this.navCtrl.push(Financing8Page);
        }, error => {
          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });

  }

}
