/**
 * Created by lizan on 17/2/10.
 */
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";
import { ServelUrl } from "../../../app/ServelUrl";
import { HttpService } from "../../../http/http.Service";
import { OptPage } from "./OptPage";
declare var antlinker;
declare var Swiper: any;
@Component({
    selector: 'page-instructorPage',
    templateUrl: 'InstructorPage.html'
})
export class InstructorPage {
    item = { Name: '' }
    optPage = OptPage;


    constructor(public navCtrl: NavController, private params: NavParams, private http: HttpService) {

    };
    ngOnInit(): void {

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
        antlinker.configTitle({
            type: "label",
            title: '测试说明',
            fail: function () {

            },
            success: function () {
            }
        });
    }

    // NavigationTo(item) {
    //     this.navCtrl.push(OptPage, { id:JSON.stringify(item) });
    // }

}