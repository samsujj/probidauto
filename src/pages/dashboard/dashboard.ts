import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import {PopoverLocationPage} from '../popoverlocation/popoverlocation';
import {PopoverProfilePage} from '../popoverprofile/popoverprofile';
import {PopoverConatctPage} from '../popovercontact/popovercontact';
import {VisitDealerPage} from '../visitdealer/visitdealer';
import {UpcomeInventoryPage} from '../upcomeinventory/upcomeinventory';
import {SetAlertsPage} from '../setalerts/setalerts';
import {OnGoingauctionPage} from '../ongoingauction/ongoingauction';
import {MessageDealerPage} from '../messagedealer/messagedealer';
import {ManagePreferencesPage} from '../managepreferences/managepreferences';
import {InventoryMatchPage} from '../inventorymatch/inventorymatch';


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  mySlideOptions = {
    initialSlide: 0,
    pager : true
  };

  public visitdealerpage = VisitDealerPage;
  public upcomeinventorypage = UpcomeInventoryPage;
  public setalertspage = SetAlertsPage;
  public ongoingauctionpage = OnGoingauctionPage;
  public messagedealerpage = MessageDealerPage;
  public managepreferencespage = ManagePreferencesPage;
  public inventorymatchpage = InventoryMatchPage;

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
