import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ServelUrl } from './ServelUrl';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from "@angular/platform-browser";
import { DatePipe } from "@angular/common";
import { NzMessageService } from "ng-zorro-antd";
import { HttpService } from './http/http.service';
import * as qiniu from 'qiniu-js';
import { BaoXiuService } from "./baoxiu.service";

@Component({
    selector: 'app-baoxiu',
    templateUrl: './list.html',
    styleUrls: ['baoxiu.scss']
})

export class ListComponent implements OnInit {
    designateIsShow = false; // 是否显示派单对话框
    notNeedIsShow = false; // 是否显示无需处理对话框
    accomplishIsShow = false; // 是否显示维修完成对话框

    notNeedValue = ''; // 无需处理原因
    notNeedData: any; // 当前选中的无需处理数据

    repairPersonnelList = [] // 维修人员列表
    designateValue = '' // 派单给谁
    actionDesignateData: any; // 当前选中的派单数据

    actionaccomplishData: any; // 当前维修完成的数据

    CertifyImgs = [] // 维修完成图片
    RecordIdArr = []

    _startDate = null; //创建时间 - 开始时间
    _endDate = null;    //创建时间 - 结束时间
    PubstartDate = null; //发布时间 - 开始时间
    PubendDate = null;   //发布时间 - 结束时间

    _startDate1 = null; //创建时间 - 开始时间
    _endDate1 = null;    //创建时间 - 结束时间
    _endTime1 = null;
    _endTime = null;
    PubstartDate1 = null; //发布时间 - 开始时间
    PubendDate1 = null;   //发布时间 - 结束时间

    RepairPersonnelList2 = [] // 维修人员列表(搜索使用)

    uid = '' // 当前登录用户的uid
    pageIndex = 1;
    pageSize = 20;
    total = '0';
    searchForm: FormGroup;
    dataSet = [];
    areaList = [];
    RepairItemList = [];
    statuslist = [
        {
            label: '待处理',
            value: '10'
        },
        {
            label: '处理中',
            value: '20'
        },
        {
            label: '正在返工中',
            value: '21'
        },
        {
            label: '维修完成',
            value: '30'
        },
        {
            label: '无需处理',
            value: '31'
        },
        {
            label: '已关闭',
            value: '40'
        }
    ];
    constructor(
        private router: Router,
        private fb: FormBuilder,
        private datePipe: DatePipe,
        private msgsrv: NzMessageService,
        private httpService: HttpService,
        private DomSanitizer: DomSanitizer,
        private baoxiuService: BaoXiuService,
        private route: ActivatedRoute
    ) {
        console.log('*************************************');
    }

    ngOnInit() {
        this.route.queryParams.forEach((params: Params) => {
            this.searchForm = this.fb.group({
                AreaRecordID: [''],
                ItemCode: params['ItemCode'],
                Status: params['Status'],
                CreateTime: [''],
                SerialNumber: [''],
                CreateTime1: params['CreateTime1'],
                CreateTime2: params['CreateTime2'],
                EndTime1: [''],
                EndTime2: [''],
                RepairPersonnelUID: params['RepairPersonnelUID']
            });
        });

        this.getRepairList()
        this.getRepairItem()
        this.getRepairArea()
        this.getUserInfo()
        this.getRepairPersonnelList2()
    }

    // 获取当前登录用户UID
    getUserInfo(): void {
        this.baoxiuService.queryUserPhone().then(res => {
            this.uid = res.Data.IntelUserCode;
        });
    }

    // 禁止选择比开始时间小的结束时间
    _startValueChange = () => {
        if (this._startDate > this._endDate) {
            this._endDate = null;
        }
    };
    _endValueChange = () => {
        if (this._startDate > this._endDate) {
            this._startDate = null;
        }
    };
    _disabledStartDate = (startValue) => {
        if (!startValue || !this._endDate) {
            return false
        }
        return startValue.getTime() >= this._endDate.getTime();
    };
    _disabledEndDate = (endValue) => {

        if (!endValue || !this._startDate) {
            return false
        }
        return endValue.getTime() <= this._startDate.getTime()
    };
    _startValueChange1 = () => {
        if (this._startDate1 > this._endDate1) {
            this._endDate1 = null;
        }
    };
    _endValueChange1 = () => {
        if (this._startDate1 > this._endDate1) {
            this._startDate1 = null;
        }
    };
    _disabledStartDate1 = (startValue) => {
        if (!startValue || !this._endDate1) {
            return false
        }
        return startValue.getTime() >= this._endDate1.getTime();
    };
    _disabledEndDate1 = (endValue) => {

        if (!endValue || !this._startDate1) {
            return false
        }
        return endValue.getTime() <= this._startDate1.getTime()
    };

    // search
    search() {
        this.pageIndex = 1;
        if (this.searchForm.value.SerialNumber) {
            this.searchForm.value.SerialNumber = this.searchForm.value.SerialNumber.trim()
        }
        this.getRepairList();
    }

    // 重置
    reset() {
        this.searchForm.reset();
    }

    // 获取维修区域
    getRepairArea(): void {
        this.baoxiuService.queryRepairArea().then(res => {
            if (res.Data) {
                this.areaList = res.Data;
            }
        });
    }

    // 获取维修项目
    getRepairItem(): void {
        this.baoxiuService.queryRepairItem().then(res => {
            if (res.Data) {
                this.RepairItemList = res.Data;
            }
        });
    }

    // 获取报修任务列表
    getRepairList(): void {
        this.baoxiuService.queryRepairList(this.pageIndex, this.pageSize, this.searchForm.value).then(
            res => {
                if (res.Data.Datas) {
                    this.dataSet = res.Data.Datas;
                    this.total = res.Data.Total;
                } else {
                    this.dataSet = [];
                }
            }
        );
    }

    // 详情页
    goToDetail(flowinstancerecordid: string) {
        this.router.navigate(['/detail'], { queryParams: { flowinstancerecordid: flowinstancerecordid } });
    }

    // 维修数据统计页面
    goToStatistics() {
        this.router.navigate(['/statistics']);
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
            SpecificSite: this.notNeedData.SpecificSite,
            TaskRecordID: this.notNeedData.RecordID,
            SerialNumber: this.notNeedData.SerialNumber,
            TaskTitle: this.notNeedData.AreaName + this.notNeedData.SpecificSite + this.notNeedData.Item[0].Name, // 任务标题
        };

        this.baoxiuService.flowsHandle(this.notNeedData.NextNodeRecordID, body).then(res => {
            if (res == "ok") {
                this.notNeedIsShow = false
                this.msgsrv.success('处理成功')
                this.getRepairList()
            } else {
                this.msgsrv.warning('处理失败，请稍后重试')
            }
        }).catch(res => {
            this.msgsrv.warning('处理失败，请稍后重试')
        });
    }

    // 点击派单按钮
    designate(designateData: any) {
        this.getRepairPersonnelList(designateData.RecordID)
        this.actionDesignateData = designateData
        this.designateIsShow = true
        console.log(this.actionDesignateData.NextNodeRecordID)
    }

    // 获取维修人员列表(派单使用)
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

    // 获取维修人员列表(搜索使用)
    getRepairPersonnelList2() {
        this.baoxiuService.queryRepairPerson("").then(
            res => {
                if (res.Data) {
                    this.RepairPersonnelList2 = res.Data
                } else {
                    this.msgsrv.warning('获取维修人员列表失败');
                }
            }
        ).catch(res => {
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
            TaskRecordID: this.actionDesignateData.RecordID,
            RepairPersonnelUID: this.designateValue,
            DesignateUID: this.uid,
            TaskTitle: this.actionDesignateData.AreaName + this.actionDesignateData.SpecificSite + this.actionDesignateData.Item[0].Name,	// 任务标题
        };
        Object.assign(body, this.actionDesignateData, body);
        body.Action = 'Designate'
        delete body["Item"]
        delete body["DamageAttachs"]
        delete body["RepairAttachs"]
        delete body["StatusData"]
        delete body["Remark"]

        this.baoxiuService.flowsHandle(this.actionDesignateData.NextNodeRecordID, body).then(
            res => {
                if (res == "ok") {
                    this.designateIsShow = false
                    this.msgsrv.success('处理成功')
                    this.getRepairList()
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

    // 点击维修完成按钮
    accomplish(accomplishData: any) {
        this.actionaccomplishData = accomplishData
        this.accomplishIsShow = true
    }

    // 发起维修完成请求
    confirmAccomplish(): void {
        const body = {
            Action: 'Accomplish',
            TaskRecordID: this.actionaccomplishData.RecordID,
            Attachs: this.RecordIdArr.join(','),
            IntelUserCode: this.uid,
            StudentUID: this.actionaccomplishData.StudentUID, // 学生id
            TaskTitle: this.actionaccomplishData.AreaName + this.actionaccomplishData.SpecificSite + this.actionaccomplishData.Item[0].Name,	// 任务标题
        };
        Object.assign(body, this.actionaccomplishData, body);
        body.Action = 'Accomplish';
        delete body["Item"]
        delete body["DamageAttachs"]
        delete body["RepairAttachs"]
        delete body["StatusData"]
        delete body["Remark"]
        this.baoxiuService.flowsHandle(this.actionaccomplishData.NextNodeRecordID, body).then(
            res => {
                if (res == "ok") {
                    this.accomplishIsShow = false;
                    this.msgsrv.success('处理成功')
                    this.getRepairList()
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
