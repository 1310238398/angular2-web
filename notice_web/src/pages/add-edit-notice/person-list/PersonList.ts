import {HelpUtils} from './../../../app/utils/HelpUtils';
import {HttpService} from './../../../http/http.Service';
import {NoticeService} from './../../Notice.service';
import {Component, ViewChild} from "@angular/core";
import {NavParams, Platform, ViewController, Tabs, Config, AlertController, ToastController} from "ionic-angular";
import {DepartmentList} from "./org/Department";
import {GroupList} from "./group/Group";
import {FriendList} from "./friend/Friend";

/**
 * Created by hanzhendong on 2017/7/24.
 */
@Component({
    selector: 'page-personlist',
    templateUrl: 'personlist.html'
})
export class PersonList {
    @ViewChild('contactTabs') tabContact: Tabs;
    tab1Root = GroupList;
    tab2Root = DepartmentList;
    tab3Root = FriendList;
    Contacts: Array<object> = [];
    searchValue: string = '';
    selectedNum: number = 0;
    selectedDept: number = 0;
    searchFlag: boolean = false;
    searchItems: Array<object> = [];

    constructor(public platform: Platform,
                public params: NavParams,
                private http: HttpService,
                private HelpUtils: HelpUtils,
                public viewCtrl: ViewController, private NoticeService: NoticeService, private alertCtrl: AlertController, private toastCtrl: ToastController) {
        //this.Contacts = this.NoticeService.getContacts() || [];
        this.NoticeService.addContact.subscribe(
            (item) => {
                this.Contacts.push(item);
                if (item.Type == 1 || item.Type == 2) {
                    this.selectedDept += 1;
                    this.selectedNum += item.UserCount || 0;
                } else {
                    this.selectedNum += 1;
                }

            }
        );
        this.NoticeService.reduceContact.subscribe(
            (item) => {
                let index = this.Contacts.indexOf(item);
                this.Contacts.forEach((ele, index) => {
                    if (item.BuID == ele['BuID']) {
                        this.Contacts.splice(index, 1)
                    }
                })
                if (item.Type == 1 || item.Type == 2) {
                    this.selectedDept -= 1;
                    this.selectedNum -= item.UserCount || 0;
                } else {
                    this.selectedNum -= 1;
                }

            }
        );
        this.NoticeService.reduceContactAll.subscribe(
            (item) => {
                if (item.flag) {
                    this.selectedDept = 0;
                    this.selectedNum = 0;
                }

            }
        );
    }

    back() {
        this.viewCtrl.dismiss({
            Back: true,
            selectedDept: this.selectedDept,
            selectedNum: this.selectedNum
        });
    }

    dismiss() {
        this.HelpUtils.presentAlert({
            subTitle: '是否选择退出？',
            buttons: [{
                text: '取消', cssClass: 'zj-alert-close', role: 'cancel', handler: () => {
                }
            }, {
                text: '确定', handler: () => {
                    this.viewCtrl.dismiss({RollClose: true});
                    this.NoticeService.removeContactAll();
                }
            }]
        });
    }

    search(event) {
        if (this.searchValue.trim()) {
            this.searchFlag = true;
            console.log(this.searchValue.trim());
            this.http.postJSON({QueryValue: this.searchValue.trim()}, '/app/userroll/search').then(
                data => {
                    this.searchItems = data.Data || [];
                }
            );
        } else {
            this.searchFlag = false;
            this.NoticeService.removeContactAll();

        }
    }

    removeContact(item) {
        item.check = false;
        let index = this.NoticeService.getContacts().indexOf(item);
        if (index >= 0) {
            /*处理选择人数问题*/
            let tab;
            let tabInstance;
            if (!item.Type) {
                if (item.groupMember) {
                    tab = this.tabContact.getByIndex(0);
                    tabInstance = tab.getViews()[0].instance;
                    tabInstance.Groups.forEach(el => {
                        if (item.SourceBuID == el.GroupID) {
                            el.memNum--
                        }
                    })
                }
                if (item.DeptMember) {
                    tab = this.tabContact.getByIndex(1);
                    tabInstance = tab.getViews()[0].instance;
                    tabInstance.departments.forEach(el => {
                        if (item.SourceBuID == el.DeptID) {
                            el.memNum--
                        }
                    })
                }
            }
            this.NoticeService.removeContact(item);
        }
        /*全部删除后全选关闭*/
        if (!this.NoticeService.getContacts().length) {
            this.NoticeService.checkContactAll()
        }
    }

    setContacts(item) {
        let index = this.NoticeService.getContacts().indexOf(item);
        item.search = true;
        if (index >= 0) {
            this.NoticeService.removeContact(item);
        }
        this.NoticeService.setContacts(item);
    }

    onFinish() {
        let flag = this.NoticeService.getContacts().some(ele => {
            return !ele.roll
        });
        if (!flag) {
            this.HelpUtils.presentAlert({
                title: '提示',
                subTitle: '请先选择联系人',
                buttons: [{
                    text: '确定',
                    role: "cancle"
                }]
            });
            return;
        }
        let saveAlert = this.HelpUtils.presentAlert({
            subTitle: '保存为名单下次，下次可以直接使用',
            buttons: [{
                text: '不保存',
                role: 'cancel',
                cssClass: 'zj-alert-close',
                handler: () => {
                    this.viewCtrl.dismiss({
                        NotSaveRoll: true,
                        PersonList: true,
                        selectedDept: this.selectedDept,
                        selectedNum: this.selectedNum
                    });
                }
            }, {
                text: '保存',
                handler: () => {
                    var alert1 = this.HelpUtils.presentAlert({
                        inputs: [
                            {
                                name: 'title',
                                placeholder: '请输入名单名'
                            },
                        ],
                        subTitle: '你可以到校园集结号app，我-我的名单中管理名单，下载地址： <a href="http://www.antlinker.com/down.html" target="_blank">http://www.antlinker.com/down.html</a>',
                        buttons: [{
                            text: '取消',
                            role: 'cancel',
                            cssClass: 'zj-alert-close',
                            handler: () => {
                            }
                        }, {
                            text: '保存',
                            handler: (data) => {
                                if (!data.title) {
                                   var alert= this.HelpUtils.Alert({message:'名单名称不能为空',buttons: [{
                                       text: '确定',
                                       role: 'cancel',
                                       cssClass: 'zj-alert-close'
                                   }]});
                                   alert.present();
                                    return false
                                }

                                let datas = [];
                                this.NoticeService.getContacts().forEach((value, index) => {
                                    var item = {};
                                    item['Type'] = value.Type;
                                    item['BuID'] = value.BuID;
                                    item['Source'] = value.Source;
                                    item['SourceBuID'] = value.SourceBuID;
                                    datas.push(item);
                                })
                                this.http.postJSON({
                                    Name: alert1.data.inputs[0].value,
                                    datas: datas
                                }, '/app/userroll/add').then(
                                    data => {
                                        this.HelpUtils.presentAlert({
                                            title: '提示',
                                            subTitle: data.Text || '',
                                            buttons: [{
                                                text: '确定',
                                                handler: () => {
                                                    if (!data.RE) {
                                                        //∂ saveAlert.present();
                                                        console.log(this.NoticeService.getContacts());
                                                        console.log(this.Contacts);
                                                        let tempNum = this.selectedNum;
                                                        this.Contacts.forEach(item => {
                                                            this.NoticeService.deleteContact(item);
                                                            tempNum -= item['UserCount'];
                                                        })
                                                        this.viewCtrl.dismiss({
                                                            SaveRoll: true,
                                                            URID: data.Data.URID,
                                                            selectedNum: tempNum
                                                        });
                                                    }
                                                }
                                            }]
                                        });
                                    }
                                );
                            }
                        }]
                    });
                }
            }]
        });
    }
}