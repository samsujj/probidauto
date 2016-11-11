import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-popover',
  template: `
            <div class="contact-div">
            <h2>Contact info</h2>
                <div class="sub-div"><span>Email : </span>John.doe@example.com</div>            
                <div class="sub-div"><span>Phone : </span>+62 857 123 4567</div>            
                <div class="sub-div"><span>Website : </span>http://abcd.com</div>            
            </div>
`
})
export class PopoverConatctPage {
  constructor(public navCtrl: NavController) {

  }

}
