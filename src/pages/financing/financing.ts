import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

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


}
