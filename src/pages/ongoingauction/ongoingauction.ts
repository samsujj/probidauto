import { Component,ViewChild  } from '@angular/core';
import { NavController,ToastController,PopoverController,Slides } from 'ionic-angular';
import {Http} from "@angular/http";
import {AuctionDetailsPage} from '../auctiondetails/auctiondetails';
import { Storage } from '@ionic/storage';
import {BlankPage} from '../blank/blank';


@Component({
  selector: 'page-ongoingauction',
  templateUrl: 'ongoingauction.html'
})
export class OnGoingauctionPage {
  @ViewChild('mySlider') slider: Slides;

  public adminUrl = 'http://influxiq.com:8003/';

  public userdetails;
  public username;

  public rsvplistarr:any;
  public rsvplist:any;
  public carlistarr:any;

  public filesrc;
  public auctionlist;
  public carlogolist;
  public colorlist;
  public carbodystylelist;
  public carautoyearlist;
  public carmileagelist;

  public details:any;
  public inventoryarr:any;


constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController, public storage: Storage,private _http: Http) {
    this.rsvplistarr=[];
    this.carlistarr=[];
    this.inventoryarr=[];

    this.filesrc = 'http://probidbackend.influxiq.com/uploadedfiles/sharelinks/';

    this._http.get(this.adminUrl+'auctionlist')
        .subscribe(data => {
          this.auctionlist=data.json();

          console.log(this.auctionlist);

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
        this.getrsvplistarr();
      }else{
        this.navCtrl.push(BlankPage);
      }
    });
  }

  getrsvplistarr(){
    let linkv1 = this.adminUrl+'getrsvpbycustomerusername';
    let var11={customerusername:this.username};
    this._http.post(linkv1,var11)
        .subscribe(data1 => {

          this.rsvplist = data1.json();

          var k:any;
          for(k in this.rsvplist){
            if(this.rsvplist[k].status==1){
              this.rsvplistarr.push(this.rsvplist[k]);
              this.inventoryarr.push(this.rsvplist[k].inventoryid);
            }
          }



          console.log(this.rsvplistarr.length);
          console.log(this.rsvplistarr);

        }, error => {
          console.log("Oooops!");
        });
  }

  getcardetails(val:any,val1:any){

    if(this.carlistarr.length==0){
      this._http.get(this.adminUrl+'carlist')
          .subscribe(data1 => {
            this.carlistarr = data1.json();
            //console.log(this.data);

            var x:any;
            for(x in this.carlistarr){
              if(val==this.carlistarr[x]._id){

                if (val1=='make'){
                  //console.log(this.carlistarr[x]);
                  //console.log(this.carlistarr[x].carlogolist);
                  return this.getcarlogo(this.carlistarr[x]);
                }
                if (val1=='auctiondate'){
                  //console.log(this.carlistarr[x]);
                  //console.log(this.carlistarr[x].carlogolist);
                  return this.carlistarr[x].auctiondata[0].auction_date;
                }
                if (val1=='auctionname'){
                  return this.carlistarr[x].auctiondata[0].name;
                }


                if (val1=='mileage'){
                  //console.log(this.carlistarr[x]);
                  //console.log(this.carlistarr[x].carlogolist);
                  return this.getmileage(this.carlistarr[x]);
                }
                if (val1=='model'){
                  //console.log(this.carlistarr[x]);
                  //console.log(this.carlistarr[x].carlogolist);
                  return (this.carlistarr[x].model);
                }
                if (val1=='enginetype'){
                  //console.log(this.carlistarr[x]);
                  //console.log(this.carlistarr[x].carlogolist);
                  return (this.carlistarr[x].enginetype);
                }
                if (val1=='drive'){
                  //console.log(this.carlistarr[x]);
                  //console.log(this.carlistarr[x].carlogolist);
                  return (this.carlistarr[x].drive);
                }
                if (val1=='cylinder'){
                  //console.log(this.carlistarr[x]);
                  //console.log(this.carlistarr[x].carlogolist);
                  return (this.carlistarr[x].cylinder);
                }
                if (val1=='fuel'){
                  //console.log(this.carlistarr[x]);
                  //console.log(this.carlistarr[x].carlogolist);
                  return (this.carlistarr[x].fuel);
                }
                if (val1=='vin'){
                  //console.log(this.carlistarr[x]);
                  //console.log(this.carlistarr[x].carlogolist);
                  return (this.carlistarr[x].vin);
                }
                if (val1=='seats'){
                  //console.log(this.carlistarr[x]);
                  //console.log(this.carlistarr[x].carlogolist);
                  return (this.carlistarr[x].seats);
                }
                if (val1=='gear_type'){
                  //console.log(this.carlistarr[x]);
                  //console.log(this.carlistarr[x].carlogolist);
                  return (this.carlistarr[x].gear_type);
                }
                if (val1=='carbodystyle'){
                  //console.log(this.carlistarr[x]);
                  //console.log(this.carlistarr[x].carlogolist);
                  return this.getbodystyle(this.carlistarr[x]);
                }
                if (val1=='year'){
                  //console.log(this.carlistarr[x]);
                  //console.log(this.carlistarr[x].carlogolist);
                  return this.getcaryear(this.carlistarr[x]);
                }
                if (val1=='image'){
                  if(typeof (this.carlistarr[x].filename)!='undefined')
                    return this.filesrc+this.carlistarr[x].filename;
                  else return 'images/logo_61.png';
                }
                if (val1=='auctionimage'){
                  if(typeof (this.carlistarr[x].auctiondata[0].filename)!='undefined')
                    return this.filesrc+this.carlistarr[x].auctiondata[0].filename;
                  else return 'images/logo_61.png';
                }
                if (val1=='color'){
                  //console.log(this.carlistarr[x]);
                  //console.log(this.carlistarr[x].carlogolist);
                  return this.getcolor(this.carlistarr[x]);
                }
                if (val1=='price'){
                  //console.log(this.carlistarr[x]);
                  //console.log(this.carlistarr[x].carlogolist);
                  return (this.carlistarr[x].est_retail_value);
                }
                return this.carlistarr[x];
              }

            }

          }, error => {
            console.log("Oooops!");
          });
    }
    else{
      var x:any;
      for(x in this.carlistarr){
        if(val==this.carlistarr[x]._id){
          if (val1=='mileage'){
            //console.log(this.carlistarr[x]);
            //console.log(this.carlistarr[x].carlogolist);
            return this.getmileage(this.carlistarr[x]);
          }
          if (val1=='model'){
            //console.log(this.carlistarr[x]);
            //console.log(this.carlistarr[x].carlogolist);
            return (this.carlistarr[x].model);
          }
          if (val1=='color'){
            //console.log(this.carlistarr[x]);
            //console.log(this.carlistarr[x].carlogolist);
            return this.getcolor(this.carlistarr[x]);
          }
          if (val1=='auctiondate'){
            //console.log(this.carlistarr[x]);
            //console.log(this.carlistarr[x].carlogolist);
            return this.carlistarr[x].auctiondata[0].auction_date;
          }
          if (val1=='auctionname'){
            return this.carlistarr[x].auctiondata[0].name;
          }
          if (val1=='price'){
            //console.log(this.carlistarr[x]);
            //console.log(this.carlistarr[x].carlogolist);
            return (this.carlistarr[x].est_retail_value);
          }

          if (val1=='make'){
            //console.log(this.carlistarr[x]);
            //console.log(this.carlistarr[x].carlogolist);
            return this.getcarlogo(this.carlistarr[x]);
          }
          if (val1=='auctionname'){
            //console.log(this.carlistarr[x]);
            //console.log(this.carlistarr[x].carlogolist);
            return (this.carlistarr[x].auctiondata[0].name);
          }
          if (val1=='year'){
            //console.log(this.carlistarr[x]);
            //console.log(this.carlistarr[x].carlogolist);
            return this.getcaryear(this.carlistarr[x]);
          }
          if (val1=='enginetype'){
            //console.log(this.carlistarr[x]);
            //console.log(this.carlistarr[x].carlogolist);
            return (this.carlistarr[x].enginetype);
          }
          if (val1=='drive'){
            //console.log(this.carlistarr[x]);
            //console.log(this.carlistarr[x].carlogolist);
            return (this.carlistarr[x].drive);
          }
          if (val1=='cylinder'){
            //console.log(this.carlistarr[x]);
            //console.log(this.carlistarr[x].carlogolist);
            return (this.carlistarr[x].cylinder);
          }
          if (val1=='fuel'){
            //console.log(this.carlistarr[x]);
            //console.log(this.carlistarr[x].carlogolist);
            return (this.carlistarr[x].fuel);
          }
          if (val1=='vin'){
            //console.log(this.carlistarr[x]);
            //console.log(this.carlistarr[x].carlogolist);
            return (this.carlistarr[x].vin);
          }
          if (val1=='seats'){
            //console.log(this.carlistarr[x]);
            //console.log(this.carlistarr[x].carlogolist);
            return (this.carlistarr[x].seats);
          }
          if (val1=='gear_type'){
            //console.log(this.carlistarr[x]);
            //console.log(this.carlistarr[x].carlogolist);
            return (this.carlistarr[x].gear_type);
          }
          if (val1=='carbodystyle'){
            //console.log(this.carlistarr[x]);
            //console.log(this.carlistarr[x].carlogolist);
            return this.getbodystyle(this.carlistarr[x]);
          }

          if (val1=='image'){
            if(typeof (this.carlistarr[x].filename)!='undefined')
              return this.filesrc+this.carlistarr[x].filename;
            else return 'images/logo_61.png';
          }
          if (val1=='auctionimage'){
            if(typeof (this.carlistarr[x].auctiondata[0].filename)!='undefined')
              return this.filesrc+this.carlistarr[x].auctiondata[0].filename;
            else return 'images/logo_61.png';
          }

          return this.carlistarr[x];
        }

      }
    }
    return 'N/A'

  }

  getcarlogo(val:any){
    var x:any;
    for(x in this.carlogolist){
      if(this.carlogolist[x]._id==val.carlogolist) return this.carlogolist[x].name;
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

  getbodystyle(val:any){
    var t:any;
    for(t in this.carbodystylelist){
      if(this.carbodystylelist[t]._id==val.carbodystylelist) return this.carbodystylelist[t].name;
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

  getcolor(val:any){
    var a:any;
    for(a in this.colorlist){
      if(this.colorlist[a]._id==val.color) return this.colorlist[a].color;
    }
    return 'N/A';
  }

  getcarbyid(){


    for(let n in this.inventoryarr){
      let inventoryid = this.inventoryarr[n];
      let ids={id:inventoryid};
      this._http.post(this.adminUrl+'getcarbyid',ids)
          .subscribe(data => {
            let sdfs = data.json()[0];
            console.log(sdfs);

            this.details.push(sdfs);

          }, error => {
            console.log("Oooops!");
          });
    }
  }

  getauction(val:any,type:any){

    let ids={id:val};
    this._http.post(this.adminUrl+'getcarbyid',ids)
        .subscribe(data => {
          let sdfs = data.json()[0];
          console.log(sdfs);

        }, error => {
          console.log("Oooops!");
        });

    /*for(let k in this.details){
      if(this.details[k].auctionid[0]==val){
        let auctionid = this.details[k].auctionid[0];
        console.log('auctionid'+auctionid);
      }
    }

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
    }*/
  }

  bidnow(inventoryid){
    this.navCtrl.setRoot(AuctionDetailsPage,{'inventoryid':inventoryid});
  }
  prevSlide(){
    this.slider.slidePrev(1000);
  }

  nextSlide(){
    this.slider.slideNext(1000);
  }

}
