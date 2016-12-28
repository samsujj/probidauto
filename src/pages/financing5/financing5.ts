import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {Financing6Page} from '../financing6/financing6';

@Component({
  selector: 'page-financing5',
  templateUrl: 'financing5.html'
})
export class Financing5Page {

  mySlideOptions = {
    initialSlide: 0,
    pager : true
  };

  constructor(public navCtrl: NavController) {

  }

  gotoskip(){
    this.navCtrl.push(Financing6Page);
  }
}
