import { Component } from '@angular/core';
import { SearchPage } from "../pages/search/Search";

@Component({
    template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
    rootPage = SearchPage;
    constructor() {
     
    }
}
