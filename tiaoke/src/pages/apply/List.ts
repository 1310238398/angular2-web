/*
 * create by lizan 2017/02/28
 * */
import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";
import { AddLessonPage } from "./AddLesson";
import { EditLessonPage } from "./EditLesson";
import { ViewLessonPage } from "./ViewLesson";
import { ImperfectPage } from "./Imperfect";
@Component({
    selector: 'page-list',
    templateUrl: './List.html'
})
export class ListPage {
    addLessonPage = AddLessonPage;
    applylist;
    constructor(private navCtrl: NavController, private http: HttpService) {
        antlinker.configTitle({
            type: "label",
            title: "调课",
            fail: function () {

            },
            success: function () {
            }
        });

        //查询列表
        this.http.postJSON({
            Router: ServelUrl.Url.queryalladjustcourse,
            Method: 'POST',
            Body: {IntelUserCode:"1"}
        }).then(
            comments => {
                if (comments.FeedbackCode == 0) {
                    this.applylist = comments.Data;
                }
            });

    }
    toUrl(item){
        if(item.Status ==0) {//待审批-编辑
            this.navCtrl.push(EditLessonPage, {rid: item.RecordId});
        }else if(item.Status == 1){//已完成-查看
            this.navCtrl.push(ViewLessonPage, {rid: item.RecordId});
        }else if(item.Status == 2){//未批准-查看
            this.navCtrl.push(ViewLessonPage, {rid: item.RecordId});
        }else if(item.Status == 3){//审批完成待完善
            this.navCtrl.push(EditLessonPage, {rid: item.RecordId});
        }
    }
    ionViewWillEnter() {

    }

}
