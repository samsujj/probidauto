import { Component,ViewChild } from '@angular/core';
import { NavController,ToastController,PopoverController,Slides } from 'ionic-angular';
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {BlankPage} from '../blank/blank';
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  selector: 'page-recentrsvp',
  templateUrl: 'recentrsvp.html'
})
export class RecentRsvpPage {
  @ViewChild('mySlider') slider: Slides;


  mySlideOptions = {
    loop: true,
    pager:true
  };

  public adminUrl = 'http://influxiq.com:8003/';

  public filesrc;
  public userdetails;
  public username;
  public dealerusername;


  public dealerid;
  public rsvplistarr;
  public carlistarr;
  public carlogolist;
  public carmileagelist;
  public carbodystylelist;
  public carautoyearlist;
  public colorlist;


  public commit;


  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController,private _http: Http, public storage: Storage, private _sanitizer: DomSanitizer) {
      this.filesrc = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";

      this.commit = 0;

    this.storage.get('userdetails').then((value) => {
      if(value!=null) {
        this.userdetails = value;
        this.username = value.username;
      }else{
        this.navCtrl.push(BlankPage);
      }
    });

      this._http.get(this.adminUrl + 'colorlist')
          .subscribe(data => {
              this.colorlist = data.json();
          }, error => {
              console.log("Oooops!");
          });

      this._http.get(this.adminUrl + 'carautoyearlist')
          .subscribe(data => {
              this.carautoyearlist = data.json();
          }, error => {
              console.log("Oooops!");
          });


      this._http.get(this.adminUrl + 'carbodystylelist')
          .subscribe(data => {
              this.carbodystylelist = data.json();
          }, error => {
              console.log("Oooops!");
          });

      this._http.get(this.adminUrl + 'listcarautomileage')
          .subscribe(data => {
              this.carmileagelist = data.json();
          }, error => {
              console.log("Oooops!");
          });

      this._http.get(this.adminUrl + 'carlogolist')
          .subscribe(data => {
              this.carlogolist = data.json();
          }, error => {
              console.log("Oooops!");
              //return '22';
          });

      this._http.get(this.adminUrl + 'carlist')
          .subscribe(data1 => {
              this.carlistarr = data1.json();
          }, error => {
              console.log("Oooops!");
          });

  }

  ionViewDidEnter() {
    this.storage.get('userdetails').then((value) => {
      if(value!=null) {
        this.userdetails = value;
        this.username = value.username;
        this.getRsvpList();
      }else{
        this.navCtrl.push(BlankPage);
      }
    });
  }

  getRsvpList(){
    var link = this.adminUrl+'editdcustomerbyusername';
    var formdata = {username:this.username};

    this._http.post(link,formdata)
        .subscribe(data => {
          var data2 = data.json()[0];

          this.dealerusername = data2.dealerusername;

          var link1 = this.adminUrl+'editdealerbyusername';
          var formdata1 = {username:this.dealerusername};

          this._http.post(link1,formdata1)
              .subscribe(data1 => {
                var data21 = data1.json()[0];

                  this.dealerid = data21._id;

                var link2 = this.adminUrl+'getrsvpbydealeridforuser';
                var formdata2 = {dealerid: this.dealerid, customerid: this.username};

                this._http.post(link2,formdata2)
                    .subscribe(data2 => {
                      var data22 = data2.json();

                      this.rsvplistarr = data22;

                      console.log(this.rsvplistarr);


                    }, error => {
                      let toast = this.toastCtrl.create({
                        message: 'Database error occurred. Try again!',
                        duration: 2000
                      });
                      toast.present();
                    });


              }, error => {
                let toast = this.toastCtrl.create({
                  message: 'Database error occurred. Try again!',
                  duration: 2000
                });
                toast.present();
              });


        }, error => {
          let toast = this.toastCtrl.create({
            message: 'Database error occurred. Try again!',
            duration: 2000
          });
          toast.present();
        });
  }

  prevSlide(){
    this.slider.slidePrev(1000);
  }

  nextSlide(){
    this.slider.slideNext(1000);
  }

    getcardetails(val: any, val1: any) {

        if (this.carlistarr.length == 0) {
            this._http.get(this.adminUrl + 'carlist')
                .subscribe(data1 => {
                    this.carlistarr = data1.json();
                    //console.log(this.data);

                    var x: any;
                    for (x in this.carlistarr) {

                        if (val == this.carlistarr[x]._id) {

                            if (val1 == 'make') {
                                return this.getcarlogo(this.carlistarr[x]);
                            }
                            if (val1 == 'mileage') {
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return this.getmileage(this.carlistarr[x]);
                            }
                            if (val1 == 'model') {
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return (this.carlistarr[x].model);
                            }
                            if (val1 == 'doctype') {
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return (this.carlistarr[x].doctype);
                            }
                            if (val1 == 'cylinder') {
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return (this.carlistarr[x].cylinder);
                            }
                            if (val1 == 'gear_type') {
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return (this.carlistarr[x].gear_type);
                            }

                            if (val1 == 'est_retail_value') {
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return (this.carlistarr[x].est_retail_value);
                            }
                            if (val1 == 'fuel') {
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return (this.carlistarr[x].fuel);
                            }
                            if (val1 == 'vin') {
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return (this.carlistarr[x].vin);
                            }
                            if (val1 == 'enginetype') {
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return (this.carlistarr[x].enginetype);
                            }
                            if (val1 == 'seats') {
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return (this.carlistarr[x].seats);
                            }
                            if (val1 == 'drive') {
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return (this.carlistarr[x].drive);
                            }


                            if (val1 == 'carbodystylelist') {
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return this.getcarbodystyle(this.carlistarr[x]);
                            }

                            if (val1 == 'addcarimage') {
                                //console.log(this.carlistarr[x]);
                                console.log('car list image');
                                console.log(this.carlistarr[x].additionalfilename);
                                return this.carlistarr[x].additionalfilename;

                            }


                            if (val1 == 'year') {
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return this.getcaryear(this.carlistarr[x]);
                            }
                            if (val1 == 'carimage') {
                                if (typeof (this.carlistarr[x].filename) != 'undefined')
                                    return this.carlistarr[x].filename;
                                /* else return this._sanitizer.bypassSecurityTrustHtml("<img  src = 'images/logo_61.png' />");*/
                            }
                            if (val1 == 'imagestatic') {
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return this.carlistarr[x].filename;

                            }
                            if (val1 == 'image') {
                                if (typeof (this.carlistarr[x].filename) != 'undefined')
                                    return this._sanitizer.bypassSecurityTrustHtml("<img  src = " + this.filesrc + this.carlistarr[x].filename + " />");
                                else return this._sanitizer.bypassSecurityTrustHtml("<img  src = 'images/logo_61.png' />");
                            }
                            if (val1 == 'color') {
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return this.getcolor(this.carlistarr[x]);
                            }
                            if (val1 == 'price') {
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
        else {
            var x: any;
            for (x in this.carlistarr) {
                if (val == this.carlistarr[x]._id) {

                    if (val1 == 'mileage') {
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return this.getmileage(this.carlistarr[x]);
                    }
                    if (val1 == 'model') {
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return (this.carlistarr[x].model);
                    }
                    if (val1 == 'doctype') {
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return (this.carlistarr[x].doctype);
                    }
                    if (val1 == 'est_retail_value') {
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return (this.carlistarr[x].est_retail_value);
                    }
                    if (val1 == 'fuel') {
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return (this.carlistarr[x].fuel);
                    }
                    if (val1 == 'addcarimage') {
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        // console.log('car list image');
                        // console.log(this.carlistarr[x].additionalfilename);
                        return this.carlistarr[x].additionalfilename;

                    }
                    if (val1 == 'imagestatic') {
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return this.carlistarr[x].filename;

                    }

                    if (val1 == 'vin') {
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return (this.carlistarr[x].vin);
                    }
                    if (val1 == 'cylinder') {
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return (this.carlistarr[x].cylinder);
                    }
                    if (val1 == 'gear_type') {
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return (this.carlistarr[x].gear_type);
                    }
                    if (val1 == 'seats') {
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return (this.carlistarr[x].seats);
                    }
                    if (val1 == 'enginetype') {
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return (this.carlistarr[x].enginetype);
                    }
                    if (val1 == 'drive') {
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return (this.carlistarr[x].drive);
                    }

                    if (val1 == 'carbodystylelist') {
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return this.getcarbodystyle(this.carlistarr[x]);
                    }
                    if (val1 == 'color') {
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return this.getcolor(this.carlistarr[x]);
                    }
                    if (val1 == 'price') {
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return (this.carlistarr[x].est_retail_value);
                    }

                    if (val1 == 'make') {
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return this.getcarlogo(this.carlistarr[x]);
                    }
                    if (val1 == 'auctionname') {
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return (this.carlistarr[x].auctiondata[0].name);
                    }
                    if (val1 == 'year') {
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return this.getcaryear(this.carlistarr[x]);
                    }
                    if (val1 == 'cariimage') {
                        if (typeof (this.carlistarr[x].filename) != 'undefined')
                            return this.carlistarr[x].filename;
                        /* else return this._sanitizer.bypassSecurityTrustHtml("<img  src = 'images/logo_61.png' />");*/
                    }
                    if (val1 == 'image') {
                        if (typeof (this.carlistarr[x].filename) != 'undefined')
                            return this._sanitizer.bypassSecurityTrustHtml("<img  src = " +this.filesrc + this.carlistarr[x].filename + " />");
                        else return this._sanitizer.bypassSecurityTrustHtml("<img  src = 'images/logo_61.png' />");



                    }
                    if (val1 == 'auctionimage') {
                        if (typeof (this.carlistarr[x].auctiondata[0].filename) != 'undefined')
                            return this._sanitizer.bypassSecurityTrustHtml("<img  src = " + this.filesrc + this.carlistarr[x].auctiondata[0].filename + " />");
                        else return this._sanitizer.bypassSecurityTrustHtml("<img  src = 'images/logo_61.png' />");
                    }

                    return this.carlistarr[x];
                }

            }
        }
        return ''

    }

    getcarlogo(val: any) {
        var x: any;
        for (x in this.carlogolist) {
            if (this.carlogolist[x]._id == val.carlogolist) return this.carlogolist[x].name;
        }
        return 'N/A';
    }

    getmileage(val: any) {
        var z: any;
        for (z in this.carmileagelist) {
            if (this.carmileagelist[z]._id == val.mileage) return this.carmileagelist[z].mileage;
        }
        return 'N/A';
    }

    getcarbodystyle(val: any) {
        var b: any;
        for (b in this.carbodystylelist) {
            if (this.carbodystylelist[b]._id == val.carbodystylelist) return this.carbodystylelist[b].name;
        }
        return 'N/A';
    }

    getcaryear(val: any) {
        var y: any;
        for (y in this.carautoyearlist) {
            if (this.carautoyearlist[y]._id == val.carautoyearlist) return this.carautoyearlist[y].year;
        }
        return 'N/A';
    }

    getcolor(val: any) {
        var a: any;
        for (a in this.colorlist) {
            if (this.colorlist[a]._id == val.color) return this.colorlist[a].color;
        }
        return 'N/A';
    }

    carcommit(){
        this.commit = 1;

        let toast = this.toastCtrl.create({
            message: 'This car commited successfully.',
            duration: 3000,
            position: 'middle',
            cssClass: 'commitMsg'
        });
        toast.present();

    }

    setMaxbid(){
        let toast = this.toastCtrl.create({
            message: 'Set max bid successfully.',
            duration: 3000,
            position: 'middle',
            cssClass: 'commitMsg'
        });
        toast.present();
    }
}
