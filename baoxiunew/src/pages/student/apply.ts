import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { BaoXiuService } from '../baoxiu.service';
import { RepairDetail } from '../baoxiu';

@IonicPage(
    {
        name: 'student-detail-page',
        segment: 'apply/:recordid'
    }
)
@Component({
    selector: 'page-apply',
    templateUrl: 'apply.html'
})
export class ApplyPage {
    nodeRecordID = '';
    uid = window["__UserID"];
    recordid = '111';
    showReWork = false;
    reWorkReason = '';
    reWorkValid = false;
    flowsHistoryData = [
        {
            record_id: '', // 节点实例ID
            node_id: '', // 节点ID
            node_code: '', // 节点名称
            processor: 0, // 处理人ID
            processor_name: '', // 处理人姓名
            process_time: '', // 处理时间
            input_data: '', // 输入数据
            out_data: {
                Action: '',
            }, // 输出数据
            status: 0, // 处理状态(1: 待处理 2: 已完成)
            form_type: '', // 表单类型(URL: 表单链接路径 META: 表单元数据)
            form_data: '', // 表单数据
            title: '' // 标题（由自定义模板生成，需要指定节点属性history_title和history_todo_title）
        }
    ];
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
        RepairPersonnelUID: '', // 维修人员的 IntelUserCode
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
        public navCtrl: NavController,
        public navParams: NavParams,
        private alertCtrl: AlertController,
        private baoxiuService: BaoXiuService) {
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

        this.recordid = this.navParams.get('recordid');
        if (this.recordid) {
            this.getRepairOne(this.recordid);
        }
    }

    // 获取报修任务详情
    getRepairOne(recordid: string): void {
        this.baoxiuService.queryRepairOne(recordid).then(res => {
            // 获取报修任务相关信息
            if (res.Data) {
                this.task = res.Data
            }
            // 下一节点id
            if (this.task.NextNodeRecordID) {
                this.nodeRecordID = this.task.NextNodeRecordID
            }
            // 查询流程历史数据
            this.getFlowsHistory(this.task.FlowInstanceRecordID)
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

    // // 学生自己点击维修完成
    // accomplish(): void {
    //     const body = {
    //         Action: 'End',
    //         TaskRecordID: this.recordid
    //     };
    //     this.baoxiuService.flowsHandle(this.nodeRecordID, body).then(
    //         res => {
    //             this.task.Status = '30';
    //         }
    //     );
    // }

    // 返工
    reWork(): void {
        // let alert = this.alertCtrl.create({
        //     title: 'Low battery',
        //     subTitle: '10% of battery remaining',
        //     buttons: ['Dismiss']
        // });
        // alert.present();
        this.showReWork = true;
    }

    // 取消返工
    cancleReWork(): void {
        this.showReWork = false;
    }

    reWorkOnChange(value) {
        value && value.trim().length > 0 ? this.reWorkValid = false : this.reWorkValid = true;
    }

    // 确认返工
    confirmReWork(): void {
        if (!this.reWorkReason || this.reWorkReason.trim().length === 0) {
            this.reWorkValid = true;
            return;
        }
        if (this.reWorkReason.trim().length > 30) {
            return;
        }
        const body = {
            Action: 'Rework',
            TaskRecordID: this.task.RecordID,
            Reason: this.reWorkReason.trim(),
            RepairPersonnelUID: this.task.RepairPersonnelUID, // 维修工id
            TaskTitle: this.task.AreaName + this.task.SpecificSite + this.task.Item[0].Name // 任务标题
        }
        Object.assign(body, this.task, body)
        body.Action = 'Rework'
        delete body["Item"]
        delete body["DamageAttachs"]
        delete body["RepairAttachs"]
        delete body["StatusData"]
        delete body["Remark"]
        this.baoxiuService.flowsHandle(this.nodeRecordID, body).then(res => {
            this.showReWork = false;
            this.getRepairOne(this.recordid);
        }
        );
    }

    // 确认维修已完成
    confirmAccomplish(): void {
        const body = {
            Action: 'End',
            TaskRecordID: this.task.RecordID
        };
        this.baoxiuService.flowsHandle(this.nodeRecordID, body).then(
            res => {
                this.task.Status = '40';
                this.getFlowsHistory(this.task.FlowInstanceRecordID)
            }
        );
    }


}
