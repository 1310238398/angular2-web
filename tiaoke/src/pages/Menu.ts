/**
 * Created by lizan on 17/4/25.
 */
import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { ServelUrl } from "../app/ServelUrl";
import { HttpService } from "../http/http.Service";
import { ListPage } from "../pages/apply/List";//添加调课申请page
import { WaitListPage } from "../pages/examine/List";//审批调课申请page

@Component({
    selector: 'page-menu',
    templateUrl: './Menu.html'
})
export class MenuPage {
    constructor(private navCtrl: NavController, private http: HttpService) {

    }
    applyPage(){
        this.navCtrl.push(ListPage);
    }
    waitListPage(){
        this.navCtrl.push(WaitListPage);
    }
}