import { Component, ViewChild } from '@angular/core';
import { IndexPage } from "../pages/Index";
import { HttpService } from "../http/http.Service";
import { ServelUrl } from "./ServelUrl";
import { Nav, Platform } from "ionic-angular";
// import { Splashscreen } from "ionic-native";

@Component({
    template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any;

    constructor(private http: HttpService, public platform: Platform) {
        this.rootPage=IndexPage;
    }

    // platformReady() {
    //     // Call any initial plugins when ready
    //     this.platform.ready().then(() => {
    //         Splashscreen.hide();
    //     });
    // }
}
