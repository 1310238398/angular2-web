import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from "ionic-angular";
import { ServelUrl } from "../../../app/ServelUrl";
import { HttpService } from "../../../http/http.Service";
import { ColData } from "../../../app/service/ColData";
import { ListPage } from "../List";
import { QuestionPage } from "./QuestionPage";
@Component({
    selector: 'page-evalProblem',
    templateUrl: 'EvalProblem.html'
})


export class EvalProblem {
    questionPage = QuestionPage;
    ngOnInit(): void {


    }
    item: any;

    coursename: any;

    constructor(public navCtrl: NavController, private params: NavParams, private http: HttpService) {

        var param = JSON.parse(params.data.params);
        this.coursename=param.CourseName;


        // this.coursename = this.param.courseName
        // console.log(this.param.courseName);
        //  this.currentPageIndex = params.data.pageIndex;
        // this.item =  params.get('name');
        console.log("EvalProblem constructor " + this.coursename);
        antlinker.configTitle({
            type: "label",
            title: "教学评估",
            fail: function () {

            },
            success: function () {
            }
        });
    };

    ionViewDidEnter() {
        console.log("ionViewDidEnter " + this.coursename);
    }
    

    NavigationTo(item) {
        this.navCtrl.push(this.questionPage,{"params":this.coursename});
    }

}