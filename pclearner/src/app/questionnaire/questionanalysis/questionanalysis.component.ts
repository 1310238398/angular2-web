import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../../http/http.service";
import { ModalHelper } from "../../shared/helper/modal.helper";
import { ServelUrl } from "../../ServelUrl";
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd";
import { NzModalService } from 'ng-zorro-antd';
@Component({
    selector: 'app-questionanalysis',
    templateUrl: './questionanalysis.component.html',
    styleUrls: ['./questionanalysis.component.css']
})
export class QuestionanalysisComponent implements OnInit {
    loading = true;
    isVisibleLook = false;
    isVisibleSelect = false;
    isVisibleTop = false;
    isVisibleMiddle = false;

    dataItems = {

        Campus: [],
        Academy: [],
        Major: [],
        Grade: [],
        Class: [],
        Status: '',
        Questions: [],
        Title: '',
        SurveyID: '',
        Scales: {
            Count: '',
            DoCount: '',
            Name: '',
            Percent: '',
        },
    };
    show_value = "已选择";

    surveyId: string = '';
    title: string = '';

    dataSet = [];
    // scals;
    constructor(public msgSrv: NzMessageService, private confirmServ: NzModalService, public httpService: HttpService, private modalHelper: ModalHelper, private router: ActivatedRoute, private route: Router) {

    }
    universityID: string = '';
    Campuss = [];
    Academys = [];
    Majors = [];
    Grades = [];
    Classs = [];
    scopeCampus = [];
    scopeAcademy = [];
    scopeGrade = [];
    scopeMajor = [];
    scopeClass = [];

    academy: string[] = [];
    major: string[] = [];
    grade: string[] = [];
    status: string[] = [];
    ngOnInit() {
        this.httpService.PostJSON({
            Router: ServelUrl.Url.getUniversity,
            Method: 'POST',
            Body: {
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.universityID = res.Data.University;
                this.loadCampus(this.universityID);
                this.loadAcademy(this.universityID);
                this.loadGade(this.universityID);
                this.loadMajor(this.universityID, this.dataItems.Academy);
                this.loadClass(this.universityID, this.dataItems.Major, this.dataItems.Grade);
            }
        })
        this.router.params.subscribe((params: Params) => {
            this.surveyId = params['id'];
            this.title = params['title'];
            this.scopeCampus = params['campus'].split(",");
            this.scopeAcademy = params['academy'].split(",");
            this.scopeGrade = params['grade'].split(",");
            this.scopeMajor = params['major'].split(",");
            this.scopeClass = params['class'].split(",");

            this.dataItems.Campus = params['campus'].split(",");
            this.dataItems.Academy = params['academy'].split(",");
            this.dataItems.Grade = params['grade'].split(",");
            this.dataItems.Major = params['major'].split(",");
            this.dataItems.Class = params['class'].split(",");
        });
        this.analysis();
        this.judgeScope();
    }
    judgeScope() {
        if (this.dataItems.Campus.length == 0) {
            this.dataItems.Campus = [""];
        }
        if (this.dataItems.Academy.length == 0) {
            this.dataItems.Academy = [""];
        }
        if (this.dataItems.Grade.length == 0) {
            this.dataItems.Grade = [""]
        }
        if (this.dataItems.Major.length == 0) {
            this.dataItems.Major = [""]
        }
        if (this.dataItems.Class.length == 0) {
            this.dataItems.Class = [""]
        }
        if (this.dataItems.Campus[0] == "" && this.dataItems.Academy[0] == "" && this.dataItems.Major[0] == "" && this.dataItems.Grade[0] == "" && this.dataItems.Class[0] == "") {
            this.show_value = "不做选择默认查询已发布的全部范围";
        } else {
            this.show_value = "已选择";
        }
    }
    //查看受众范围
    handleOkTop = (e) => {
        this.isVisibleTop = false;
    };
    handleCancelTop = (e) => {
        console.log(e);
        this.isVisibleTop = false;
    };
    AudienceScope() {
        this.isVisibleTop = true;

    }
    // 选择范围
    selectScals() {
        console.log(this.dataItems)
        this.isVisibleMiddle = true;
    }
    handleOkMiddle = (e) => {
        // this.isVisibleMiddle = false;
        this.analysis();
        this.judgeScope();
        this.isVisibleMiddle = false;
    };

    handleCancelMiddle = (e) => {
        var that = this;
        this.confirmServ.confirm({
            title: '您编辑的内容未保存，确定退出吗？',
            content: '',
            zIndex: 10000,
            onOk() {
                that.isVisibleMiddle = false;

            },
            onCancel() {
                that.isVisibleMiddle = true;
            }
        });
        // this.isVisibleMiddle = false;
    };
    analysis() {
        this.loading = true;
        if (this.dataItems.Campus.length == 0) {
            this.dataItems.Campus = [""];
        }
        if (this.dataItems.Academy.length == 0) {
            this.dataItems.Academy = [""];
        }
        if (this.dataItems.Grade.length == 0) {
            this.dataItems.Grade = [""]
        }
        if (this.dataItems.Major.length == 0) {
            this.dataItems.Major = [""]
        }
        if (this.dataItems.Class.length == 0) {
            this.dataItems.Class = [""]
        }

        this.httpService.Post({
            Router: ServelUrl.Url.getQuestionnaireAnalysis,
            Method: 'POST',
            Body: {
                SurveyID: this.surveyId,
                Campus: this.dataItems.Campus || '',
                Academy: this.dataItems.Academy || '',
                Major: this.dataItems.Major || [""],
                Grade: this.dataItems.Grade || [""],
                Class: this.dataItems.Class || [""],
                QuestionType: this.status || [],
            }
        }).subscribe(res => {
            this.loadCampus(this.universityID);
            this.loadAcademy(this.universityID);
            this.loadGade(this.universityID);
            this.loadMajor(this.universityID, this.dataItems.Academy);
            this.loadClass(this.universityID, this.dataItems.Major, this.dataItems.Grade);
            this.loading = false;
            if (!res.RE) {
                this.dataItems = res.Data;
                console.log(this.dataItems);
            } else {
                this.msgSrv.success(res.Text);

            }

        })
    }


    // 导出所有的
    download(data) {
        this.httpService.PostJSON({
            Router: ServelUrl.Url.exportAllDetails,
            Method: 'POST',
            Body: {
                SurveyID: this.surveyId,
                Campus: data.Campus,
                Academy: data.Academy,
                Major: data.Major,
                Grade: data.Grade,
                Class: data.Class,
            }
        }).then(res => {
            if (!res.RE) {
                this.msgSrv.success(res.FeedbackText);
                var a = document.createElement('a');
                var filename = '问卷分析.xlsx';
                a.href = res.Data.URL;
                a.download = filename;
                a.click();

                // window.open(res.Data.URL);

            } else if (res.RE == 1) {
                this.msgSrv.success(res.Text);
            }
        }).catch(re => {
            this.msgSrv.error('出错了亲');
        });
    }
    more(data, ques) {
        this.route.navigate(['/questionnaire/text', {
            SurveyID: this.surveyId, QuestionID: ques.QuestionID, campus: data.Campus, academy: data.Academy, class: data.Class,
            grade: data.Grade, major: data.Major, bigTitle: data.Title, questionTitle: ques.Title
        }]);

    }
    export(ques, data) {
        console.log(data)
        this.httpService.PostJSON({
            Router: ServelUrl.Url.exportJiandatiList,
            Method: 'POST',
            Body: {
                SurveyID: this.surveyId,
                QuestionID: ques.QuestionID,
                Campus: data.Campus,
                Academy: data.Academy,
                AcademyName: data.AcademyName,
                Major: data.Major,
                MajorName: data.MajorName,
                Grade: data.Grade,
                Class: data.Class,
                ClassName: data.ClassName
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.msgSrv.success(res.FeedbackText);
                // window.open(res.Data.URL);
                var a = document.createElement('a');
                var filename = '问卷分析.xlsx';
                a.href = res.Data.URL;
                a.download = filename;
                a.click();
            }
        }).catch(re => {
            this.msgSrv.error('出错了亲');
        });

    }
    nodo(data) {
        this.route.navigate(['/questionnaire/noanswerlist', { id: data.SurveyID, title: data.Title, campus: this.scopeCampus, academy: this.scopeAcademy, major: this.scopeMajor, grade: this.scopeGrade, class: this.scopeClass }])
    }


    /*校区*/
    loadCampus(id) {
        this.httpService.PostJSON({
            Router: ServelUrl.Url.getCampusList,
            Method: 'POST',
            Body: {
                UniversityID: [id],
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.Campuss = res.Data;
                console.log(this.Campuss)
            }
        });

    }
    // 学院
    loadAcademy(id) {
        this.httpService.PostJSON({
            Router: ServelUrl.Url.getAcademyList,
            Method: 'POST',
            Body: {
                University: id,
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.Academys = res.Data;
            }

        });
    }
    // 专业
    loadMajor(code, condition) {
        console.log(condition)
        this.httpService.PostJSON({
            Router: ServelUrl.Url.getMajorList,
            Method: 'POST',
            Body: {
                University: code,
                Academy: condition || [''],
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.Majors = res.Data;

            }

        });

    }
    // 年级
    loadGade(code) {
        this.httpService.PostJSON({
            Router: ServelUrl.Url.getGradeList,
            Method: 'POST',
            Body: {
                University: code
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.Grades = res.Data;
            }

        });
    }
    // 班级
    loadClass(code, major, grade) {

        this.httpService.PostJSON({
            Router: ServelUrl.Url.getClassList,
            Method: 'POST',
            Body: {
                University: code,
                Major: major || '',
                Grade: grade || '',
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.Classs = res.Data;
            }

        });
    }

    onSelect(type) {
        // console.log(this.item)
        switch (type) {
            case 'major':
                this.loadMajor(this.universityID, this.dataItems.Academy)
                break;
            case 'class':
                this.loadClass(this.universityID, this.dataItems.Major, this.dataItems.Grade);
                break;
        }
    }






}
