
import { Component, ViewChild } from '@angular/core';
import { Nav } from "ionic-angular";
import { CollegePage } from "../pages/student/college/CollegePage";


@Component({
    template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any;
    constructor() {
        this.rootPage = CollegePage
    }
}

