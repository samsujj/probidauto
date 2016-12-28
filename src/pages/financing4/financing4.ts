import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {Financing5Page} from '../financing5/financing5';

@Component({
  selector: 'page-financing4',
  templateUrl: 'financing4.html'
})
export class Financing4Page {

  mySlideOptions = {
    initialSlide: 0,
    pager : true
  };

  constructor(public navCtrl: NavController) {

  }

  gotoskip(){
    this.navCtrl.push(Financing5Page);
  }
}
