import {GroupMember} from './../../../../utility/GroupMember';
import {NoticeService} from './../../../Notice.service';
import {Component} from "@angular/core";
import {HttpService} from "../../../../http/http.Service";

/**
 * Created by hanzhendong on 2017/7/24.
 */
@Component({
    selector: 'page-Group',
    templateUrl: 'group.html'
})
export class GroupList {
    Groups: Array<object> = [];
    showMemberList: boolean = false;
    allCheck: boolean = false;
    partCheck: boolean = true;
    partMemberCheck: boolean = true;
    allMemberCheck: boolean = false;
    currentIndex: number;
    curentItem = {members: [], GroupID: '', memNum: 0};

    constructor(private http: HttpService, private NoticeService: NoticeService) {
        this.http.postJSON('', '/app/userroll/group').then(
            data => {
                this.Groups = data.Data || [];
                this.Groups.forEach((value, index) => {
                    value['showMemberList'] = false;
                })
            }
        );
        this.NoticeService.chekAll.subscribe(
            (item) => {
                console.log(item);
                if (item.flag) {
                    this.allCheck = false;
                }

            }
        );
    }

    dismiss() {
    }

    setState() {
        this.showMemberList = !this.showMemberList;
    }

    tiggerShowMemberList(item, index) {
        if (!item.check) {
            this.setState();
            this.currentIndex = index;
            this.curentItem = item;
            if (this.showMemberList) {
                if (!item.members) {
                    this.http.postJSON({GroupID: item.GroupID}, '/app/userroll/group/member').then(
                        data => {
                            item.members = data.Data || [];
                            item.members.forEach((value, index) => {
                                value['check'] = false;
                            })
                        }
                    );
                }
            }
        }
    }

    setContacts(item) {
        /*判断是否全选按钮*/
        let index = this.NoticeService.getContacts().indexOf(item);
        if (item.check) {
            this.allCheck = true;
            item.group = true;
            item.Type = 1;
            item.BuID = item.GroupID;
            item.Source = '';
            item.SourceBuID = '';
            if (index >= 0) {
                this.NoticeService.removeContact(item);
            }
            this.NoticeService.setContacts(item);
        } else {
            if (index >= 0) {
                this.NoticeService.removeContact(item);
            }
        }
        /*全选状态处理*/
        if (this.Groups.some(ele => {
                return ele['check'] == true
            })) {
            if (this.Groups.every(ele => {
                    return ele['check'] == true
                })) {
                this.partCheck = false;
                this.allCheck=true;
            }else{
                this.partCheck = true;
            }
        }else{
            this.allCheck=false
        }
      /*  if (this.NoticeService.getContacts().some((value) => {
                return value.Type == 1
            })) {
            if (this.Groups.every(ele => {
                    return ele['check'] == true
                })) {
                this.partCheck = false;
            }
            this.allCheck = true;
            this.partCheck = true;
        } else {
            this.allCheck = false;
            this.partCheck = false;
        }*/
    }

    setMemberContacts(item) {
        let index = this.NoticeService.getContacts().indexOf(item);
        if (item.check) {
            this.Groups[this.currentIndex]['allMemberCheck']=true;
            item.groupMember = true;
            item.Type = 0;
            item.Source = 1;
            item.BuID = item.UID;
            item.SourceBuID = this.curentItem.GroupID;
            this.NoticeService.setContacts(item);
            if (!this.Groups[this.currentIndex]['memNum']) {
                this.Groups[this.currentIndex]['memNum'] = 0;
            }
            this.Groups[this.currentIndex]['memNum'] += 1;
            /*  if (this.Groups[this.currentIndex]['memNum'] == this.Groups[this.currentIndex]['UserCount']) {
                  this.Groups[this.currentIndex]['check'] = true;
              }*/
            console.log(this.Groups[this.currentIndex]['memNum'])
        } else {
            if (this.Groups[this.currentIndex]['memNum'] > 0) {
                this.Groups[this.currentIndex]['memNum'] -= 1;
            }
            if (index >= 0) {
                this.NoticeService.removeContact(item);
            }
        }
        /*全选状态处理*/
      /*  if (this.NoticeService.getContacts().some((value) => {
                return value.Type == 0 && value.Source == 1
            })) {
            this.Groups[this.currentIndex]['allMemberCheck'] = true;
        } else {
            this.Groups[this.currentIndex]['allMemberCheck'] = false;
        }*/
        /*全选状态处理*/
        if (this.curentItem.members.some(ele => {
                return ele['check'] == true
            })) {
            if (this.curentItem.members.every(ele => {
                    return ele['check'] == true
                })) {
                this.partMemberCheck = false;
                this.Groups[this.currentIndex]['allMemberCheck']=true;
            }else{
                this.partMemberCheck = true;
            }
        }else{
            this.Groups[this.currentIndex]['allMemberCheck']=false
        }
    }

    onAll(event) {
        this.partCheck=false;
        if (this.allCheck) {
            this.Groups.forEach((value, index) => {
                value['check'] = true;
                this.setContacts(value);
            })
        } else {
            this.Groups.forEach((value, index) => {
                value['check'] = false;
                this.setContacts(value);
            })
        }

    }

    onMemberAll(event) {
        if (this.Groups[this.currentIndex]['allMemberCheck']) {
            this.curentItem.members.forEach((value, index) => {
                value['check'] = true;
                this.setMemberContacts(value);
            })
        } else {
            this.curentItem.members.forEach((value, index) => {
                value['check'] = false;
                this.setMemberContacts(value);
            })
        }
    }
}