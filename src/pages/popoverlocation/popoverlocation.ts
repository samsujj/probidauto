import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-popover',
  template: `
            <div class="contact-div">
            <h2>Location</h2>
                <div class="sub-div">1755 Blake St., Suite #450</div>            
                <div class="sub-div">Denver, Colorado 80202</div>            
            </div>`
})
export class PopoverLocationPage {
  constructor(public navCtrl: NavController) {

  }

}
