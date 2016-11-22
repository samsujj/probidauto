import { Component,ViewChild } from '@angular/core';
import { Platform, Nav,MenuController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';

import { DashboardPage } from '../pages/dashboard/dashboard';
import { InventoryMatchPage } from '../pages/inventorymatch/inventorymatch';
import { ManagePreferencesPage } from '../pages/managepreferences/managepreferences';


@Component({
  template: `<ion-menu [content]="content">
                <ion-content class="mainc"> 
                    <ion-list>
                        <ion-item *ngFor="let p of pageList" (click)="gotoPage(p)">{{p.title}}</ion-item>
                     </ion-list>
                </ion-content>
            </ion-menu>
            <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = TabsPage;

  public pageList;

  constructor(platform: Platform, public menu:MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    this.pageList = [
      {title: 'Home', class : DashboardPage},
      {title: 'Inventory Match', class : InventoryMatchPage},
      {title: 'Manage Prefernces', class : ManagePreferencesPage}
    ];

  }

  gotoPage(page){
    this.menu.close();
    this.nav.setRoot(page.class);
  }

}
