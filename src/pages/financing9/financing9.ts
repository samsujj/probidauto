import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {Financing10Page} from '../financing10/financing10';

@Component({
  selector: 'page-financing9',
  templateUrl: 'financing9.html'
})
export class Financing9Page {

  mySlideOptions = {
    initialSlide: 0,
    pager : true
  };

  constructor(public navCtrl: NavController) {

  }

  gotoskip(){
    this.navCtrl.push(Financing10Page);
  }
}
