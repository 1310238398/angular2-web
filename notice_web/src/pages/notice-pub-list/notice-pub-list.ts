/**
 * Created by pillars on 2016/10/26.
 */
/**
 * Created by pillars on 2016/10/14.
 */
import { Component, OnInit } from '@angular/core';
import { Notice } from '../../utility/Notice';
import { NoticeService } from '../Notice.service';
import { NavController } from 'ionic-angular';
import { NoticeHtml } from "../notice-html/notice-html";
import { AddEditNotice } from "../add-edit-notice/add-edit-notice";


@Component({
    selector: 'page-notice-pub-list',
    templateUrl: 'notice-pub-list.html'


})

// [{"ATTACHMENTS":
//[{"ID":"55b75128-2a44-4a7c-bcc2-94894d8c43ba","FileName":"201701170944210.jpg","FileSize":4914,"FileType":".jpg",
//"FileLink":"attach/must/55b75128-2a44-4a7c-bcc2-94894d8c43ba/201701170944210.jpg"}],
//"DEPARTMENT":"","ISREMIND":"1","ISRESEND":"","MUSTCREATOR":"AB0000035808","MUSTDESC":"","MUSTID":"100000000262",
//"MUSTTIME":"","MUSTTITLE":"201701170944210.jpg","RECEIVEOBJECTS":[],"REMINDTIME":"","STATUS":"0","VALIDTIME":""}]

export class NoticesPubList implements OnInit {

    notices: Notice[];
    //abc: string = "abc";
    //date: Date;


    constructor(private NoticeService: NoticeService, public navCtrl: NavController) {
    }

    forceWillEnter() {
        this.NoticeService.getPublishNoticesPromise("").then(notices => {
                if (notices !== null) {
                    this.notices = notices;
                    // for (let i = 0; i < this.notices.length; ++i) {
                    //     console.log(this.notices[i].ATTACHMENTS.length);
                    // }
                    console.log("refresh PubNotices");
                }
            });
    }
    getPubNotices(): void {

        this.NoticeService.getPublishNoticesPromise("").then(notices => {
            if (notices !== null) {
                this.notices = notices;
                // for (let i = 0; i < this.notices.length; ++i) {
                //     console.log(this.notices[i].ATTACHMENTS.length);
                // }
                console.log("getPubNotices");
                console.log(JSON.stringify(this.notices));
            }
        });

    }

    ngOnInit(): void {
        this.getPubNotices();

    }

    fomateDate(time: string): string {

        return time.substring(0, 4) + "-" + time.substring(4, 6) + "-" + time.substring(6, 8) + " " + time.substring(8, 10) +
            ":" + time.substring(10, 12) + ":" + time.substring(12, 14);
    }

    gotoDetail(notice: Notice): void {
        if (notice.STATUS === "0") {
            this.navCtrl.parent.parent.push(AddEditNotice, { notice: notice,edit:true });
        } else {
            this.navCtrl.parent.parent.push(NoticeHtml, { object: notice, source: "pub" });
        }


        // this.navCtrl.push
    }

    doInfinite(infiniteScroll) {

        console.log('Begin async operation');
        // setTimeout(() => {
        if (this.notices.length === 0) {
            infiniteScroll.complete();
        }
        console.log(this.notices.length - 1);
        // console.log(JSON.stringify(this.notices));
        this.NoticeService.getPublishNoticesPromise(this.notices[this.notices.length - 1].MUSTID).then(noticeList => {
            if (noticeList !== null) {
                console.log("noticeList" + JSON.stringify(noticeList));
                for (var i = 0; i < noticeList.length; ++i) {
                    this.notices.push(noticeList[i]);
                }
            }
            infiniteScroll.complete();
        });
        // }, 500);
    }


}
