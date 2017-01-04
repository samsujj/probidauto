import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {BlankPage} from '../blank/blank';
import {Financing2Page} from '../financing2/financing2';

@Component({
  selector: 'page-financing',
  templateUrl: 'financing.html'
})
export class FinancingPage {

  public adminUrl = 'http://influxiq.com:8003/';

  public userdetails;
  public username;
  public dealerusername;
  public dealerdetails;



  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController,private _http: Http, public storage: Storage) {
    this.storage.get('userdetails').then((value) => {
      if(value!=null) {
        this.userdetails = value;
        this.username = value.username;
      }else{
        this.navCtrl.push(BlankPage);
      }
    });
  }

  ionViewDidEnter() {
    this.storage.get('userdetails').then((value) => {
      if(value!=null) {
        this.userdetails = value;
        this.username = value.username;
        this.dealerusername = value.dealerusername;
        this.getDealerDetails();
      }else{
        this.navCtrl.push(BlankPage);
      }
    });

  }

  getDealerDetails(){
    var link = this.adminUrl+'editdealerbyusername';
    var data = {'username':this.dealerusername};

    this._http.post(link, data)
        .subscribe(data => {

          let data2 = data.json();

          this.dealerdetails = data2[0];

        }, error => {
          console.log('error');
          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });
  }


  gotoskip(){
    this.navCtrl.push(Financing2Page);
  }


}
