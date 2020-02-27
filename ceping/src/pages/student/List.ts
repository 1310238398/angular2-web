/*
 * create by hanzhendong 2016/12/22
 * */
import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { ExplainPage } from "./college/ExplainPage";
import { CollegePage } from "./college/CollegePage";
import { InstructorList } from "./instructor/InstructorList";
import { HttpService } from "../../http/http.Service";
@Component({
    selector: 'page-list',
    templateUrl: './List.html'
})
export class ListPage {
    items: Array<any> = [];
    explainPage=ExplainPage;
    collegePage=CollegePage;
    instructorList = InstructorList;
    iscol = 0;
    constructor(private navCtrl: NavController, private http: HttpService) {

        /**
         * 判断是否已经测评完学院
         */
        this.http.postJSON({
            Router: ServelUrl.Url.checkacademy,
            Method: 'POST',
            Body: {}
        }).then(
            comments => {
                if (comments.FeedbackCode=="1") {
                    this.iscol = 1;
                }
            });
    }

    ionViewDidEnter() {
        /**
         * 调用jssdk
         * 标题
         */
        antlinker.configTitle({
            type: "label",
            title: '测评',
            fail: function () {

            },
            success: function () {
            }
        });
        antlinker.configTitleButton({
            type: 'back',
            text: '',
            fail: function () {

            },
            success: function () {
            },
            trigger: function () {
            }

        });
    }
}
