import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { NavController , ToastController} from 'ionic-angular';
import {DashboardPage} from '../dashboard/dashboard';
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  mySlideOptions = {
    initialSlide: 0,
    pager : true
  };

  public loginForm:FormGroup;

  constructor(public navCtrl: NavController,public fb: FormBuilder, public storage: Storage,private _http: Http,public toastCtrl: ToastController) {

    this.loginForm = fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });

      this.storage.get('userdetails').then((value) => {
          if(value!=null) {
              this.navCtrl.push(DashboardPage);
          }
      });

  }

  formsubmit(formaval){


    if(this.loginForm.valid){
//        var headers = new Headers();
//        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        var link = 'http://influxiq.com:8001/customercheckformobile?username='+formaval.username+'&password='+formaval.password;

        this._http.get(link)
            .subscribe(data => {

                let data2 = data.json();

                if(data2.length){
                    this.storage.set('userdetails',data2[0]);

                    this.navCtrl.push(DashboardPage);
                }else{
                    let toast = this.toastCtrl.create({
                        message: 'Your information is incorrect. Try again!',
                        duration: 2000
                    });
                    toast.present();
                }


            }, error => {
                console.log('error');
                let toast = this.toastCtrl.create({
                    message: 'Database error occurred. Try again!',
                    duration: 2000
                });
                toast.present();
            });

    }else{
      var errortxt;
      if(this.loginForm.controls['username'].hasError('required')){
        errortxt = 'Username is required';
      }else if(this.loginForm.controls['password'].hasError('required')){
        errortxt = 'Password is required';
      }

      let toast = this.toastCtrl.create({
        message: errortxt,
        duration: 2000
      });
      toast.present();

    }


  }



}
