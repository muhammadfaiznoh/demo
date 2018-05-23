import { TabsPage } from './../tabs/tabs';
import { HomePage } from './../home/home';
import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {Storage} from '@ionic/storage';

// import {SearchCarsPage} from "../search-cars/search-cars";

@Component({
  selector: 'page-search-location',
  templateUrl: 'search-location.html'
})

export class SearchLocationPage {
  public fromto: any;
  // places
  public places = {
    nearby: [
      {
        id: 1,
        name: "Kuantan Port",
        lat: "3.9757",
        long: "103.4277"
      },
      {
        id: 2,
        name: "Tanjung Gelang",
        lat: "3.963383",
        long: "103.436944"
      },
      {
        id: 3,
        name: "Pulau Harimau",
        lat: "2.560432",
        long: "103.94268"
      },
      {
        id: 4,
        name: "Pulau Perhentian Besar",
        lat: "5.8821021",
        long: "102.7429799"
      },
      {
        id: 5,
        name: "Pulau Pinang",
        lat: "5.7377807",
        long: "103.0013457"
      },
      {
        id: 6,
        name: "Tumpat",
        lat: "6.200587",
        long: "102.167144"
      }
    ],
    recent: [
      {
        id: 1,
        name: "Batu Tinagat", 
        lat: "4.1333",
        long: "117.5851"
      }
    ]
  };

  constructor(private storage: Storage, public nav: NavController, public navParams: NavParams) {
    this.fromto = this.navParams.data;
  }

  // search by item
  searchBy(item) {
    if (this.fromto === 'from') {
      this.storage.set('pickup', item.name);
    }

    if (this.fromto === 'to') {
      this.storage.set('dropOff', item.name);
    }
  //   this.nav.push(HomePage);
    this.nav.pop();
  }
}
