/**
 * Created by pillars on 2016/10/26.
 */
/**
 * Created by pillars on 2016/10/14.
 */
import { Component, OnInit } from '@angular/core';
import { NoticeReply } from '../../utility/NoticeReply';
import { UserReply } from "../../utility/UserReply";
import { NoticeService } from '../Notice.service';
import { NavController, NavParams, ToastController } from 'ionic-angular';


@Component({
    selector: 'page-unread-list',
    templateUrl: 'unread-list.html'
})

export class UnreadList implements OnInit {
    // {"ISREMIND":"","TEL":"18363018952","UID":"AA0000035787","UNAME":"韩振东"},
    // {"ISREMIND":"","TEL":"13065029045","UID":"AA0000035816","UNAME":"张雪"},{
    // "ISREMIND":"","TEL":"18306414358","UID":"AA0000042494","UNAME":"刘会敏"},{"ISREMIND":"","TEL":"15098931202","UID":"AB0000035815","UNAME":"岳彩彩"}
    userReply: NoticeReply;
    //abc: string = "abc";
    //date: Date;
    noticeId: string;
    showList: boolean = false;

    constructor(private noticeService: NoticeService, private params: NavParams, public navCtrl: NavController, public toastCtrl: ToastController) {
        this.noticeId = this.params.get('id');
        console.log("UnreadList " + this.noticeId);

        this.noticeService.getReceipt(this.noticeId, "0").then(reply => {
            this.userReply = reply;
            this.showList = true;
        });
        console.log("unread list id" + this.noticeId);
    }


    ngOnInit(): void {
    }

    fomateDate(time: string): string {

        return time.substring(0, 4) + "-" + time.substring(4, 6) + "-" + time.substring(6, 8) + " " + time.substring(8, 10) +
            ":" + time.substring(10, 12) + ":" + time.substring(12, 14);
    }

    remindRead(user: UserReply) {
        this.noticeService.remind(user.UID, this.noticeId).then(result => {
            if (result === true) {
            this.presentToast();

            }
        })
    }

     presentToast() {
    let toast = this.toastCtrl.create({
      message: '提醒已经发送',
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }


    doInfinite(infiniteScroll) {
        // 每次获取100条数据
        let count = 100;
        console.log('Begin async operation');
        // setTimeout(() => {
        if (this.userReply.UserList.length === 0) {
            infiniteScroll.complete();
        }
        if (this.userReply.UNReadCount === this.userReply.UserList.length) {
            infiniteScroll.complete();
        }
        // console.log(this.notices.length - 1);
        // console.log(JSON.stringify(this.notices));
        this.noticeService.getReceipt(this.noticeId, "0", this.userReply.UserList.length).then(reply => {
            if (reply !== null) {
                this.userReply.UserList = this.userReply.UserList.concat(reply.UserList);
            }
            infiniteScroll.complete();
        });
    }

}
