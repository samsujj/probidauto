import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { BlankPage } from '../pages/blank/blank';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { LogOutPage } from '../pages/logout/logout';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { FinancingPage } from '../pages/financing/financing';
import { Financing2Page } from '../pages/financing2/financing2';
import { Financing3Page } from '../pages/financing3/financing3';
import { Financing4Page } from '../pages/financing4/financing4';
import { Financing5Page } from '../pages/financing5/financing5';
import { Financing6Page } from '../pages/financing6/financing6';
import { Financing7Page } from '../pages/financing7/financing7';
import { Financing8Page } from '../pages/financing8/financing8';
import { Financing9Page } from '../pages/financing9/financing9';
import { Financing10Page } from '../pages/financing10/financing10';
import { Financing11Page } from '../pages/financing11/financing11';
import { PopoverLocationPage } from '../pages/popoverlocation/popoverlocation';
import { PopoverProfilePage } from '../pages/popoverprofile/popoverprofile';
import { PopoverConatctPage } from '../pages/popovercontact/popovercontact';
import { VisitDealerPage } from '../pages/visitdealer/visitdealer';
import { UpcomeInventoryPage } from '../pages/upcomeinventory/upcomeinventory';
import { SetAlertsPage } from '../pages/setalerts/setalerts';
import { OnGoingauctionPage } from '../pages/ongoingauction/ongoingauction';
import { MessageDealerPage } from '../pages/messagedealer/messagedealer';
import { ManagePreferencesPage } from '../pages/managepreferences/managepreferences';
import { InventoryMatchPage } from '../pages/inventorymatch/inventorymatch';
import { InventoryDetailsPage } from '../pages/inventorydetails/inventorydetails';
import { ManagePreferences2Page } from '../pages/managepreferences2/managepreferences2';
import { ManagePreferences3Page } from '../pages/managepreferences3/managepreferences3';
import { ManagePreferences4Page } from '../pages/managepreferences4/managepreferences4';
import { ManagePreferences5Page } from '../pages/managepreferences5/managepreferences5';
import { ManagePreferences6Page } from '../pages/managepreferences6/managepreferences6';
import { ManagePreferences7Page } from '../pages/managepreferences7/managepreferences7';
import { ManagePreferences8Page } from '../pages/managepreferences8/managepreferences8';
import { ManagePreferences9Page } from '../pages/managepreferences9/managepreferences9';
import { ManagePreferences10Page } from '../pages/managepreferences10/managepreferences10';
import { ManagePreferences11Page } from '../pages/managepreferences11/managepreferences11';
import { RecentRsvpPage } from '../pages/recentrsvp/recentrsvp';
import { MessageAddPage } from '../pages/messageadd/messageadd';
import { MessageDetailsPage } from '../pages/messagedetails/messagedetails';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    BlankPage,
    TabsPage,
    LoginPage,
    LogOutPage,
    DashboardPage,
    FinancingPage,
    Financing2Page,
    Financing3Page,
    Financing4Page,
    Financing5Page,
    Financing6Page,
    Financing7Page,
    Financing8Page,
    Financing9Page,
    Financing10Page,
    Financing11Page,
    PopoverConatctPage,
    PopoverProfilePage,
    PopoverLocationPage,
    VisitDealerPage,
    SetAlertsPage,
    OnGoingauctionPage,
    MessageDealerPage,
    ManagePreferencesPage,
    InventoryMatchPage,
    UpcomeInventoryPage,
    InventoryDetailsPage,
    ManagePreferences2Page,
    ManagePreferences3Page,
    ManagePreferences4Page,
    ManagePreferences5Page,
    ManagePreferences6Page,
    ManagePreferences7Page,
    ManagePreferences8Page,
    ManagePreferences9Page,
    ManagePreferences10Page,
    ManagePreferences11Page,
    RecentRsvpPage,
    MessageAddPage,
    MessageDetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    BlankPage,
    TabsPage,
    LoginPage,
    LogOutPage,
    DashboardPage,
    FinancingPage,
    Financing2Page,
    Financing3Page,
    Financing4Page,
    Financing5Page,
    Financing6Page,
    Financing7Page,
    Financing8Page,
    Financing9Page,
    Financing10Page,
    Financing11Page,
    PopoverConatctPage,
    PopoverProfilePage,
    PopoverLocationPage,
    VisitDealerPage,
    SetAlertsPage,
    OnGoingauctionPage,
    MessageDealerPage,
    ManagePreferencesPage,
    InventoryMatchPage,
    UpcomeInventoryPage,
    InventoryDetailsPage,
    ManagePreferences2Page,
    ManagePreferences3Page,
    ManagePreferences4Page,
    ManagePreferences5Page,
    ManagePreferences6Page,
    ManagePreferences7Page,
    ManagePreferences8Page,
    ManagePreferences9Page,
    ManagePreferences10Page,
    ManagePreferences11Page,
    RecentRsvpPage,
    MessageAddPage,
    MessageDetailsPage
  ],
  providers: [Storage]
})
export class AppModule {}
