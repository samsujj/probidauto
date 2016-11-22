import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import {ManagePreferences2Page} from '../managepreferences2/managepreferences2';
import {ManagePreferences4Page} from '../managepreferences4/managepreferences4';


@Component({
  selector: 'page-managepreferences3',
  templateUrl: 'managepreferences3.html'
})
export class ManagePreferences3Page {

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController) {

  }

  gotoprev(){
    this.navCtrl.push(ManagePreferences2Page);
  }

  gotonext(){
    this.navCtrl.push(ManagePreferences4Page);
  }

}
