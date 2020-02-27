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

    disdden = true;

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
            Router: ServelUrl.Url.approvalonequestionnaire,
            Method: 'POST',
            Body: {
                IntelUserCode: this.menDataObj.IntelUserCode,
                QuestionnaireCode: 'antlinker-jjdc',
                TaskId: this.useTaskIdStr
                
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                if(res.Data.FormalDate != null){
                    this.dataSet1 = res.Data.FormalDate
                    for(let i=0;i<res.Data.FormalDate.length;i++){
                        res.Data.FormalDate[i]['OptionArr'] = res.Data.FormalDate[i].Option.split("|")
                    }
                }

                if(res.Data.TempDate != null){
                    this.dataSet2 = res.Data.TempDate;
                    for(let i=0;i<res.Data.TempDate.length;i++){
                        res.Data.TempDate[i]['OptionArr'] = res.Data.TempDate[i].Option.split("|")
                    }
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


    historyBack() {
        window.history.back()
    }





}



