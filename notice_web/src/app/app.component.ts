import { Component } from '@angular/core';
import {  Platform } from 'ionic-angular';
// import { StatusBar } from 'ionic-native';
//import { ROUTER_DIRECTIVES } from '@angular/router';
//import { TabsPage } from '../pages/tabs/tabs';
import { NoticeMain } from '../pages/notice-main/notice-main';


@Component({
    template: `<ion-nav [root]="rootPage"></ion-nav>`
    // <ion-nav [root]="rootPage"></ion-nav>  <router-outlet></router-outlet>
    //directives: [ROUTER_DIRECTIVES]
})
export class MyApp {
    rootPage = NoticeMain;

    // constructor(platform: Platform) {
    //     platform.ready().then(() => {
    //         // Okay, so the platform is ready and our plugins are available.
    //         // Here you can do any higher level native things you might need.
    //         // 
    //         // StatusBar.styleDefault();
    //     });
    // }
}
