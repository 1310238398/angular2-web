/**
 * Created by pillars on 2016/10/14.
 */
import { Component, OnInit } from '@angular/core';
import { Notice } from '../../utility/Notice';
import { NoticeService } from '../Notice.service';
import { NavController, NavParams } from 'ionic-angular';
// import { NoticeDetail } from "../notice-detail/notice-detail"
import { ModifyNotice } from '../modify-notice/modify-notice';
import { ReadUnreadMain } from '../read-unread-main/read-unread-main'

@Component({
    selector: 'page-notice-html',
    templateUrl: 'notice-html.html'
})



export class NoticeHtml implements OnInit {

    notice: Notice;
    showModify: boolean = false;
    showReadUnread: boolean = false;
    content: string = "";

    constructor( private noticeService: NoticeService, private params: NavParams, private navCtrl: NavController) {
    }


    ngOnInit(): void {
        this.notice = this.params.get('object');
        let source = this.params.get("source");
        console.log(source + "souce");
        if (source !== undefined) {
            this.showReadUnread = true;
            if (this.notice.ISRESEND !== "1") {
                this.showModify = true;
            }
        }
        //https://app.antservercampus.link:8803/static/must/100000000384/100000000384.html
        this.noticeService.getNoticeHtml(this.notice.MUSTID).then(result => {
            // console.log(result);
            this.content = result;
            if (this.notice.ISREADED === false) {
                this.noticeService.markNoticeRead(this.notice.MUSTID).then(result => {
                    this.noticeService.markOneNoticeRead();
                    console.log(this.notice.MUSTID + " 已读");
                    // 刷新一次列表
                    localStorage.setItem("refreshNoticeList", "true");
                });
            }

        })
    }


    goBack(): void {
        this.navCtrl.pop();
    }

        goModify() :void {
        let noticeTem: Notice;
        noticeTem = this.notice;

        this.navCtrl.push(ModifyNotice, {object: noticeTem});
    }

    goReply(): void {
        this.navCtrl.push(ReadUnreadMain, {id: this.notice.MUSTID});
    }
}