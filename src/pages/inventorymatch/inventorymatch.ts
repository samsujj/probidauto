import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import {InventoryDetailsPage} from '../inventorydetails/inventorydetails';


@Component({
  selector: 'page-inventorymatch',
  templateUrl: 'inventorymatch.html'
})
export class InventoryMatchPage {

public inventorydetailspage = InventoryDetailsPage;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController) {

  }

}
