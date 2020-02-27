import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import * as qiniu from 'qiniu-js';

import { HttpService } from '../../http/http.service';
import { BaoXiuService } from '../baoxiu.service';

import { HelpUtils } from '../../app/utils/HelpUtils';
import { ServelUrl } from '../../app/ServelUrl';
import { RepairPerson } from '../baoxiu';
import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';

@IonicPage(
    {
        name: 'manager-task-detail',
        segment: 'manager-task-detail/:recordid'
    }
)
@Component({
    selector: 'page-manager-task-detail',
    templateUrl: 'manager-task-detail.html'
})
export class ManagerTaskDetailPage {
    disabledRemark = false; // 备注按钮是否禁用
    recordid = '';
    nodeRecordID = '';
    uid = '';
    repairPersonArr: RepairPerson[] = []; // 维修人员列表
    selectRepairPerson = '';
    hasSelectedPerson = false;
    remark = ''; // 添加标注
    remarkValid = false; // 添加标注
    showRemark = false;
    showDesignate = false;
    notNeedExplanation = ''; // 无需处理的原因
    notNeedExplanationValid = false;
    accomplishShow = false; // 点击维修完成后展示的图片上传页面
    notNeedShow = false; // 点击维修完成后展示的图片上传页面
    certifyImgs = []; // 上传后的文件
    fileLoading;
    flowsHistoryData = []
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
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad IndexPage');
    }

    ionViewWillEnter() {
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

        this.getUserInfo()
        this.recordid = this.navParams.get('recordid');
        if (this.recordid) {
            this.getRepairOne(this.recordid);
        }
    }

    // 获取当前登录用户UID
    getUserInfo(): void {
        this.baoxiuService.queryUserPhone().then(res => {
            this.uid = res.Data.IntelUserCode;
        });
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

    //跳转图片放大
    navPreview(params) {
        this.navCtrl.push('PreviewPage', params)
    }

    // 获取报修任务详情
    getRepairOne(recordid: string): void {
        this.baoxiuService.queryRepairOne(recordid).then(res => {
            // 获取报修任务相关信息
            if (res.Data) {
                this.task = res.Data
            }
            // 查询流程历史数据
            this.getFlowsHistory(this.task.FlowInstanceRecordID)
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

    // 获取维修人员列表
    getRepairPerson(): void {
        this.baoxiuService.queryRepairPerson(this.task.RecordID).then(
            res => {
                res.Data ? this.repairPersonArr = res.Data : this.repairPersonArr = [];
                if (this.repairPersonArr.length > 0) {
                    this.repairPersonArr.forEach((value, index) => {
                        this.repairPersonArr[index].Selected = false;
                    });
                }
            }
        );
    }

    // 角色点击
    personChange(index: number): void {
        if (this.repairPersonArr[index].Selected) {
            this.repairPersonArr[index].Selected = false;

        } else {
            this.repairPersonArr[index].Selected = true;
            this.hasSelectedPerson = false;
            if (this.repairPersonArr[index].Selected) {
                this.repairPersonArr.forEach((value, i) => {
                    if (index != i) {
                        this.repairPersonArr[i].Selected = false;
                    }
                });
            }
        }

    }

    // 弹出派单窗口
    designate() {
        this.getRepairPerson()
        this.showDesignate = true
    }

    // 取消派单
    cancleDesignate() {
        this.showDesignate = false;
    }

    // 发起派单请求
    confirmDesignate(): void {
        for (let i = 0; i < this.repairPersonArr.length; i++) {
            if (this.repairPersonArr[i].Selected) {
                this.selectRepairPerson = this.repairPersonArr[i].IntelUserCode;
                break;
            }
        }
        if (!this.selectRepairPerson) {
            this.hasSelectedPerson = true;
            return;
        }

        const body = {
            Action: 'Designate',
            TaskRecordID: this.task.RecordID,
            RepairPersonnelUID: this.selectRepairPerson,
            DesignateUID: this.uid,
            TaskTitle: this.task.AreaName + this.task.SpecificSite + this.task.Item[0].Name,	// 任务标题
        };
        Object.assign(body, this.task, body);
        body.Action = 'Designate'
        body.RepairPersonnelUID = this.selectRepairPerson
        delete body["Item"]
        delete body["DamageAttachs"]
        delete body["RepairAttachs"]
        delete body["StatusData"]
        delete body["Remark"]

        this.baoxiuService.flowsHandle(this.task.NextNodeRecordID, body).then(
            res => {
                if (res == "ok") {
                    this.showDesignate = false;
                    this.getRepairOne(this.recordid);
                    this.helpUtils.toastPop('派单成功');
                } else {
                    this.helpUtils.toastPop('处理失败，请稍后重试');
                }
            }
        ).catch(res => {
            this.helpUtils.toastPop('处理失败，请稍后重试');
        });
    }

    // 添加备注
    addMark(): void {
        this.showRemark = true;
    }

    // 取消添加备注
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
            this.remark = ''
            this.getRepairOne(this.recordid)
        });
        this.disabledRemark = false;
    }

    // 无需处理
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
                this.navCtrl.push('ManagerTaskListPage');
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

    // 发起维修完成请求
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
                    this.navCtrl.push('ManagerTaskListPage')
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
                this.getRepairOne(this.recordid);
                this.helpUtils.toastPop('处理完成');
                // this.navCtrl.push('ManagerTaskListPage');

            }
        );
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

    // 文件上传
    handleFiles(event) {
        console.log(event);
        var file = event.target.files[0];
        if (file.size > 5242880) {
            this.helpUtils.toastPop('文件大小限制:5M');
            return
        }
        this.baoxiuService.queryUpToken(file.name, file.size).then(res => {
            console.log(res);
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
