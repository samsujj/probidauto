import { Component,ViewChild } from '@angular/core';
import { NavController,ToastController,PopoverController,Slides } from 'ionic-angular';
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {BlankPage} from '../blank/blank';
import {InventoryDetailsPage} from '../inventorydetails/inventorydetails';


@Component({
  selector: 'page-inventorymatch',
  templateUrl: 'inventorymatch.html'
})
export class InventoryMatchPage {
  @ViewChild('mySlider') slider: Slides;

  public adminUrl = 'http://influxiq.com:8003/';

  public hideFirst;
  public hideLast;

  mySlideOptions = {
    loop: true,
    pager:true
  };

  public userdetails;
  public username;
  public dealerusername;
  public dealerid;

  public data;
  public inventorymatcharr;
  public pagec;
  public details;
  public filesrc;
  public rsvplist;

  public carlogolist;
  public carautoyearlist;
  public carmileagelist;
  public colorlist;




  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController, public storage: Storage,private _http: Http) {
    this.hideFirst = 'hide';
    this.hideLast = '';

    this.filesrc = 'http://probidbackend.influxiq.com/uploadedfiles/sharelinks/';

    this.inventorymatcharr = [];
    this.carlogolist = [];

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

        this.details=[];
        this._http.post(this.adminUrl+'getcustomerbyusername',{dealerusername:this.dealerusername})
            .subscribe(data => {
              this.filesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
              this.details=data.json();
              this.manageinventory();


            }, error => {
              console.log("Oooops!");
            });

      }else{
        this.navCtrl.push(BlankPage);
      }


      let linkv1 = this.adminUrl+'getrsvpbydealerid';
      let var11={dealerid:this.dealerusername};
      this._http.post(linkv1,var11)
          .subscribe(data1 => {

            this.rsvplist = data1.json();

          }, error => {
            console.log("Oooops!");
          });

    });

    this._http.get(this.adminUrl+'carlogolist')
        .subscribe(data => {

          this.carlogolist=data.json();


        }, error => {
          console.log("Oooops!");
          //return '22';
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

    this._http.get(this.adminUrl+'colorlist')
        .subscribe(data => {
          this.colorlist=data.json();
        }, error => {
          console.log("Oooops!");
        });

  }

  getDealerDetails(){
    var link = this.adminUrl+'editdealerbyusername';
    var data = {'username':this.dealerusername};

    this._http.post(link, data)
        .subscribe(data => {

          let data2 = data.json();

          this.dealerid = data2[0]._id;

          this.getInventoryMatches();

        }, error => {
          console.log('error');
          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });
  }

  getInventoryMatches(){
    var link = this.adminUrl+'getinventoryfordealer?dealerid='+this.dealerid;
    // console.log('link ==='+link);
    this._http.get(link)
        .subscribe(data1 => {
          this.data = data1.json();



          this.manageinventory();

          this.pagec=Math.ceil(this.inventorymatcharr.length / 9);

        }, error => {
          console.log("Oooops!");
        });
  }

  manageinventory(){
    this.inventorymatcharr = [];

    var x:any;
    var y:any;
    var z:any;
    var inventorymatchvalue:any;
    var inventorymatchvaluearr:Array<any>;
    var inventorymatchvalueclass:Array<any>;
    var tempcustomerarrforiventorymatches:Array<any>;
    let timeout=setInterval(() => {


      for (x in this.data) {

        for (y in this.data[x].cardata) {

          tempcustomerarrforiventorymatches = [];

          this.data[x].cardata[y].auctionids = this.data[x].cardata[y].auctionid.join("-");
          this.data[x].cardata[y].auctiondata = this.data[x].auctiondata;


          for (z in this.details) {

            if(this.checkrsvp(this.details[z], this.data[x].cardata[y]) != 1){
              clearInterval(timeout);


              if (typeof (this.details[z].base_price != 'undefined' )) {
                inventorymatchvalue = 0;
                inventorymatchvaluearr = [];
                inventorymatchvalueclass = [];

                if(typeof (this.details[z].car_auto_year) != 'undefined'){
                  if(this.details[z].car_auto_year.indexOf(this.data[x].cardata[y].carautoyearlist) > -1){
                    inventorymatchvalue += 14.3;
                    inventorymatchvaluearr.push('Year /');
                    inventorymatchvalueclass['yr'] = 'match';
                  }else{
                    inventorymatchvalueclass['yr'] = 'unmatched';
                  }
                }else{
                  inventorymatchvalueclass['yr'] = 'unmatched';
                }

                if(typeof (this.details[z].base_price) != 'undefined'){
                  if(this.details[z].base_price.indexOf(this.data[x].cardata[y].basepricerange) > -1){
                    inventorymatchvalue += 14.3;
                    inventorymatchvaluearr.push('Price /');
                    inventorymatchvalueclass['bp'] = 'match';
                  }else{
                    inventorymatchvalueclass['bp'] = 'unmatched';
                  }
                }else{
                  inventorymatchvalueclass['bp'] = 'unmatched';
                }

                if(typeof (this.details[z].car_body_style) != 'undefined'){
                  if(this.details[z].car_body_style.indexOf(this.data[x].cardata[y].car_body_style) > -1){
                    inventorymatchvalue += 14.3;
                    inventorymatchvaluearr.push('Body Style / ');
                    inventorymatchvalueclass['bs'] = 'matched';
                  }else{
                    inventorymatchvalueclass['bs'] = 'unmatched';
                  }
                }else{
                  inventorymatchvalueclass['bs'] = 'unmatched';
                }

                if(typeof (this.details[z].color_opiton) != 'undefined'){
                  if(this.details[z].color_opiton.indexOf(this.data[x].cardata[y].color) > -1){
                    inventorymatchvalue += 14.3;
                    inventorymatchvaluearr.push('Color /');
                    inventorymatchvalueclass['cl'] = 'match';
                  }else{
                    inventorymatchvalueclass['cl'] = 'unmatched';
                  }
                }else{
                  inventorymatchvalueclass['cl'] = 'unmatched';
                }

                if(typeof (this.details[z].upcoming_auction) != 'undefined'){
                  if(this.details[z].upcoming_auction.indexOf(this.data[x].cardata[y].carlogolist) > -1){
                    inventorymatchvalue += 14.3;
                    inventorymatchvaluearr.push('Make /');
                    inventorymatchvalueclass['mk'] = 'match';
                  }else{
                    inventorymatchvalueclass['mk'] = 'unmatched';
                  }
                }else{
                  inventorymatchvalueclass['mk'] = 'unmatched';
                }

                if (this.data[x].cardata[y].mileage == this.details[z].car_mileage) {

                  inventorymatchvalue += 14.3;
                  inventorymatchvaluearr.push('Mileage /');
                  inventorymatchvalueclass['ml'] = 'match';

                }
                else {
                  inventorymatchvalueclass['ml'] = 'unmatched';
                }

                this.details[z].inventorymatchval = Math.ceil(inventorymatchvalue);
                this.details[z].inventorymatchvaluearr = inventorymatchvaluearr;
                this.details[z].inventorymatchvalueclass = inventorymatchvalueclass;
                if (inventorymatchvalue > 0)tempcustomerarrforiventorymatches.push(this.details[z]);

              }
            }
          }
          this.data[x].cardata[y].userdetails = tempcustomerarrforiventorymatches;


          if (tempcustomerarrforiventorymatches.length > 0) {
            this.inventorymatcharr.push(this.data[x].cardata[y]);
          }


        }
      }
    },2000);
  }

  checkrsvp(val1:any,val2:any){
    let z1:any;

    for(z1 in this.rsvplist){
      if(val1.username==this.rsvplist[z1].customerusername && val1.dealerusername==this.rsvplist[z1].dealerid && this.rsvplist[z1].inventoryid==val2._id){
        return 1;
      }
    }
    return 0;

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
      this.hideFirst = 'hide';
    }else{
      this.hideFirst = '';

    }

    if(currentIndex == (slengh-1)){
      this.hideLast = 'hide';
    }else{
      this.hideLast = '';
    }

  }

  getcarlogo(val:any){
    var x:any;
    for(x in this.carlogolist){
      if(this.carlogolist[x]._id==val.carlogolist) return this.carlogolist[x].name;
    }
    return 'N/A';
  }

  getcaryear(val:any){
    var y:any;
    for(y in this.carautoyearlist){
      if(this.carautoyearlist[y]._id==val.carautoyearlist) return this.carautoyearlist[y].year;
    }
    return 'N/A';
  }

  getmileage(val:any){
    var z:any;
    for(z in this.carmileagelist){
      if(this.carmileagelist[z]._id==val.mileage) return this.carmileagelist[z].mileage;
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

  viewCardet(carIn){
    this.navCtrl.push(InventoryDetailsPage,{'inventorymatcharr':this.inventorymatcharr,'index':carIn});
  }

}
