import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { NavController , ToastController} from 'ionic-angular';
import {DashboardPage} from '../dashboard/dashboard';
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  mySlideOptions = {
    initialSlide: 0,
    pager : true
  };

  public loginForm:FormGroup;

  constructor(public navCtrl: NavController,public fb: FormBuilder, public storage: Storage,private _http: Http,public toastCtrl: ToastController) {

    this.loginForm = fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  formsubmit(formaval){

//    this.navCtrl.push(DashboardPage);



    if(this.loginForm.valid){
      console.log(formaval);
    }else{
      var errortxt;
      if(this.loginForm.controls['username'].hasError('required')){
        errortxt = 'Username is required';
      }else if(this.loginForm.controls['password'].hasError('required')){
        errortxt = 'Password is required';
      }

      let toast = this.toastCtrl.create({
        message: errortxt,
        duration: 2000
      });
      toast.present();

    }


  }



}
