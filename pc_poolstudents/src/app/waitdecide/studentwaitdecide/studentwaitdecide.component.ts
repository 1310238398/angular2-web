import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../ServelUrl";
import { ActivatedRoute, Params } from "@angular/router";
import { NzMessageService, NzModalService } from "ng-zorro-antd";


@Component({
    selector: 'app-studentwaitdecide',
    templateUrl: './studentwaitdecide.component.html',
    styleUrls: ['./studentwaitdecide.component.css']
})
export class StudentWaitdecideComponent implements OnInit {
    //提交过数据学生列表 --待认定 --辅导员 学院
    hasDataList = [];
    //无数据学生列表 --待认定  --辅导员 学院
    notDataList = [];
    //已被认定学生列表 --已认定 --辅导员 学院
    overDataList = [];
    //提交过数据学生列表 --待认定 --资助中心
    FundingDataList = [];
    //任务信息详情
    taskData = {
        TaskId:'',//|字符串|任务id|
        TaskName:'',//|字符串|任务名称|
        TaskType:'',//|字符串|任务类型|
        StartDate:'',//|字符串|学生自评调查问卷填报开启时间|
        EndDate:'',//|字符串|学院上报截止时间|
        Grades:'',//|字符串|受众年级组，多个以英文逗号分隔|
        Note:'',//|字符串|认定说明|
        Status:'',//|字符串|任务状态 2已关闭 3进行中 4已结束|
        created:'',//|字符串|创建时间|
    }
    pageDetail = {
        ClassCode: '',                 //班级代码
        Status: '',                    //进程状态
        RecognitionLevel: '',        //认定结果码
        teacherTxt: '辅导员认定意见',  // 表头主文字  辅导员认定意见   
        studentTxt: "待认定学生",      //表头副文字
        IntelUserCode: '',              //学生ID
        comeStatus: '',                //学生被评等级状态         
    }
    //弹框数据样式变化
    dataReview = {
        Status: '87000030',
        RefuseReason: '',
        BgStyle1: 'primary',
        BgStyle2: 'default',
        BgStyle3: 'default',
        BgStyle4: 'default',
    }

    //分页
    page = {
        Page: 1,
        PageSize: 40,
        total: 0,
    };

    allChecked = false;             //全选        有提交资料
    indeterminate = false;          //全选样式     有提交资料
    NotallChecked = false;          //全选         无提交资料
    Notindeterminate = false;       //全选样式     无提交资料
    OtherallChecked = false;        //全选      民主评议  待评议学生 -- 批量评议
    Otherindeterminate = false;     //全选样式  民主评议  待评议学生 -- 批量评议

    isHelpBox = false;  //帮助弹框状态 
    isVisible = false;  //批量审批小组评议状态 
    isReview = false;   //批量认定等级 

    userIdentity = '';  //当前用户身份  
    taskStatus = '';    //当前任务状态 2已关闭 3进行中 4已结束
    CounselorStatus = '10';	//辅导员完成状态 10为未完成，20为完成
    AcadamyStatus = '10';	//学院完成状态 10为未提交，20为已提交

    isChange = true;  //是否可以进行修改
    BtIndex = '';

    ApproveGray:any;

    constructor(public httpService: HttpService, private route: ActivatedRoute, private msgSrv: NzMessageService) { }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.pageDetail.ClassCode = params['ClassCode'];
            this.pageDetail.Status = params['Status'];              //认定状态  走到哪一步
            this.pageDetail.RecognitionLevel = params['RecognitionLevel'];
        });

        this.taskData = JSON.parse(sessionStorage.getItem('taskData'));
        this.taskStatus = JSON.parse(sessionStorage.getItem('taskStatus'));
        this.userIdentity = JSON.parse(sessionStorage.getItem('userIdentity'));
        this.CounselorStatus = JSON.parse(sessionStorage.getItem('CounselorStatus'));
        this.AcadamyStatus = JSON.parse(sessionStorage.getItem('AcadamyStatus'));

        if (this.taskStatus == '3' && this.userIdentity == 'Counselor' && this.CounselorStatus == '10' && this.AcadamyStatus == '10') {
            this.isChange = true;
        } else {
            this.isChange = false;
        }

        this.headStatus();

        //0 表示从待认定学生进入
        if (this.pageDetail.Status == '0' && this.userIdentity != 'FundCenter') {
            this.onSearch();
        } else if (this.pageDetail.Status != '0' && this.userIdentity != 'FundCenter') {
            this.onSearchOther()
        } else if (this.userIdentity == 'FundCenter') {
            if (this.pageDetail.Status == '0') {
                this.BtIndex = '4'
                this.loadFundingList();
            } else {
                this.BtIndex = this.pageDetail.Status
                this.loadFundingList();
            }
        }

    }

    //待认定学生  无认定意见 ----辅导员 学院
    onSearch() {
        this.httpService.POST({
            Router: ServelUrl.Url.confirmstudentlist,
            Method: 'POST',
            Body: {
                ClassCode: this.pageDetail.ClassCode,
                TaskId: this.taskData.TaskId
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                if (res.Data != null) {
                    this.hasDataList = res.Data.UnConfirmStudent;
                    this.notDataList = res.Data.OtherStudent;
                }
            }
        })
    }
    //已认定学生  有认定意见 ----辅导员 学院
    onSearchOther() {
        this.httpService.POST({
            Router: ServelUrl.Url.eliberatelist,
            Method: 'POST',
            Body: {
                ClassCode: this.pageDetail.ClassCode,
                Status: this.pageDetail.Status,
                RecognitionLevel: this.pageDetail.RecognitionLevel,
                TaskId: this.taskData.TaskId
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.overDataList = res.Data
            }
        })
    }
    //全部情况列表  ----  资助中心
    loadFundingList() {
        this.httpService.POST({
            Router: ServelUrl.Url.AcademyEliberateList,
            Method: 'POST',
            Body: {
                Page: this.page.Page,
                Count: this.page.PageSize,
                AcademyCode: this.pageDetail.ClassCode,
                Status: this.BtIndex,
                RecognitionLevel: this.pageDetail.RecognitionLevel,
                TaskId: this.taskData.TaskId
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.FundingDataList = res.Data.Data
                this.page.total = res.Data.Total

            }
        })
    }

    //头部显示状态判断
    headStatus() {
        if (this.pageDetail.Status == '0') {
            this.pageDetail.studentTxt = '待认定学生';
            this.pageDetail.teacherTxt = "辅导员认定意见";
        } else if (this.pageDetail.Status == '41') {
            this.pageDetail.studentTxt = '直接认定学生'
            this.pageDetail.teacherTxt = "辅导员认定意见"
        } else if (this.pageDetail.Status == '42') {
            this.pageDetail.studentTxt = '一票否决学生'
            this.pageDetail.teacherTxt = "辅导员认定意见"
        } else if (this.pageDetail.Status == '43' && this.pageDetail.RecognitionLevel == '1') {
            this.pageDetail.studentTxt = '小组评议学生'
            this.pageDetail.teacherTxt = "辅导员认定意见"
        } else if (this.pageDetail.Status == '43' && this.pageDetail.RecognitionLevel == '0') {
            this.pageDetail.studentTxt = '待评议学生'
            this.pageDetail.teacherTxt = "民主评议结果"
        } else if (this.pageDetail.Status == '43' && this.pageDetail.RecognitionLevel == '87000010') {
            this.pageDetail.studentTxt = '一般困难学生'
            this.pageDetail.teacherTxt = "民主评议结果"
        } else if (this.pageDetail.Status == '43' && this.pageDetail.RecognitionLevel == '87000020') {
            this.pageDetail.studentTxt = '困难学生'
            this.pageDetail.teacherTxt = "民主评议结果"
        } else if (this.pageDetail.Status == '43' && this.pageDetail.RecognitionLevel == '87000030') {
            this.pageDetail.studentTxt = '特殊困难学生'
            this.pageDetail.teacherTxt = "民主评议结果"
        } else if (this.pageDetail.Status == '43' && this.pageDetail.RecognitionLevel == '87000040') {
            this.pageDetail.studentTxt = '不予评级学生'
            this.pageDetail.teacherTxt = "民主评议结果"
        }
    }
    //全选  有提交资料
    updateAllChecked() {
        this.indeterminate = false;
        if (this.allChecked) {
            this.hasDataList.forEach(item => item['checked'] = true);
        } else {
            this.hasDataList.forEach(item => item['checked'] = false);
        }
    }
    //单选  有提交资料
    updateSingleChecked() {
        if (this.hasDataList.every(item => item['checked'] === false)) {
            this.allChecked = false;
            this.indeterminate = false;
        } else if (this.hasDataList.every(item => item['checked'] === true)) {
            this.allChecked = true;
            this.indeterminate = false;
        } else {
            this.indeterminate = true;
        }
    }
    //全选  无提交资料
    NotupdateAllChecked() {
        this.Notindeterminate = false;
        if (this.NotallChecked) {
            this.notDataList.forEach(item => item['checked'] = true);
        } else {
            this.notDataList.forEach(item => item['checked'] = false);
        }
    }
    //单选  无提交资料
    NotupdateSingleChecked() {
        if (this.notDataList.every(item => item['checked'] === false)) {
            this.NotallChecked = false;
            this.Notindeterminate = false;
        } else if (this.notDataList.every(item => item['checked'] === true)) {
            this.NotallChecked = true;
            this.Notindeterminate = false;
        } else {
            this.Notindeterminate = true;
        }
    }
    //批量认定为小组评议
    showModal = () => {
        var checkStudent = []; //选择认定的学生
        for (let i = 0; i < this.hasDataList.length; i++) {
            if (this.hasDataList[i]['checked']) {
                checkStudent.push(this.hasDataList[i].IntelUserCode)
            }
        }
        for (let i = 0; i < this.notDataList.length; i++) {
            if (this.notDataList[i]['checked']) {
                checkStudent.push(this.notDataList[i].IntelUserCode)
            }
        }
        if (checkStudent.length == 0) {
            this.msgSrv.warning('请先选择需要认定的学生');
        } else {
            this.isVisible = true;
        }
    }
    //确定批量认定
    handleOk = (e) => {
        this.isVisible = false;
        var hascheckStudent = []; //选择认定的学生 有资料
        var notcheckStudent = []; //选择认定的学生 没资料

        for (let i = 0; i < this.hasDataList.length; i++) {
            if (this.hasDataList[i]['checked']) {
                hascheckStudent.push(this.hasDataList[i].IntelUserCode)
            }
        }
        for (let i = 0; i < this.notDataList.length; i++) {
            if (this.notDataList[i]['checked']) {
                notcheckStudent.push(this.notDataList[i].IntelUserCode)
            }
        }

        this.httpService.POST({
            Router: ServelUrl.Url.counselorconfirmMultiple,
            Method: 'POST',
            Body: {
                HaveIntelUserCode: hascheckStudent.join(","),
                NoHaveIntelUserCode: notcheckStudent.join(","),
                TaskId: this.taskData.TaskId
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.msgSrv.success('认定成功');
                this.onSearch();  //再次请求最新数据
            }
        })
    }
    //取消批量审批为小组评议
    handleCancel = (e) => {
        this.isVisible = false;
    }
    //帮助弹框显示
    showHelp = () => {
        this.isHelpBox = true;
    }
    //取消弹框
    helpCancel = (e) => {
        this.isHelpBox = false;
    }
    //全选  民主评议  待评议学生 -- 批量评议
    OtherupdateAllChecked() {
        this.Otherindeterminate = false;
        if (this.OtherallChecked) {
            this.overDataList.forEach(item => item['checked'] = true);
        } else {
            this.overDataList.forEach(item => item['checked'] = false);
        }
    }
    //单选  民主评议  待评议学生 -- 批量评议
    OtherupdateSingleChecked() {
        if (this.overDataList.every(item => item['checked'] === false)) {
            this.OtherallChecked = false;
            this.Otherindeterminate = false;
        } else if (this.overDataList.every(item => item['checked'] === true)) {
            this.OtherallChecked = true;
            this.Otherindeterminate = false;
        } else {
            this.Otherindeterminate = true;
        }
    }
    //批量评议困难等级
    tankbox = (obj) => {
        this.ApproveGray = obj;
        if (obj == '1') {
            var checkStudent = [];
            for (let i = 0; i < this.overDataList.length; i++) {
                if (this.overDataList[i]['checked']) {
                    checkStudent.push(this.overDataList[i].IntelUserCode)
                }
            }
            for (let i = 0; i < this.overDataList.length; i++) {
                if (this.overDataList[i]['checked']) {
                    checkStudent.push(this.overDataList[i].IntelUserCode)
                }
            }
            if (checkStudent.length == 0) {
                this.msgSrv.warning('请先选择需要评议的学生');
            } else {
                this.isReview = true;
            }
        } else {
            this.isReview = true;
        }
    }
    //确定批量评议困难等级
    reviewOk = (e) => {
        this.isReview = false;
        var checkStudent = [];

        if(this.ApproveGray == '1'){
            for (let i = 0; i < this.overDataList.length; i++) {
                if (this.overDataList[i]['checked']) {
                    checkStudent.push(this.overDataList[i].IntelUserCode)
                }
            }
        }else{
            checkStudent.push(this.ApproveGray.IntelUserCode) 
        }

        this.httpService.POST({
            Router: ServelUrl.Url.groupCommentLevel,
            Method: 'POST',
            Body: {
                IntelUserCode: checkStudent.join(","),
                RecognitionLevel: String(this.dataReview.Status),
                TaskId: this.taskData.TaskId
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.msgSrv.success('认定成功');
                this.onSearchOther()
            }
        })
    }
    //取消批量评议
    reviewCancel = (e) => {
        this.isReview = false;
    }
    //是否通过
    onReviewoff(obj) {
        this.dataReview.Status = obj;
        if (obj == '87000030') {
            this.dataReview.BgStyle1 = 'primary'
            this.dataReview.BgStyle2 = 'default'
            this.dataReview.BgStyle3 = 'default'
            this.dataReview.BgStyle4 = 'default'
        } else if (obj == '87000020') {
            this.dataReview.BgStyle1 = 'default'
            this.dataReview.BgStyle2 = 'primary'
            this.dataReview.BgStyle3 = 'default'
            this.dataReview.BgStyle4 = 'default'
        } else if (obj == '87000010') {
            this.dataReview.BgStyle1 = 'default'
            this.dataReview.BgStyle2 = 'default'
            this.dataReview.BgStyle3 = 'primary'
            this.dataReview.BgStyle4 = 'default'
        } else if (obj == '87000040') {
            this.dataReview.BgStyle1 = 'default'
            this.dataReview.BgStyle2 = 'default'
            this.dataReview.BgStyle3 = 'default'
            this.dataReview.BgStyle4 = 'primary'
        }
    }

}
