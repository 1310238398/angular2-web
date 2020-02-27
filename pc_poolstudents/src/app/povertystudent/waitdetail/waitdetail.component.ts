import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../ServelUrl";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
    selector: 'app-waitdetail',
    templateUrl: './waitdetail.component.html',
    styleUrls: ['./waitdetail.component.css']
})
export class WaitDetailComponent implements OnInit {

    dataSet = {
        IntelUserCode:'',//|字符串|学生内部代码|
        UserCode:'',//|字符串|学号|
        Name:'',//|字符串|姓名|
        Focus:'',//|字符串|重点关注信息|
        EnconomicScore:'',//|字符串|经济情况调查问卷成绩|
        SelfAssessmentScore:'',//|字符串|学生自评成绩|
        AttachIsChange:'',//|字符串|附件是否改变 0未改变 1已改变|
        EnconomicIsChange:'',//|字符串|经济调查是否改变 0未改变 1已改变|
        SelfAssessmentIsChange:'',//|字符串|自评是否改变 0未改变 1已改变|
        Status:'',//|字符串|状态 0待审批 2已拒绝|
        IsChange:'',//|字符串|是否有变更理由 0无 1有|
        CounselorStatus:'',//|字符串|辅导员完成状态 10为未完成，20为完成|
        AcadamyStatus:'',//|字符串|学院完成状态 10为未提交，20为已提交|
    }

    IntelUserCode = '';  //ID
    categray = ''; //分类
    Tasking = ''; //是否有任务 0无 1有
    CounselorStatus = '';
    AcadamyStatus = '';

    constructor(public httpService: HttpService, private route: ActivatedRoute, ) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.IntelUserCode = params['IntelUserCode'];
            this.categray = params['categray'];
            this.Tasking = params['Tasking'];
            this.CounselorStatus = params['CounselorStatus'];
            this.AcadamyStatus = params['AcadamyStatus'];
        });

        this.onSearch();
    }

    //获取数据列表
    onSearch() {
        this.httpService.POST({
            Router: ServelUrl.Url.approvalone,
            Method: 'POST',
            Body: {
                IntelUserCode: this.IntelUserCode,
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                if (res.Data != null) {
                    this.dataSet = res.Data;
                    console.log('1111111111')
                }
            }
        })
    }

    categrayChange(obj) {
        this.categray = obj;
    }




}
