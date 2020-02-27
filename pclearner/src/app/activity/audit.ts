import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd";
import { ActivityService } from "./activity.service";


@Component({
    selector: 'app-activityaudit',
    templateUrl: './audit.html',
    styleUrls: ['activity.css']
})
export class ActivityAuditComponent implements OnInit {
    action = '';
    activityid = '';
    universitycode = '';
    valForm = {
        ACTIVITYTITLE: '',
        ACTIVITYDESC: '',
        ACTIVITYLOWER: '',
        ACTIVITYEND: '',
        ACTIVITYSTART: '',
        ACTIVITYADD: '',
        ACTIVITYTYPE: '',
        ACTIVITYSPONSOR: '',
        IMAGECOUNT: 0,
        CAMPUS: [],
        ACADEMY: [],
        ACADEMYNAME: [],
        MAJOR: [],
        MAJORNAME: [],
        CLASS: [],
        CLASSNAME: [],
        GRADE: []
    };
    imgs = [];
    campusList = [];
    academyList = [];
    majorList = [];
    gradeList = [];
    classList = [];
    audit = {
        EXAMINERESULT: '1',
        EXAMINEDESC: ''
    };
    scope = {
        campus: [],
        academy: [],
        major: [],
        grade: [],
        class: []
    };

    constructor(
        private location: Location,
        private router: Router,
        private route: ActivatedRoute,
        private msgsrv: NzMessageService,
        private activityService: ActivityService,
    ) { }

    ngOnInit() {
        // this.getUniversity(); // 请求学校
        this.route.queryParams.subscribe((params: Params) => {
            this.action = params['action'];
            if (params['id']) {
                this.activityid = params['id'];
                this.getInfoOne(this.activityid);
            }
        });
    }

    // 精确查询
    getInfoOne(id: string): void {
        this.activityService.queryOne(id).then(res => {
            this.valForm = res.Data;
            if (this.valForm.IMAGECOUNT > 0) {
                for (let i = 0; i < this.valForm.IMAGECOUNT; i++) {
                    this.imgs.push(`<img width="120" height="120" src="/static/activity/${this.activityid}/${i}.jpg?time=${Math.random()}">`);
                }
            }
            // this.valForm.value.CAMPUS ? this.scope.campus = this.valForm.value.CAMPUS : [];
            // this.valForm.value.GRADE ? this.scope.grade = this.valForm.value.GRADE : [];
            // this.valForm.value.ACADEMY ? this.scope.academy = this.valForm.value.ACADEMY : [];
            // this.valForm.value.MAJOR ? this.scope.major = this.valForm.value.MAJOR : [];
            // this.valForm.value.CLASS ? this.scope.class = this.valForm.value.CLASS : [];
            // if (this.scope.academy.length > 0) {
            //     this.academyChange(this.scope.academy, 'edit');
            // }
            // if (this.scope.grade.length > 0 && this.scope.major.length > 0) {
            //     this.gradeChange(this.scope.grade, 'edit');
            // }
        });
    }

    // 请求学校
    getUniversity(): void {
        this.activityService.queryUniversity().then(res => {
            this.universitycode = res.Data.University;

            this.getCampus(this.universitycode); // 请求校区
            this.getAcademy(this.universitycode); // 请求学院
            this.getGrade(this.universitycode); // 请求年级
        });
    }

    // 请求校区
    getCampus(universitycode: string): void {
        this.activityService.queryCampus(universitycode).then(res => {
            this.campusList = res.Data;
        });
    }

    // 请求学院
    getAcademy(universitycode: string): void {
        this.activityService.queryAcademy(universitycode).then(res => {
            this.academyList = res.Data;
        });
    }

    // 请求专业
    getMajor(universitycode: string, academyids: string[]): void {
        this.activityService.queryMajor(universitycode, academyids).then(res => {
            this.majorList = res.Data;
        });
    }

    // 请求年级
    getGrade(universitycode: string): void {
        this.activityService.queryGrade(universitycode).then(res => {
            this.gradeList = res.Data;
        });
    }

    // 请求班级
    getClass(universitycode: string, majorids: string[], gradeids: string[]): void {
        this.activityService.queryClass(universitycode, majorids, gradeids).then(res => {
            this.classList = res.Data;
        });
    }

    auditFunc(): void {
        if (this.audit.EXAMINERESULT === '0' && (!this.audit.EXAMINEDESC || this.audit.EXAMINEDESC.trim().length === 0)) {
            this.msgsrv.error('请输入不通过原因', { nzDuration: 5000 });
            return;
        }
        this.activityService.audit(this.activityid, this.audit.EXAMINERESULT, this.audit.EXAMINEDESC).then(res => {
            this.msgsrv.success(res.Text);
            this.router.navigate(['/activity']);
        });
    }


    cancle(): void {
        this.router.navigate(['/activity']);
    }


    // 返回
    back(): void {
        this.location.back();
    }
}
