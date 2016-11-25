import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-popover',
  template: `
            <div class="contact-div">
                <h2>About {{companyname}}</h2>
                <p>{{description}}</p>
            </div>
  `
})
export class PopoverProfilePage {

  private dealerdetails;

  public companyname;
  public description;

  constructor(public navCtrl: NavController,public params: NavParams) {
    this.dealerdetails = this.params.get('dealerdetails');

    this.companyname = this.dealerdetails.fname+' '+this.dealerdetails.lname;
    this.description = this.dealerdetails.description;
  }

}
