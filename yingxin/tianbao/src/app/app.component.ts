import { Component } from '@angular/core';
import { InformationfillingPage } from "../pages/search/Informationfilling";
import {FamilyAddressPage} from "../pages/search/familyaddress/FamilyAddress";

@Component({
    template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
    //rootPage = FamilyAddressPage;
    rootPage = InformationfillingPage;
    constructor() {
        document.getElementById('spinnerw').style.display='none';
    }
}
