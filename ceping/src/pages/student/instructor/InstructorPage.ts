/**
 * Created by lizan on 17/2/10.
 */
import { Component,OnInit } from '@angular/core';
import { NavController,NavParams } from "ionic-angular";
import { ServelUrl } from "../../../app/ServelUrl";
import { HttpService } from "../../../http/http.Service";
import { OptPage } from "./OptPage";

declare var Swiper: any;
@Component({
    selector: 'page-instructorPage',
    templateUrl: 'InstructorPage.html'
})
export class InstructorPage{
    item = {Name:''}
    optPage = OptPage;
    ngOnInit(): void {


    }

    constructor(public navCtrl: NavController,private params: NavParams, private http: HttpService) {
        this.item = JSON.parse(params.get('id'));
        var name = this.item.Name;
        antlinker.configTitle({
            type: "label",
            title: name,
            fail: function () {

            },
            success: function () {
            }
        });
    };

    NavigationTo(item) {
        this.navCtrl.push(OptPage, { id:JSON.stringify(item) });
    }

}