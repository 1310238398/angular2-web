import { Component } from '@angular/core';
import { CollegerePage } from "../pages/collegeregist/Collegeregist";

@Component({
    template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
    rootPage = CollegerePage;
    constructor() {
       
    }
}
