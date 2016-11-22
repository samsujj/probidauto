import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import {ManagePreferences10Page} from '../managepreferences10/managepreferences10';
import {DashboardPage} from '../dashboard/dashboard';


@Component({
  selector: 'page-managepreferences11',
  templateUrl: 'managepreferences11.html'
})
export class ManagePreferences11Page {

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController) {

  }

  gotoprev(){
    this.navCtrl.push(ManagePreferences10Page);
  }

  gotonext(){
    this.navCtrl.push(DashboardPage);
  }

}
