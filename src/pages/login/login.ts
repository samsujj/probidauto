import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { NavController } from 'ionic-angular';
import {DashboardPage} from '../dashboard/dashboard';

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

  constructor(public navCtrl: NavController,public fb: FormBuilder) {
    this.loginForm = fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  formsubmit(formaval){
    this.navCtrl.push(DashboardPage);
  }



}
