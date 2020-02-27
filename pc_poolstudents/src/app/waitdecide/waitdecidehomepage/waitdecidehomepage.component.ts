import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../ServelUrl";
import { ActivatedRoute, Params } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";

@Component({
    selector: 'app-waitdecidehomepage',
    templateUrl: './waitdecidehomepage.component.html',
    styleUrls: ['./waitdecidehomepage.component.css']
})
export class WaitdecideHomepageComponent implements OnInit {
    //辅导员 学院数据列表
    dataSet = [];
    //资助中心数据列表
    dataFunding = [];

    taskData = {
        TaskId: '',  //任务ID
        TaskName: '', //认定标题
        created: '',   //创建时间
        StartDate: '', //开始时间
        EndDate: '',   //结束时间
    }
    userIdentity = '';  //当前用户身份  
    taskStatus = '';    //当前任务状态 2已关闭 3进行中 4已结束

    CounselorStatus = '';	//辅导员完成状态 10为未完成，20为完成
    AcadamyStatus = '';	//学院完成状态 10为未提交，20为已提交
    ApprovalStatus = '';	//审批进程 0未审批 11学院领导审批通过 12学院领导审批不通过 21资助中心审核通过 22资助中心审核不通过
    RefuseReason = '';	//审核不通过原因

    isCompleteBox = false; //完成弹框
    comTitle = '';
    classNotCom = []; //未满足提交条件的班级
    classNotComJson = '';//未满足提交条件的班级 字符串
    academicStatus = true; //学院其他辅导员是否满足提交条件  false 不满足  true 满足
    isSubmitYes = false;   //其他辅导员满足提交条件
    isSubmitNo = false;   //其他辅导员不满足提交条件
    isRefuse = false;    //审批不通过弹框

    RefuseTxt = '';  //拒绝理由  
    workFlowData = {};  //工作流发起详细参数


    DownloadURL = []; //下载链接
    Grades = '';  //任务年级

    //合计
    totalAcademic = {
        UnConfirmCount: 0,
        Count43Un: 0,
        Count4330: 0,
        Count4320: 0,
        Count4310: 0,
        Count4340: 0,
    }

    isTotal = true;
    DownloadURLNot = [];

    academicAll = [];  //全部学院是否完成
    academicAllStatus = false;  //是否完成
    loadFunderUrl = '';

    constructor(public httpService: HttpService, private msgSrv: NzMessageService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.Grades = params['Grades'];   //任务年级
        });

        this.taskData = JSON.parse(sessionStorage.getItem('taskData'));
        this.taskStatus = JSON.parse(sessionStorage.getItem('taskStatus'));
        this.userIdentity = JSON.parse(sessionStorage.getItem('userIdentity'));

        //根据角色加载不同数据
        if (this.userIdentity == 'FundCenter') {
            this.loadFundingCenter();
            this.loadURLFunder()
        } else {
            this.onSearch(); //获取数据
            this.loadOverStatus(); //获取当前老师和学院完成状态
        }
    }

    //获取数据列表 --辅导员  学院
    onSearch() {
        this.httpService.POST({
            Router: ServelUrl.Url.confirmclasslist,
            Method: 'POST',
            Body: {
                TaskId: this.taskData.TaskId
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.dataSet = res.Data;
            }
        })
    }

    //获取数据列表 --资助中心
    loadFundingCenter() {
        this.httpService.POST({
            Router: ServelUrl.Url.ConfirmAcademyList,
            Method: 'POST',
            Body: {
                TaskId: this.taskData.TaskId
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.dataFunding = res.Data;

                if (res.Data.length == 0) {
                    this.isTotal = false
                } else {
                    this.isTotal = true
                }

                for (let i = 0; i < this.dataFunding.length; i++) {
                    this.totalAcademic.UnConfirmCount = this.totalAcademic.UnConfirmCount + parseInt(this.dataFunding[i].UnConfirmCount)
                    this.totalAcademic.Count43Un = this.totalAcademic.Count43Un + parseInt(this.dataFunding[i].Count43Un)
                    this.totalAcademic.Count4330 = this.totalAcademic.Count4330 + parseInt(this.dataFunding[i].Count4330)
                    this.totalAcademic.Count4320 = this.totalAcademic.Count4320 + parseInt(this.dataFunding[i].Count4320)
                    this.totalAcademic.Count4310 = this.totalAcademic.Count4310 + parseInt(this.dataFunding[i].Count4310)
                    this.totalAcademic.Count4340 = this.totalAcademic.Count4340 + parseInt(this.dataFunding[i].Count4340)
                    this.dataFunding[i]['academicTotal'] = ((parseInt(this.dataFunding[i].Count4310) + parseInt(this.dataFunding[i].Count4320) + parseInt(this.dataFunding[i].Count4330)) / parseInt(this.dataFunding[i].Members) * 100).toFixed(2);

                    if (this.dataFunding[i].ApprovalStatus == '21') {
                        this.academicAll.push(this.dataFunding[i].AcademyCode)
                    }
                }

                if (this.dataFunding.length == this.academicAll.length) {
                    this.academicAllStatus = true
                } else {
                    this.academicAllStatus = false
                }
            }
        })
    }

    //获取当前老师和学院完成状态
    loadOverStatus() {
        this.httpService.POST({
            Router: ServelUrl.Url.CounselorAcadamyDoneStatus,
            Method: 'POST',
            Body: {
                TaskId: this.taskData.TaskId
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.CounselorStatus = res.Data.CounselorStatus;
                this.AcadamyStatus = res.Data.AcadamyStatus;
                this.ApprovalStatus = res.Data.ApprovalStatus;
                this.RefuseReason = res.Data.RefuseReason;
                sessionStorage.setItem('CounselorStatus', JSON.stringify(this.CounselorStatus));   //辅导员完成状态
                sessionStorage.setItem('AcadamyStatus', JSON.stringify(this.AcadamyStatus));   //学院完成状态 

                //加载下载链接接口
                this.loadURLTable();
            }
        })
    }

    //学院辅导员下载链接获取接口
    loadURLTable() {
        this.httpService.POST({
            Router: ServelUrl.Url.exportidentifydata,
            Method: 'POST',
            Body: {
                grades: this.Grades,
                task: this.taskData.TaskId
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                if (res.Data.length != 0) {
                    this.DownloadURL = res.Data;
                } else {
                    this.DownloadURLNot = this.Grades.split(",");
                }
            }
        })
    }
    //未结束时的下载提示
    toastTxt() {
        this.msgSrv.warning('资助中心审批通过后才可以导出汇总表');
    }

    //点击完成按钮 --弹框出现===============
    completeOk() {
        this.classNotCom = []
        for (let i = 0; i < this.dataSet.length; i++) {
            if (this.dataSet[i].UnConfirmCount != '0' || this.dataSet[i].CountAppro41 != this.dataSet[i].Count41 || this.dataSet[i].CountAppro42 != this.dataSet[i].Count42 || this.dataSet[i].CountAppro43 != this.dataSet[i].Count43 || this.dataSet[i].Count43Un != '0') {
                this.classNotCom.push(this.dataSet[i].ClassName);
            }
        }

        if (!this.classNotCom.length) {
            this.comTitle = '您名下的班级均满足提交条件';
            this.completeStatus('20');
        } else {
            this.comTitle = '以下班级未满足提交条件';
            this.classNotComJson = this.classNotCom.join('/');
        }
        this.isCompleteBox = true;
    }
    //点击 '好的' 完成弹框消失
    allRightFunc = (e) => {
        if (!this.classNotCom.length) {
            this.CounselorStatus = '20'
            this.loadOverStatus(); //获取当前老师和学院完成状态
        }
        this.isCompleteBox = false;
    }
    //点击其他区域 完成弹框消失
    completeCancel = (e) => {
        this.isCompleteBox = false;
    }
    //将完成状态提交后台
    completeStatus(res) {
        this.httpService.POST({
            Router: ServelUrl.Url.UpCounselorDoneStatus,
            Method: 'POST',
            Body: {
                CounselorDoneStatus: res,
                TaskId: this.taskData.TaskId
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.loadOverStatus();
            }
        })
    }
    //点击修改按钮        ========================
    changeComplete() {
        this.completeStatus('10');
    }
    //点击提交按钮       =========================
    SubmitAcademic() {
        this.httpService.POST({
            Router: ServelUrl.Url.GetCounselorDoneStatus,
            Method: 'POST',
            Body: {
                TaskId: this.taskData.TaskId
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                for (let i = 0; i < res.Data.length; i++) {
                    if (res.Data[i].CounselorDoneStatus == '10') {
                        this.academicStatus = false;
                        break;
                    }
                }

                if (this.academicStatus) {
                    this.isSubmitYes = true;
                } else {
                    this.isSubmitNo = true;
                }
            }
        })
    }
    //其他辅导员满足提交条件 '确定' 按钮
    submitYesOk = (e) => {
        this.isSubmitYes = false;

        this.httpService.POST({
            Router: ServelUrl.Url.ApproveInfoDetail,
            Method: 'POST',
            Body: {
                TaskId: this.taskData.TaskId
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.workFlowData = res.Data;
                this.workFlow(); //发起工作流
            }
        })
    }
    //工作流发起
    workFlow() {
        var formData = {
            action: "counsellor",
            title: '贫困生认定结果审批',
            timestart: this.nowDay(),
            statustxt: '学院分管领导审批中',
            status: '1',
        }

        var assignObj = Object.assign(formData, this.workFlowData);

        this.httpService.postFLOW({
            Router: ServelUrl.Url.launch,
            Method: 'POST',
            Body: {
                flow_id: '',
                flow_code: 'Process_StudentNeedSupport',
                form_data: JSON.stringify(assignObj)
            }
        }).subscribe(res => {
            if (res == 'ok') {
                this.msgSrv.success('提交成功');
                this.loadOverStatus();
            } else {
                this.msgSrv.warning(res.FeedbackText);
            }
        });
    }
    //其他辅导员满足提交条件 '取消' 按钮
    submitYesCancel = (e) => {
        this.isSubmitYes = false;
    }
    //其他辅导员不满足提交条件 '好的' 按钮
    submitNo = (e) => {
        this.isSubmitNo = false;
    }
    //审批不通过弹框出现
    refuseFunc(text) {
        this.RefuseTxt = text;
        this.isRefuse = true;
    }
    //审批不通过弹框消失
    RefuseCancel = (e) => {
        this.isRefuse = false;
    }
    //获取日期
    nowDay() {
        const Dates = new Date();
        const year: number = Dates.getFullYear();
        const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
        const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
        return year + '-' + month + '-' + day
    }

    //资助中心下载==========================================================

    //未结束时的下载提示
    toastFunderTxt() {
        this.msgSrv.warning('所有学院审批通过后才可以导出汇总表');
    }

    //资助中心下载链接获取接口
    loadURLFunder() {
        this.httpService.POST({
            Router: ServelUrl.Url.finalexportidentifydata,
            Method: 'POST',
            Body: {
                task: this.taskData.TaskId
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.loadFunderUrl = res.Data[0].filename;
            }
        })
    }




}
