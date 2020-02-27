import {HttpService} from './../../http/http.Service';
import {Component, Input, ViewChild, ElementRef} from '@angular/core';
import {DatePipe} from '@angular/common';

import {Union} from '../data-structure/Union';
import {Member} from '../data-structure/Member';
import {ChoosenItem} from '../data-structure/ChoosenItem';

import {Notice} from '../../utility/Notice';
import {Group} from '../../utility/Group';
import {Department} from '../../utility/Department';
import {AlertController, ModalController, NavController, NavParams} from 'ionic-angular';
import {NoticeService} from '../Notice.service';
import {NoticePreview} from '../notice-preview/notice-preview';
import {NewGroup} from '../new-group/new-group';
import {GroupMember} from "../../utility/GroupMember";
import {ChatGroup} from "../../utility/ChatGroup";
// import { Department } from "../../utility/Department";
import {ReceiveObject} from "../../utility/ReceiveObject";
import {RollPage} from "./roll-list/roll";
import {HelpUtils} from "../../app/utils/HelpUtils";

declare var Quill: any;
let quill: any;

//declare var quill: any;
@Component({
    selector: 'page-add-edit-notice',
    templateUrl: 'add-edit-notice.html'
})
export class AddEditNotice {
    // @Input()
    @ViewChild('fileUpload') fileUpload: ElementRef;

    friendUnions: Union = {MemberMap: null};
    departmentUnion: Union = {UnionMap: null};
    groupUnion: Union = {UnionMap: null};

    UnionMap: Map<string, Union> = null;
    choosenMap: Map<string, ChoosenItem>;
    selectedNum: number = 0;
    selectedDept: number = 0;
    sentData = {items: []};


    groupToAddName: string;

    // 好友列表，在打开本页面时加载好友列表
    chatFriendList: GroupMember[] = [];

    // 这个群组列表是异步加载的
    chatGroupList: ChatGroup[] = [];
    // 这个也是异步加载的，群组的id对应到群组成员的列表
    chatGroupMemberMap: Map<string, GroupMember[]> = new Map<string, GroupMember[]>();

    // 这个组织机构列表是异步加载的
    // departmentList: Department[] = [];
    // 这个也是异步加载的，组织机构的code对应到组织机构的class的列表
    departmentClassMap: Map<string, Department[]> = new Map<string, Department[]>();
    // 这个也是异步加载的，class的code对应到class成员的列表
    departmentClassMemberMap: Map<string, GroupMember[]> = new Map<string, GroupMember[]>();

    // 新建分组将要包含的成员列表，与groupMemberToAddIdSet是同步的
    groupMemberToAddList: GroupMember[] = [];
    // 新建分组将要包含的成员uid的集合，与groupMemberToAddList是同步的
    groupMemberToAddIdSet: Set<string> = new Set<string>();

    // 原来的群组名字
    groupToOldName: string;
    // 原来分组包含的成员列表，与groupMemberToAddIdSet是同步的
    groupMemberToOldList: GroupMember[] = [];
    // 原来分组将要包含的成员uid的集合，与groupMemberToAddList是同步的
    groupMemberToOldIdSet: Set<string> = new Set<string>();

    // 是否显示好友列表，默认为false
    showChatFriendList: boolean = false;

    // 显示聊天群组列表
    showChatGroupList: boolean = false;

    // 显示部门列表
    showDepartmentList: boolean = false;

    // 好友列表被选中
    isChatFriendListChecked: boolean = false;

    // 群组列表被选中
    isChatGroupListChecked: boolean = false;

    // 部门列表被选中
    isDepartmentListChecked: boolean = false;

    oldGroup: Group = null;

    createAvaliable = false;

    public notice: Notice = new Notice();
    title: string;
    html: string;
    add: boolean = false;
    text: string;

    // 默认是新建
    isEdit: boolean = false;
    saveNoticeEnable: boolean = true;

    public content: string = '<span>My Document\'s Title</span>';
    // 存储所有的单位
    All: Group[] = new Array<Group>();

    // 存储所有的发出通知的列表
    departmentList: Department[] = new Array<Department>();
    /* 过去是名单 */
    Rolls: Array<object> = [];

    // customers: Array<string> = ["aaa", 'bbb'];
    constructor(private HelpUtils: HelpUtils, private http: HttpService, private noticeService: NoticeService, private params: NavParams, public navCtrl: NavController, private modalCtrl: ModalController) {
        console.log("AddEditNotice" + JSON.stringify(params));
        // 如果从别处跳来，打印AddEditNotice{"data":{"id":"100000000262"}}
        if ("notice" in params.data) {
            let mustId: string = params.get('notice').MUSTID;
            this.noticeService.getDepartmentList().then(departments => {
                this.departmentList = departments;
                this.noticeService.getPublishNoticesContentBatch([mustId]).then(result => {
                        this.notice = result[0];
                        console.log("reedit" + JSON.stringify(this.notice));
                        let quchongDatas = [];
                        this.notice.RECEIVEOBJECTS.forEach(item => {

                            /* if (item.TYPE == '5' || item.TYPE == '6' || item['roll']) {
                                 this.selectedNum += item['UserCount'] || 0;
                             } else {
                                 this.selectedNum += 1;
                             }*/
                            let quchongItem = {BuID: '', Type: ''};
                            switch (item.TYPE) {
                                case '6':
                                    quchongItem.BuID = item.ID;
                                    quchongItem.Type = '2';
                                    break;
                                case '5':
                                    quchongItem.BuID = item.ID;
                                    quchongItem.Type = '1';
                                    break;
                                case '7':
                                    quchongItem.BuID = item.ID;
                                    quchongItem.Type = '9';
                                    break;
                            }
                            quchongDatas.push(quchongItem);
                        });
                        this.http.postJSON({Datas: quchongDatas}, '/app/userroll/usercount').then(
                            data => {
                                this.selectedNum = data.Data.Count || 0;
                            }
                        );
                        quill.setText(this.notice.MUSTDESC);
                        this.isEdit = true;
                    }
                );
            });

        } else {
            this.noticeService.getDepartmentList().then(departments => {
                this.departmentList = departments;
                // 检查localstorage里面有没有latestCreated
                // alert("departmentList" + JSON.stringify(this.departmentList));
            });
        }

    }

    ionViewWillEnter(): void {
        // 检查localstorage里面有没有latestCreatedGroup
        // 有的话，添加元素到
        /*
        ID: number;
    Name : string;*/

        if (localStorage.getItem("latestCreatedGroup") !== null) {
            let group: Group = JSON.parse(localStorage.getItem("latestCreatedGroup"));
            this.notice.RECEIVEOBJECTS.push({ID: group.ID + "", NAME: group.Name, TYPE: "3"})
            localStorage.removeItem("latestCreatedGroup");
        }
        console.log("ionViewWillEnter");
        if (this.UnionMap == null) {
            this.noticeService.getChatFriendList().then(list => {
                let friendMap: Map<string, Member> = new Map<string, Member>();
                //  departmentClassMap: Map<string, Department[]> = new Map<string, Department[]>();
                for (let j = 0; j < list.length; ++j) {
                    friendMap.set(list[j].USERCODE, list[j]);
                    list[j].CHECKED = false;
                }
                this.friendUnions.MemberMap = friendMap;

            });
        }

        this.noticeService.getGroupList().then(groups => {
            console.log(groups);
            let groupMap: Map<string, Union> = new Map<string, Union>();
            for (let k = 0; k < groups.length; ++k) {
                groupMap.set((groups[k].ID).toString(), groups[k]);
            }
            console.log(groupMap);
            this.groupUnion.UnionMap = groupMap;
            console.log(this.groupUnion.UnionMap);
        })
    }

    goBack(): void {
        this.navCtrl.pop();
    }

    //获取群组列表
    getGroupList() {
        this.noticeService.getGroupList().then(groups => {
            console.log(groups);
        })

    }

    // getGroupList() {
    //     this.noticeService.getGroupList().then(groups => {
    //         // console.log("before" + JSON.stringify(groups))
    //         // console.log("before" + JSON.stringify(this.notice.RECEIVEOBJECTS))
    //         // 判断是不是已经选中
    //         if (this.notice !== undefined) {
    //             if (this.notice.RECEIVEOBJECTS !== undefined) {
    //                 for (let i = 0; i < groups.length; ++i) {
    //                     console.log(i);
    //                     for (let j = 0; j < this.notice.RECEIVEOBJECTS.length; ++j) {
    //                         if (parseInt(this.notice.RECEIVEOBJECTS[j].ID) === groups[i].ID) {
    //                             console.log("equal");
    //                             groups[i].Checked = true;
    //                             break;
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //         console.log("after" + JSON.stringify(groups));
    //         this.All = groups;
    //     });
    // }
    // delete(chip: Element) {

    //   chip.remove();


    //   // 操作数组数据
    // }
    delete(name: string): void {

        this.notice.RECEIVEOBJECTS.forEach((object: ReceiveObject, num: number, arr: ReceiveObject[]) => {

            if (object.NAME === name) {
                arr.splice(num, 1);
            }
        });
        // 很奇怪

    }

    displayAddUser(): void {
        /*     if (this.params.get('edit')) {
                 this.notice.RECEIVEOBJECTS.forEach(item=>{
                     let sendItem = { Type: '',check:'',Name:''};
                     switch (item.TYPE) {
                         case '6':
                             sendItem['BuID'] = item.ID;
                             sendItem['DeptName'] = item.NAME;
                             sendItem['dept'] = true;
                             sendItem['UserCount'] = item['USERCOUNT']||0;
                             sendItem.Type = '2';
                             break;
                         case '5':
                             sendItem['BuID'] = item.ID;
                             sendItem['GroupName'] = item.NAME;
                             sendItem['group'] = true;
                             sendItem['UserCount'] = item['USERCOUNT']||0;
                             sendItem.Type = '1';
                             break;
                         case '7':
                             sendItem['URID'] = item.ID;
                             sendItem.Name=item.NAME;
                             sendItem.Type = item.TYPE;
                             sendItem['UserCount'] = item['USERCOUNT']||0;
                             sendItem['roll'] = true;
                             break;
                         default:
                             sendItem.Name = item.NAME;
                             sendItem['BuID'] = item.ID;
                             sendItem['UserCount'] += 1;
                             sendItem.Type = '0';
                             break;
                     }
                     if(this.sentData&&this.sentData.items){
                         this.sentData.items.push(sendItem);
                         this.noticeService.setContacts(sendItem)
                     }
                 })
             }*/
        let modal = this.modalCtrl.create(RollPage, {data: this.sentData || []}, {enableBackdropDismiss: false});
        modal.onDidDismiss(data => {
            console.log(data);
            this.sentData = data;
            this.selectedNum = 0;
            let quchongDatas = [];
                this.notice.RECEIVEOBJECTS = [];
            if (data && data.items) {
                data.items.forEach(item => {
                    let recive = {ID: '', NAME: '', TYPE: ''};
                    let quchongItem = {BuID: '', Type: ''};
                    switch (item.Type) {
                        case 2:
                            recive.NAME = item.DeptName;
                            recive.ID = item.BuID;
                            recive.TYPE = '6';
                            quchongItem.BuID = item.BuID;
                            quchongItem.Type = item.Type;
                            break;
                        case 1:
                            recive.NAME = item.GroupName;
                            recive.ID = item.BuID;
                            recive.TYPE = '5';
                            quchongItem.BuID = item.BuID;
                            quchongItem.Type = item.Type;
                            break;
                        case 7:
                            recive.NAME = item.Name;
                            recive.ID = item.URID;
                            recive.TYPE = '7';
                            recive['SOURCE'] = 9;
                            recive['SOURCEBUID'] = '';
                            quchongItem.BuID = item.URID;
                            quchongItem.Type = '9';
                            break;
                        default:
                            recive.NAME = item.Name;
                            recive.ID = item.BuID;
                            recive.TYPE = '4';
                            quchongItem.BuID = item.BuID;
                            recive['SOURCE'] = item.Source;
                            recive['SOURCEBUID'] = item.SourceBuID;
                            quchongItem.Type = '0';
                            break;
                    }
                    recive['UserCount'] = item.UserCount;
                    console.log(recive);
                    this.notice.RECEIVEOBJECTS.push(recive);
                    console.log(this.notice.RECEIVEOBJECTS)
                    quchongDatas.push(quchongItem);
                    /* if (item.Type == 1 || item.Type == 2 || item.roll) {
                         this.selectedNum += item.UserCount || 0;
                     } else {
                         this.selectedNum += 1;
                     }*/
                });
            }
            if (quchongDatas.length) {
                this.http.postJSON({Datas: quchongDatas}, '/app/userroll/usercount').then(
                    data => {
                        this.selectedNum = data.Data.Count || 0;
                    }
                );
            }
        });
        modal.present();
        console.log('新页面了')
        /* if (this.add) {
             this.add = false;
         }
         else {
             this.getGroupList();
             this.add = true;
         }*/
    }


    // saveSelectedGroup() {
    //     this.notice.RECEIVEOBJECTS = [];
    //     for (let i = 0; i < this.All.length; ++i) {
    //         if (this.All[i].Checked) {
    //             for (let j = 0; j < this.notice.RECEIVEOBJECTS.length; ++j) {
    //                 if (parseInt(this.notice.RECEIVEOBJECTS[j].ID) === this.All[i].ID) {
    //                     continue;
    //                 }
    //             }
    //             this.notice.RECEIVEOBJECTS.push({ ID: this.All[i].ID + "", NAME: this.All[i].Name, TYPE: "3" });
    //         }
    //     }
    //     this.displayAddUser();

    // }

    cancelSelectedGroup() {
        for (let i = 0; i < this.All.length; ++i) {
            let itemChecked: boolean = false;
            for (let j = 0; j < this.notice.RECEIVEOBJECTS.length; ++j) {
                if (parseInt(this.notice.RECEIVEOBJECTS[j].ID) === this.All[i].ID) {
                    this.All[i].Checked = true;
                    itemChecked = true;
                    break;
                }
            }
            if (!itemChecked) {
                this.All[i].Checked = false;
            }

        }
        this.displayAddUser();
    }

    ngAfterViewInit() {

        // let Delta = Quill.import('delta');

        //Quill.register('theme/snow', snow);
        //
        quill = new Quill('#editor', {

            modules: {
                toolbar: [
                    // [{ header: [1, 2, false] }],
                    [{'size': ['small', false, 'large', 'huge']}],
                    ['bold', 'italic', 'underline'],
                    [{'color': []}, {'background': []}]
                ]
            },
            placeholder: '',
            theme: 'snow'

        });

    }

    saveNotice() {
        let flag = this.valite();
        if (!flag) {
            return;
        }
        this.noticeService.removeContactAll()
        if (this.saveNoticeEnable) {
            //this.noticeService.removeContactAll();
            this.saveNoticeEnable = false;
            this.beforeNext();
            if (this.isEdit) {
                this.noticeService.editMust(this.notice).then(result => {
                    console.log("editMust" + JSON.stringify(this.notice));
                    localStorage.setItem("refreshPubNoticeList", "true");
                    console.log("editMust success");
                    this.navCtrl.pop();
                }).catch(error => {
                    console.log("editMust failed");
                })
            } else {
                this.noticeService.addMust(this.notice).then(result => {
                    console.log("saveNotice" + JSON.stringify(this.notice));
                    localStorage.setItem("refreshPubNoticeList", "true");
                    console.log("saveNotice success");
                    this.navCtrl.pop();
                }).catch(error => {
                    console.log("saveNotice failed");
                })
            }

        }

    }

    valite() {
        console.log(this.notice.VALIDTIME);
        console.log(new DatePipe("en-US").transform(new Date(), 'yyyyMMddHHmmss'));
        if (!this.notice.RECEIVEOBJECTS.length) {
            this.HelpUtils.presentAlert({
                title: '提示',
                subTitle: '请选择接收人',
                buttons: [{
                    text: '确定',
                    role: "cancle"
                }]
            });
            return false
        } else if (!this.notice.MUSTTITLE.trim()) {
            this.HelpUtils.presentAlert({
                title: '提示',
                subTitle: '题目为必填项',
                buttons: [{
                    text: '确定',
                    role: "cancle"
                }]
            });
            return false
        } else if (!this.notice.DEPARTMENT) {
            this.HelpUtils.presentAlert({
                title: '提示',
                subTitle: '发送单位为必填项',
                buttons: [{
                    text: '确定',
                    role: "cancle"
                }]
            });
            return false
        }else if (this.notice.VALIDTIME<new DatePipe("en-US").transform(new Date(), 'yyyyMMddHHmm')) {
            this.HelpUtils.presentAlert({
                title: '提示',
                subTitle: '有效日期不能在当前日期之前',
                buttons: [{
                    text: '确定',
                    role: "cancle"
                }]
            });
            return false
        }else if (this.notice.REMINDTIME<new DatePipe("en-US").transform(new Date(), 'yyyyMMddHHmm')) {
            this.HelpUtils.presentAlert({
                title: '提示',
                subTitle: '提醒日期不能在当前日期之前',
                buttons: [{
                    text: '确定',
                    role: "cancle"
                }]
            });
            return false
        }
        else {
            return true
        }

    }

    gotoPreview(): void {
        let flag = this.valite();
        if (!flag) {
            return;
        }
        this.noticeService.removeContactAll();
        this.beforeNext();
        if (this.departmentList !== null && this.departmentList !== undefined) {
            for (let i = 0; i < this.departmentList.length; ++i) {
                if (this.departmentList[i].DEPTCODE === this.notice.DEPARTMENT) {
                    this.notice.DEPTNAME = this.departmentList[i].DEPTNAME;
                    break;
                }
            }
        }
        console.log("before preview" + JSON.stringify(this.notice));
        this.navCtrl.push(NoticePreview, {object: this.notice})

    }

    beforeNext() {
        if (this.notice.MUSTTIME === "") {
            let date = new Date();
            var datePipe = new DatePipe("en-US");
            this.notice.MUSTTIME = datePipe.transform(date, 'yyyyMMddHHmmss');
        }
        this.notice.MUSTTITLE=this.notice.MUSTTITLE.trim();
        let text: string = quill.getText() as string;
        // text = text.replace("\n", "<br>");
        // text = text.replace(" ", "&nbsp;");
   /*     text = text.replace(new RegExp(/(\n)/g), '<br>');
        text = text.replace(new RegExp(/( )/g), '&nbsp;');*/
        this.notice.MUSTDESC = text;
  /*      this.notice.MUSTDESC = this.notice.MUSTDESC.replace(/(\n)/g, "");
        this.notice.MUSTDESC = this.notice.MUSTDESC.replace(/(\t)/g, "");
        this.notice.MUSTDESC = this.notice.MUSTDESC.replace(/(\r)/g, "");
        this.notice.MUSTDESC = this.notice.MUSTDESC.replace(/<\/?[^>]*>/g, "");
        this.notice.MUSTDESC = this.notice.MUSTDESC.replace(/\s*!/g, "");
        this.notice.MUSTDESC = this.notice.MUSTDESC.replace(/&nbsp;*!/g, "");*/
    }

    gotoAddNewGroup(): void {
        this.add = false;
        this.navCtrl.push(NewGroup, {})
        //  this.navCtrl.push(NewGroup, {})
    }

    modifyGroup(group: Group): void {
        this.add = false;
        this.navCtrl.push(NewGroup, {object: group});
    }

    //http://stackoverflow.com/questions/36352405/file-upload-with-angular2-to-rest-api/39862337#39862337
    // {"RE":0,"Text":"上传成功",
    // "Data":{"ID":"575496ef-d797-45df-a782-190f50c398b3","FileName":"title.png","FileSize":649304,"FileType":".png",
    // "FileLink":"attach/must/575496ef-d797-45df-a782-190f50c398b3/title.png"}}
    upload(): void {

        console.log("uploadFile begin");
        this.noticeService.uploadFile(this.fileUpload).then(attachment => {
            console.log("upload" + JSON.stringify(attachment));
            this.notice.ATTACHMENTS.push(attachment);
            this.notice.ATTACHMENTS = this.notice.ATTACHMENTS.slice();
            console.log("after upload" + (this.notice.ATTACHMENTS.length === 0))
        });
    }

    remindCheckChanged(isRemind) {
        // this.notice.REMINDTIME = date;
        if (isRemind) {
            this.notice.ISREMIND = "1";
        } else {
            this.notice.ISREMIND = "0";
        }
    }

    //newGroup 获取全部成员
    // ionViewWillEnter
    ngOnInit(): void {

    }


    //newGroup
    // ngOnInit(): void {
    //     this.oldGroup = this.params.get('object');

    //     // 获取全部成员
    //     if (this.oldGroup !== undefined) {
    //         this.createAvaliable = true;
    //         this.noticeService.getChatFriendList().then(list => {
    //             for (let j = 0; j < list.length; ++j) {
    //                 if (!this.groupMemberToAddIdSet.has(list[j].UID)) {
    //                     list[j].STATE = 0;
    //                 } else {
    //                     list[j].STATE = 2;
    //                 }
    //                 list[j].CHECKED = false;
    //                 // console.log(this.chatFriendList[i].CHECKED)
    //             }
    //             this.chatFriendList = list;
    //             this.showChatFriendList = true;
    //             this.groupToAddName = this.oldGroup.Name;
    //             this.groupToOldName = this.oldGroup.Name;
    //             let groupId: number = this.oldGroup.ID;
    //             let count: number = 100;
    //             this.getAllGroupMember(groupId, "", count);
    //         });

    //     } else {
    //         this.noticeService.getChatFriendList().then(list => {
    //             for (let j = 0; j < list.length; ++j) {
    //                 if (!this.groupMemberToAddIdSet.has(list[j].UID)) {
    //                     list[j].STATE = 0;
    //                 } else {
    //                     list[j].STATE = 2;
    //                 }
    //                 list[j].CHECKED = false;
    //                 // console.log(this.chatFriendList[i].CHECKED)
    //             }
    //             this.chatFriendList = list;
    //             this.showChatFriendList = true;
    //         });
    //     }
    // }

    // 获取所有的群组成员
    getAllGroupMember(groupId: number, uid: string, count: number) {
        this.noticeService.getGroupMemberList(groupId, uid, count).then(list => {
            for (let i = 0; i < list.length; ++i) {
                if (!this.groupMemberToAddIdSet.has(list[i].UID)) {
                    list[i].CHECKED = false;
                    list[i].STATE = 2;
                    this.groupMemberToAddIdSet.add(list[i].UID);
                    this.groupMemberToOldIdSet.add(list[i].UID);
                } else {
                    list[i].CHECKED = false;
                    list[i].STATE = 0;
                }
            }
            this.groupMemberToOldList = this.groupMemberToOldList.concat(list);
            this.groupMemberToAddList = this.groupMemberToAddList.concat(list);
            if (list.length === count) {
                let uid: string = list[list.length - 1].UID;
                this.getAllGroupMember(groupId, uid, count);
            } else {
                // 获取完了就同步一次状态
                this.syncData();
            }
        });
    }


    //好友列表 第一层
    // chatFriendListCheckChanged(isChatFriendListChecked: boolean) {
    //     console.log("chatFriendListCheckChanged ing");
    //     // 这个checkbox被选中有两种可能性，一种是所有的其它还有都被选中了，需要选中它，另一种是主动的触发
    //     if (isChatFriendListChecked) {
    //         console.log("this.isChatFriendListChecked === true");
    //         for (let i = 0; i < this.chatFriendList.length; ++i) {
    //             // 如果已经被选中了，不用管了
    //             if (this.chatFriendList[i].CHECKED !== true && this.chatFriendList[i].STATE === 0) {
    //                 this.chatFriendList[i].CHECKED = true;
    //                 this.chatFriendList[i].STATE = 1;
    //             }
    //         }

    //     } else {
    //         console.log("chatFriendListCheckChanged else");
    //         for (let i = 0; i < this.chatFriendList.length; ++i) {
    //             if (this.chatFriendList[i].CHECKED === true && this.chatFriendList[i].STATE === 1) {
    //                 this.chatFriendList[i].CHECKED = false;
    //                 this.chatFriendList[i].STATE = 0;
    //             }
    //         }
    //     }
    // }

    //组织结构，最后一层
    leftMemberCheckedChanged(groupMember: GroupMember) {
        // 
        console.log("left member state " + groupMember.CHECKED + groupMember.STATE);
        if (groupMember.CHECKED === true && groupMember.STATE === 0) {
            groupMember.STATE = 1;
        } else if (groupMember.CHECKED === false && groupMember.STATE === 1) {
            groupMember.STATE = 0;
        }
    }

    leftChatFriendMemberCheckedChanged(groupMember: GroupMember) {
        // 
        if (groupMember.CHECKED === true && groupMember.STATE === 0) {
            groupMember.STATE = 1;
        } else if (groupMember.CHECKED === false && groupMember.STATE === 1) {
            groupMember.STATE = 0;
        }
        // 如果列表中没有状态为0的好友
        // for (let i = 0; i < this.chatFriendList.length; ++i) {
        //     if (this.chatFriendList[i].STATE === 0) {
        //         this.isChatFriendListChecked = false;
        //         return;
        //     }
        // }
        // this.isChatFriendListChecked = true;
    }

    leftChatGroupMemberCheckedChanged(groupMember: GroupMember, group: Group) {
        // 
        if (groupMember.CHECKED === true && groupMember.STATE === 0) {
            groupMember.STATE = 1;
        } else if (groupMember.CHECKED === false && groupMember.STATE === 1) {
            groupMember.STATE = 0;
        }
        // 如果列表中没有状态为0的成员，当前分组被选中
        // let tempList: GroupMember [] = this.chatGroupMemberMap.get(group.ID);
        // for (let i = 0; i < tempList.length; ++i) {
        //     this.
        // }
    }

    leftDepartmentMemberCheckedChanged(groupMember: GroupMember) {
        // 
        if (groupMember.CHECKED === true && groupMember.STATE === 0) {
            groupMember.STATE = 1;
        } else if (groupMember.CHECKED === false && groupMember.STATE === 1) {
            groupMember.STATE = 0;
        }
    }

    tiggerShowChatFriendList() {
        if (this.showChatFriendList) {
            this.showChatFriendList = false;
        } else {
            this.showChatFriendList = true;
        }
    }

    // // 先获取所有的数据，然后全部选中
    // chatGroupListCheckChanged(isChatGroupListChecked: boolean) {
    //     if (isChatGroupListChecked) {
    //         // 群组表中没有数据，还没有拿过chatGroupList
    //         if (this.chatGroupList.length === 0) {
    //             let promiseList = [];
    //             this.noticeService.getChatGroupList().then(list => {
    //                 this.chatGroupList = list;
    //                 for (let i = 0; i < this.chatGroupList.length; ++i) {
    //                     let tempPromise = this.noticeService.getChatGroupMemberList(this.chatGroupList[i].GroupID).then(list => {
    //                         this.chatGroupMemberMap.set(this.chatGroupList[i].GroupID, list);
    //                     })
    //                     promiseList.push(tempPromise);
    //                 }
    //                 Promise.all(promiseList).then(values => {
    //                     this.markGroupListMembersChecked();
    //                 })
    //             });

    //         } else {
    //             // 群组表中已经有数据了，把所有的数据获取全
    //             let promiseList = [];
    //             for (let i = 0; i < this.chatGroupList.length; ++i) {
    //                 if (!this.chatGroupMemberMap.has(this.chatGroupList[i].GroupID)) {
    //                     let tempPromise = this.noticeService.getChatGroupMemberList(this.chatGroupList[i].GroupID).then(list => {
    //                         // for (let j = 0; j < list.length; ++j) {
    //                         //     if (!this.groupMemberToAddIdSet.has(list[j].UID)) {
    //                         //         list[j].STATE = 0;
    //                         //     } else {
    //                         //         list[j].STATE = 2;
    //                         //     }
    //                         //     list[j].CHECKED = false;
    //                         //     // console.log(this.chatFriendList[i].CHECKED)
    //                         // }
    //                         this.chatGroupMemberMap.set(this.chatGroupList[i].GroupID, list);
    //                     })
    //                     promiseList.push(tempPromise);
    //                 }
    //             }
    //             if (promiseList.length !== 0) {
    //                 Promise.all(promiseList).then(values => {
    //                     this.markGroupListMembersChecked();

    //                 })
    //             } else {
    //                 this.markGroupListMembersChecked();

    //             }
    //         }
    //     } else {
    //         for (let i = 0; i < this.chatGroupList.length; ++i) {
    //             if (this.chatGroupMemberMap.has(this.chatGroupList[i].GroupID)) {
    //                 let tempList: GroupMember[] = this.chatGroupMemberMap.get(this.chatGroupList[i].GroupID);
    //                 for (let j = 0; j < tempList.length; ++j) {
    //                     if (tempList[j].STATE === 1) {
    //                         tempList[j].CHECKED = false;
    //                         tempList[j].STATE = 0;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    markGroupListMembersChecked() {
        // 全部添加到groupMemberToAddIdSet
        for (let j = 0; j < this.chatGroupList.length; ++j) {
            this.chatGroupList[j].CHECKED = true;
            let tempList: GroupMember[] = this.chatGroupMemberMap.get(this.chatGroupList[j].GroupID);
            for (let k = 0; k < tempList.length; ++k) {
                if (tempList[k].STATE === 0) {
                    tempList[k].CHECKED = true;
                    tempList[k].STATE = 1;
                }
            }
        }
    }

    chatGroupMemberListCheckChanged(chatGroup: ChatGroup) {
        console.log("aaaaa chatGroupMemberListCheckChanged")
        console.log(chatGroup.GroupID);
        if (chatGroup.CHECKED) {
            var promiseList = [];
            // 可能需要从服务器请求数据
            if (this.chatGroupMemberMap.has(chatGroup.GroupID)) {
                let tempList: GroupMember[] = this.chatGroupMemberMap.get(chatGroup.GroupID);
                for (let i = 0; i < tempList.length; ++i) {
                    if (tempList[i].STATE === 0) {
                        tempList[i].CHECKED = true;
                        tempList[i].STATE = 1;
                    }
                }
            } else {
                var promise = this.noticeService.getChatGroupMemberList(chatGroup.GroupID).then(list => {
                    for (let j = 0; j < list.length; ++j) {
                        if (!this.groupMemberToAddIdSet.has(list[j].UID)) {
                            list[j].STATE = 1;
                        } else {
                            list[j].STATE = 3;
                        }
                        list[j].CHECKED = true;
                        console.log(list[j].CHECKED)
                    }
                    this.chatGroupMemberMap.set(chatGroup.GroupID, list);
                });
                promiseList.push(promise);
            }

            if (promiseList.length !== 0) {
                Promise.all(promiseList).then(values => {
                    // this.markGroupListMembersChecked();
                    this.syncLeftToRightData();

                })
            } else {
                // this.markGroupListMembersChecked();
                this.syncLeftToRightData();

            }
        } else {
            if (this.chatGroupMemberMap.has(chatGroup.GroupID)) {
                let tempList: GroupMember[] = this.chatGroupMemberMap.get(chatGroup.GroupID);
                // 查看groupMemberToAddList里面是否有chatFriendList的元素，有的话删除
                console.log("chatFriendListCheckChanged else");
                for (let i = 0; i < tempList.length; ++i) {
                    if (tempList[i].STATE === 1) {
                        tempList[i].CHECKED = false;
                        tempList[i].STATE = 0;
                    }
                }
            }
        }
    }


    // 如果this.chatGroupList为空，需要向服务器请求，否则展示即可
    tiggerShowChatGroupList() {
        if (this.showChatGroupList) {
            this.showChatGroupList = false;
        } else {
            if (this.chatGroupList.length === 0) {

                // console.log("tiggerShowChatGroupList");
                this.noticeService.getChatGroupList().then(list => {
                    console.log("tiggerShowChatGroupList" + JSON.stringify(list))
                    this.chatGroupList = list;
                    this.showChatGroupList = true;
                }).catch(error => {
                    console.log("tiggerShowChatGroupList error");
                })
            } else {
                console.log("tiggerShowChatGroupList not empty");
                this.showChatGroupList = true;
            }
        }
    }

    // 如果已经展示了，隐藏起来，否则展示出来，如果没有数据，向后台请求
    tiggerShowChatGroupMemberList(chatGroup: ChatGroup) {
        console.log(chatGroup.GroupID);
        let chatGroupId: string = chatGroup.GroupID;
        if (chatGroupId === "") {
            console.log("tiggerShowChatGroupMemberList error");
        }
        console.log(this.chatGroupMemberMap.has(chatGroupId));
        if (!this.chatGroupMemberMap.has(chatGroupId)) {
            this.noticeService.getChatGroupMemberList(chatGroupId).then(list => {
                this.chatGroupMemberMap.set(chatGroupId, list);
            });
        }
        if (chatGroup.SPREADED === true) {
            chatGroup.SPREADED = false;
        } else {
            chatGroup.SPREADED = true;
        }
    }

    // 如果需要get的话，不需要判断
    getMemberListByClassCode(classDepCode: string, promiseList: any[]): boolean {
        let getMemberListPromise = this.noticeService.getDepartmentClassMemberList(classDepCode).then(departmentClassMemberList => {
            this.departmentClassMemberMap.set(classDepCode, departmentClassMemberList);
        });
        promiseList.push(getMemberListPromise);
        return true;
    }

    getClassMemberListByDepartmentCode(departmentCode: string, promiseList: any[]): boolean {
        let tempPromise = this.noticeService.getDepartmentClassList(departmentCode).then(departmentClassList => {
            this.departmentClassMap.set(departmentCode, departmentClassList);
            for (let j = 0; j < departmentClassList.length; ++j) {
                this.getMemberListByClassCode(departmentClassList[j].DEPTCODE, promiseList)
            }
        });
        promiseList.push(tempPromise);
        return true;
    }


    // 先获取所有的数据，然后全部选中
    // departmentListCheckChanged(isDepartmentListChecked: boolean) {
    //     if (isDepartmentListChecked) {
    //         // 组织结构列表中没有数据，还没有拿过departmentList
    //         if (this.departmentList.length === 0) {
    //             let promiseList = [];
    //             this.noticeService.getDepartmentList().then(list => {
    //                 this.departmentList = list;
    //                 for (let i = 0; i < this.departmentList.length; ++i) {
    //                     this.getClassMemberListByDepartmentCode(this.departmentList[i].DEPTCODE, promiseList);
    //                 }
    //                 Promise.all(promiseList).then(values => {
    //                     this.markAllDepartmentClassMembersChecked();
    //                 })
    //             });

    //         } else {
    //             let promiseList = [];
    //             for (let i = 0; i < this.departmentList.length; ++i) {
    //                 // 组织结构列表已经有数据了，挨个检查各个class是不是有数据
    //                 if (!this.departmentClassMap.has(this.departmentList[i].DEPTCODE)) {
    //                     this.getClassMemberListByDepartmentCode(this.departmentList[i].DEPTCODE, promiseList);
    //                 } else {
    //                     // 组织机构的列表中对应的class已经有数据了，按个检查class的member是不是有数据
    //                     let departmentClass: Department[] = this.departmentClassMap.get(this.departmentList[i].DEPTCODE);
    //                     for (let j = 0; j < departmentClass.length; ++j) {
    //                         this.getMemberListByClassCode(departmentClass[j].DEPTCODE, promiseList);
    //                     }
    //                 }
    //             }
    //             if (promiseList.length !== 0) {
    //                 Promise.all(promiseList).then(values => {
    //                     this.markAllDepartmentClassMembersChecked();

    //                 })
    //             } else {
    //                 this.markAllDepartmentClassMembersChecked();

    //             }
    //         }
    //     } else {
    //         for (let i = 0; i < this.departmentList.length; ++i) {
    //             if (this.departmentClassMap.has(this.departmentList[i].DEPTCODE)) {
    //                 let departmentClass: Department[] = this.departmentClassMap.get(this.departmentList[i].DEPTCODE);
    //                 for (let j = 0; j < departmentClass.length; ++j) {
    //                     if (this.departmentClassMemberMap.has(departmentClass[j].DEPTCODE)) {
    //                         let departmentClassMemberList: GroupMember[] = this.departmentClassMemberMap.get(departmentClass[j].DEPTCODE);
    //                         for (let k = 0; k < departmentClassMemberList.length; ++k) {
    //                             if (departmentClassMemberList[k].STATE === 1) {
    //                                 departmentClassMemberList[k].CHECKED = false;
    //                                 departmentClassMemberList[k].STATE = 0;
    //                             }
    //                         }
    //                     }

    //                 }
    //             }
    //         }
    //     }
    // }

    markAllDepartmentClassMembersChecked() {
        // 全部添加到groupMemberToAddIdSet
        for (let i = 0; i < this.departmentList.length; ++i) {
            if (this.departmentClassMap.has(this.departmentList[i].DEPTCODE)) {
                let departmentClass: Department[] = this.departmentClassMap.get(this.departmentList[i].DEPTCODE);
                for (let j = 0; j < departmentClass.length; ++j) {
                    if (this.departmentClassMemberMap.has(departmentClass[j].DEPTCODE)) {
                        let departmentClassMemberList: GroupMember[] = this.departmentClassMemberMap.get(departmentClass[j].DEPTCODE);
                        for (let k = 0; k < departmentClassMemberList.length; ++k) {
                            if (departmentClassMemberList[k].STATE === 0) {
                                departmentClassMemberList[k].CHECKED = true;
                                departmentClassMemberList[k].STATE = 1;
                            }
                        }
                    }

                }
            }
        }
    }

    tiggerShowDepartmentList() {
        if (this.showDepartmentList) {
            this.showDepartmentList = false;
        } else {
            if (this.departmentList.length === 0) {
                // console.log("tiggerShowChatGroupList");
                this.noticeService.getDepartmentList().then(list => {
                    console.log("tiggerShowDepartmentList" + JSON.stringify(list))
                    this.departmentList = list;
                    this.showDepartmentList = true;
                }).catch(error => {
                    console.log("tiggerShowDepartmentList error");
                })
            } else {
                console.log("tiggerShowDepartmentList not empty");
                this.showDepartmentList = true;
            }
        }
    }

    //组织结构 第二层
    departmentClassListCheckChanged(classDep: Department) {
        console.log("aaaaa departmentClassListCheckChanged")
        console.log(classDep.DEPTCODE);

        if (classDep.CHECKED) {
            let promiseList = [];
            // 组织结构列表已经有数据了，挨个检查各个class是不是有数据
            if (!this.departmentClassMemberMap.has(classDep.DEPTCODE)) {
                this.getMemberListByClassCode(classDep.DEPTCODE, promiseList);
            }

            if (promiseList.length !== 0) {
                Promise.all(promiseList).then(values => {
                    this.markClassMembersChecked(classDep.DEPTCODE);

                })
            } else {
                this.markClassMembersChecked(classDep.DEPTCODE);
            }
        }
        // else{
        //     this.departmentListCheckChanged(false);
        // }
    }

    //标记左侧被选中
    markClassMembersChecked(classDepCode: string) {
        if (this.departmentClassMemberMap.has(classDepCode)) {
            let departmentClassMemberList: GroupMember[] = this.departmentClassMemberMap.get(classDepCode);
            for (let k = 0; k < departmentClassMemberList.length; ++k) {
                if (departmentClassMemberList[k].STATE === 0) {
                    departmentClassMemberList[k].CHECKED = true;
                    departmentClassMemberList[k].STATE = 1;
                }
            }
        }


    }

    // 这里分成了三级department、class、member
    tiggerShowDepartmentClassList(department: Department) {
        console.log("tiggerShowDepartmentClassList" + department.DEPTCODE);
        let departmentCode: string = department.DEPTCODE;
        if (departmentCode === "") {
            console.log("tiggerShowDepartmentClassList error");
        }
        console.log(this.departmentClassMap.has(departmentCode));
        // 如果所有的
        if (!this.departmentClassMap.has(departmentCode)) {
            this.noticeService.getDepartmentClassList(departmentCode).then(list => {
                this.departmentClassMap.set(departmentCode, list);
            });
        }
        if (department.SPREADED === true) {
            department.SPREADED = false;
        } else {
            department.SPREADED = true;
        }
    }

    tiggerShowClassMemberList(classDep: Department) {
        console.log("tiggerShowClassMemberList" + classDep.DEPTCODE);
        let classDepCode: string = classDep.DEPTCODE;
        if (classDepCode === "") {
            console.log("tiggerShowClassMemberList error");
        }
        console.log(this.departmentClassMemberMap.has(classDepCode));
        if (!this.departmentClassMemberMap.has(classDepCode)) {
            this.noticeService.getDepartmentClassMemberList(classDepCode).then(list => {
                this.departmentClassMemberMap.set(classDepCode, list);
            });
        }
        if (classDep.SPREADED === true) {
            classDep.SPREADED = false;
        } else {
            classDep.SPREADED = true;
        }
    }

    rightMemberCheckedChanged(groupMember: GroupMember) {
        // 
        if (groupMember.CHECKED === true && groupMember.STATE === 2) {
            groupMember.STATE = 3;
        } else if (groupMember.CHECKED === false && groupMember.STATE === 3) {
            groupMember.STATE = 2;
        }
    }

    // 直接传递引用
    syncLeftToRightData() {
        console.log("syncLeftToRightData");


        // 遍历左侧，如果选中移动到右侧   好友列表
        for (let i = 0; i < this.chatFriendList.length; ++i) {
            if (this.chatFriendList[i].CHECKED === true && this.chatFriendList[i].STATE === 1) {
                this.chatFriendList[i].CHECKED = false;
                this.chatFriendList[i].STATE = 2;
                if (this.groupMemberToAddIdSet.has(this.chatFriendList[i].UID)) {
                    continue;
                } else {
                    console.log("chatFriendList syncLeftToRightData" + JSON.stringify(this.chatFriendList[i]));
                    this.chatFriendList[i].STATE = 2;
                    this.groupMemberToAddList.push(this.chatFriendList[i])
                    this.groupMemberToAddIdSet.add(this.chatFriendList[i].UID);
                }
            }
        }
        //  群组列表
        for (let i = 0; i < this.chatGroupList.length; ++i) {
            let tempGroupId = this.chatGroupList[i].GroupID;
            if (this.chatGroupMemberMap.has(tempGroupId)) {
                let tempList: GroupMember[] = this.chatGroupMemberMap.get(tempGroupId);
                if (tempList.length !== 0) {
                    for (let j = 0; j < tempList.length; ++j) {
                        console.log("left to right sync" + tempList[j].CHECKED + tempList[j].STATE);
                        if (tempList[j].CHECKED === true && tempList[j].STATE === 1) {
                            // tempList[j].CHECKED = false;
                            tempList[j].CHECKED = true;
                            tempList[j].STATE = 2;
                            if (this.groupMemberToAddIdSet.has(tempList[j].UID)) {
                                continue;
                            } else {
                                console.log("syncLeftToRightData groupMemberToAddList");
                                tempList[j].STATE = 2;
                                this.groupMemberToAddList.push(tempList[j])
                                this.groupMemberToAddIdSet.add(tempList[j].UID);
                            }
                        }
                    }
                }
            }
        }
        //组织结构
        for (let i = 0; i < this.departmentList.length; ++i) {
            let depcode = this.departmentList[i].DEPTCODE;
            if (this.departmentClassMap.has(depcode)) {
                let classList: Department[] = this.departmentClassMap.get(depcode);
                for (let j = 0; j < classList.length; ++j) {
                    let classDepCode: string = classList[j].DEPTCODE;
                    if (this.departmentClassMemberMap.has(classDepCode)) {
                        let memberList: GroupMember[] = this.departmentClassMemberMap.get(classDepCode);
                        for (let k = 0; k < memberList.length; ++k) {
                            if (memberList[k].CHECKED === true && memberList[k].STATE === 1) {
                                memberList[k].CHECKED = false;
                                memberList[k].STATE = 2;
                                if (this.groupMemberToAddIdSet.has(memberList[k].UID)) {
                                    continue;
                                } else {
                                    memberList[k].STATE = 2;
                                    this.groupMemberToAddList.push(memberList[k])
                                    this.groupMemberToAddIdSet.add(memberList[k].UID);
                                }
                            }
                        }
                    }
                }
            }
        }

        this.isChatFriendListChecked = false;
        this.isChatGroupListChecked = false;
        this.isDepartmentListChecked = false;

        for (let i = 0; i < this.chatGroupList.length; ++i) {
            this.chatGroupList[i].CHECKED = false;
        }

        for (let i = 0; i < this.departmentList.length; ++i) {
            this.departmentList[i].CHECKED = false;
            let classList: Department[] = this.departmentClassMap.get(this.departmentList[i].DEPTCODE);
            for (let j = 0; j < classList.length; ++j) {
                classList[j].CHECKED = false;
            }
        }
        this.syncData();
    }

    // 这里持有的都是引用
    // 如果是右侧选中的，将选中状态置为false，设置state为0，即让其在左边展示
    syncRightToLeftData() {
        // let continueIter: boolean = true;
        let originCount: number = this.groupMemberToAddList.length;
        let currentCount = originCount;
        let currentIndex: number = 0;
        while (currentIndex < currentCount) {
            if (this.groupMemberToAddList[currentIndex].CHECKED === true && this.groupMemberToAddList[currentIndex].STATE === 3) {
                this.groupMemberToAddList[currentIndex].CHECKED = false;
                this.groupMemberToAddList[currentIndex].STATE = 0;
                this.groupMemberToAddIdSet.delete(this.groupMemberToAddList[currentIndex].UID);
                this.groupMemberToAddList = this.groupMemberToAddList.slice(0, currentIndex).concat(this.groupMemberToAddList.slice(currentIndex + 1));
                currentCount = currentCount - 1;
            } else {
                currentIndex += 1;
            }
        }

        this.syncData();
    }

    // 遍历数据，如果在右侧出现，设置状态为2
    syncData() {
        // cos
        for (let i = 0; i < this.chatFriendList.length; ++i) {
            if (this.groupMemberToAddIdSet.has(this.chatFriendList[i].UID)) {
                this.chatFriendList[i].CHECKED = false;
                this.chatFriendList[i].STATE = 2;
            } else {
                this.chatFriendList[i].CHECKED = false;
                this.chatFriendList[i].STATE = 0;
            }
        }

        for (let i = 0; i < this.chatGroupList.length; ++i) {
            let tempGroupId = this.chatGroupList[i].GroupID;
            if (this.chatGroupMemberMap.has(tempGroupId)) {
                let tempList: GroupMember[] = this.chatGroupMemberMap.get(tempGroupId);
                if (tempList.length !== 0) {
                    for (let j = 0; j < tempList.length; ++j) {
                        if (this.groupMemberToAddIdSet.has(tempList[j].UID)) {
                            tempList[j].CHECKED = false;
                            tempList[j].STATE = 2;
                        } else {
                            tempList[j].CHECKED = false;
                            tempList[j].STATE = 0;
                        }
                    }
                }
            }
        }

        for (let i = 0; i < this.departmentList.length; ++i) {
            let depcode = this.departmentList[i].DEPTCODE;
            if (this.departmentClassMap.has(depcode)) {
                let classList: Department[] = this.departmentClassMap.get(depcode);
                for (let j = 0; j < classList.length; ++j) {
                    let classDepCode: string = classList[j].DEPTCODE;
                    if (this.departmentClassMemberMap.has(classDepCode)) {
                        let memberList: GroupMember[] = this.departmentClassMemberMap.get(classDepCode);
                        for (let k = 0; k < memberList.length; ++k) {
                            if (this.groupMemberToAddIdSet.has(memberList[k].UID)) {
                                memberList[k].CHECKED = false;
                                memberList[k].STATE = 2;
                            } else {
                                memberList[k].CHECKED = false;
                                memberList[k].STATE = 0;
                            }
                        }
                    }
                }

            }
        }

    }


    deleteGroup() {
        let id = this.oldGroup.ID;
        this.noticeService.deleteGroup(id).then(result => {
            this.navCtrl.pop();
        });
    }

    saveGroup() {
        if (!this.createAvaliable) {
            return;
        }
        if (!this.oldGroup) {
            let idList: string[] = [];
            for (let i = 0; i < this.groupMemberToAddList.length; ++i) {
                idList.push(this.groupMemberToAddList[i].UID);
            }
            this.noticeService.addGroup(this.groupToAddName, 1, idList).then(id => {
                let group: Group = {
                    ID: parseInt(id),
                    Name: this.groupToAddName,
                    Checked: false
                }
                console.log("localStorage " + JSON.stringify(group))
                localStorage.setItem("latestCreatedGroup", JSON.stringify(group));
                this.navCtrl.pop();
            })
        } else {
            // 修改分组
            let id: number = this.oldGroup.ID;
            let promiseList = [];
            if (this.groupToAddName !== this.groupToOldName) {
                let promiseA = this.noticeService.modifyGroupName(id, this.groupToAddName);
                promiseList.push(promiseA);
            }
            console.log("groupMemberToAddIdSet " + JSON.stringify(Array.from(this.groupMemberToAddIdSet)));
            console.log("groupMemberToOldIdSet" + JSON.stringify(Array.from(this.groupMemberToOldIdSet)));

            let setToAdd = this.setDifference(this.groupMemberToAddIdSet, this.groupMemberToOldIdSet);
            let idToAddList: string[] = this.setToList(setToAdd);
            let setToDelete = this.setDifference(this.groupMemberToOldIdSet, this.groupMemberToAddIdSet);
            let idToDeleteList: string[] = this.setToList(setToDelete);
            ;
            if (idToAddList.length !== 0) {
                let promiseB = this.noticeService.addGroupMember(id, 1, idToAddList);
                promiseList.push(promiseB);
            }
            console.log("setToAdd " + JSON.stringify(Array.from(setToAdd)));
            console.log("setToDelete " + JSON.stringify(Array.from(setToDelete)));

            console.log("idToAddList" + JSON.stringify(idToAddList));
            console.log("idToDeleteList" + JSON.stringify(idToDeleteList));

            if (idToDeleteList.length !== 0) {
                for (let j = 0; j < idToDeleteList.length; ++j) {
                    let promise = this.noticeService.deleteGroupMember(id, 1, idToDeleteList[j]);
                    promiseList.push(promise);
                }
            }
            Promise.all(promiseList).then(result => {
                this.navCtrl.pop();
            })

        }
    }

    setDifference(setA: Set<string>, setB: Set<string>): Set<string> {
        let difference = new Set<string>(setA);
        for (let elem of Array.from(setB.values())) {
            difference.delete(elem);
        }
        return difference;
    }

    setToList(setA: Set<string>): string[] {
        let temp: string[] = [];
        for (let elem of Array.from(setA.values())) {
            temp.push(elem);
        }
        return temp;
    }

    verifyNameEmpty() {
        console.log("verifyNameEmpty");
        if (this.groupToAddName !== "") {
            this.createAvaliable = true;
        } else {
            this.createAvaliable = false;
        }
    }

    // syncChatFriendListData
}


// }
