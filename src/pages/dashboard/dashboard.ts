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
import {RecentRsvpPage} from '../recentrsvp/recentrsvp';
import {BlankPage} from '../blank/blank';

import { Storage } from '@ionic/storage';
import {Http} from "@angular/http";


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  public adminUrl = 'http://influxiq.com:8003/';

  mySlideOptions = {
    initialSlide: 0,
    pager : true
  };

  public userdetails;
  public userid;
  public dealerusername;

  public dealerdetails;

  public visitdealerpage = VisitDealerPage;
  public upcomeinventorypage = UpcomeInventoryPage;
  public setalertspage = SetAlertsPage;
  public ongoingauctionpage = OnGoingauctionPage;
  public messagedealerpage = MessageDealerPage;
  public managepreferencespage = ManagePreferencesPage;
  public inventorymatchpage = InventoryMatchPage;
  public recentrsvppage = RecentRsvpPage;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController, public storage: Storage,private _http: Http) {



    this.storage.get('userdetails').then((value) => {
      if(value!=null) {
        this.userdetails = value;
        this.userid = value._id;
        this.dealerusername = value.dealerusername;
        console.log(this.userdetails);
        this.getDealerDetails();
      }else{
        this.navCtrl.push(BlankPage);
      }
    });

  }

  showContact(){
    let popover = this.popoverCtrl.create(PopoverConatctPage,{dealerdetails: this.dealerdetails});

    popover.present();

  }
  showProfile(){
    let popover = this.popoverCtrl.create(PopoverProfilePage,{dealerdetails: this.dealerdetails});

    popover.present();

  }
  showLocation(){
    let popover = this.popoverCtrl.create(PopoverLocationPage,{dealerdetails: this.dealerdetails});

    popover.present();

  }

  getDealerDetails(){

    console.log(this.dealerusername);

    var link = this.adminUrl+'editdealerbyusername';
    var data = {'username':this.dealerusername};

    this._http.post(link, data)
        .subscribe(data => {

          let data2 = data.json();

          this.dealerdetails = data2[0];

          console.log(this.dealerdetails);

        }, error => {
          console.log('error');
          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });
  }


}
