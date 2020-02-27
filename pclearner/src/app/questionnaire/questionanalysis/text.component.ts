import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../../http/http.service";
import { ModalHelper } from "../../shared/helper/modal.helper";
import { ServelUrl } from "../../ServelUrl";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd";
@Component({
    selector: 'app-noanswerlist',
    templateUrl: './text.component.html',
    styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
    surveyId: string = '';
    questionId: string = '';
    campus= [];
    class: string = '';
    academy: string = '';
    grade: string = '';
    major: string = ''
    questionTitle:string='';
    title:string='';
    dataItems = [];
    constructor(public msgSrv: NzMessageService,public httpService: HttpService, private modalHelper: ModalHelper, private router: ActivatedRoute, private route: Router) {

    }

    ngOnInit() {
        this.router.params.subscribe((params: Params) => {
            this.surveyId = params['SurveyID'];
            console.log(this.surveyId)
            this.questionId = params['QuestionID'];

            this.campus = params['campus'].split(",");
            this.academy = params['academy'].split(",");
            this.grade = params['grade'].split(",");
            this.major = params['major'].split(",");
            this.class = params['class'].split(",");

            this.questionTitle = params['questionTitle'];
            this.title = params['bigTitle'];

        });
    
        this.httpService.Post({

            Router: ServelUrl.Url.getDetailes,
            Method: 'POST',
            Body: {
                SurveyID: this.surveyId,
                QuestionID:  parseInt(this.questionId),
                Campus: this.campus,
                Academy: this.academy || [""],
                Major: this.major || [""],
                Grade: this.grade || [""],
                Class: this.class || [""],
            }
        }).subscribe(res => {
            if (!res.RE) {
                console.log(res)
                this.dataItems = res.Data.Details;
                // this.scals = res.Data.Scales;
            }else{
                this.msgSrv.success(res.Text);
            }

        })
    }



}
