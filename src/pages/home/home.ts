import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {Splashscreen} from 'ionic-native';
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  mySlideOptions = {
    initialSlide: 0,
    pager : true
  };

  public loginpage = LoginPage;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidEnter() {

    if (Splashscreen) {
      setTimeout(() => {
        Splashscreen.hide();
      }, 100);
    }

  }

}
