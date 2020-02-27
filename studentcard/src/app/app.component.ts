import { Component } from '@angular/core';
import { InformationfillingPage } from "../pages/search/Informationfilling";

@Component({
    template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
    //rootPage = FamilyAddressPage;
    rootPage = InformationfillingPage;
    constructor() {
        
    }
}
