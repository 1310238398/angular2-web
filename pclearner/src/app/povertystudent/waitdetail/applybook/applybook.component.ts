import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../../../http/http.service';
import { ServelUrl } from "../../../ServelUrl";
import { ActivatedRoute, Params } from "@angular/router";
import { NzMessageService, NzModalService } from "ng-zorro-antd";

@Component({
    selector: 'app-applybook',
    templateUrl: './applybook.component.html',
    styleUrls: ['./applybook.component.css']
})
export class ApplyBookComponent implements OnInit {

    IntelUserCode = '';  //ID
    categray = ''; //分类
    disdden = true;
    topImg = {
        img : '',
        caption : ''
    }

    imgArr1 = []
    imgArr2 = []
    imgArr3 = []

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
            Router: ServelUrl.Url.approvaloneattach,
            Method: 'POST',
            Body: {
                IntelUserCode: this.IntelUserCode,
                Status:'0'
            }
        }).subscribe(res => {
            this.loadingHidden = false
            if (!res.FeedbackCode) {
                if (res.Data != null) {
                    for (let i = 0; i < res.Data.length; i++) {
                        if (res.Data[i].Code == '9700001') {
                            this.imgArr1 = res.Data[i].Attachs;
                        } else if (res.Data[i].Code == '9700002') {
                            this.imgArr2 = res.Data[i].Attachs;
                        } else if (res.Data[i].Code == '9700003') {
                            this.imgArr3 = res.Data[i].Attachs;
                        }
                    }
                }
            }
        })
    }

    //查看附件
    tankbox(obj,mmr) {
        this.topImg.img= obj;
        this.topImg.caption= mmr;
        this.disdden = false;
    }

    //关闭附件
    overbox() {
        this.disdden = true;
    }







}
