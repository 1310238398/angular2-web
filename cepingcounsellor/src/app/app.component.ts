
import { Component, ViewChild } from '@angular/core';
import { Nav } from "ionic-angular";
import { InstructorList } from "../pages/student/instructor/InstructorList";

@Component({
    template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any;
    constructor() {
        this.rootPage = InstructorList
    }
}

