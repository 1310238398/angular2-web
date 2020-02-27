/**
 * Created by pillars on 2016/11/7.
 */
import {Component, OnInit} from '@angular/core';

import {Notice} from '../../utility/Notice';
import {NoticeModify} from '../../utility/NoticeModify';

import {NavController, NavParams, DateTime} from 'ionic-angular';
import {NoticeService} from '../Notice.service';
import {NoticePreview} from '../notice-preview/notice-preview';
import {DatePickerComponent} from "../../pages/date-picker/date-picker.component";


declare var Quill: any;

@Component({
    selector: 'page-modify-notice',
    templateUrl: 'modify-notice.html'
})

export class ModifyNotice implements OnInit {
    notice: Notice;
    // noticeModify: NoticeModify = new NoticeModify();

    quill: any;

    validtime: string;
    remindtime: string;
    afterModifyCon: string;
    isRemind: boolean = false;

    saveNoticeEnable = true;

    constructor(private noticeService: NoticeService, private params: NavParams, public navCtrl: NavController) {
        console.log(JSON.stringify(this.notice));
    }

    ngOnInit(): void {

        // let id : string = this.params.get('id');
        this.notice = this.params.get('object');
        debugger;
        console.log(JSON.stringify(this.notice));
        console.log(this.notice.MUSTDESC);
        // this.noticeModify.REMINDTIME = this.notice.REMINDTIME;
        // this.noticeModify.VALIDTIME = this.notice.VALIDTIME;
/*        this.notice.MUSTDESC = this.notice.MUSTDESC.replace(/(\n)/g, "");
        this.notice.MUSTDESC = this.notice.MUSTDESC.replace(/(\t)/g, "");
        this.notice.MUSTDESC = this.notice.MUSTDESC.replace(/(\r)/g, "");
        this.notice.MUSTDESC = this.notice.MUSTDESC.replace(/<\/?[^>]*>/g, "");
        this.notice.MUSTDESC = this.notice.MUSTDESC.replace(/\s*!/g, "");
        this.notice.MUSTDESC = this.notice.MUSTDESC.replace(/&nbsp;*!/g, "");*/
        this.validtime = this.notice.VALIDTIME;
        this.remindtime = this.notice.REMINDTIME;
        // this.validtime = str.substring(0, 4)+ "-"+ str.substring(4, 6)+"-"+ str.substring(6, 8);
        // this.remindtime = str.substring(0, 4)+ "-" + str.substring(4, 6)+ "-"+ str.substring(6, 8)+ "T" + str.substring(8, 10) + ":"
        //     + str.substring(10, 12)+ ":" + str.substring(12, 14);

        if (this.remindtime !== "") {
            this.isRemind = true;
        }

    }

    goBack(): void {
        this.navCtrl.pop();
    }

    ngAfterViewInit() {

        this.quill = new Quill('#editor', {

            modules: {
                toolbar: [
                    // [{ header: [1, 2, false] }],
                    [{'size': ['small', false, 'large', 'huge']}],
                    ['bold', 'italic', 'underline'],
                    [{'color': []}, {'background': []}]
                ]
            },
            placeholder: '编辑通知。。。',
            theme: 'snow'

        });

        //this.quill.setText(this.notice.MUSTDESC);
        this.quill.setContents([
            { insert: this.notice.MUSTTITLE,attributes: { bold: true } },
            { insert: '\n'},
            { insert: this.notice.MUSTDESC},
        ]);
       // this.quill.insertText(0, this.notice.MUSTTITLE, 'bold', true);
        debugger;
        //this.quill.setText(this.notice.MUSTDESC);
    }

    saveNotice(): void {
        //发报文

        this.navCtrl.pop();
    }

    gotoPreview(): void {

        var text = this.quill.getText();

        // this.notice.MUSTDESC = text;
        if (this.isRemind) {
            this.notice.ISREMIND = "1";
        } else {
            this.notice.ISREMIND = "0";
        }
        this.notice.VALIDTIME = this.validtime;
        this.notice.REMINDTIME = this.remindtime;
        console.log(JSON.stringify(this.notice));
        this.navCtrl.push(NoticePreview, {object: this.notice, mustdesc: text})

    }

}
