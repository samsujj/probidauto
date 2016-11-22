import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import {ManagePreferences9Page} from '../managepreferences9/managepreferences9';
import {ManagePreferences11Page} from '../managepreferences11/managepreferences11';


@Component({
  selector: 'page-managepreferences10',
  templateUrl: 'managepreferences10.html'
})
export class ManagePreferences10Page {

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController) {

  }

  gotoprev(){
    this.navCtrl.push(ManagePreferences9Page);
  }

  gotonext(){
    this.navCtrl.push(ManagePreferences11Page);
  }

}
