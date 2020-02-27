/**
 * Created by lizan on 17/2/10.
 */
import { Component, OnInit } from '@angular/core';
import { NavController } from "ionic-angular";
import { ServelUrl } from "../../../app/ServelUrl";
// import { HttpService } from "../../../http/http.Service";
import { CollegePage } from "./CollegePage";
declare var antlinker;
// declare var Swiper: any;
@Component({
    selector: 'page-explainPage',
    templateUrl: 'ExplainPage.html'
})
export class ExplainPage {
    collegePage = CollegePage;
    ngOnInit(): void {


    }

    constructor(public navCtrl: NavController, ) {

        // antlinker.configTitle({
        //     type: "label",
        //     title: "学院测评",
        //     fail: function () {

        //     },
        //     success: function () {
        //     }
        // });
        // antlinker.configTitleButton({
        //     showClose: false,
        //     type: "label",
        //     text: "测评说明",
        //     success: function () {
        //     },
        //     fail: function () {
        //     },
        //     trigger: function () {

        //     }
        // });

        antlinker.configTitle({
            type: "label",
            title: "学院测评",
            fail: function () {

            },
            success: function () {
            }
        });

        antlinker.configTitleButton({
            showClose: false,
            type: "label",
            text: "",
            success: function () {
            },
            fail: function () {
            },
            trigger: function () {

            }
        });
    };

    // NavigationTo(item) {
    //     this.navCtrl.push(CollegePage);
    // }

}