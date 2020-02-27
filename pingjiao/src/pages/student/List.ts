/*
 * create by hanzhendong 2016/12/22
 * */
import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { EvalProblem } from "./evaluation/EvalProblem";
// import { InstructorList } from "./instructor/InstructorList";
import { AlertController } from "ionic-angular";
import { HttpService } from "../../http/http.Service";
import { CourseList } from "../utility/CourseList";
import { EvalTeacherService } from "../EvalTeacher.service";
@Component({
    selector: 'page-list',
    templateUrl: './List.html'
})


export class ListPage {
    items: Array<any> = [];

    // items: Array<any> = [];
    // explainPage = ExplainPage;
    evalProblem = EvalProblem;
    params: any = { name: '大学数学' };

    private CourseList : CourseList;

    // collegePage=CollegePage;
    // instructorList = InstructorList;
    IsEvaluation = 0;
    iscol = 0;
    constructor(private navCtrl: NavController, private service: EvalTeacherService, private http: HttpService, private alertCtrl: AlertController) {

        /**
         * 获取当前学生课程列表
         */
        this.http.postJSON({
            Router:ServelUrl.Url.querycourselist,
            Method: 'POST',
            Body: {}
        }).then(
            comments => {
                this.items = comments.Data || [];
                // this.navCtrl.push(evalProblem, { "pageIndex": this.currentPageIndex + 1 });
            });
        // this.CourseList = EvalTeacherService.gey


        antlinker.configTitle({
            type: "label",
            title: '教学评估',
            fail: function () {

            },
            success: function () {
            }
        });
    }
    nextPage(opt){
        this.service.setCurrentCourseCode(opt.CourseCode);
        this.navCtrl.push (this.evalProblem,{"params":JSON.stringify(opt)});
    }
}
