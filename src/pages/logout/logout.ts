import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {HomePage} from '../home/home';

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogOutPage {
  constructor(public navCtrl: NavController, public storage: Storage) {

  }

  ngOnInit(){
    this.storage.remove('userdetails');
    this.navCtrl.push(HomePage);
  }



}
