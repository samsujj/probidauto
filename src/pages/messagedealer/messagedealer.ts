import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';


@Component({
  selector: 'page-messagedealer',
  templateUrl: 'messagedealer.html'
})
export class MessageDealerPage {

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController) {

  }

}
