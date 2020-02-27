/**
 * Created by pillars on 2016/10/19.
 */
import { Component, OnInit } from '@angular/core';
import { Notice } from '../../utility/Notice';
import { NavController, NavParams } from 'ionic-angular';
import { NoticeService} from '../Notice.service';


@Component ({
    selector: 'page-notice-detail',
    templateUrl: 'notice-detail.html'


})
export class NoticeDetail implements OnInit {

    notice: Notice;


    constructor( private noticeService: NoticeService, private params: NavParams, private navCtrl: NavController) {
        // forEach((params: NavParams) => {
        //   let id : string = params.get('id');
        //   this.noticeService.getNotice(id).then(notice => this.notice = notice);
        // });


    }

    ngOnInit(): void {
        // this.route.params.forEach((params: Params) => {
        //   let id : string = params['id'];
        //   this.noticeService.getNotice(id).then(notice => this.notice = notice);
        // });
        let id : string = this.params.get('id');
        this.noticeService.getRecieveNoticesContentBatch([id]).then(notice => this.notice = notice[0]);
        console.log(id);
        //console.log(this.notice.MUSTID);

    }

    goBack(): void {
        this.navCtrl.pop();
    }

    fomateDate(time: string): string {

        return time.substring(0, 4)+ "-" + time.substring(4, 6) + "-" + time.substring(6, 8) + " " + time.substring(8, 10) +
            ":" + time.substring(10, 12) + ":" + time.substring(12, 14);
    }

}
