import { NoticeService } from './../../../Notice.service';
import { Component } from "@angular/core";
import { HttpService } from "../../../../http/http.Service";
/**
 * Created by hanzhendong on 2017/7/24.
 */
@Component({
    selector: 'page-Friend',
    templateUrl: 'friend.html'
})
export class FriendList {
    friends: Array<object> = [];
    showMemberList: boolean = false;
    partCheck: boolean = true;
    allCheck: boolean = false;
    curentItem = { members: [] };
    constructor(private http: HttpService, private NoticeService: NoticeService) {
        this.http.postJSON('', '/app/userroll/friend/member').then(
            data => {
                this.friends = data.Data || [];
                this.friends.forEach((value, index) => {
                    value['check'] = false;
                })
            }
        );
        this.NoticeService.chekAll.subscribe(
            (item) => {
                if (item.flag) {
                    this.allCheck = false;
                }

            }
        );
    }

    setContacts(item) {
        let index = this.NoticeService.getContacts().indexOf(item);
        if (item.check) {
            this.allCheck=true;
            item.friend = true;
            item.Type = 0;
            item.BuID = item.UID;
            item.Source = 0;
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
        if (this.friends.some(ele => {
                return ele['check'] == true
            })) {
            if (this.friends.every(ele => {
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
    }
    onAll(event) {
        if (this.allCheck) {
            this.friends.forEach((value, index) => {
                value['check'] = true;
                this.setContacts(value);
            })
        } else {
            this.friends.forEach((value, index) => {
                value['check'] = false;
                this.setContacts(value);
            })
        }

    }
}