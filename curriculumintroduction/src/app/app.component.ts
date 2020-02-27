import { Component } from '@angular/core';
import { DetailPage } from "../pages/classimport/Detail";

@Component({
    template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
    rootPage = DetailPage;
    constructor() {
      
    }
}
