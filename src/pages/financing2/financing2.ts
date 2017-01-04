import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators,FormControl} from "@angular/forms";
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {BlankPage} from '../blank/blank';
import {FinancingPage} from '../financing/financing';
import {Financing3Page} from '../financing3/financing3';

@Component({
  selector: 'page-financing2',
  templateUrl: 'financing2.html'
})
export class Financing2Page {

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
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      mname: [''],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      fax: [''],
      dob: ['', Validators.required],
      social_security: ['', Validators.required],
      mother_maiden_name: [''],
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

            console.log(data2);


            if(typeof(data2.fname) != 'undefined'){
              (<FormControl>this.dataForm.controls['fname']).setValue(data2.fname);
            }
            if(typeof(data2.lname) != 'undefined'){
              (<FormControl>this.dataForm.controls['lname']).setValue(data2.lname);
            }
            if(typeof(data2.mname) != 'undefined'){
              (<FormControl>this.dataForm.controls['mname']).setValue(data2.mname);
            }
            if(typeof(data2.email) != 'undefined'){
              (<FormControl>this.dataForm.controls['email']).setValue(data2.email);
            }
            if(typeof(data2.phone) != 'undefined'){
              (<FormControl>this.dataForm.controls['phone']).setValue(data2.phone);
            }
            if(typeof(data2.fax) != 'undefined'){
              (<FormControl>this.dataForm.controls['fax']).setValue(data2.fax);
            }
            if(typeof(data2.dob) != 'undefined'){
              (<FormControl>this.dataForm.controls['dob']).setValue(data2.dob);
            }
            if(typeof(data2.social_security) != 'undefined'){
              (<FormControl>this.dataForm.controls['social_security']).setValue(data2.social_security);
            }
            if(typeof(data2.mother_maiden_name) != 'undefined'){
              (<FormControl>this.dataForm.controls['mother_maiden_name']).setValue(data2.mother_maiden_name);
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
    this.navCtrl.push(FinancingPage);
  }

  gotoskip(){
    this.navCtrl.push(Financing3Page);
  }

  gotonext(formaval){

    if(this.dataForm.valid){

      var link = this.adminUrl+'updatecustomerformobile';
      var formdata1 = {fname : formaval.fname,lname:formaval.lname,mname : formaval.mname,email : formaval.email,phone : formaval.phone,fax :formaval.fax,dob : formaval.dob,social_security : formaval.social_security,mother_maiden_name : formaval.mother_maiden_name}
      var formdata = {arg:formdata1,username:this.username};

      this._http.post(link,formdata)
          .subscribe(data => {
            this.navCtrl.push(Financing3Page);
          }, error => {
            let toast = this.toastCtrl.create({
              message: 'Database error occurred. Try again!',
              duration: 2000
            });
            toast.present();
          });



    }else{
      var errortxt;
      if(this.dataForm.controls['fname'].hasError('required')){
        errortxt = 'First name is required';
      }else if(this.dataForm.controls['lname'].hasError('required')){
        errortxt = 'Last name is required';
      }else if(this.dataForm.controls['email'].hasError('required')){
        errortxt = 'Email address is required';
      }else if(this.dataForm.controls['phone'].hasError('required')){
        errortxt = 'Phone no is required';
      }else if(this.dataForm.controls['dob'].hasError('required')){
        errortxt = 'Date of Birth is required';
      }else if(this.dataForm.controls['social_security'].hasError('required')){
        errortxt = 'Social security is required';
      }

      let toast = this.toastCtrl.create({
        message: errortxt,
        duration: 2000
      });
      toast.present();
    }

  }

}
