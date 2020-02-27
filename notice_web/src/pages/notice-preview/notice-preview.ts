/**
 * Created by pillars on 2016/11/7.
 */
import { Component, OnInit } from '@angular/core';
import { Notice } from '../../utility/Notice';
import { NavController, NavParams } from 'ionic-angular';
import { NoticeService } from '../Notice.service';
import {HttpService} from "../../http/http.Service";

declare var Quill: any;

@Component({
    selector: 'page-notice-preview',
    templateUrl: 'notice-preview.html'


})

export class NoticePreview implements OnInit {
    notice: Notice;
    // 用于通知更正
    mustdesc: string = null;
    selectedNum: number = 0;

    createAvalible: boolean = false;
    constructor(private http: HttpService,private noticeService: NoticeService, private params: NavParams, private navCtrl: NavController) {

    }

    ngOnInit(): void {

        // let id : string = this.params.get('id');
        this.notice = this.params.get('object');
        this.mustdesc = this.params.get("mustdesc");
        if (this.notice.DEPARTMENT !== "" && this.notice.MUSTTITLE !== "" && this.notice.RECEIVEOBJECTS !== []) {
            this.createAvalible = true;
        }
        console.log("NoticePreview desc" + this.notice.MUSTDESC)
        let quchongDatas = [];
        this.notice.RECEIVEOBJECTS.forEach(item => {

            /* if (item.TYPE == '5' || item.TYPE == '6' || item['roll']) {
                 this.selectedNum += item['UserCount'] || 0;
             } else {
                 this.selectedNum += 1;
             }*/
            let quchongItem = {BuID: '', Type: ''};
            switch (item.TYPE) {
                case '6':
                    quchongItem.BuID = item.ID;
                    quchongItem.Type = '2';
                    break;
                case '5':
                    quchongItem.BuID = item.ID;
                    quchongItem.Type = '1';
                    break;
                case '7':
                    quchongItem.BuID = item.ID;
                    quchongItem.Type = '9';
                    break;
            }
            quchongDatas.push(quchongItem);
        });
        this.http.postJSON({Datas: quchongDatas}, '/app/userroll/usercount').then(
            data => {
                this.selectedNum = data.Data.Count || 0;
            }
        );

    }

    fomateTime(time: string,Day=false): string {

        if (time.length === 0) {
            return "--";
        }
        if(Day){

            return time.substring(0, 4) + "-" + time.substring(4, 6) + "-" + time.substring(6, 8);
        }

        return time.substring(0, 4) + "-" + time.substring(4, 6) + "-" + time.substring(6, 8) + " " + time.substring(8, 10) +
            ":" + time.substring(10, 12) + ":" + time.substring(12, 14);
    }
    // fomateDate(time: string): string {

    //     if (time.length === 0) {
    //         return "--";
    //     }
    //     return time.substring(0, 4)+ "-" + time.substring(4, 6) + "-" + time.substring(6, 8);
    // }

    goBack(): void {
        this.navCtrl.pop();
    }


    ngAfterViewInit() {

        // var quill = new Quill('#editor2', {

        //     //modules: {
        //     // toolbar: [
        //     //   // [{ header: [1, 2, false] }],
        //     //   [{ 'size': ['small', false, 'large', 'huge'] }],
        //     //   ['bold', 'italic', 'underline'],
        //     //   [{ 'color': [] }, { 'background': [] }],
        //     //   ['image', 'code-block']
        //     // ]
        //     // },
        //     //placeholder: '编辑通知。。。',
        //     theme: 'bubble'

        // });

        // quill.setText(this.notice.MUSTDESC);
        //quill.container.setInnerHTML(this.notice.MUSTDESC);

    }

    saveNotice(): void {
        if (!this.createAvalible) {
            return;
        }
        if (this.mustdesc !== undefined) {
            this.notice.MUSTDESC = this.mustdesc;
            this.notice.ISRESEND = "true";
            this.noticeService.resendMust(this.notice).then(result => {
                localStorage.setItem("refreshNoticeList", "true");
                localStorage.setItem("refreshPubNoticeList", "true");
                console.log("resend success" + JSON.stringify(result));
                this.navCtrl.pop().then(result => this.navCtrl.pop());
            });
        } else {
            console.log("before save" + JSON.stringify(this.notice));

            this.noticeService.addMust(this.notice).then(result => {
                console.log("preview save success" + JSON.stringify(result));
                this.noticeService.publishMust(result).then(result => {
                    if (result === true) {
                        localStorage.setItem("refreshNoticeList", "true");
                        localStorage.setItem("refreshPubNoticeList", "true");
                        this.navCtrl.pop().then(result => this.navCtrl.pop());
                        console.log("publish success" + result);
                    } else {
                        console.log("publish failed" + result);
                        this.navCtrl.pop().then(result => this.navCtrl.pop());
                    }
                });
            }).catch(error => {
                console.log("saveNotice failed");
            })
        }

    }

}
