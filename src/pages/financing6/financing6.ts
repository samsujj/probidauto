import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {Financing7Page} from '../financing7/financing7';

@Component({
  selector: 'page-financing6',
  templateUrl: 'financing6.html'
})
export class Financing6Page {

  mySlideOptions = {
    initialSlide: 0,
    pager : true
  };

  constructor(public navCtrl: NavController) {

  }
  gotoskip(){
    this.navCtrl.push(Financing7Page);
  }

}
