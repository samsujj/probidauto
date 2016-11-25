import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-popover',
  template: `
            <div class="contact-div">
            <h2>Contact info</h2>
                <div class="sub-div"><span>Email : </span>{{email}}</div>            
                <div class="sub-div"><span>Phone : </span>{{phone}}</div>            
                <div class="sub-div"><span>Website : </span>{{website}}</div>            
            </div>
`
})
export class PopoverConatctPage {

  public email;
  public phone;
  public website;

  private dealerdetails;

  constructor(public navCtrl: NavController,public params: NavParams) {
    this.dealerdetails = this.params.get('dealerdetails');

    this.email = this.dealerdetails.email;
    this.phone = this.dealerdetails.phone;
    this.website = this.dealerdetails.websiteurl;
  }

}
