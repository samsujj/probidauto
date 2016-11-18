import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';


@Component({
  selector: 'page-upcomeinventory',
  templateUrl: 'upcomeinventory.html'
})
export class UpcomeInventoryPage {

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController) {

  }


}
