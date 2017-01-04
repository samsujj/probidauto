import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController,ModalController } from 'ionic-angular';
import {MessageAddPage} from '../messageadd/messageadd';
import {MessageDetailsPage} from '../messagedetails/messagedetails';


@Component({
  selector: 'page-messagedealer',
  templateUrl: 'messagedealer.html'
})
export class MessageDealerPage {

  public messageaddpage = MessageAddPage;


  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController,public modalCtrl: ModalController) {

  }

  goDetails(){
    let modal = this.modalCtrl.create(MessageDetailsPage);
    modal.present();
  }

}
