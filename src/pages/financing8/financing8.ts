import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {Financing9Page} from '../financing9/financing9';

@Component({
  selector: 'page-financing8',
  templateUrl: 'financing8.html'
})
export class Financing8Page {

  mySlideOptions = {
    initialSlide: 0,
    pager : true
  };

  constructor(public navCtrl: NavController) {

  }

  gotoskip(){
    this.navCtrl.push(Financing9Page);
  }
}
