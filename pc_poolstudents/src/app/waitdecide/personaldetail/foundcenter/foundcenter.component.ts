import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";
import { HttpService } from '../../../../http/http.service';
import { ServelUrl } from "../../../ServelUrl";

@Component({
    selector: 'app-foundcenter',
    templateUrl: './foundcenter.component.html',
    styleUrls: ['./foundcenter.component.css']
})
export class FoundCenterComponent implements OnInit {
    //个人信息详情
    menDataObj = {
        StudentNSID: '20155122336',	//记录内码
        IntelUserCode: '',
        ClassCode: '',
        Status: '',
        RecognitionLevel: '',
        TaskName: '',
        StartDate: '',
        EndDate: '',
        categray: '',
        IsAttach: '',
        SchoolAttitude:''
    }

    IntelUserCode = '';
    //任务详情
    taskData = { TaskId: '', }
    //已经认定意见查看详情
    dataObj = {
        IntelUserCode: '201451254',
        Status: '41',      //认定意见 41直接认定 42一票否定 43小组评议
        ConfirmReason: '', //详细说明
        ConfirmReasonSelect: '', //原因 多个|分隔
        RecognitionLevel: '87000010',
        SchoolAttitude: '0',//资助中心意见 0进行中 1通过 2拒绝 |
        SchoolConfirmReason: '', //审批不通过原因|
    }

    writeText = '';    //认定原因
    valuesNum = 100;    //认定原因字数
    dataArr = [];       //复选框选择的选项

    userIdentity = '';  //当前用户身份  
    taskStatus = '';    //当前任务状态 2已关闭 3进行中 4已结束
    CounselorStatus = '10';	//辅导员完成状态 10为未完成，20为完成
    AcadamyStatus = '10';	//学院完成状态 10为未提交，20为已提交

    isVisible = false;  //批量审批状态 

    constructor(public httpService: HttpService, private msgSrv: NzMessageService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.IntelUserCode = params['IntelUserCode'];
        });
        this.taskData = JSON.parse(sessionStorage.getItem('taskData'));
        this.taskStatus = JSON.parse(sessionStorage.getItem('taskStatus'));
        this.userIdentity = JSON.parse(sessionStorage.getItem('userIdentity'));
        this.CounselorStatus = JSON.parse(sessionStorage.getItem('CounselorStatus'));
        this.AcadamyStatus = JSON.parse(sessionStorage.getItem('AcadamyStatus'));

        this.onSearch();
        this.loadOneDetail();
    }

    //获取个人数据
    loadOneDetail() {
        this.httpService.POST({
            Router: ServelUrl.Url.eliberateone,
            Method: 'POST',
            Body: {
                IntelUserCode: this.IntelUserCode,
                TaskId: this.taskData.TaskId
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.menDataObj = res.Data;
            }
        })
    }

    //获取已经认定的结果详情
    onSearch() {
        this.httpService.POST({
            Router: ServelUrl.Url.counselorconfirmq,
            Method: 'POST',
            Body: {
                IntelUserCode: this.IntelUserCode,
                TaskId: this.taskData.TaskId
            }
        }).subscribe(res => {
            if (!res.FeedbackCode && res.Data != null) {
                this.dataObj = res.Data;
                if (res.Data.ConfirmReasonSelect) {
                    this.dataArr = res.Data.ConfirmReasonSelect.split("|")
                }
            }
        })
    }

    //审批通过
    approvePass() {
        this.writeText = '';
        this.overbox('1')
    }

    //审批不通过弹框
    showModal = () => {
        this.isVisible = true;
    }

    //审批提交方法
    overbox(status) {
        this.httpService.POST({
            Router: ServelUrl.Url.FundCenterApprovalOne,
            Method: 'POST',
            Body: {
                StudentNSID: this.menDataObj.StudentNSID,
                SchoolAttitude: status,
                SchoolConfirmReason: this.writeText
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.msgSrv.success('审批成功');
                const that = this;
                setTimeout(function () {
                    that.historyBack()
                }, '1200');
            }
        })

    }

    //确定审批不通过
    handleOk = (e) => {
        if (this.writeText.trim() == '') {
            this.msgSrv.warning('请填写审批不通过原因');
            return false
        }
        this.overbox('2')
        this.isVisible = false;
    }
    //取消审批
    handleCancel = (e) => {
        this.isVisible = false;
    }

    //备注框字数变化
    txtChange(value: string) {
        this.valuesNum = 100 - value.length
    }
    //返回上一页
    historyBack() {
        window.history.back()
    }



}



