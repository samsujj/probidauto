import { Component,ViewChild } from '@angular/core';
import { NavController,ToastController,PopoverController,Slides } from 'ionic-angular';


@Component({
  selector: 'page-recentrsvp',
  templateUrl: 'recentrsvp.html'
})
export class RecentRsvpPage {
  @ViewChild('mySlider') slider: Slides;

  public participate;
  public isFirst;
  public isLast;

  mySlideOptions = {
    loop: true,
    pager:true
  };

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController) {
    this.isFirst = true;
    this.isLast = false;
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

}
