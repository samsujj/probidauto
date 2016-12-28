import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {Financing2Page} from '../financing2/financing2';

@Component({
  selector: 'page-financing',
  templateUrl: 'financing.html'
})
export class FinancingPage {

  mySlideOptions = {
    initialSlide: 0,
    pager : true
  };

  constructor(public navCtrl: NavController) {

  }

  gotoskip(){
    this.navCtrl.push(Financing2Page);
  }


}
