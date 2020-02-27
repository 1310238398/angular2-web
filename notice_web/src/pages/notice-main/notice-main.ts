/**
 * Created by pillars on 2016/10/14.
 */

import { Component, ViewChild } from '@angular/core';
import { NavController, Tabs } from 'ionic-angular';
import { NoticesPubList } from '../notice-pub-list/notice-pub-list';
import { AddEditNotice } from '../add-edit-notice/add-edit-notice';
import { NewGroup } from '../new-group/new-group';
import { NoticesListComponent } from '../notice-list/notice-list.component';
import { NoticeService } from '../Notice.service';

@Component({
    selector:'page-notice-main',
    templateUrl: 'notice-main.html'
})
export class NoticeMain {
    @ViewChild('antTabs') tabRef: Tabs;

    tab1Root: any = NoticesListComponent;
    tab2Root: any = NoticesPubList;
    // tab3Root: any = AddEditNotice;


    constructor(private noticeService: NoticeService, private navCtrl: NavController) {
        // this tells the tabs component which Pages
        // should be each tab's root Page
        //this.tab1Root = NoticesListComponent;
        //this.tab2Root = AboutPage;
        //this.tab3Root = ContactPage;
    }
    goAddEditNotice(): void {
        // alert("goAddEditNotice");
        this.noticeService.removeContactAll();
        this.navCtrl.push(AddEditNotice);
    }

    ionViewWillEnter() {
        // 检查localstorage里面有没有refreshPubNoticeList
        console.log("NoticesPubList enter");
        // console.log(JSON.stringify(this.tabRef.getByIndex(1).root));
        if (localStorage.getItem("refreshPubNoticeList") !== null) {
            localStorage.removeItem("refreshPubNoticeList");
            let t = this.tabRef.getByIndex(1);
            let views = t.getViews();
            if (views.length > 0) {
                let v = views[views.length - 1].instance;
                if (v.forceWillEnter) {
                    v.forceWillEnter();
                }
            }

        }
        if (localStorage.getItem("refreshNoticeList") !== null) {
            localStorage.removeItem("refreshNoticeList");
            let t = this.tabRef.getByIndex(0);
            let views = t.getViews();
            if (views.length > 0) {
                let v = views[views.length - 1].instance;
                if (v.forceWillEnter) {
                    v.forceWillEnter();
                }
            }
        }
    }
}
