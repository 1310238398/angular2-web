import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../../../http/http.service';
import { ServelUrl } from "../../../ServelUrl";

declare var $: any

@Component({
    selector: 'app-selfquestion',
    templateUrl: './selfquestion.component.html',
    styleUrls: ['./selfquestion.component.css']
})
export class SelfquestionComponent implements OnInit {
    dataDetail = {
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
    };
    dataSet1 = [];
    dataSet2 = [];

    IntelUserCode = '';  //ID
    loadingHidden = true;
    AttachImg = []; //附件 临时
    imgTypeArr = []; //临时
    AttachImgYes = []; //附件 正式
    imgTypeArrYes = []; //正式

    constructor(public httpService: HttpService) { }

    @Input() IntelUid;

    ngOnInit(): void {
        this.dataDetail = JSON.parse(sessionStorage.getItem('dataDetail'));
        this.IntelUserCode = this.IntelUid;
        this.onSearch();
    }

    //获取数据列表
    onSearch() {
        this.httpService.POST({
            Router: ServelUrl.Url.approvalonequestionnaire,
            Method: 'POST',
            Body: {
                IntelUserCode: this.IntelUserCode,
                QuestionnaireCode: 'antlinker-xszp'
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                if (res.Data.FormalDate != null) {
                    for (let i = 0; i < res.Data.FormalDate.length; i++) {
                        res.Data.FormalDate[i]['OptionArr'] = res.Data.FormalDate[i].Option.split("|")
                    }
                    this.dataSet1 = res.Data.FormalDate
                }

                if (res.Data.TempDate != null) {
                    for (let i = 0; i < res.Data.TempDate.length; i++) {
                        res.Data.TempDate[i]['OptionArr'] = res.Data.TempDate[i].Option.split("|")
                    }
                    this.dataSet2 = res.Data.TempDate;
                }
            }
        })
    }

    //查看附件
    loadImg(obj,i) {
        if (!this.imgTypeArr[i]) {
            this.httpService.POST({
                Router: ServelUrl.Url.queryattach,
                Method: 'POST',
                Body: {
                    result_id: obj
                }
            }).subscribe(res => {
                this.loadingHidden = false;
                if (!res.FeedbackCode) {
                    this.AttachImg[i] = res.Data;
                    this.imgTypeArr[i] = true;
                    setTimeout(function () {$("#a" + i + "0").click(); }, 100);
                }
            })
        } else {
            $("#a" + i + "0").click();
        }
    }

    //点击查看大图
    viewBigImg(i) {
        $('.jq22' + i).viewer()

    }



    //查看附件 正式
    loadImgYes(obj,i) {
        if (!this.imgTypeArrYes[i]) {
            this.httpService.POST({
                Router: ServelUrl.Url.queryattach,
                Method: 'POST',
                Body: {
                    result_id: obj
                }
            }).subscribe(res => {
                this.loadingHidden = false;
                if (!res.FeedbackCode) {
                    this.AttachImgYes[i] = res.Data;
                    this.imgTypeArrYes[i] = true;
                    setTimeout(function () {$("#ye" + i + "0").click(); }, 100);
                }
            })
        } else {
            $("#ye" + i + "0").click();
        }
    }

    //点击查看大图
    viewBigImgYes(i) {
        $('.jqimg' + i).viewer()
    }







}



