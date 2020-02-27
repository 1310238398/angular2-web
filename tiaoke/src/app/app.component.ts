import { Component, ViewChild } from '@angular/core';
import { ListPage } from "../pages/apply/List";//添加调课申请page
import { WaitListPage } from "../pages/examine/List";//审批调课申请page
import { HttpService } from "../http/http.Service";
import { ServelUrl } from "./ServelUrl";
import { Nav, Platform } from "ionic-angular";
// import { Splashscreen } from "ionic-native";
import { MenuPage } from "../pages/Menu";
import { NoPage } from "../pages/NoPage";
@Component({
    template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any;

    constructor(private http: HttpService, public platform: Platform) {
        this.http.postJSON({
            Router: ServelUrl.Url.whoComeIn,
            Method: 'POST',
            Body: {}
        }).then(
            comments => {
                if (comments.FeedbackCode == 0) {
                    if(comments.Data == "1"){
                        this.rootPage=ListPage
                    }else if(comments.Data == "2"){
                        this.rootPage=WaitListPage
                    }else if(comments.Data == "3"){
                        this.rootPage=MenuPage
                    }else if(comments.Data == "0"){
                        this.rootPage=NoPage;
                    }
                }
            });

    }

    // platformReady() {
    //     // Call any initial plugins when ready
    //     this.platform.ready().then(() => {
    //         Splashscreen.hide();
    //     });
    // }
}
