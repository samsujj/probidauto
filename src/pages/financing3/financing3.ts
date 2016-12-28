import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {Financing4Page} from '../financing4/financing4';

@Component({
  selector: 'page-financing3',
  templateUrl: 'financing3.html'
})
export class Financing3Page {

  mySlideOptions = {
    initialSlide: 0,
    pager : true
  };

  constructor(public navCtrl: NavController) {

  }
  gotoskip(){
    this.navCtrl.push(Financing4Page);
  }

}
