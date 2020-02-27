import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd";

import { HttpService } from "../../http/http.service";
import { InformationService } from "./information.service";

import { ServelUrl } from "../ServelUrl";
import { Dept, Search } from './information';

@Component({
    selector: 'app-informationstatis',
    templateUrl: './statis.html',
    styleUrls: ['info.css']
})
export class InfoStatisComponent implements OnInit {
    loading = false;
    pageIndex = 1;
    pageSize = 20;
    total: number;
    dataSet = [];
    infoid = '';
    universitycode = '';
    campusList = [];
    academyList = [];
    majorList = [];
    gradeList = [];
    classList = [];
    scope = {
        campus: null,
        academy: null,
        major: null,
        grade: null,
        class: null
    };
    constructor(
        private location: Location,
        private router: Router,
        private route: ActivatedRoute,
        private msgsrv: NzMessageService,
        private httpService: HttpService,
        private informationService: InformationService
    ) { }

    ngOnInit() {

        this.getUniversity(); // 请求学校
        this.route.queryParams.subscribe((params: Params) => {
            if (params['id']) {
                this.infoid = params['id'];
                this.getUserList();
            }
        });
    }


    // 列表请求
    getUserList() {
        this.loading = true;
        this.informationService.queryInfoStatis(this.infoid, this.pageIndex, this.pageSize, this.scope).then(res => {
            if (res.RE === 0 &&res.Data&& res.Data.length > 0) {
                this.dataSet = res.Data;
            } else {
                this.dataSet = [];
            }
            this.loading = false;
        });
    }

    // 查询
    search(): void {
        this.pageIndex = 1;
        this.getUserList();
    }

    // 请求学校
    getUniversity(): void {
        this.informationService.queryUniversity().then(res => {
            this.universitycode = res.Data.University;

            this.getCampus(this.universitycode); // 请求校区
            this.getAcademy(this.universitycode); // 请求学院
            this.getGrade(this.universitycode); // 请求年级
        });
    }

    // 请求校区
    getCampus(universitycode: string): void {
        this.informationService.queryCampus(universitycode).then(res => {
            this.campusList = res.Data;
        });
    }

    // 请求学院
    getAcademy(universitycode: string): void {
        this.informationService.queryAcademy(universitycode).then(res => {
            this.academyList = res.Data;
        });
    }

    // 请求专业
    getMajor(universitycode: string, academyids: string[]): void {
        this.informationService.queryMajor(universitycode, academyids).then(res => {
            this.majorList = res.Data;
        });
    }

    // 请求年级
    getGrade(universitycode: string): void {
        this.informationService.queryGrade(universitycode).then(res => {
            this.gradeList = res.Data;
        });
    }

    // 请求班级
    getClass(universitycode: string, majorids: string[], gradeids: string[]): void {
        this.informationService.queryClass(universitycode, majorids, gradeids).then(res => {
            this.classList = res.Data;
        });
    }

    // 学院变化
    academyChange(academyid: string): void {
        console.log('academychange');
        if (!academyid) {
            this.majorList.length = 0;
            this.scope.major = null;
            return;
        }
        this.scope.major ? this.scope.major = null : null; // 清空班级列表

        const academyids = academyid.split(',');
        // 专业
        this.getMajor(this.universitycode, academyids);
    }

    // 专业变化
    majorChange(majorid: string): void {
        console.log('majorchange');
        if (!majorid || !this.scope.grade) {
            this.scope.class = null;
            this.classList = [];
            return;
        }
        this.scope.class ? this.scope.class = null : null; // 清空班级列表
        const majorids = majorid.split(',');
        // 班级
        this.getClass(this.universitycode, majorids, this.scope.grade.split(','));
    }

    // 年级变化
    gradeChange(grade: string): void {

        if (!grade || !this.scope.major) {
            this.scope.class = null;
            this.classList = [];
            return;
        }
        this.scope.class ? this.scope.class = null : null; // 清空班级列表
        // const majorids = [];
        // this.scope.major.forEach((value, index) => {
        //     majorids.push(value.deptcode);
        // });
        const gradeids = grade.split(',');
        // 班级
        this.getClass(this.universitycode, this.scope.major.split(','), gradeids);
    }

    // 返回
    back(): void {
        this.location.back();
    }
}
