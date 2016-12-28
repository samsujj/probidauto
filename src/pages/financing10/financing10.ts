import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {Financing11Page} from '../financing11/financing11';

@Component({
  selector: 'page-financing10',
  templateUrl: 'financing10.html'
})
export class Financing10Page {

  mySlideOptions = {
    initialSlide: 0,
    pager : true
  };

  constructor(public navCtrl: NavController) {

  }
  gotoskip(){
    this.navCtrl.push(Financing11Page);
  }

}
