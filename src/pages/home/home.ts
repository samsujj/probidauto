import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {Splashscreen} from 'ionic-native';
import {LoginPage} from '../login/login';

import { Storage } from '@ionic/storage';


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
    this.storage.get('name').then((name) => {
      this.stvalue = 'null';
      if(name!=null) {
        this.stvalue = name;
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
