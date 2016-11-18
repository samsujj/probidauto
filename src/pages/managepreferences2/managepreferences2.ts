import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';


@Component({
  selector: 'page-managepreferences2',
  templateUrl: 'managepreferences2.html'
})
export class ManagePreferences2Page {

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController) {

  }

}
