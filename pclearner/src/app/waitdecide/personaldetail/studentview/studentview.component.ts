import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../../../http/http.service';
import { ServelUrl } from "../../../ServelUrl";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NzMessageService, NzModalService } from "ng-zorro-antd";

@Component({
    selector: 'app-studentview',
    templateUrl: './studentview.component.html',
    styleUrls: ['./studentview.component.css']
})
export class StudentViewComponent implements OnInit {

    DataSet = []
    DataSet2 = []

    disdden = '0'

    menDataObj = {
        IntelUserCode: '',
        ClassCode: '',
        Status: '',
        RecognitionLevel: '',
        TaskName: '',
        StartDate: '',
        EndDate: '',
        categray: ''
    }

    isChange = 0;  //是否修改
    statusJsonStr = ''  //任务阶段  3开启
    userJsonStr = ''    //身份
    isSubmitJsonStr = '' //是否提交学校
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
            Router: ServelUrl.Url.groupquestionnariquery,
            Method: 'POST',
            Body: {
                NeeSpuUid: this.menDataObj.IntelUserCode,
                TaskId: this.useTaskIdStr
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                if (res.Data != null && res.Data.length != 0) {

                    if (res.Data[0].option_name == '' || this.isChange == 1) {  //没有填写过问卷
                        this.disdden = '0'
                        for (let i = 0; i < res.Data.length; i++) {
                            res.Data[i]['optionarr'] = []
                            res.Data[i]['optionarr1'] = []
                            res.Data[i]['optionarr'] = res.Data[i].options.split("||");
                            res.Data[i]['topicRadio'] = ''

                        }
                        for (let i = 0; i < res.Data.length; i++) {
                            for (let j = 0; j < res.Data[i]['optionarr'].length; j++) {
                                var optionobj = {
                                    title: '',
                                    code: '',
                                    checked: false
                                }
                                optionobj.title = res.Data[i]['optionarr'][j].split("#|")[0]
                                optionobj.code = res.Data[i]['optionarr'][j].split("#|")[1]
                                res.Data[i]['optionarr1'].push(optionobj)
                            }
                        }
                        this.DataSet = res.Data;
                    } else {
                        this.disdden = '1';

                        for (let i = 0; i < res.Data.length; i++) {
                            if (res.Data[i].type == '1' || res.Data[i].type == '2') {
                                res.Data[i]['optionarr2'] = []
                                res.Data[i]['optionarr2'] = res.Data[i].option_name.split("||");
                                this.DataSet2.push(res.Data[i])
                            }
                        }
                    }
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
            if (this.DataSet[i].type == '1') {

                checkObj.topic_id = this.DataSet[i].topic_id;
                checkObj.option_id = this.DataSet[i].topicRadio;

                questionnaires.push(checkObj);

                if (this.DataSet[i].topicRadio == '') {
                    this.createMessage('warning', '请将答题补充完整')
                    return false
                }
            }

            if (this.DataSet[i].type == '2') {
                checkObj.topic_id = this.DataSet[i].topic_id
                for (let j = 0; j < this.DataSet[i].optionarr1.length; j++) {
                    if (this.DataSet[i].optionarr1[j].checked) {
                        checkArr.push(this.DataSet[i].optionarr1[j].code)
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
                NeeSpuUid: this.menDataObj.IntelUserCode,
                questionnaires: questionnaires
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.createMessage('success', '提交成功');
                this.isChange = 0;
                const that = this;
                setTimeout(function () {
                    that.historyBack()
                }, '1500');

            }
        })

    }

    changebox1() {
        this.disdden = '0';
        this.onSearch();
        this.isChange = 1;
    }

    //弹窗
    createMessage = (type, text) => {
        this._message.create(type, `${text}`);
    };

    historyBack() {
        window.history.back()
    }


























}



