import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {Financing8Page} from '../financing8/financing8';

@Component({
  selector: 'page-financing7',
  templateUrl: 'financing7.html'
})
export class Financing7Page {

  mySlideOptions = {
    initialSlide: 0,
    pager : true
  };

  constructor(public navCtrl: NavController) {

  }

  gotoskip(){
    this.navCtrl.push(Financing8Page);
  }
}
