import { Component,ViewChild } from '@angular/core';
import { NavController,ToastController,PopoverController,Slides,NavParams } from 'ionic-angular';
import {Http} from "@angular/http";
//import {DomSanitizer} from "@angular/platform-browser";
import {DomSanitizer} from "@angular/platform-browser";
import {SafeStyle} from "@angular/platform-browser/src/security/dom_sanitization_service";


@Component({
  selector: 'page-inventorydetails',
  templateUrl: 'inventorydetails.html'
})
export class InventoryDetailsPage {
  @ViewChild('mySlider') slider: Slides;

  public adminUrl = 'http://influxiq.com:8003/';

  public participate;
  public isFirst;
  public isLast;

  public inventorymatcharr;
  public slideIndex;
  public filesrc;


  public auctionlist;
  public carlogolistarr;
  public colorlist;
  public carbodystylelistarr;
  public carautoyearlistarr;
  public listcarautomileage;

  mySlideOptions = {
    loop: true,
    pager:true
  };

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController,public navparam: NavParams,private _http: Http, private sanitizer:DomSanitizer) {

      this.slideIndex = 0;
      this.inventorymatcharr = this.navparam.get('inventorymatcharr');
      console.log(this.inventorymatcharr);
      this.slideIndex = this.navparam.get('index');



      this.filesrc = 'http://probidbackend.influxiq.com/uploadedfiles/sharelinks/';

      this.isFirst = true;
      this.isLast = false;

      this._http.get(this.adminUrl+'auctionlist')
          .subscribe(data => {
              this.auctionlist=data.json();
          }, error => {
              console.log("Oooops!");
          });

      this._http.get(this.adminUrl+'carlogolist')
          .subscribe(data => {
              this.carlogolistarr=data.json();
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
              this.carbodystylelistarr=data.json();
          }, error => {
              console.log("Oooops!");
          });
      this._http.get(this.adminUrl+'carautoyearlist')
          .subscribe(data => {
              this.carautoyearlistarr=data.json();
          }, error => {
              console.log("Oooops!");
          });
      this._http.get(this.adminUrl+'listcarautomileage')
          .subscribe(data => {
              this.listcarautomileage=data.json();
          }, error => {
              console.log("Oooops!");
          });

  }



  prevSlide(){
    this.slider.slidePrev(1000);
  }

  nextSlide(){
    this.slider.slideNext(1000);
  }

  onSlideChanged() {
    let slengh = this.slider.length();
    let currentIndex = this.slider.getActiveIndex();

    if(currentIndex == 0){
      this.isFirst = true;
    }else{
      this.isFirst = false;
    }

    if(currentIndex == (slengh-1)){
      this.isLast = true;
    }else{
      this.isLast = false;
    }

  }

  getbodystyle(item){
          var carbodystlename = 'N/A';

          var p:any;
          for(p in this.carbodystylelistarr){
              if(this.carbodystylelistarr[p]._id==item.carbodystylelist) {
                  carbodystlename = this.carbodystylelistarr[p].name;
              }
          }
          return carbodystlename;
  }

  getcarlogo(val:any){
    var x:any;
    for(x in this.carlogolistarr){
      if(this.carlogolistarr[x]._id==val.carlogolist) return this.carlogolistarr[x].name;
    }
    return 'N/A';
  }

  getcolor(val:any){
    var a:any;
    for(a in this.colorlist){
      if(this.colorlist[a]._id==val.color) return this.colorlist[a].color;
    }
    return 'N/A';
  }

  getcaryear(val:any){
    var y:any;
    for(y in this.carautoyearlistarr){
      if(this.carautoyearlistarr[y]._id==val.carautoyearlist) return this.carautoyearlistarr[y].year;
    }
    return 'N/A';
  }

    sdfdsfsd(val:any){
        //return '{width:'+val+'%}';
        var sdsddsf:any = val+'%';

        return this.sanitizer.bypassSecurityTrustStyle(sdsddsf);
    }

}
