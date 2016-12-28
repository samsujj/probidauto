import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomePage} from '../home/home';
import {DashboardPage} from '../dashboard/dashboard';

import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-blank',
  templateUrl: 'blank.html'
})
export class BlankPage {

  constructor(public navCtrl: NavController, public storage: Storage) {


  }

  ionViewDidEnter(){
    this.storage.get('userdetails').then((value) => {
      if(value!=null) {

        this.navCtrl.push(DashboardPage);
      }else{
        this.navCtrl.push(HomePage);
      }
    });
  }


}
