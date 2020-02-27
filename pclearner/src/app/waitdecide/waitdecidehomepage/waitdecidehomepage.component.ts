import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../ServelUrl";
import { ActivatedRoute, Params } from "@angular/router";
import { NzMessageService, NzModalService } from "ng-zorro-antd";

@Component({
    selector: 'app-waitdecidehomepage',
    templateUrl: './waitdecidehomepage.component.html',
    styleUrls: ['./waitdecidehomepage.component.css']
})
export class WaitdecideHomepageComponent implements OnInit {

    dataSet = []

    TaskName = ""; //认定标题
    created = "" //开始时间
    StartDate = ''
    EndDate = "" //结束时间
    TaskId = ""  //任务ID

    lookNan = '1'  //是否显示查看 1显示

    timestamp = ''//当前时间戳
    
    useTaskId = '' //任务Id

    constructor(public httpService: HttpService, private confirmServ: NzModalService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        
        this.route.params.forEach((params: Params) => {
            this.TaskName = params['TaskName'];
            this.created = params['created'];
            this.EndDate = params['EndDate'];
        });

        this.useTaskId = JSON.parse(sessionStorage.getItem('useTaskId'));        

        this.onSearch();

        if(this.created.indexOf("-") != -1){
            this.StartDate = this.created
        }else{
            const Dates = new Date(parseInt(this.created)*1000);
            const year: number = Dates.getFullYear();
            const month: any = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
            const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
            this.StartDate = year + '-' + month + '-' + day;
        }

        this.timestamp = Math.round(new Date().getTime()/1000).toString();
    }

    //获取数据列表
    onSearch() {
        this.httpService.POST({
            Router: ServelUrl.Url.confirmclasslist,
            Method: 'POST',
            Body: {
                TaskId : this.useTaskId
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.dataSet = res.Data;
                for(let i=0;i<this.dataSet.length;i++){
                    if(this.dataSet[i].PubTime == '0'){
                        this.dataSet[i].PubTime = '0'
                    }else if(this.dataSet[i].PubTime == ''){
                        this.dataSet[i].PubTime = ''
                    } else{
                        if(parseInt(this.dataSet[i].PubTime) + 172800 > parseInt(this.timestamp)){
                            this.dataSet[i].PubTime = '1'  //公示中
                        }else{
                            this.dataSet[i].PubTime = '2'  //点击提交
                        }
                    }  
                }
            }
            console.log(this.dataSet)
        })
    }

    //帮助弹框
    info(contentTpl) {
        this.confirmServ.info({
            title: '待认定学生',
            content: contentTpl
        });
    }

    goback(){
        
    }

    //点击开始同步
    isVisible = false;
    showModal = () => {
        var checkStudent = []; //选择同步的学生
        this.isVisible = true;
    }
    handleOk = (e) => {
        console.log('点击了确定');
        this.isVisible = false;

        // this.httpService.postJSON({
        //     Router: ServelUrl.Url.syn,
        //     Method: 'POST',
        //     Body: {
        //         IntelUserCode: checkStudent.join(","),
        //     }
        // }).then(res => {
        //     if (!res.FeedbackCode) {
        //         this.msgSrv.success('同步成功');
        //         this.onSearch();  //再次请求最新数据
        //     }else{
        //         this.msgSrv.warning(res.FeedbackText);
        //     }
        // });

    }
    handleCancel = (e) => {
        console.log(e);
        this.isVisible = false;
    }


    isSubmit(obj){
        sessionStorage.setItem('isSubmit', JSON.stringify(obj));
    }



}
