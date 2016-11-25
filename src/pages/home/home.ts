import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import {Splashscreen} from 'ionic-native';
import {LoginPage} from '../login/login';
import {DashboardPage} from '../dashboard/dashboard';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  mySlideOptions = {
    initialSlide: 0,
    pager : true
  };

  public stvalue;

  public loginpage = LoginPage;

  constructor(public navCtrl: NavController, public storage: Storage) {
    this.storage.get('userdetails').then((value) => {
      if(value!=null) {
        this.navCtrl.push(DashboardPage);
      }
    });
  }

  ionViewDidEnter() {

    if (Splashscreen) {
      setTimeout(() => {
        Splashscreen.hide();
      }, 100);
    }

  }

}
