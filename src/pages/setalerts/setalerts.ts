import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';


@Component({
  selector: 'page-setalerts',
  templateUrl: 'setalerts.html'
})
export class SetAlertsPage {

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController) {

  }


}
