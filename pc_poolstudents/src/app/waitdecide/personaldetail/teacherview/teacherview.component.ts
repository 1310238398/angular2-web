import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";
import { HttpService } from '../../../../http/http.service';
import { ServelUrl } from "../../../ServelUrl";

@Component({
    selector: 'app-teacherview',
    templateUrl: './teacherview.component.html',
    styleUrls: ['./teacherview.component.css']
})
export class TeacherViewComponent implements OnInit {
    //个人信息详情
    menDataObj = {
        IntelUserCode: '',
        IsData: ''
    }
    //任务详情
    taskData = {
        TaskId: ''
    }
    //已经认定意见查看详情
    dataSet1 = {
        IntelUserCode: '',
        Status: '',      //认定意见 41直接认定 42一票否定 43小组评议
        ConfirmReason: '', //详细说明
        ConfirmReasonSelect: '', //原因 多个|分隔
        RecognitionLevel: '',
        SchoolAttitude: '2',//资助中心意见 0进行中 1通过 2拒绝 |
        SchoolConfirmReason: '', //审批不通过原因|
    }
    //困难等级下拉框
    optionDg = [
        { Code: '87000010', Name: '一般困难' },
        { Code: '87000020', Name: '困难' },
        { Code: '87000030', Name: '特殊困难' },
        { Code: '87000040', Name: '不与评级' },
    ];
    //直接认定
    arrY1 = [
        { label: '因特殊原因，暂提交不上困难证明材料，但高度符合资格认定者', value: '1', checked: false }
    ]
    //一票否决
    arrY2 = [
        { label: '有吸高档烟、酗酒、赌博等不良习气', value: '有吸高档烟、酗酒、赌博等不良习气', checked: false },
        { label: '恶意夸大家庭经济困难情况，或提供虚假证明材料', value: '恶意夸大家庭经济困难情况，或提供虚假证明材料', checked: false },
        { label: '已申请并被批准出国、休学等较长时间不在校', value: '已申请并被批准出国、休学等较长时间不在校', checked: false },
        { label: '在校有摩托车、轿车，或合计价值较高的高档物品', value: '在校有摩托车、轿车，或合计价值较高的高档物品', checked: false },
        { label: '有超高水平日常消费', value: '有超高水平日常消费', checked: false },
        { label: '恶意拖欠学费', value: '恶意拖欠学费', checked: false },
        { label: '有违犯国家法律法规或校规校级行为', value: '有违犯国家法律法规或校规校级行为', checked: false },
        { label: '有两门及以上补考不及格课程', value: '有两门及以上补考不及格课程', checked: false },
    ]
    //小组评议
    arrY3 = [
        { label: '无直接认定、一票否决的情况', value: '无直接认定、一票否决的情况', checked: true },
    ]

    showCataBox: any;  //显示原始题目 还是已经选择的答案 true 题目 false 答案
    writeText = '';    //认定原因
    valuesTxt = 500;    //认定原因字数
    dataArr = [];       //复选框选择的选项
    radioValue = '43'   //单选框  默认选中小组评议

    arrDis1 = true;    //直接认定复选框禁用
    arrDis2 = true;    //一票否决复选框禁用
    arrDis3 = false;    //小组评议复选框禁用

    optionDgtext = ''  // 困难等级
    kunnanBox = false  // 困难等级是否显示

    userIdentity = '';  //当前用户身份  
    taskStatus = '';    //当前任务状态 2已关闭 3进行中 4已结束
    CounselorStatus = '10';	//辅导员完成状态 10为未完成，20为完成
    AcadamyStatus = '10';	//学院完成状态 10为未提交，20为已提交
    isChange = true;  //是否可以进行修改

    constructor(public httpService: HttpService, private route: ActivatedRoute, private _message: NzMessageService) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.menDataObj.IntelUserCode = params['IntelUserCode'];
            this.menDataObj.IsData = params['IsData'];
        });

        this.taskData = JSON.parse(sessionStorage.getItem('taskData'));
        this.taskStatus = JSON.parse(sessionStorage.getItem('taskStatus'));
        this.userIdentity = JSON.parse(sessionStorage.getItem('userIdentity'));
        this.CounselorStatus = JSON.parse(sessionStorage.getItem('CounselorStatus'));
        this.AcadamyStatus = JSON.parse(sessionStorage.getItem('AcadamyStatus'));

        this.onSearch();

        if (this.taskStatus == '3' && this.userIdentity == 'Counselor' && this.CounselorStatus == '10' && this.AcadamyStatus == '10') {
            this.isChange = true;
        } else {
            this.isChange = false;
        }
    }

    //获取已经认定的结果详情
    onSearch() {
        this.httpService.POST({
            Router: ServelUrl.Url.counselorconfirmq,
            Method: 'POST',
            Body: {
                IntelUserCode: this.menDataObj.IntelUserCode,
                TaskId: this.taskData.TaskId
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                if (res.Data != null && res.Data.Status != '4') {
                    this.dataSet1 = res.Data;
                    if (res.Data.ConfirmReasonSelect) {
                        this.dataArr = res.Data.ConfirmReasonSelect.split("|")
                    }
                    this.showCataBox = false;
                } else {
                    this.showCataBox = true;
                }
            }
        })
    }

    //点击单选框
    radio(obj) {
        if (obj == '41') {
            for (let i = 0; i < this.arrY2.length; i++) {
                this.arrY2[i].checked = false
            }
            for (let i = 0; i < this.arrY3.length; i++) {
                this.arrY3[i].checked = false
            }
            this.arrDis1 = false;
            this.arrDis2 = true;
            this.arrDis3 = true;
            this.kunnanBox = true;
        } else if (obj == '42') {
            for (let i = 0; i < this.arrY1.length; i++) {
                this.arrY1[i].checked = false
            }
            for (let i = 0; i < this.arrY3.length; i++) {
                this.arrY3[i].checked = false
            }
            this.arrDis1 = true;
            this.arrDis2 = false;
            this.arrDis3 = true;
            this.kunnanBox = false;
            this.optionDgtext = ''
        } else if (obj == '43') {
            for (let i = 0; i < this.arrY1.length; i++) {
                this.arrY1[i].checked = false
            }
            for (let i = 0; i < this.arrY2.length; i++) {
                this.arrY2[i].checked = false
            }
            for (let i = 0; i < this.arrY3.length; i++) {
                this.arrY3[i].checked = true
            }
            this.arrDis1 = true;
            this.arrDis2 = true;
            this.arrDis3 = false;
            this.kunnanBox = false;
            this.optionDgtext = ''
        }
    }

    //直接选择复选框
    checkprint(obj) {
        if (obj == 1) {
            this.radioValue = "41"
            for (let i = 0; i < this.arrY2.length; i++) {
                this.arrY2[i].checked = false
            }
            for (let i = 0; i < this.arrY3.length; i++) {
                this.arrY3[i].checked = false
            }
            this.arrDis1 = false;
            this.arrDis2 = true;
            this.arrDis3 = true;
            this.kunnanBox = true;
        }

        if (obj == 2) {
            this.radioValue = "42"
            for (let i = 0; i < this.arrY1.length; i++) {
                this.arrY1[i].checked = false
            }
            for (let i = 0; i < this.arrY3.length; i++) {
                this.arrY3[i].checked = false
            }
            this.arrDis1 = true;
            this.arrDis2 = false;
            this.arrDis3 = true;
            this.kunnanBox = false;
            this.optionDgtext = ''
        }

        if (obj == 3) {
            this.radioValue = "43"
            for (let i = 0; i < this.arrY1.length; i++) {
                this.arrY1[i].checked = false
            }
            for (let i = 0; i < this.arrY2.length; i++) {
                this.arrY2[i].checked = false
            }
            this.arrDis1 = true;
            this.arrDis2 = true;
            this.arrDis3 = false;
            this.kunnanBox = false;
            this.optionDgtext = ''
        }
    }

    //提交认定意见
    overbox() {
        var checkStudent = [];
        if (this.radioValue == '') {
            this.createMessage('warning', '请选择认定意见')
            return false
        }
        if (this.radioValue == '41') {
            for (let i = 0; i < this.arrY1.length; i++) {
                if (this.arrY1[i].checked) {
                    checkStudent.push(this.arrY1[i].label)
                }
            }
        }
        if (this.radioValue == '42') {
            for (let i = 0; i < this.arrY2.length; i++) {
                if (this.arrY2[i].checked) {
                    checkStudent.push(this.arrY2[i].label)
                }
            }
            this.optionDgtext = '';
        }
        if (this.radioValue == '43') {
            for (let i = 0; i < this.arrY3.length; i++) {
                if (this.arrY3[i].checked) {
                    checkStudent.push(this.arrY3[i].label)
                }
            }
            this.optionDgtext = '';
        }
        if (checkStudent.length == 0) {
            this.createMessage('warning', '请选择原因');
            return false
        }
        if (this.radioValue == '41' && this.optionDgtext == '') {
            this.createMessage('warning', '请选择困难等级');
            return false
        }
        if (this.radioValue == '41' && this.writeText.trim() == '') {
            this.createMessage('warning', '请输入认定原因')
            return false
        }
        if (this.radioValue == '42' && this.writeText.trim() == '') {
            this.createMessage('warning', '请输入认定原因')
            return false
        }

        var checkStudentString = checkStudent.join("|");

        //没有资料的学生认定
        if (this.menDataObj.IsData == '0' && !(this.dataSet1.Status == '41' || this.dataSet1.Status == '42' || this.dataSet1.Status == '43')) {
            this.httpService.POST({
                Router: ServelUrl.Url.counselorconfirmother,
                Method: 'POST',
                Body: {
                    IntelUserCode: this.menDataObj.IntelUserCode,
                    Status: String(this.radioValue),
                    ConfirmReason: this.writeText,
                    ConfirmReasonSelect: checkStudentString,
                    RecognitionLevel: this.optionDgtext,
                    TaskId: this.taskData.TaskId
                }
            }).subscribe(res => {
                if (!res.FeedbackCode) {
                    if (this.radioValue == '41' || this.radioValue == '42') {
                        this.createMessage('success', '认定成功,请等待资助中心审批');
                    } else {
                        this.createMessage('success', '认定成功');
                    }

                    const that = this;
                    setTimeout(function () {
                        that.historyBack()
                    }, 1200);
                }
            })
            //有资料的学生认定
        } else {
            this.httpService.POST({
                Router: ServelUrl.Url.counselorconfirm,
                Method: 'POST',
                Body: {
                    IntelUserCode: this.menDataObj.IntelUserCode,
                    Status: String(this.radioValue),
                    ConfirmReason: this.writeText,
                    ConfirmReasonSelect: checkStudentString,
                    RecognitionLevel: this.optionDgtext,
                    TaskId: this.taskData.TaskId
                }
            }).subscribe(res => {
                if (!res.FeedbackCode) {
                    if (this.radioValue == '41' || this.radioValue == '42') {
                        this.createMessage('success', '认定成功,请等待资助中心审批');
                    } else {
                        this.createMessage('success', '认定成功');
                    }
                    const that = this;
                    setTimeout(function () {
                        that.historyBack()
                    }, 1200);
                }
            })
        }   
    }

    //备注框字数变化
    txtChange2(value: string) {
        this.valuesTxt = 500 - value.length
    }

    //修改
    changebox() {
        this.showCataBox = true;
    }

    //弹窗
    createMessage = (type, text) => {
        this._message.create(type, `${text}`);
    };

    //返回上一页
    historyBack() {
        window.history.back()
    }

}



