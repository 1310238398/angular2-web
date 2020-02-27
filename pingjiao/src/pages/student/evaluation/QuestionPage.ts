import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from "ionic-angular";
import { ServelUrl } from "../../../app/ServelUrl";
import { FormGroup, FormControl } from '@angular/forms';
// import { HttpService } from "../../../http/http.Service";
import { EvalTeacherService } from "../../EvalTeacher.service";
import { ColData } from "../../../app/service/ColData";
import { HttpService } from "../../../http/http.Service";
import { ListPage } from "../List";
import { Question } from "./../../utility/Question";
import { Answer } from "./../../utility/Answer";
import { EvalProblem } from "./EvalProblem";


@Component({
    selector: 'page-questionPage',
    templateUrl: 'QuestionPage.html'
})


export class QuestionPage {

    ngOnInit(): void {


    }

    private question: Question = new Question();
    // 当前页面是第几题
    private currentPageIndex = 0;

    //总题目数
    private questionListLength = 0;

    private qustions: Array<any> = [];

    priviousButtonAvaible: boolean = false;
    nextButtonAvaible: boolean = false;
    finishButtonAvaible: boolean = false;
    coursename: any;
    //
    buttonDisabled: boolean = false;

    langs;
    langForm;
    // options : any;
    // var options = new Array();

    constructor(public navCtrl: NavController, private params: NavParams, private service: EvalTeacherService, public alerCtrl: AlertController, private http: HttpService) {

        // var options = []; 
        this.langForm = new FormGroup({
            "langs": new FormControl({ value: '', disabled: false })
        });
        this.coursename = params.data.params;


        // 根据params里面的参数判断当前是第几题
        if ("pageIndex" in params.data) {
            this.currentPageIndex = params.data.pageIndex;
        }
        this.service.getQuestionByPageIndex(this.currentPageIndex).then(

            ques => {
                // console.log("constructor" + JSON.stringify(ques));
                this.question = ques;
            }
        );
        this.service.getQuestionList().then(data => {
            // console.log(data);
            // this.qustions=data;
        })
        // console.log(this.service.getQuestionList());
        // console.log(JSON.stringify(this.question));
        // this.questionListLength = 
        this.service.getQuestionListLength().then(
            length => {
                this.questionListLength = length;
                if (this.currentPageIndex < this.questionListLength - 1) {
                    this.nextButtonAvaible = true;
                }
                if (this.currentPageIndex == this.questionListLength - 1) {
                    this.finishButtonAvaible = true;
                }
            }
        );

        if (this.currentPageIndex > 0) {
            this.priviousButtonAvaible = true;
        }


        antlinker.configTitle({
            type: "label",
            title: "教学评估",
            fail: function () {

            },
            success: function () {
            }
        });


    };
    // ngInit

    privious() {
        if (this.currentPageIndex === 0) {
            // 这种情况不可能发生
            // console.error("privious() bug");
            this.navCtrl.pop(EvalProblem);
        } else {
            this.navCtrl.pop();
        }
    }

    next() {
        if (this.currentPageIndex >= this.questionListLength) {
            // 不可能发生
            console.error("next() bug");
        } else if (this.currentPageIndex <= this.questionListLength - 1) {
            if (this.langForm.value.langs != '') {
                var obj: Answer = { "TitleId": this.question.TitleId, "OptionDetailId": this.langForm.value.langs };
                // this.qustions.push(obj);
                //    this.service.appendToCurrentAnswerList(obj);
                this.service.setAnswerByIndex(this.currentPageIndex, obj);
            }
            if (this.currentPageIndex < this.questionListLength - 1) {
        
                if (this.langForm.value.langs == '') {
                    let alert = this.alerCtrl.create({
                        title: '',
                        message: '请选择一个选项',
                        buttons: ["确定"]
                    });
                    alert.present()
                } else {
                    this.navCtrl.push(QuestionPage, { "pageIndex": this.currentPageIndex + 1, "params": this.coursename });
                }

            } else if (this.currentPageIndex == this.questionListLength - 1) {
                console.error("next() bug");
                this.finishButtonAvaible = true;
            }

        }

    }

    finish() {
        var flag = true;
        // this.nextButtonAvaible = false;
        // this.finishButtonAvaible = true;
        this.buttonDisabled = true;

        if (this.currentPageIndex == this.questionListLength - 1) {
            if (this.langForm.value.langs == '') {
                let alert = this.alerCtrl.create({
                    title: '',
                    message: '请选择一个选项',
                    buttons: ["确定"]
                });
                alert.present()
                this.buttonDisabled = false;
            } else if (flag) {
                this.http.postJSON({
                    Router: ServelUrl.Url.surveysave,
                    Method: 'POST',
                    Body: { "CourseCode": this.service.getCurrentCourseCode(), "body": this.service.getCurrentAnswerList() }
                }).then(
                    comments => {
                        if (!comments.FeedbackCode) {
                            this.finishButtonAvaible = false;

                            let alert = this.alerCtrl.create({
                                title: '您好',
                                subTitle: "您已评教完成",
                                buttons: ['确定']
                            });
                            alert.present();
                            this.buttonDisabled = true;
                            this.navCtrl.push(ListPage);
                        } else if (comments.FeedbackCode == 1) {
                            let alert = this.alerCtrl.create({
                                title: '提示',
                                message: '您已提交，请勿重复操作',
                                buttons: ['确定']
                            });
                            alert.present();
                             this.navCtrl.push(ListPage);

                        }
                    }
                    )
            }
        }
    };

}