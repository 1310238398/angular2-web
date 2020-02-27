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

    disdden = true;
    topImg = {
        img : '',
        caption : ''
    }

    imgArr1 = [];
    imgArr2 = [];
    imgArr3 = [];

    menDataObj = {
        IntelUserCode:'',
        ClassCode:'',
        Status:'',
        RecognitionLevel:'',
        TaskName:'',
        StartDate:'',
        EndDate:'',
        categray:''
    }

    useTaskIdStr = ''  //任务ID
    loadingHidden = true;
    
    constructor(public httpService: HttpService, private route: ActivatedRoute, ) { }

    @Input() menData;

    ngOnInit(): void {
        this.menDataObj = this.menData;
        this.useTaskIdStr = JSON.parse(sessionStorage.getItem('useTaskId'));
        
        this.onSearch();
    }

    //获取数据列表
    onSearch() {
        this.httpService.POST({
            Router: ServelUrl.Url.approvaloneattach,
            Method: 'POST',
            Body: {
                IntelUserCode: this.menDataObj.IntelUserCode,
                Status:'3',
                TaskId: this.useTaskIdStr
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.loadingHidden = false
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



    historyBack() {
        window.history.back()
    }



}
