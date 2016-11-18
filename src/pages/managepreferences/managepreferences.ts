import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import {ManagePreferences2Page} from '../managepreferences2/managepreferences2';


@Component({
  selector: 'page-managepreferences',
  templateUrl: 'managepreferences.html'
})
export class ManagePreferencesPage {


  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController) {

  }

  gotonext(){
    this.navCtrl.push(ManagePreferences2Page);
  }

}
