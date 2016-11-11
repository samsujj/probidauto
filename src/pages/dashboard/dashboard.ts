import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import {PopoverLocationPage} from '../popoverlocation/popoverlocation';
import {PopoverProfilePage} from '../popoverprofile/popoverprofile';
import {PopoverConatctPage} from '../popovercontact/popovercontact';


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  mySlideOptions = {
    initialSlide: 0,
    pager : true
  };

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController) {

  }

  showContact(){
    let popover = this.popoverCtrl.create(PopoverConatctPage);

    popover.present();

  }
  showProfile(){
    let popover = this.popoverCtrl.create(PopoverProfilePage);

    popover.present();

  }
  showLocation(){
    let popover = this.popoverCtrl.create(PopoverLocationPage);

    popover.present();

  }


}
