import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import {ManagePreferences8Page} from '../managepreferences8/managepreferences8';
import {ManagePreferences10Page} from '../managepreferences10/managepreferences10';


@Component({
  selector: 'page-managepreferences9',
  templateUrl: 'managepreferences9.html'
})
export class ManagePreferences9Page {

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController) {

  }

  gotoprev(){
    this.navCtrl.push(ManagePreferences8Page);
  }

  gotonext(){
    this.navCtrl.push(ManagePreferences10Page);
  }

}
