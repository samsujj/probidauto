import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import {ManagePreferences3Page} from '../managepreferences3/managepreferences3';
import {ManagePreferences5Page} from '../managepreferences5/managepreferences5';


@Component({
  selector: 'page-managepreferences4',
  templateUrl: 'managepreferences4.html'
})
export class ManagePreferences4Page {

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController) {

  }

  gotoprev(){
    this.navCtrl.push(ManagePreferences3Page);
  }

  gotonext(){
    this.navCtrl.push(ManagePreferences5Page);
  }

}
