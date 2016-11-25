import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-popover',
  template: `
            <div class="contact-div">
            <h2>Location</h2>
                <div class="sub-div">{{address1}}</div>            
                <div class="sub-div">{{address2}}</div>            
            </div>`
})
export class PopoverLocationPage {

  public address1;
  public address2;

  public dealerdetails;

  constructor(public navCtrl: NavController,public params: NavParams) {

    this.dealerdetails = this.params.get('dealerdetails');

    this.address1 = this.dealerdetails.address;
    this.address2 = this.dealerdetails.city + ', '+ this.dealerdetails.state+' - '+this.dealerdetails.zip;
  }

}
