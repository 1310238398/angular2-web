/**
 * Created by mac on 17/4/25.
 */
import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { ServelUrl } from "../app/ServelUrl";
import { HttpService } from "../http/http.Service";
import { ListPage } from "../pages/apply/List";//添加调课申请page
import { WaitListPage } from "../pages/examine/List";//审批调课申请page

@Component({
    templateUrl: './NoPage.html'
})
export class NoPage {
    constructor(private navCtrl: NavController, private http: HttpService) {

    }
}