import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  template: `<ion-menu [content]="content">
                <ion-content class="mainc"> 
                    <ion-list>
                        <ion-item *ngFor="let p of pageList">{{p.title}}</ion-item>
                     </ion-list>
                </ion-content>
            </ion-menu>
            <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;

  public pageList;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    this.pageList = [
      {title: 'Page 1', class : 'Page1'},
      {title: 'Page 2', class : 'Page2'},
      {title: 'Page 3', class : 'Page3'},
      {title: 'Page 4', class : 'Page4'},
      {title: 'Page 5', class : 'Page5'}
    ];

  }
}
