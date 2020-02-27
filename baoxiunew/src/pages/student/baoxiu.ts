import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";
import { App } from 'ionic-angular/components/app/app';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../http/http.service';
import { BaoXiuService } from '../baoxiu.service';
import * as qiniu from 'qiniu-js'
import { HelpUtils } from '../../app/utils/HelpUtils';
import { ServelUrl } from '../../app/ServelUrl';

import { SelectSearchableComponent } from 'ionic-select-searchable';

import { RepairArea } from '../baoxiu';

class Port {
    public Name: string;
    public RecordID: string;
    public IsDefault: string;
}
@IonicPage()
@Component({
    selector: 'page-baoxiu',
    templateUrl: 'baoxiu.html'
})
export class BaoXiuPage {
    disabledSave = false;
    trustedDashboardUrl: SafeUrl;
    serialNumber = '';
    uid = '';
    itemName = '';
    certifyImgs = []; // 上传后的文件
    areaList: RepairArea[] = [];
    fileLoading;
    valForm: FormGroup;
    ports: Port[];
    port: Port;
    showSuccessfulTips = false;
    itemData = [];
    constructor(
        public DomSanitization: DomSanitizer,
        public app: App,
        private fb: FormBuilder,
        public navCtrl: NavController,
        public navParams: NavParams,
        public httpService: HttpService,
        public baoxiuService: BaoXiuService,
        public helpUtil: HelpUtils,

    ) {
        this.valForm = this.fb.group({
            AreaRecordId: [''],
            SelectAreaRecordId: ['', [Validators.required, this.checkSpace]],
            SpecificSite: ['', [Validators.required, this.checkSpace, this.overLength10]],
            Phone: ['', [Validators.required, this.checkSpace, Validators.pattern('^1[1|3|4|5|7|8][0-9]{9}$')]],
            ItemCode: ['', Validators.required],
            Caption: ['', [Validators.required, this.checkSpace, this.overLength30]],
            DamageAttachs: [[]],
        })
    }

    ionViewWillEnter() {
        this.getUserPhone(); //获取手机号
        this.getRepairArea();
        this.getRepairItemList();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad IndexPage');
    }

    ionViewDidEnter() {
        antlinker.configTitle({
            type: "label",
            title: '网上报修',
            fail: () => {
            },
            success: ''
        });

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
    }

    portChange(event: { component: SelectSearchableComponent, value: any }) {
        console.log('port:', event.value);
    }

    // 校验空格
    checkSpace = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return;
        } else if (control.value.length > 0 && control.value.trim().length === 0) {
            return { space: true, error: true };
        }
    }

    // 校验损坏情况长度
    overLength30 = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return;
        } else if (control.value.length > 0 && control.value.trim().length > 30) {
            return { overlength: true, error: true };
        }
    }

    // 校验具体地点长度
    overLength10 = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return;
        } else if (control.value.length > 0 && control.value.trim().length > 10) {
            return { overlength: true, error: true };
        }
    }

    // 获取报修单编号
    getSerialNumber() {
        this.baoxiuService.querySerialNumber().then(res => {
            if (res.Data) {
                this.serialNumber = res.Data.SerialNumber;
            }
        });
    }

    // 获取用户手机号
    getUserPhone(): void {
        this.baoxiuService.queryUserPhone().then(res => {
            this.valForm.patchValue({ Phone: res.Data.Phone });
            this.uid = res.Data.IntelUserCode;
        });
    }

    // 获取报修项目
    getRepairItemList(): void {
        this.baoxiuService.queryRepairItem().then(res => {
            if (res.FeedbackCode === 0) {
                this.itemData = res.Data || [];
                this.itemData.forEach(element => {
                    element.checked = false;
                });
            } else {
                this.itemData = [];
            }
        });
    }

    // 报修项目的选择
    itemChange(item: any) {
        if (!item.checked) {
            this.valForm.patchValue({ ItemCode: item.Code });
            this.itemName = item.Name;
            this.itemData.forEach(element => {
                if (element.Code === item.Code) {
                    element.checked = true;
                } else {
                    element.checked = false;
                }
            });
        } else {
            item.checked = false;
            this.valForm.patchValue({ ItemCode: '' });
            this.itemName = '';
        }
        console.log('itemName' + this.itemName);
        // if (value === '0009020') {
        //     this.itemName = '水';
        // } else if (value === '0009030') {
        //     this.itemName = '电';
        // } else if (value === '0009040') {
        //     this.itemName = '门、窗';
        // } else if (value === '0009010') {
        //     this.itemName = '其他';
        // }
    }

    // 获取维修区域
    getRepairArea(): void {
        this.baoxiuService.queryRepairArea().then(res => {
            if (res.Data) {
                this.ports = res.Data;
                // 设置默认宿舍楼
                for (const k in this.ports) {
                    if (this.ports.hasOwnProperty(k) && this.ports[k].IsDefault == "1") {
                        this.valForm.controls.SelectAreaRecordId.setValue(this.ports[k]);
                        break;
                    }
                }
            }
        });
    }

    // 文件上传
    handleFiles(event) {
        console.log(event);
        if (this.certifyImgs.length > 9) {
            this.helpUtil.toastPop('最多只能上传9张图片');
            return;
        }
        var file = event.target.files[0];
        if (file.size > 5242880) {
            this.helpUtil.toastPop('文件大小限制:5M');
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
                that.helpUtil.toastPop(err.message);
                console.log(err)
                // ...
            },
            complete(res) {
                var file = obj.file;
                that.fileLoading.dismiss();
                console.log('obj.file', file);
                that.httpService.postJSON({
                    Router: ServelUrl.Url.saveAttach, Method: 'POST', Body: {
                        BizType: '',
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
        this.fileLoading = this.helpUtil.loadingPop('正在上传，请稍等...');
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

    ionViewWillLeave() {
        var event = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
        var d = document.querySelector('ion-backdrop');
        if (d) {
            d.dispatchEvent(event)
        }
    }

    // 保存
    save(): void {
        this.disabledSave = true;
        // tslint:disable-next-line:forin
        for (const i in this.valForm.controls) {
            this.valForm.controls[i].markAsDirty();
        }
        if (!this.valForm.valid) {
            this.disabledSave = false;
            return;
        }
        this.baoxiuService.querySerialNumber().then(res => {
            if (res.Data) {
                this.serialNumber = res.Data.SerialNumber;
                this.valForm.patchValue({ AreaRecordId: this.valForm.value.SelectAreaRecordId.RecordID });
                const attachsImgs = [];
                this.certifyImgs.forEach((value, index) => {
                    attachsImgs.push(value.RecordID);
                });
                this.valForm.patchValue({ DamageAttachs: attachsImgs.join(',') });
                const body = {
                    Action: 'Launch',
                    AreaName: this.valForm.value.SelectAreaRecordId.Name,
                    AreaRecordID: this.valForm.value.AreaRecordId,
                    SpecificSite: this.valForm.value.SpecificSite,
                    StudentPhone: this.valForm.value.Phone,
                    ItemCode: this.valForm.value.ItemCode,
                    Caption: this.valForm.value.Caption,
                    DamageAttachs: attachsImgs.join(','),
                    SerialNumber: this.serialNumber,
                    StudentUID: this.uid,
                    TaskTitle: this.valForm.value.SelectAreaRecordId.Name + this.valForm.value.SpecificSite.trim() + this.itemName + '报修'
                };
                this.baoxiuService.flowsLaunch(body).then(
                    res => {
                        if (res === 'ok') {
                            this.showSuccessfulTips = true;
                        } else {
                            this.helpUtil.toastPop('操作失败，请稍后重试！');
                        }
                        this.disabledSave = false;
                    }
                ).catch(
                    res => {
                        this.helpUtil.toastPop('操作失败，请稍后重试！');
                        this.disabledSave = false;
                    }
                );
            }
        });
    }

    // 成功后退出
    successful() {
        this.showSuccessfulTips = false;
        antlinker.closeView({
            success: function () {
                //设置右上角按钮成功
            },
            fail: function () {
                // 设置右上角按钮失败
            }
        });
    }

}
