import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../ServelUrl";
import { NzMessageService } from "ng-zorro-antd";

@Component({
    selector: 'app-waitindex',
    templateUrl: './waitindex.component.html',
    styleUrls: ['./waitindex.component.css']
})
export class WaitIndexComponent implements OnInit {

    dataSet = [];           //数据列表
    checkOptionsOne = [];   //可以选择同步的学生
    optiongrade = [];       //年级
    optionclass = [];       //班级
    optionstatus = [        //状态
        { Name: '待审批', Code: '0' },
        { Name: '已拒绝', Code: '2' },
    ]

    //搜索条件
    searchObj = {
        UserCode: '',      //学号
        Name: '',          //姓名
        Grade: '',         //年级
        Class: '',        //班级
        Status: '',        //状态 0待审批  2已拒绝
        Page: 1,
        PageSize: 40,
        total: 0,
    };

    //批量审批参数
    approveObj = {
        RefuseReason: '',  //审批理由
        RefuseStatus: '1',   //审批状态  1通过 2不通过
        values: 50,
    }

    allChecked = false;
    indeterminate = false;  //全选样式

    isHelpBox = false;  //帮助弹框状态 
    isVisible = false;  //批量审批状态 

    constructor(public httpService: HttpService, private msgSrv: NzMessageService) { }

    ngOnInit() {
        this.onSearch();
        this.loadGrade();

        //获取跳转其他页面时当前页面的状态
        let userJsonStr = sessionStorage.getItem('searchObj');
        if (userJsonStr != null) {
            this.searchObj = JSON.parse(userJsonStr);
            this.loadClass();
            sessionStorage.clear();
        }
    }

    //跳转详情页 存储缓存 记录选择的状态
    sesstionCut(data) {
        sessionStorage.setItem('searchObj', JSON.stringify(this.searchObj));
        sessionStorage.setItem('dataDetail', JSON.stringify(data));
    }

    //获取数据列表
    onSearch(reload = false) {
        if (reload) {
            this.searchObj.Page = 1
        }
        this.httpService.POST({
            Router: ServelUrl.Url.approvallist,
            Method: 'POST',
            Body: {
                Page: this.searchObj.Page,
                Count: this.searchObj.PageSize,
                UserCode: this.searchObj.UserCode,
                Name: this.searchObj.Name,
                Grade: this.searchObj.Grade,
                Class: this.searchObj.Class,
                Status: this.searchObj.Status
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.dataSet = res.Data.Datas;
                this.searchObj.total = parseInt(res.Data.Total);
                for (let i = 0; i < this.dataSet.length; i++) {
                    this.dataSet[i]['checked'] = false;

                    this.dataSet[i].LastTime = this.dataSet[i].LastTime.substring(0,10);
                    if (this.dataSet[i].Status == '0' && this.dataSet[i].Tasking == '1' && this.dataSet[i].CounselorStatus == '10' && this.dataSet[i].AcadamyStatus == '10') {
                        this.checkOptionsOne.push(this.dataSet[i])
                    }
                }
            }
        })
    }
    //加载年级
    loadGrade() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.allgrade,
            Method: 'POST',
            Body: {}
        }).then(res => {
            if (!res.FeedbackCode) {
                this.optiongrade = res.Data;
            }
        });
    }
    //加载班级
    loadClass() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.classingrade,
            Method: 'POST',
            Body: {
                GradeCode: this.searchObj.Grade
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.optionclass = res.Data;
            }
        });
    }

    //批量审批弹框出现
    showModal = () => {
        var checkStudent = []; //选择同步的学生
        console.log(this.checkOptionsOne, 'checkOptionsOne');
        console.log(this.dataSet, 'dataSet');
        for (let i = 0; i < this.checkOptionsOne.length; i++) {
            if (this.checkOptionsOne[i].checked) {
                checkStudent.push(this.checkOptionsOne[i].IntelUserCode)
            }
        }

        if (checkStudent.length == 0) {
            this.msgSrv.warning('请先选择需要审批的学生');
        } else {
            this.isVisible = true;
        }
    }
    //确定批量审批
    handleOk = (e) => {
        var checkStudent = []; //选择审批的学生
        for (let i = 0; i < this.checkOptionsOne.length; i++) {
            if (this.checkOptionsOne[i].checked) {
                checkStudent.push(this.checkOptionsOne[i].IntelUserCode)
            }
        }

        if (this.approveObj.RefuseStatus != '1') {
            if (this.approveObj.RefuseReason.trim() == '') {
                this.msgSrv.warning('请填写不通过原因');
                return false
            }
        }

        this.isVisible = false;

        this.httpService.POST({
            Router: ServelUrl.Url.subapproval,
            Method: 'POST',
            Body: {
                IntelUserCode: checkStudent.join(","),
                Status: this.approveObj.RefuseStatus,
                RefuseReason: this.approveObj.RefuseReason
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.msgSrv.success('审批成功');
                this.onSearch();  //再次请求最新数据
            }
        })
    }
    //取消批量审批
    handleCancel = (e) => {
        this.isVisible = false;
    }
    //全选
    updateAllChecked() {
        this.indeterminate = false;
        if (this.allChecked) {
            this.checkOptionsOne.forEach(item => item.checked = true);
        } else {
            this.checkOptionsOne.forEach(item => item.checked = false);
        }
    }
    //单选
    updateSingleChecked() {
        if (this.checkOptionsOne.every(item => item.checked === false)) {
            this.allChecked = false;
            this.indeterminate = false;
        } else if (this.checkOptionsOne.every(item => item.checked === true)) {
            this.allChecked = true;
            this.indeterminate = false;
        } else {
            this.indeterminate = true;
        }
    }
    //备注框字数变化
    txtChange(value: string) {
        this.approveObj.values = 50 - value.length
    }
    //日期转化
    nowDay(obj) {
        const Dates = new Date(obj * 1000);
        const year: number = Dates.getFullYear();
        const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
        const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
        return year + '-' + month + '-' + day
    }
    //重置
    resetForm(form) {
        form.reset();
    }
    //帮助弹框
    showHelp = () => {
        this.isHelpBox = true;
    }
    //取消弹框
    helpCancel = (e) => {
        this.isHelpBox = false;
    }



}
