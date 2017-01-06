import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {BlankPage} from '../blank/blank';
import {Financing3Page} from '../financing3/financing3';
import {Financing5Page} from '../financing5/financing5';

@Component({
  selector: 'page-financing4',
  templateUrl: 'financing4.html'
})
export class Financing4Page {

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
      previous_address: [''],
      previous_addressline2: [''],
      previous_city: [''],
      previous_state: [''],
      previous_zip: [''],
      previous_residence_year: [''],
      previous_residence_month: ['']
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


            if(typeof(data2.previous_address) != 'undefined'){
              (<FormControl>this.dataForm.controls['previous_address']).setValue(data2.previous_address);
            }
            if(typeof(data2.previous_addressline2) != 'undefined'){
              (<FormControl>this.dataForm.controls['previous_addressline2']).setValue(data2.previous_addressline2);
            }
            if(typeof(data2.previous_city) != 'undefined'){
              (<FormControl>this.dataForm.controls['previous_city']).setValue(data2.previous_city);
            }
            if(typeof(data2.previous_state) != 'undefined'){
              (<FormControl>this.dataForm.controls['previous_state']).setValue(data2.previous_state);

              if(data2.previous_state == null){
                (<FormControl>this.dataForm.controls['previous_state']).setValue('');
              }


            }
            if(typeof(data2.previous_zip) != 'undefined'){
              (<FormControl>this.dataForm.controls['previous_zip']).setValue(data2.previous_zip);
            }
            if(typeof(data2.previous_residence_year) != 'undefined'){
              (<FormControl>this.dataForm.controls['previous_residence_year']).setValue(data2.previous_residence_year);
            }
            if(typeof(data2.previous_residence_month) != 'undefined'){
              (<FormControl>this.dataForm.controls['previous_residence_month']).setValue(data2.previous_residence_month);
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
    this.navCtrl.push(Financing3Page);
  }

  gotoskip(){
    this.navCtrl.push(Financing5Page);
  }

  gotonext(formaval){

      var link = this.adminUrl+'updatecustomerformobile';
      var formdata1 = {previous_address : formaval.previous_address,previous_addressline2:formaval.previous_addressline2,previous_city : formaval.previous_city,previous_state : formaval.previous_state,previous_zip : formaval.previous_zip,previous_residence_year :formaval.previous_residence_year,previous_residence_month : formaval.previous_residence_month}
      var formdata = {arg:formdata1,username:this.username};

      this._http.post(link,formdata)
          .subscribe(data => {
            this.navCtrl.push(Financing5Page);
          }, error => {
            let toast = this.toastCtrl.create({
              message: 'Database error occurred. Try again!',
              duration: 2000
            });
            toast.present();
          });

  }


}
