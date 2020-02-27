/**
 * Created by pillars on 2016/10/26.
 */
/**
 * Created by pillars on 2016/10/14.
 */
import { Component, OnInit } from '@angular/core';
import { NoticeReply } from '../../utility/NoticeReply';
import { NoticeService } from '../Notice.service';
import { NavController, NavParams } from 'ionic-angular';


@Component({
    selector: 'page-read-list',
    templateUrl: 'read-list.html'
})

export class ReadList implements OnInit {

    userReply: NoticeReply
    showList: boolean = false;
    //abc: string = "abc";
    //date: Date;
    noticeId: string;


    constructor(private noticeService: NoticeService, private params: NavParams, public navCtrl: NavController) {
        this.noticeId = this.params.get('id');
        this.noticeService.getReceipt(this.noticeId, "1").then(reply => {
            this.userReply = reply;
            this.showList = true;
        });
        console.log("read list id" + this.noticeId);
    }


    ngOnInit(): void {

    }

    fomateDate(time: string): string {

        return time.substring(0, 4) + "-" + time.substring(4, 6) + "-" + time.substring(6, 8) + " " + time.substring(8, 10) +
            ":" + time.substring(10, 12) + ":" + time.substring(12, 14);
    }

    doInfinite(infiniteScroll) {
        // 每次获取100条数据
        let count = 100;
        console.log('Begin async operation');
        // setTimeout(() => {
        if (this.userReply.UserList.length === 0) {
            infiniteScroll.complete();
        }
        if (this.userReply.ReadCount === this.userReply.UserList.length) {
            infiniteScroll.complete();
        }
        // console.log(this.notices.length - 1);
        // console.log(JSON.stringify(this.notices));
        this.noticeService.getReceipt(this.noticeId, "1", this.userReply.UserList.length).then(reply => {
            if (reply !== null) {
                this.userReply.UserList = this.userReply.UserList.concat(reply.UserList);
            }
            infiniteScroll.complete();
        });
    }
}
