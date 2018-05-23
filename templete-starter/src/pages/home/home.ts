import {Component} from "@angular/core";
import {NavController, PopoverController} from "ionic-angular";
import {Storage} from '@ionic/storage';

import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
import {TripsPage} from "../trips/trips";
import {SearchLocationPage} from "../search-location/search-location";
import {AlertController} from 'ionic-angular';
import {AgmCoreModule} from "@agm/core";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  // search condition
  public search = {
    name: "Rio de Janeiro, Brazil",
    date: new Date().toISOString()
  }

  public places = {
    good: [
      {
        id: 1,
        name: "Kuantan Port",
        lat: 3.9757,
        long: 103.4277
      },
      {
        id: 2,
        name: "Tanjung Gelang",
        lat: 3.963383,
        long: 103.436944
      },
      {
        id: 3,
        name: "Pulau Harimau",
        lat: 2.560432,
        long: 103.94268
      },
      {
        id: 4,
        name: "Pulau Perhentian Besar",
        lat: 5.8821021,
        long: 102.7429799
      },
      {
        id: 5,
        name: "Pulau Pinang",
        lat: 5.7377807,
        long: 103.0013457
      },
     
      {
        id: 6,
        name: "Cape Rachado",
        lat: 2.4069,
        long: 101.8519
      },
      {
        id: 7,
        name: "Batu Tinagat", 
        lat: 4.1333,
        long: 117.5851
      }

    ],
    need: [
      {
        id: 1,
        name: "Tumpat",
        lat: 6.200587,
        long: 102.167144
      }
    ]
  };

  userDetails : any;
  responseData : any;
 // title: string = '';
 latitude= 2.4069;
  longitude = 101.8519;
  constructor(private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController, public alertCtrl: AlertController) {
  }
  markerClick(lightHouse) {
    //once marker is given, iterate through your list of markers and change this marker's icon and make sure the rest of the icons are back to their default
    let alert = this.alertCtrl.create({
      title: lightHouse.name,
       subTitle: lightHouse.lat + lightHouse.long,
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewWillEnter() {
    // this.search.pickup = "Rio de Janeiro, Brazil";
    // this.search.dropOff = "Same as pickup";
    this.storage.get('pickup').then((val) => {
      if (val === null) {
        this.search.name = "Rio de Janeiro, Brazil"
      } else {
        this.search.name = val;
      }
    }).catch((err) => {
      console.log(err)
    });
  }

  // go to result page
  doSearch() {
    this.nav.push(TripsPage);
  }

  // choose place
  // choosePlace(from) {
  //   this.nav.push(SearchLocationPage, from);
  // }

  // to go account page
  goToAccount() {
    this.nav.push(SettingsPage);
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }

}

//
