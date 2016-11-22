import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import {ManagePreferences6Page} from '../managepreferences6/managepreferences6';
import {ManagePreferences8Page} from '../managepreferences8/managepreferences8';


@Component({
  selector: 'page-managepreferences7',
  templateUrl: 'managepreferences7.html'
})
export class ManagePreferences7Page {

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController) {

  }

  gotoprev(){
    this.navCtrl.push(ManagePreferences6Page);
  }

  gotonext(){
    this.navCtrl.push(ManagePreferences8Page);
  }

}
