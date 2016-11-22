import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';


@Component({
  selector: 'page-inventorydetails',
  templateUrl: 'inventorydetails.html'
})
export class InventoryDetailsPage {

  public participate;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController) {

  }

}
