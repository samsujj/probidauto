import { Component } from '@angular/core';
import { NavController,ToastController,PopoverController,NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {BlankPage} from '../blank/blank';
import {Http} from "@angular/http";


@Component({
  selector: 'page-auctiondetails',
  templateUrl: 'auctiondetails.html'
})
export class AuctionDetailsPage {

  public adminUrl = 'http://influxiq.com:8003/';

  public maxbid;
  public maxbidamount;
  public inventoryid;
  public filesrc;
  public auctionlist;
  public carlogolist;
  public colorlist;
  public carbodystylelist;
  public carautoyearlist;
  public carmileagelist;
  public userdetails;
  public username;
  public details;
  public uploadedfilesrc1;
  public doctype;
  public est_retail_value;
  public vin;
  public color;
  public drive;
  public cylinder;
  public fuel;
  public notes;
  public model;
  public mileage;
  public enginetype;
  public power_locks;
  public power_window;
  public sunroof;
  public stereo_system;
  public bluetooth;
  public dvd_player;
  public airbags;
  public seats;
  public satellite_radio;
  public gps;
  public lights;
  public gear_type;
  public trinted_window;
  public digital_display;
  public auctionid;
  public uploadedadditionalfilearr;

  constructor(public navCtrl: NavController,public navparam: NavParams,public toastCtrl: ToastController,public popoverCtrl: PopoverController,private _http: Http, public storage: Storage) {
    this.maxbid = 'Not Set Yet';
    this.inventoryid = this.navparam.get('inventoryid');

    this.filesrc = 'http://probidbackend.influxiq.com/uploadedfiles/sharelinks/';

    this._http.get(this.adminUrl+'auctionlist')
        .subscribe(data => {
          this.auctionlist=data.json();
        }, error => {
          console.log("Oooops!");
        });

    this._http.get(this.adminUrl+'carlogolist')
        .subscribe(data => {
          this.carlogolist=data.json();
        }, error => {
          console.log("Oooops!");
        });
    this._http.get(this.adminUrl+'colorlist')
        .subscribe(data => {
          this.colorlist=data.json();
        }, error => {
          console.log("Oooops!");
        });
    this._http.get(this.adminUrl+'carbodystylelist')
        .subscribe(data => {
          this.carbodystylelist=data.json();
        }, error => {
          console.log("Oooops!");
        });
    this._http.get(this.adminUrl+'carautoyearlist')
        .subscribe(data => {
          this.carautoyearlist=data.json();
        }, error => {
          console.log("Oooops!");
        });
    this._http.get(this.adminUrl+'listcarautomileage')
        .subscribe(data => {
          this.carmileagelist=data.json();
        }, error => {
          console.log("Oooops!");
        });


    let ids={id:this.inventoryid};
    this._http.post(this.adminUrl+'getcarbyid',ids)
        .subscribe(data => {
          this.details=data.json()[0];

          this.uploadedfilesrc1 = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + this.details.filename;

          this.filesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";

          this.doctype=this.details.doctype;
          this.est_retail_value=this.details.est_retail_value;
          this.vin=this.details.vin;
          this.color=this.details.color;
          this.drive=this.details.drive;
          this.cylinder=this.details.cylinder;
          this.fuel=this.details.fuel;
          this.notes=this.details.notes;
          this.carlogolist=this.details.carlogolist;
          this.model=this.details.model;
          this.carautoyearlist=this.details.carautoyearlist;
          this.mileage=this.details.mileage;
          this.enginetype=this.details.enginetype;
          this.carbodystylelist=this.details.carbodystylelist;
          this.power_locks=this.details.power_locks;
          this.power_window=this.details.power_window;
          this.power_locks=this.details.power_locks;
          this.sunroof=this.details.sunroof;
          this.stereo_system=this.details.stereo_system;
          this.bluetooth=this.details.bluetooth;
          this.dvd_player=this.details.dvd_player;
          this.airbags=this.details.airbags;
          this.seats=this.details.seats;
          this.satellite_radio=this.details.satellite_radio;
          this.gps=this.details.gps;
          this.lights=this.details.lights;
          this.gear_type=this.details.gear_type;
          this.trinted_window=this.details.trinted_window;
          this.digital_display=this.details.digital_display;
          this.auctionid=this.details.auctionid[0];

          //  console.log(this.details.additionalfilename);
          var x:any;
          for(x in this.details.additionalfilename){
            //   console.log(this.details.additionalfilename[x]);
            this.uploadedadditionalfilearr.push("http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" +this.details.additionalfilename[x]);
          }
          //  console.log('Image List');

          // console.log(this.uploadedadditionalfilearr);

        }, error => {
          console.log("Oooops!");
        });



    this.storage.get('userdetails').then((value) => {
      if(value!=null) {
        this.userdetails = value;
        this.username = value.username;
      }else{
        this.navCtrl.push(BlankPage);
      }
    });
  }


  getauction(val:any,type:any){
    var p:any;
    for(p in this.auctionlist){
      if(this.auctionlist[p]._id==val)
        if(type=='name')
          return this.auctionlist[p].name;
      if(type=='auctiondate')
      //  return 11;
        return this.auctionlist[p].auction_date;
      if(type=='image')
        return "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/"+this.auctionlist[p].filename;
    }
    // return 'N/A';
  }

  setmaxbid() {
    this.maxbid = '$'+this.maxbidamount;
    let toast = this.toastCtrl.create({
      message: 'Set max bid successfully.',
      duration: 3000,
      position: 'middle',
      cssClass: 'commitMsg'
    });
    toast.present();
  }

  cngMaxbid(ev){
    this.maxbidamount = ev.target.value;
  }

}
