/**
 * Created by pillars on 2016/10/14.
 */

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ReadList } from '../read-list/read-list';
import { UnreadList } from '../unread-list/unread-list';
import { NoticeService } from '../Notice.service';


@Component({
    selector: 'page-read-unread-main',
    templateUrl: 'read-unread-main.html'
})
export class ReadUnreadMain {
    // 
    readText: string = "aaa";
    unreadText: string = "bbb";

    tab1Root: any = ReadList;
    tab2Root: any = UnreadList;
    // tab3Root: any = AddEditNotice;
    noticeId: string;
    rootParams: NavParams;

    constructor(private noticeService: NoticeService, private navCtrl: NavController, private params: NavParams) {
        this.noticeId = this.params.get('id');
        this.rootParams = params;
        this.noticeService.getReceipt(this.noticeId, "0").then(reply => {
            console.log(JSON.stringify(reply));
            this.unreadText = "未读(" + reply.UNReadCount + ")";
            this.readText = "已读(" + reply.ReadCount + ")";

            // console.log(this.readText);
            // console.log(this.unreadText);
        });
        // this.tab1Root
        // this tells the tabs component which Pages
        // should be each tab's root Page
        //this.tab1Root = NoticesListComponent;
        //this.tab2Root = AboutPage;
        //this.tab3Root = ContactPage;

    }

    goBack(): void {
        this.navCtrl.pop();
    }
}
