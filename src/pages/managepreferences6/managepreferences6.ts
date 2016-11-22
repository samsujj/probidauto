import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import {ManagePreferences5Page} from '../managepreferences5/managepreferences5';
import {ManagePreferences7Page} from '../managepreferences7/managepreferences7';


@Component({
  selector: 'page-managepreferences6',
  templateUrl: 'managepreferences6.html'
})
export class ManagePreferences6Page {

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController) {

  }

  gotoprev(){
    this.navCtrl.push(ManagePreferences5Page);
  }

  gotonext(){
    this.navCtrl.push(ManagePreferences7Page);
  }

}
