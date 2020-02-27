import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../ServelUrl";
import { ActivatedRoute, Params } from "@angular/router";
import { NzMessageService, NzModalService } from "ng-zorro-antd";


import { ApplyBookComponent } from "./applybook/applybook.component";
import { JingjiquestionComponent } from "./jingjiquestion/jingjiquestion.component";
import { SelfquestionComponent } from "./selfquestion/selfquestion.component";
import { StatuspassComponent } from "./statuspass/statuspass.component";
import { WhychangeComponent } from "./whychange/whychange.component";

@Component({
    selector: 'app-waitdetail',
    templateUrl: './waitdetail.component.html',
    styleUrls: ['./waitdetail.component.css']
})
export class WaitDetailComponent implements OnInit {

    dataSet = {
        UserCode: '2017031245',      //学号
        Name: '小订单',          //姓名
        EnconomicScore: '22.4',
        SelfAssessmentScore: '59.5',
        AttachIsChange: '1',
        EnconomicIsChange: '1',
        SelfAssessmentIsChange: '0',
        Status: '0',
    }

    IntelUserCode = '';  //ID
    categray = ''; //分类

    dataKong = true;


    constructor(public httpService: HttpService, private route: ActivatedRoute, ) { }

    ngOnInit(): void {
        
        this.route.params.forEach((params: Params) => {
            this.IntelUserCode = params['IntelUserCode'];
            this.categray = params['categray'];
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

                }else{
                    this.dataKong = false
                }
            }
        })
    }

    categrayChange(obj) {
        this.categray = obj;
    }




}
