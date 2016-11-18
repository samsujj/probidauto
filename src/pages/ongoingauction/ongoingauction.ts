import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';


@Component({
  selector: 'page-ongoingauction',
  templateUrl: 'ongoingauction.html'
})
export class OnGoingauctionPage {

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController) {

  }

}
