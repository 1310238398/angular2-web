import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";

@Component({
    selector: 'page-list',
    templateUrl: './List.html'
})
export class NoticeListPage {
    constructor(private navCtrl: NavController, private http: HttpService) {

    }

}