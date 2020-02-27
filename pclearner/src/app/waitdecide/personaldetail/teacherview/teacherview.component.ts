import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";
import { HttpService } from '../../../../http/http.service';
import { ServelUrl } from "../../../ServelUrl";

@Component({
    selector: 'app-teacherview',
    templateUrl: './teacherview.component.html',
    styleUrls: ['./teacherview.component.css']
})
export class TeacherViewComponent implements OnInit {
    dataSet = "1"
    menDataObj = {
        IntelUserCode: '',
        ClassCode: '',
        Status: '',
        RecognitionLevel: '',
        TaskName: '',
        StartDate: '',
        EndDate: '',
        categray: '',
        IsAttach: ''
    }
    dataSet1 = {
        IntelUserCode: '',
        Status: '',      //认定意见 41直接认定 42一票否定 43小组评议
        ConfirmReason: '', //详细说明
        ConfirmReasonSelect: '', //原因 多个|分隔
        RecognitionLevel: '',
    }
    optionDg = [
        { Code: '87000010', Name: '一般困难' },
        { Code: '87000020', Name: '困难' },
        { Code: '87000030', Name: '特殊困难' },
        { Code: '87000040', Name: '不与评级' },
    ]
    arrY1 = [
        { label: '家庭经济确实困难，但有意隐瞒、自身不愿申请认定者', value: '1', checked: false },
        { label: '多数同学反映高度符合认定资格者', value: '2', checked: false },
        { label: '有其它与认定资格高度符合可直接认定者', value: '3', checked: false },
    ]
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
    arrY3 = [
        { label: '无以上情况', value: '无以上情况', checked: true },
    ]

    disdden = '1'; //显示
    values2 = 500;
    dataArr = [];
    radioValue = '43' //单选框

    arrDis1 = false;
    arrDis2 = false;
    arrDis3 = false;

    checkStudentString = ''  // 后台提交字符串
    optionDgtext = ''  // 困难等级
    kunnanBox = false  // 困难等级是否显示
    writeText = ''
    statusJsonStr = ''  // 任务阶段  3开启
    userJsonStr = ''    // 身份
    isSubmitJsonStr = '' // 是否提交学校
    useTaskIdStr = ''  //任务ID

    constructor(public httpService: HttpService, private route: ActivatedRoute, private _message: NzMessageService, private router: Router, ) { }

    @Input() menData;

    ngOnInit(): void {
        this.menDataObj = this.menData;
        this.statusJsonStr = JSON.parse(sessionStorage.getItem('setStatus'));
        this.userJsonStr = JSON.parse(sessionStorage.getItem('userStatus'));
        this.isSubmitJsonStr = JSON.parse(sessionStorage.getItem('isSubmit'));
        this.useTaskIdStr = JSON.parse(sessionStorage.getItem('useTaskId'));

        this.onSearch();
    }

    //获取数据列表
    onSearch() {
        this.httpService.POST({
            Router: ServelUrl.Url.counselorconfirmq,
            Method: 'POST',
            Body: {
                IntelUserCode: this.menDataObj.IntelUserCode,
                TaskId: this.useTaskIdStr

            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                if (res.Data != null) {
                    this.dataSet1 = res.Data;
                    if (res.Data.ConfirmReasonSelect) {
                        this.dataArr = res.Data.ConfirmReasonSelect.split("|")
                    }
                    this.disdden = '1'
                } else {
                    this.disdden = '0'
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

    //提交
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

        if (checkStudent.length == 0) {
            this.createMessage('warning', '请选择原因');
            return false
        }

        this.checkStudentString = checkStudent.join("|");

        if (this.menDataObj.IsAttach == '0' && this.menDataObj.Status == '') {
            this.httpService.POST({
                Router: ServelUrl.Url.counselorconfirmother,
                Method: 'POST',
                Body: {
                    IntelUserCode: this.menDataObj.IntelUserCode,
                    Status: String(this.radioValue),
                    ConfirmReason: this.writeText,
                    ConfirmReasonSelect: this.checkStudentString,
                    RecognitionLevel: this.optionDgtext,
                }
            }).subscribe(res => {
                if (!res.FeedbackCode) {
                    this.createMessage('success', '提交成功');
                    const that = this;
                    setTimeout(function () {
                        that.historyBack()
                    }, '2000');
                }
            })
        } else {
            this.httpService.POST({
                Router: ServelUrl.Url.counselorconfirm,
                Method: 'POST',
                Body: {
                    IntelUserCode: this.menDataObj.IntelUserCode,
                    Status: String(this.radioValue),
                    ConfirmReason: this.writeText,
                    ConfirmReasonSelect: this.checkStudentString,
                    RecognitionLevel: this.optionDgtext,
                }
            }).subscribe(res => {
                if (!res.FeedbackCode) {
                    this.createMessage('success', '提交成功');
                    const that = this;
                    setTimeout(function () {
                        that.historyBack()
                    }, '2000');
                }
            })
        }
    }

    //备注框字数变化
    txtChange2(value: string) {
        this.values2 = 500 - value.length
    }

    //修改
    changebox() {
        this.disdden = '0'
    }

    //弹窗
    createMessage = (type, text) => {
        this._message.create(type, `${text}`);
    };

    historyBack() {
        window.history.back()
    }










}



