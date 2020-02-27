import { Component, ViewChild } from '@angular/core';
import { ListPage } from "../pages/student/List";
import { HttpService } from "../http/http.Service";
import { ServelUrl } from "./ServelUrl";
import { Nav, Platform } from "ionic-angular";

@Component({
    template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any;

    constructor(private http: HttpService, public platform: Platform) {
        this.rootPage=ListPage

        /* 查询登陆用户类型
        this.http.postJSON({
            Router: ServelUrl.Url.queryleaverole,
            Method: 'POST',
            Body: {}
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    switch (comments.Data.Type) {
                        case 1:
                            this.nav.setRoot(CounsellorListPage);
                           // this.rootPage = CounsellorListPage;
                            break;
                        case 2:
                            this.nav.setRoot(ListPage);
                           // this.rootPage = ListPage;
                            break;
                        case 3:
                            this.nav.setRoot(OtherListPage);
                            //this.rootPage = OtherListPage;
                            break;
                    }
                }
                document.getElementById('spinnerw').style.display = 'none';
            });*/

    }

    // platformReady() {
    //     // Call any initial plugins when ready
    //     this.platform.ready().then(() => {
    //         Splashscreen.hide();
    //     });
    // }
}
