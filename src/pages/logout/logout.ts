import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomePage} from '../home/home';

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogOutPage {
  constructor(public navCtrl: NavController) {

  }

  ngOnInit(){
    console.log('Logout');
    this.navCtrl.push(HomePage);
  }



}
