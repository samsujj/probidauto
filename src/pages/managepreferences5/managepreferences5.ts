import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import {ManagePreferences4Page} from '../managepreferences4/managepreferences4';
import {ManagePreferences6Page} from '../managepreferences6/managepreferences6';


@Component({
  selector: 'page-managepreferences5',
  templateUrl: 'managepreferences5.html'
})
export class ManagePreferences5Page {

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController) {

  }

  gotoprev(){
    this.navCtrl.push(ManagePreferences4Page);
  }

  gotonext(){
    this.navCtrl.push(ManagePreferences6Page);
  }

}
