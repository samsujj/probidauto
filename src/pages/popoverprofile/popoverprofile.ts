import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-popover',
  template: `
            <div class="contact-div">
                <h2>About Preferred Auction Company</h2>
                <p>Lorem Ipsum dolor sit met, consectetuer aqipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
            </div>
  `
})
export class PopoverProfilePage {
  constructor(public navCtrl: NavController) {

  }

}
