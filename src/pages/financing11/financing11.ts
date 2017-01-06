import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {BlankPage} from '../blank/blank';
import {Financing10Page} from '../financing10/financing10';
import {DashboardPage} from '../dashboard/dashboard';


@Component({
  selector: 'page-financing11',
  templateUrl: 'financing11.html'
})
export class Financing11Page {

  public adminUrl = 'http://influxiq.com:8003/';
  public dataForm:FormGroup;

  public userdetails;
  public username;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController,private _http: Http, public storage: Storage,public fb: FormBuilder) {
    this.storage.get('userdetails').then((value) => {
      if(value!=null) {
        this.userdetails = value;
        this.username = value.username;
      }else{
        this.navCtrl.push(BlankPage);
      }
    });

    this.dataForm = fb.group({
      policy: ['By clicking the button below, you certify that all of the statements in this application are true and complete and are made for the purpose of obtaining credit.  You authorize this website to share the application and related information withs its lending partners in order to complete the processing of this application.  You authorize this website and its lending partners to retain and rely on this application, and obtain additional information, including credit reports.']
    });
  }

  ionViewDidEnter() {
    this.storage.get('userdetails').then((value) => {
      if(value!=null) {
        this.userdetails = value;
        this.username = value.username;
        this.getUserdetails();
      }else{
        this.navCtrl.push(BlankPage);
      }
    });
  }

  getUserdetails(){
    var link = this.adminUrl+'editdcustomerbyusername';
    var formdata = {username:this.username};

    this._http.post(link,formdata)
        .subscribe(data => {
          var data2 = data.json();
          if(data2.length){
            data2 = data2[0];

            this.userdetails = data2;

            if(typeof(data2.other_monthly_income) != 'undefined'){
              (<FormControl>this.dataForm.controls['other_monthly_income']).setValue(data2.other_monthly_income);
            }


          }


        }, error => {
          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });

  }

  gotoprev(){
    this.navCtrl.push(Financing10Page);
  }


  gotoskip(){
    this.navCtrl.push(DashboardPage);
  }
}
