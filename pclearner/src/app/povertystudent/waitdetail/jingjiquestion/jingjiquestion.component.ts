import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../../../http/http.service';
import { ServelUrl } from "../../../ServelUrl";
import { ActivatedRoute, Params } from "@angular/router";
import { NzMessageService, NzModalService } from "ng-zorro-antd";

@Component({
    selector: 'app-jingjiquestion',
    templateUrl: './jingjiquestion.component.html',
    styleUrls: ['./jingjiquestion.component.css']
})
export class JingjiquestionComponent implements OnInit {


    IntelUserCode = '';  //ID
    disdden = true;
    loadingHidden = true;

    constructor(public httpService: HttpService, private route: ActivatedRoute, ) { }

    @Input() IntelUid;

    ngOnInit(): void {
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
                QuestionnaireCode: 'antlinker-jjdc'
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
    tankbox(obj) {
        this.disdden = false;
        this.httpService.POST({
            Router: ServelUrl.Url.queryattach,
            Method: 'POST',
            Body: {
                result_id: obj
            }
        }).subscribe(res => {
            this.loadingHidden = false
            if (!res.FeedbackCode) {
                this.imgArr1 = res.Data
            }
        })
    }

    //关闭附件
    overbox() {
        this.disdden = true;
    }


    dataSet1 = []

    dataSet2 = []

    imgArr1 = [

    ]








}



