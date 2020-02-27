import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";

@Component({
    selector: 'page-list',
    templateUrl: './ViewNotice.html'
})
export class ViewNoticePage {
    constructor(private navCtrl: NavController, private http: HttpService) {

    }

}