import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import * as qiniu from 'qiniu-js';

import { HttpService } from '../../http/http.service';
import { BaoXiuService } from '../baoxiu.service';

import { HelpUtils } from '../../app/utils/HelpUtils';
import { ServelUrl } from '../../app/ServelUrl';

@IonicPage(
    {
        name: 'detail-page',
        segment: 'worker-task-detail/:recordid'
    }
)
@Component({
    selector: 'page-worker-task-detail',
    templateUrl: 'worker-task-detail.html'
})
export class WorkerTaskDetailPage {
    disabledRemark = false; // 备注按钮是否禁用
    // flowInstanceID = '';  // 流程实例ID
    nodeRecordID = ''; // 节点实例ID
    uid = '';
    recordid = '';
    remark = ''; // 添加标注
    remarkValid = false; // 添加标注
    showRemark = false;
    notNeedExplanation = ''; // 无需处理的原因
    notNeedExplanationValid = false;
    accomplishShow = false; // 点击维修完成后展示的图片上传页面
    notNeedShow = false; // 点击维修完成后展示的图片上传页面
    certifyImgs = []; // 上传后的文件
    fileLoading;
    flowsHistoryData = [];
    task = {
        RecordID: '', // 报修任务RecordID
        StudentUID: '', // 报修学生的 IntelUserCode
        StudentName: '', // 学生姓名
        StudentSex: '', // 学生性别(不是代码，是男女汉字)
        StudentUserCode: '', // 学生学号
        StudentAvatarURL: '', // 学生头像
        StudentAcadamyName: '', // 学生学院名称
        StudentPhone: '', // 学生电话
        SerialNumber: '', // 报修单编号
        AreaName: '', // 报修区域名称
        SpecificSite: '', // 具体地点
        Item: [], // 报修项目信息
        Caption: '', // 损坏情况具体说明
        DamageAttachs: [], // 损坏情况图片信息
        RepairAttachs: [], // 维修情况图片信息
        RepairPersonnelName: '', // 维修人员姓名
        NotneedUserName: '', // 点击无需处理的人的姓名
        NotneedExplanation: '', // 无需处理原因
        ReworkNumber: '', // 返工次数
        Status: '', // 状态, 10 表示待处理, 20 表示处理中, 21 表示正在返工中, 30 表示维修完成, 31 表示无需处理, 40 表示已关闭
        StatusData: [], // 状态数据
        Remark: [], // 备注
        FlowInstanceRecordID: '', // 工作流流程实例ID
        NextNodeRecordID: '' // 下一节点实例ID
    }

    constructor(
        public DomSanitization: DomSanitizer,
        public navCtrl: NavController,
        public navParams: NavParams,
        private alertCtrl: AlertController,
        private httpService: HttpService,
        private baoxiuService: BaoXiuService,
        private helpUtils: HelpUtils
    ) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad IndexPage');
    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter IndexPage');
    }

    ionViewDidEnter() {
        antlinker.configTitleButton({
            type: 'close',
            text: '关闭',
            fail: function () {

            },
            success: function () {

            },
            trigger: function () {
            }
        });

        // console.log('history' + this.flowsHistoryData);
        // this.flowInstanceID = this.navParams.get('flowinstanceid') || '';
        // this.nodeRecordID = this.navParams.get('recordid') || '';
        // if (this.flowInstanceID) {
        //     this.getRepairOne(this.flowInstanceID);
        //     this.getFlowsHistory(this.flowInstanceID);
        // }
        this.getUserInfo()
        this.recordid = this.navParams.get('recordid')
        if (this.recordid) {
            this.getRepairOne(this.recordid);
        }
    }

    // 拨打电话
    call(tel: string) {
        console.log('tel--- ' + tel);
        antlinker.onTel(
            {
                tel: tel,
                text: '',
                success: function () {

                }
            }
        );
    }

    // 获取报修任务详情
    getRepairOne(recordid: string): void {
        this.baoxiuService.queryRepairOne(recordid).then(res => {
            // 获取报修任务相关信息
            if (res.Data) {
                this.task = res.Data
            }
            // 查询流程历史数据
            this.getFlowsHistory(recordid)
        })
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

    // 获取当前登录用户UID
    getUserInfo(): void {
        this.baoxiuService.queryUserPhone().then(res => {
            this.uid = res.Data.IntelUserCode;
        });
    }

    /**
     * 删除附件
     * @param event
     * @param index
     */
    deleteCertify(event, index) {
        console.log(event);
        this.certifyImgs.splice(index, 1);
        event.stopPropagation();
    }

    //跳转图片放大
    navPreview(params) {
        this.navCtrl.push('PreviewPage', params)
    }

    // 添加标注
    addMark(): void {
        this.remark = '';
        this.showRemark = true;
    }

    // 取消添加标注
    cancleAddMark(): void {
        this.showRemark = false;
    }

    remarkOnChange(value) {
        value && value.trim().length > 0 ? this.remarkValid = false : this.remarkValid = true;
    }
    // 发起添加备注请求
    confirmAddMark(): void {
        this.disabledRemark = true;
        if (!this.remark || this.remark.trim().length === 0) {
            this.remarkValid = true;
            this.disabledRemark = false;
            return;
        }
        if (this.remark.trim().length > 50) {
            this.disabledRemark = false;
            return;
        }
        this.baoxiuService.repairAddRemark(this.task.RecordID, this.remark.trim()).then(res => {
            this.showRemark = false
            this.getRepairOne(this.recordid)
        });
        this.disabledRemark = false;
    }

    // 显示无需处理弹窗
    notNeed(): void {
        this.notNeedShow = true;
    }

    // 取消无需处理
    cancleNotNeed(): void {
        this.notNeedShow = false;
    }

    notNeedExplanationOnChange(value) {
        value && value.trim().length > 0 ? this.notNeedExplanationValid = false : this.notNeedExplanationValid = true;
    }
    // 发起无需处理请求
    confirmNotNeed(): void {
        if (!this.notNeedExplanation || this.notNeedExplanation.trim().length === 0) {
            this.notNeedExplanationValid = true;
            return;
        }
        if (this.notNeedExplanation.trim().length > 20) {
            return;
        }
        const body = {
            Action: 'NotNeed',
            TaskRecordID: this.task.RecordID,
            Explanation: this.notNeedExplanation.trim(),
            IntelUserCode: this.uid,
            StudentUID: this.task.StudentUID, // 学生id
            TaskTitle: this.task.AreaName + this.task.SpecificSite + this.task.Item[0].Name,	// 任务标题
        };
        Object.assign(body, this.task, body);
        body.Action = 'NotNeed';
        delete body["Item"]
        delete body["DamageAttachs"]
        delete body["RepairAttachs"]
        delete body["StatusData"]
        delete body["Remark"]

        this.baoxiuService.flowsHandle(this.task.NextNodeRecordID, body).then(res => {
            if (res == "ok") {
                this.notNeedShow = false;
                this.navCtrl.push('WorkerTaskListPage');
            } else {
                this.helpUtils.toastPop('处理失败，请稍后重试');
            }
        }).catch(res => {
            this.helpUtils.toastPop('处理失败，请稍后重试');
        });
    }

    // 维修完成
    accomplish(): void {
        this.accomplishShow = true;
    }

    // 还未完成
    notAccomplish(): void {
        this.accomplishShow = false;
    }

    // 确定完成
    confirmAccomplish(): void {
        const attachs = []; // 维修完成图片
        if (this.certifyImgs.length > 0) {
            this.certifyImgs.forEach((value, index) => {
                attachs.push(value.RecordID);
            });
        }

        const body = {
            Action: 'Accomplish',
            TaskRecordID: this.task.RecordID,
            Attachs: attachs.join(','),
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
                    this.accomplishShow = false;
                    this.navCtrl.push('WorkerTaskListPage');
                } else {
                    this.helpUtils.toastPop('处理失败，请稍后重试');
                }
            }
        ).catch(res => {
            this.helpUtils.toastPop('处理失败，请稍后重试');
        });
    }

    // 接单
    receive(): void {
        const body = {
            Action: 'Receive',
            TaskRecordID: this.task.RecordID,
            RepairPersonnelUID: this.uid,
            StudentUID: this.task.StudentUID, // 学生id
            TaskTitle: this.task.AreaName + this.task.SpecificSite + this.task.Item[0].Name,	// 任务标题
        }
        Object.assign(body, this.task, body)
        body.Action = 'Receive'
        body.RepairPersonnelUID = this.uid
        delete body["Item"]
        delete body["DamageAttachs"]
        delete body["RepairAttachs"]
        delete body["StatusData"]
        delete body["Remark"]
        this.baoxiuService.flowsHandle(this.task.NextNodeRecordID, body).then(
            res => {
                if (res == "ok") {
                    this.helpUtils.toastPop('接单成功，请尽快处理');
                    this.navCtrl.push('WorkerTaskListPage');
                } else {
                    this.helpUtils.toastPop('处理失败，请稍后重试');
                }
            }
        ).catch(res => {
            this.helpUtils.toastPop('处理失败，请稍后重试');
        });
    }

    notNeedFunction(): void {
        this.baoxiuService.repairNotNeed(this.recordid, this.notNeedExplanation).then(
            res => {
                this.helpUtils.toastPop('处理完成');
                this.navCtrl.push('WorkerTaskListPage');
            }
        ).catch(res => {
            this.helpUtils.toastPop('处理失败，请稍后重试');
        });
    }

    // 文件上传
    handleFiles(event) {
        console.log("----------------------e", event);
        var file = event.target.files[0];
        if (file.size > 5242880) {
            this.helpUtils.toastPop('文件大小限制:5M');
            return
        }
        this.baoxiuService.queryUpToken(file.name, file.size).then(res => {
            console.log('res', res);
            this.upload({ file: file, key: res.Data.Key, token: res.Data.Proof })
        })
    }

    upload(obj) {
        console.log('file:', obj);
        var that = this;
        var observable = qiniu.upload(obj.file, obj.key, obj.token, {
            mimeType: ["image/png", "image/jpeg", "image/jpg", "image/gif"]

        }, {
                useCdnDomain: true
            });
        var observer = {
            next(res) {
                console.log(res)
                // ...
            },
            error(err) {
                that.helpUtils.toastPop(err.message);
                console.log(err)
                // ...
            },
            complete(res) {
                var file = obj.file;
                that.fileLoading.dismiss();
                console.log('obj.file', file);
                that.httpService.postJSON({
                    Router: ServelUrl.Url.saveAttach, Method: 'POST', Body: {
                        BizType: 'RoomCheck',
                        AttachmentItemName: file.name || '',
                        AttachmentItemType: file.type,
                        AttachmentItemSize: file.size.toString(),
                        AttachmentURL: res.key
                    }
                }).then(res => {
                    if (res.Data.RecordID) {
                        // that.valForm.DamageAttachs.push(res.Data.RecordID);
                        that.certifyImgs.push({ RecordID: res.Data.RecordID, url: window.URL.createObjectURL(file) });
                    }
                    console.log('url+====' + JSON.stringify(that.certifyImgs));
                })
            }
        };
        var subscription = observable.subscribe(observer); // 上传开始
        this.fileLoading = this.helpUtils.loadingPop('正在上传，请稍等...');
    }

}
