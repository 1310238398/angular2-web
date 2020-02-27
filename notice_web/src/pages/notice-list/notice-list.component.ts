/**
 * Created by pillars on 2016/10/14.
 */
import { Component, OnInit } from '@angular/core';
import { Notice } from '../../utility/Notice';
import { NoticeService } from '../Notice.service';
import { NavController } from 'ionic-angular';
import { NoticeHtml } from "../notice-html/notice-html"
import { Observable } from 'rxjs/Rx';


@Component({
    selector: 'page-notice-list',
    templateUrl: 'notice-list.component.html'


})



export class NoticesListComponent implements OnInit {

    notices: Notice[];
    //abc: string = "abc";
    //date: Date;


    constructor(private NoticeService: NoticeService, public navCtrl: NavController) {
    }

    forceWillEnter() {
        this.NoticeService.getRecieveNoticesPromise("").then(notices => {
            if (notices !== null) {
                this.notices = notices
                for (let i = 0; i < this.notices.length; ++i) {
                    if (this.notices[i].ISREAD === "1") {
                        this.notices[i].ISREADED = true;
                    } else {
                        this.notices[i].ISREADED = false;
                    }
                    // if (this.)
                }
                console.log("getRecieveNoticesPromise " + JSON.stringify(this.notices));
            }
        });
    }
    // ionViewWillEnter() {
    //     // 检查localstorage里面有没有refreshNoticeList

    //     if (localStorage.getItem("refreshNoticeList") !== null) {

    //         localStorage.removeItem("refreshNoticeList");
    //     }
    // }
    getNotices(): void {

        this.NoticeService.getRecieveNoticesPromise("").then(notices => {
            if (notices !== null) {
                this.notices = notices
                for (let i = 0; i < this.notices.length; ++i) {
                    if (this.notices[i].ISREAD === "1") {
                        this.notices[i].ISREADED = true;
                    } else {
                        this.notices[i].ISREADED = false;
                    }
                    // if (this.)
                }
                console.log("列表 " + JSON.stringify(this.notices));
            }
        });

    }

    ngOnInit(): void {
        this.getNotices();
        let timer = Observable.timer(0,1000);
            timer.subscribe(t=> {
                if (localStorage.getItem("recieveNotice") !== null) {
                    localStorage.removeItem("recieveNotice");
                    this.getNotices();
                }
            });
    }

    fomateDate(time: string): string {

        return time.substring(0, 4) + "-" + time.substring(4, 6) + "-" + time.substring(6, 8) + " " + time.substring(8, 10) +
            ":" + time.substring(10, 12) + ":" + time.substring(12, 14);
    }

    gotoDetail(notice: Notice): void {

        // let link = ['/detail', notice.MUSTID ];
        // this.router.navigate(['/detail', notice.MUSTID]);   // { relativeTo: this.route }
        // window.location.href =   '#/detail/' +notice.MUSTID;  //http://www.baidu.com  this.location.path()
        this.navCtrl.parent.parent.push(NoticeHtml, { object: notice });
        // this.navCtrl.push
    }

    // doInfinite(infiniteScroll) {
    //     console.log('Begin async operation');
    //     if (this.notices.length === 0) {
    //         infiniteScroll.complete();
    //     }
    //     this.NoticeService.getRecieveNoticesPromise(this.notices[this.notices.length-1].MUSTID).then(noticeList => {
    //         this.notices = this.notices.concat(noticeList);
    //         infiniteScroll.complete();
    //     })
    // }

    doInfinite(infiniteScroll) {

        console.log('Begin async operation');
        // setTimeout(() => {
        if (this.notices.length === 0) {
            infiniteScroll.complete();
        }
        // console.log(this.notices.length - 1);
        // console.log(JSON.stringify(this.notices));
        this.NoticeService.getRecieveNoticesPromise(this.notices[this.notices.length - 1].MUSTID).then(noticeList => {
            if (noticeList !== null) {
                console.log("noticeList" + JSON.stringify(noticeList));
                for (var i = 0; i < noticeList.length; ++i) {
                    if (this.notices[i].ISREAD === "1") {
                        this.notices[i].ISREADED = true;
                    } else {
                        this.notices[i].ISREADED = false;
                    }
                    this.notices.push(noticeList[i]);
                }
            }
            infiniteScroll.complete();
        });


    }
}