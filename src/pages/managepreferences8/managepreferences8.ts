import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import {ManagePreferences7Page} from '../managepreferences7/managepreferences7';
import {ManagePreferences9Page} from '../managepreferences9/managepreferences9';


@Component({
  selector: 'page-managepreferences8',
  templateUrl: 'managepreferences8.html'
})
export class ManagePreferences8Page {

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController) {

  }

  gotoprev(){
    this.navCtrl.push(ManagePreferences7Page);
  }

  gotonext(){
    this.navCtrl.push(ManagePreferences9Page);
  }

}
