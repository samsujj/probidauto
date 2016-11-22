import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import {ManagePreferencesPage} from '../managepreferences/managepreferences';
import {ManagePreferences3Page} from '../managepreferences3/managepreferences3';


@Component({
  selector: 'page-managepreferences2',
  templateUrl: 'managepreferences2.html'
})
export class ManagePreferences2Page {

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController) {

  }

  gotoprev(){
    this.navCtrl.push(ManagePreferencesPage);
  }

  gotonext(){
    this.navCtrl.push(ManagePreferences3Page);
  }

}
