/**
 * Created by pillars on 2016/10/26.
 */
import { Component, OnInit } from '@angular/core';
import { Notice } from '../../utility/Notice';
import { NavController, NavParams } from 'ionic-angular';
import { NoticeService} from '../Notice.service';
import { ModifyNotice } from '../modify-notice/modify-notice';
import { ReadUnreadMain } from '../read-unread-main/read-unread-main'

@Component ({
    selector: 'page-notice-pub-detail',
    templateUrl: 'notice-pub-detail.html'


})
export class NoticePubDetail implements OnInit {

    // showReadUnread = false;

    notice: Notice;
    // Users = ["经济学院", "法学院", "马克思主义学院", "信息学院", "外语学院", "中文系", "考古专业", "测绘学院", "机电工程学院", "生命科学学院", "服装学院", "护理学院"
    //     , "校长办公室"];


    constructor( private noticeService: NoticeService, private params: NavParams, private navCtrl: NavController) {
    }

    ngOnInit(): void {
        // this.route.params.forEach((params: Params) => {
        //   let id : string = params['id'];
        //   this.noticeService.getNotice(id).then(notice => this.notice = notice);
        // });
        let id : string = this.params.get('id');
        // let source: string = this.params.get("pub");
        // if (source === "pub") {
        //     this.showReadUnread = true;
        // }
        this.noticeService.getPublishNoticesContentBatch([id]).then(notice => this.notice = notice[0]);
        console.log(id);
        //console.log(this.notice.MUSTID);

    }

    goBack(): void {
        this.navCtrl.pop();
    }

    fomateTime(time: string): string {

        if (time.length === 0) {
            return "--";
        }

        return time.substring(0, 4)+ "-" + time.substring(4, 6) + "-" + time.substring(6, 8) + " " + time.substring(8, 10) +
            ":" + time.substring(10, 12) + ":" + time.substring(12, 14);
    }
    // fomateDate(time: string): string {

    //     if (time.length === 0) {
    //         return "--";
    //     }
    //     return time.substring(0, 4)+ "-" + time.substring(4, 6) + "-" + time.substring(6, 8);
    // }

    goModify() :void {
        let noticeTem: Notice;
        noticeTem = this.notice;

        this.navCtrl.push(ModifyNotice, {object: noticeTem});
    }

    goReply(): void {
        this.navCtrl.push(ReadUnreadMain, {id: this.notice.MUSTID});
    }


}
