import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {DashboardPage} from '../dashboard/dashboard';


@Component({
  selector: 'page-financing11',
  templateUrl: 'financing11.html'
})
export class Financing11Page {

  mySlideOptions = {
    initialSlide: 0,
    pager : true
  };

  constructor(public navCtrl: NavController) {

  }

  gotoskip(){
    this.navCtrl.push(DashboardPage);
  }
}
