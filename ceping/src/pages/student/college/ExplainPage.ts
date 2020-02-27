/**
 * Created by lizan on 17/2/10.
 */
import { Component,OnInit } from '@angular/core';
import { NavController,NavParams } from "ionic-angular";
import { ServelUrl } from "../../../app/ServelUrl";
import { HttpService } from "../../../http/http.Service";
import { CollegePage } from "./CollegePage";

declare var Swiper: any;
@Component({
    selector: 'page-explainPage',
    templateUrl: 'ExplainPage.html'
})
export class ExplainPage{
    collegePage = CollegePage;
    ngOnInit(): void {


    }

    constructor(public navCtrl: NavController,private params: NavParams, private http: HttpService) {

        antlinker.configTitle({
            type: "label",
            title: "学院测评",
            fail: function () {

            },
            success: function () {
            }
        });
    };

    NavigationTo(item) {
        this.navCtrl.push(CollegePage);
    }

}