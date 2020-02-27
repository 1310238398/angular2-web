import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../http/http.service';
import { ServelUrl } from "../../../ServelUrl";
import { ActivatedRoute, Params } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";

@Component({
    selector: 'app-studentview',
    templateUrl: './studentview.component.html',
    styleUrls: ['./studentview.component.css']
})
export class StudentViewComponent implements OnInit {

    //题目
    DataSet = [];

    IntelUserCode = '';  //ID
    //任务详情
    taskData = {
        TaskId: ''
    }
    showCataBox = true;  //显示原始题目 还是已经选择的答案 true 题目 false 答案

    userIdentity = '';  //当前用户身份  
    taskStatus = '';    //当前任务状态 2已关闭 3进行中 4已结束
    CounselorStatus = '10';	//辅导员完成状态 10为未完成，20为完成
    AcadamyStatus = '10';	//学院完成状态 10为未提交，20为已提交

    isChange = true;  //是否可以进行修改

    constructor(public httpService: HttpService, private route: ActivatedRoute, private _message: NzMessageService) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.IntelUserCode = params['IntelUserCode'];
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

        this.onSearch();
    }

    //获取数据列表
    onSearch() {
        this.httpService.POST({
            Router: ServelUrl.Url.groupquestionnariquery,
            Method: 'POST',
            Body: {
                NeeSpuUid: this.IntelUserCode,
                TaskId: this.taskData.TaskId
            }
        }).subscribe(res => {
            if (!res.FeedbackCode && res.Data != null && res.Data.length != 0) {
                if (res.Data[0].option_name == '') {
                    for (let i = 0; i < res.Data.length; i++) {
                        res.Data[i]['optionarr'] = res.Data[i].options.split("||");
                        res.Data[i]['topicArrow'] = [];
                        res.Data[i]['topicRadio'] = '';
                        for (let j = 0; j < res.Data[i]['optionarr'].length; j++) {
                            var optionobj = {
                                title: '',
                                code: '',
                                checked: false,
                                fontCss: '',
                            }
                            optionobj.title = res.Data[i]['optionarr'][j].split("#|")[0]
                            optionobj.code = res.Data[i]['optionarr'][j].split("#|")[1]
                            res.Data[i]['topicArrow'].push(optionobj)
                        }
                    }
                    this.showCataBox = true; //没有填写过问卷
                    this.DataSet = res.Data;
                } else {
                    this.DataSet = res.Data;
                    for (let i = 0; i < this.DataSet.length; i++) {
                        this.DataSet[i]['optionarr'] = this.DataSet[i].options.split("||");
                        this.DataSet[i]['topicArrow'] = [];
                        this.DataSet[i]['topicRadio'] = '';

                        for (let j = 0; j < this.DataSet[i]['optionarr'].length; j++) {
                            var optionobj = {
                                title: '',
                                code: '',
                                checked: false,
                                fontCss: '',
                            }
                            optionobj.title = this.DataSet[i]['optionarr'][j].split("#|")[0];
                            optionobj.code = this.DataSet[i]['optionarr'][j].split("#|")[1];
                            this.DataSet[i]['topicArrow'].push(optionobj)
                        }
                        this.DataSet[i]['topicArrow2'] = this.DataSet[i].option_name.split("||");
                    }
                    this.showCataBox = false;
                }
            }
        })
    }

    //提交
    overbox() {
        var questionnaires = [];
        for (let i = 0; i < this.DataSet.length; i++) {

            var checkObj = { topic_id: '', option_id: '' }
            var checkArr = [];
            //单选
            if (this.DataSet[i].type == '1') {
                checkObj.topic_id = this.DataSet[i].topic_id;
                checkObj.option_id = this.DataSet[i].topicRadio;
                questionnaires.push(checkObj);
                if (this.DataSet[i].topicRadio == '') {
                    this.createMessage('warning', '请将答题补充完整')
                    return false
                }
            }
            //多选
            if (this.DataSet[i].type == '2') {
                checkObj.topic_id = this.DataSet[i].topic_id;
                for (let j = 0; j < this.DataSet[i].topicArrow.length; j++) {
                    if (this.DataSet[i].topicArrow[j].checked) {
                        checkArr.push(this.DataSet[i].topicArrow[j].code)
                    }
                }

                checkObj.option_id = checkArr.join(",")
                if (checkObj.option_id == '') {
                    this.createMessage('warning', '请将答题补充完整')
                    return false
                }
                questionnaires.push(checkObj);
            }
        }

        this.httpService.POST({
            Router: ServelUrl.Url.groupquestionnarisub,
            Method: 'POST',
            Body: {
                NeeSpuUid: this.IntelUserCode,
                questionnaires: questionnaires,
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.createMessage('success', '提交成功');
                const that = this;
                setTimeout(function () {
                    that.historyBack()
                }, 1500);
            }
        })

    }

    //选中样式变化
    changeStyle(obj) {
        for (let i = 0; i < this.DataSet.length; i++) {
            if (this.DataSet[i].type == '1') {
                if (obj.topic_id == this.DataSet[i].topic_id) {
                    for (let j = 0; j < this.DataSet[i].topicArrow.length; j++) {
                        if (this.DataSet[i].topicArrow[j].code == obj.topicRadio) {
                            this.DataSet[i].topicArrow[j].fontCss = 'font-css'
                        } else {
                            this.DataSet[i].topicArrow[j].fontCss = ''
                        }
                    }
                }
            } else if (this.DataSet[i].type == '2') {
                if (obj.topic_id == this.DataSet[i].topic_id) {
                    for (let j = 0; j < this.DataSet[i].topicArrow.length; j++) {
                        if (this.DataSet[i].topicArrow[j].checked == true) {
                            this.DataSet[i].topicArrow[j].fontCss = 'font-css'
                        } else {
                            this.DataSet[i].topicArrow[j].fontCss = ''
                        }
                    }
                }
            }
        }
    }

    //修改
    changeStatus() {
        for (let i = 0; i < this.DataSet.length; i++) {
            this.DataSet[i]['optionarr'] = this.DataSet[i].options.split("||");
            this.DataSet[i]['topicArrow'] = [];
            this.DataSet[i]['topicRadio'] = '';

            for (let j = 0; j < this.DataSet[i]['optionarr'].length; j++) {
                var optionobj = {
                    title: '',
                    code: '',
                    checked: false,
                    fontCss: '',
                }
                optionobj.title = this.DataSet[i]['optionarr'][j].split("#|")[0];
                optionobj.code = this.DataSet[i]['optionarr'][j].split("#|")[1];
                this.DataSet[i]['topicArrow'].push(optionobj)
            }
            this.DataSet[i]['topicArrow2'] = this.DataSet[i].option_name.split("||");

            if (this.DataSet[i].type == '1') {
                for (let j = 0; j < this.DataSet[i].topicArrow.length; j++) {
                    if (this.DataSet[i].topicArrow[j].code == this.DataSet[i].option_code) {
                        this.DataSet[i].topicArrow[j].fontCss = 'font-css';
                        this.DataSet[i].topicRadio = this.DataSet[i].option_code
                    }
                }
            } else if (this.DataSet[i].type == '2') {

                this.DataSet[i]['optionCodeArr'] = this.DataSet[i].option_code.split("||");

                for (let j = 0; j < this.DataSet[i].topicArrow.length; j++) {
                    for (let l = 0; l < this.DataSet[i].topicArrow.length; l++) {
                        if (this.DataSet[i].topicArrow[j].code == this.DataSet[i]['optionCodeArr'][l]) {
                            this.DataSet[i].topicArrow[j].fontCss = 'font-css';
                            this.DataSet[i].topicArrow[j].checked = true;
                        }
                    }
                }
            }
        }
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



