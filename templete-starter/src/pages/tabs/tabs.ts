import { Component } from '@angular/core';

import { SearchLocationPage } from '../search-location/search-location';
import { HomePage } from '../home/home';
import { JoblistPage } from '../joblist/joblist';


@Component({
    selector: 'page-tabs',
    template: `
    <ion-tabs>
    <ion-tab tabIcon="home" [root]="home" tabTitle="HOME" > </ion-tab> 
    <ion-tab tabIcon="pin" [root]="searchPage" tabTitle="LIGHTHOUSE"> </ion-tab>
    <ion-tab tabIcon="construct" [root]="joblist" tabTitle="Jobs"> </ion-tab>
        </ion-tabs>
    `
})
export class TabsPage{
home = HomePage;
searchPage = SearchLocationPage;
joblist= JoblistPage;
}
