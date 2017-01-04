import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import {MessageAddPage} from '../messageadd/messageadd';


@Component({
  selector: 'page-messagedetails',
  templateUrl: 'messagedetails.html'
})
export class MessageDetailsPage {

  public messageaddpage=MessageAddPage;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController) {

  }

  goback(){
    this.navCtrl.pop();
  }

}
