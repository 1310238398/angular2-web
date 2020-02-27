import { Component, OnInit } from '@angular/core';
import { HttpRequest, HttpClient, HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd";
import { DomSanitizer } from "@angular/platform-browser";
import { HttpService } from './http/http.service';
import { BaoXiuService } from "./baoxiu.service";
import { CheckMenuFieldService } from "../service/checkMenuField.service";

import { ServelUrl } from "./ServelUrl";
import * as qiniu from 'qiniu-js';

declare var $: any

@Component({
    selector: 'app-baoxiudetail',
    templateUrl: './detail.html',
    styleUrls: ['baoxiu.scss']
})

export class DetailComponent implements OnInit {

    designateIsShow = false; // 是否显示派单对话框
    notNeedIsShow = false; // 是否显示无需处理对话框
    accomplishIsShow = false; // 是否显示维修完成对话框

    notNeedValue = ''; // 无需处理原因

    repairPersonnelList = [] // 维修人员列表
    designateValue = '' // 派单给谁

    CertifyImgs = [] // 维修完成图片
    RecordIdArr = []

    AddRemarkIsShow = false // 是否显示添加备注对话框
    AddRemarkValue = '' // 备注

    nodeRecordID = ''; // 节点ID
    flowinstancerecordid = ''// 工作流流程实例ID
    uid = window["__UserID"]; // 当前登录用户UID
    processData = [];
    repairPersonArr: any[] = []; // 维修人员列表
    selectRepairPerson = '';
    hasSelectedPerson = false;
    remark = ''; // 添加标注
    remarkValid = false; // 添加标注
    showDesignate = true;
    notNeedExplanation = ''; // 无需处理的原因
    notNeedExplanationValid = false;
    accomplishShow = false; // 点击维修完成后展示的图片上传页面
    notNeedShow = false; // 点击维修完成后展示的图片上传页面
    certifyImgs = []; // 上传后的文件
    flowsHistoryData: any;
    fileLoading;
    task = {
        RecordID: '',
        StudentAvatarURL: '',
        StudentName: '',
        StudentUID: '',
        StudentUserCode: '',
        StudentAcadamyName: '',
        StudentSex: '',
        StudentPhone: '',
        SerialNumber: '',
        AreaName: '',
        SpecificSite: '',
        Item: [],
        Caption: '',
        DamageAttachs: [],
        RepairAttachs: [],
        RepairPersonnelName: '',
        Status: '',
        StatusData: [],
        Remark: [
            {
                Content: '',
                Created: '',
                UserName: ''
            }
        ],
        NotneedExplanation: '',
        NextNodeRecordID: ''
    };
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private msgsrv: NzMessageService,
        private httpService: HttpService,
        private DomSanitizer: DomSanitizer,
        private baoxiuService: BaoXiuService,
        private checkMenuFieldService: CheckMenuFieldService
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe((params: Params) => {
            this.flowinstancerecordid = params['flowinstancerecordid'] || '';
            this.getRepairOne(this.flowinstancerecordid);
            this.getFlowsHistory(this.flowinstancerecordid)
            this.getUserInfo()
        });
    }

    bangding(): void {
        $('.jq22').viewer()
    }

    // 获取报修任务详情
    getRepairOne(flowinstancerecordid: string): void {
        this.baoxiuService.queryRepairOne(flowinstancerecordid).then(res => {
            if (res.Data) {
                this.task = res.Data;
            }
        });
    }

    // 获取当前登录用户UID
    getUserInfo(): void {
        this.baoxiuService.queryUserPhone().then(res => {
            this.uid = res.Data.IntelUserCode;
        });
    }

    // 查询流程历史数据
    getFlowsHistory(id: string): void {
        this.baoxiuService.flowsHistory(id).then(res => {
            if (res) {
                for (var i = 0, le = res.length; i < le; i++) {
                    if (res[i] && res[i].out_data != '') {
                        res[i].out_data = JSON.parse(res[i].out_data)
                    } else {
                        res.splice(i, 1)
                    }
                }
                this.flowsHistoryData = res || []
            }
        })
    }

    // 发起添加备注请求
    confirmAddRemark(): void {
        if (this.AddRemarkValue.trim() == '') {
            this.msgsrv.warning('备注不可为空');
            return
        }
        this.baoxiuService.repairAddRemark(this.task.RecordID, this.AddRemarkValue.trim()).then(res => {
            this.AddRemarkIsShow = false
            this.msgsrv.success('处理成功')
            this.getRepairOne(this.flowinstancerecordid);
            this.getFlowsHistory(this.flowinstancerecordid)
            this.AddRemarkValue = ''
        }
        );
    }

    // 发起无需处理请求
    confirmNotNeed(): void {
        if (this.notNeedValue.trim() == '') {
            this.msgsrv.warning('无需处理原因不可为空');
            return
        }
        const body = {
            Action: 'NotNeed',
            Explanation: this.notNeedValue,
            IntelUserCode: this.uid,
            SpecificSite: this.task.SpecificSite,
            TaskRecordID: this.task.RecordID,
            SerialNumber: this.task.SerialNumber,
            TaskTitle: this.task.AreaName + this.task.SpecificSite + this.task.Item[0].Name, // 任务标题
        };

        this.baoxiuService.flowsHandle(this.task.NextNodeRecordID, body).then(res => {
            if (res == "ok") {
                this.notNeedIsShow = false
                this.msgsrv.success('处理成功')
                this.getRepairOne(this.flowinstancerecordid);
                this.getFlowsHistory(this.flowinstancerecordid)
            } else {
                this.msgsrv.warning('处理失败，请稍后重试')
            }
        }).catch(res => {
            this.msgsrv.warning('处理失败，请稍后重试')
        });
    }

    // 点击派单按钮
    designate() {
        this.getRepairPersonnelList(this.task.RecordID)
        this.designateIsShow = true
        console.log(this.task.NextNodeRecordID)
    }

    // 获取维修人员列表
    getRepairPersonnelList(taskRecordID: string) {
        this.baoxiuService.queryRepairPerson(taskRecordID).then(
            res => {
                if (res.Data) {
                    this.repairPersonnelList = res.Data
                } else {
                    this.designateIsShow = false
                    this.msgsrv.warning('该部门没有维修人员，请添加');
                }
            }
        ).catch(res => {
            this.designateIsShow = false
            this.msgsrv.warning('获取维修人员列表失败');
        });
    }

    // 发起派单请求
    confirmDesignate() {
        if (this.designateValue == '') {
            this.msgsrv.warning('请选择维修人员!')
            return
        }
        const body = {
            Action: 'Designate',
            TaskRecordID: this.task.RecordID,
            RepairPersonnelUID: this.designateValue,
            DesignateUID: this.uid,
            TaskTitle: this.task.AreaName + this.task.SpecificSite + this.task.Item[0].Name,	// 任务标题
        };
        Object.assign(body, this.task, body);
        body.Action = 'Designate'
        body.RepairPersonnelUID = this.designateValue
        delete body["Item"]
        delete body["DamageAttachs"]
        delete body["RepairAttachs"]
        delete body["StatusData"]
        delete body["Remark"]

        this.baoxiuService.flowsHandle(this.task.NextNodeRecordID, body).then(
            res => {
                if (res == "ok") {
                    this.designateIsShow = false
                    this.msgsrv.success('处理成功')
                    this.getRepairOne(this.flowinstancerecordid);
                    this.getFlowsHistory(this.flowinstancerecordid)
                } else {
                    this.designateIsShow = false
                    this.msgsrv.warning('处理失败，请稍后重试')
                }
            }
        ).catch(res => {
            this.designateIsShow = false
            this.msgsrv.warning('处理失败，请稍后重试')
        });
    }

    // 发起维修完成请求
    confirmAccomplish(): void {
        const body = {
            Action: 'Accomplish',
            TaskRecordID: this.task.RecordID,
            Attachs: this.RecordIdArr.join(','),
            IntelUserCode: this.uid,
            StudentUID: this.task.StudentUID, // 学生id
            TaskTitle: this.task.AreaName + this.task.SpecificSite + this.task.Item[0].Name,	// 任务标题
        };
        Object.assign(body, this.task, body);
        body.Action = 'Accomplish';
        delete body["Item"]
        delete body["DamageAttachs"]
        delete body["RepairAttachs"]
        delete body["StatusData"]
        delete body["Remark"]
        this.baoxiuService.flowsHandle(this.task.NextNodeRecordID, body).then(
            res => {
                if (res == "ok") {
                    this.accomplishIsShow = false;
                    this.msgsrv.success('处理成功')
                    this.getRepairOne(this.flowinstancerecordid);
                    this.getFlowsHistory(this.flowinstancerecordid)
                } else {
                    this.designateIsShow = false
                    this.msgsrv.warning('处理失败，请稍后重试')
                }
            }
        ).catch(res => {
            this.designateIsShow = false
            this.msgsrv.warning('处理失败，请稍后重试')
        });
    }

    // 上传图片
    upload(obj) {
        // this.fileLoading = this.HelpUtils.loadingPop('正在上传，请稍等...');
        var that = this;
        var observable = qiniu.upload(obj.file, obj.key, obj.token, {
            mimeType: ["image/png", "image/jpeg", "image/jpg"]
        }, {
                useCdnDomain: true
            });
        var observer = {
            next(res) {
                console.log(res)
                // ...
            },
            error(err) {
                this.msgsrv.warning(err.message);
                return false
                // ...
            },
            complete(res) {
                var file = obj.file;
                // that.fileLoading.dismiss();

                that.httpService.postJSON({
                    Router: ServelUrl.Url.saveAttach, Method: 'POST', Body: {
                        BizType: 'StudentNeedSupport',
                        AttachmentItemName: file.name || '',
                        AttachmentItemType: file.type,
                        AttachmentItemSize: file.size.toString(),
                        AttachmentURL: res.key,
                        Base64: '',
                    }
                }).then(response => {
                    if (!response.FeedbackCode) {
                        that.RecordIdArr.push(response.Data.RecordID);
                        that.CertifyImgs.push({
                            RecordID: response.Data.RecordID,
                            Caption: '',	//字符串	说明
                            AttachmentURL: window.URL.createObjectURL(file),
                            AttachmentItemSize: file.size.toString(),
                            AttachmentItemType: file.type,
                            AttachmentItemName: file.name,
                        });

                    } else {
                        this.msgsrv.warning(response.FeedbackText);
                    }
                    console.log(res);
                })
            }
        };
        var subscription = observable.subscribe(observer); // 上传开始
    }


    handleFiles(event) {
        var file = event.target.files[0];
        if (file.size > 10485760) {
            this.msgsrv.warning('文件大小限制:10M');
            return
        }
        if (file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/jpg') {
            this.msgsrv.warning('格式错误,请选择"png,jpeg,jpg"格式文件上传');
            return
        }
        this.httpService.postJSON({
            Router: ServelUrl.Url.getUpToken,
            Method: 'POST',
            Body: {
                Name: file.name,
                Size: file.size,
                BizType: "BaoXiu"
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.upload({ file: file, key: res.Data.Key, token: res.Data.Proof })
            } else if (res.FeedbackText == '获取上传KEY有误，请稍后重试') {
                this.msgsrv.warning('图片错误,请重新选择其他图片上传');
            } else {
                this.msgsrv.warning(res.FeedbackText);
            }
        })
    }

    //获取上传文件后缀名
    getFileExtension(filename) {
        return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
    }

    //删除附件
    deleteCertify(event, index) {
        this.CertifyImgs.splice(index, 1);
        this.RecordIdArr.splice(index, 1);
        event.stopPropagation();
    }
}
