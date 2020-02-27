import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../http/http.service';
import { ActivatedRoute, Params } from "@angular/router";
import { ServelUrl } from "../../../ServelUrl";

declare var $: any

@Component({
    selector: 'app-jingjiquestion',
    templateUrl: './jingjiquestion.component.html',
    styleUrls: ['./jingjiquestion.component.css']
})
export class JingjiquestionComponent implements OnInit {

    dataSet1 = [];
    dataSet2 = [];
    IntelUserCode = '';  //ID
    loadingHidden = true;

    //任务详情
    taskData = {
        TaskId: ''
    };
    AttachImg = []; //附件 临时
    imgTypeArr = []; //临时
    AttachImgYes = []; //附件 正式
    imgTypeArrYes = []; //正式

    constructor(public httpService: HttpService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.IntelUserCode = params['IntelUserCode'];
        });
        this.taskData = JSON.parse(sessionStorage.getItem('taskData'));
        this.onSearch();
    }

    //获取数据列表
    onSearch() {
        this.httpService.POST({
            Router: ServelUrl.Url.approvalonequestionnaire,
            Method: 'POST',
            Body: {
                IntelUserCode: this.IntelUserCode,
                QuestionnaireCode: 'antlinker-jjdc',
                TaskId: this.taskData.TaskId
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                if (res.Data.FormalDate != null) {
                    this.dataSet1 = res.Data.FormalDate
                    for (let i = 0; i < res.Data.FormalDate.length; i++) {
                        res.Data.FormalDate[i]['OptionArr'] = res.Data.FormalDate[i].Option.split("|");
                    }
                }
            }
        })
    }

    //查看附件 临时
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

    historyBack() {
        window.history.back()
    }





}



