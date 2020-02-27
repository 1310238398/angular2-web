/*
 * create by hanzhendong 2016/12/22
 * */
import { Component, OnInit } from '@angular/core';
import { NavController } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { ExplainPage } from "./college/ExplainPage";

import { CollegePage } from "./college/CollegePage";
import { InstructorList } from "./instructor/InstructorList";
import { HttpService } from "../../http/http.Service";
declare var antlinker;
@Component({
    selector: 'page-list',
    templateUrl: './List.html'
})
export class ListPage {
    items: Array<any> = [];
    counselors: Array<any> = [];
    explainPage = ExplainPage;
    collegePage = CollegePage;
    instructorList = InstructorList;
    iscol = 0;
    params: Object;
    constructor(private navCtrl: NavController, private http: HttpService) {


    }
    ngOnInit(): void {
        this.getCounselors();
        /**
      * 判断是否已经测评完学院
      */
        this.http.postJSON({
            Router: ServelUrl.Url.checkacademy,
            Method: 'POST',
            Body: {}
        }).then(
            comments => {
                if (comments.FeedbackCode == "1") {
                    this.iscol = 1;
                }
            });

    }
    //    获取辅导员
    getCounselors() {
        this.http.postJSON({
            Router: ServelUrl.Url.queryquerycounselors,
            Method: 'POST',
            Body: {}
        }).then(res => {

            this.counselors = res.Data;
            console.log("啦啦啦");
        })
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
            showClose: true,
            type: "label",
            text: "",
            fail: function () {

            },
            success: function () {
            },
            trigger: function () {
            }

        });
    }

}
