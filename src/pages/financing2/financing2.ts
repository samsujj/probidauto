import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {Financing3Page} from '../financing3/financing3';

@Component({
  selector: 'page-financing2',
  templateUrl: 'financing2.html'
})
export class Financing2Page {

  mySlideOptions = {
    initialSlide: 0,
    pager : true
  };

  constructor(public navCtrl: NavController) {

  }

  gotoskip(){
    this.navCtrl.push(Financing3Page);
  }
}
