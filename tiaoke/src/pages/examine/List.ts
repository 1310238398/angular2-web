/*
 * create by lizan 2017/02/28
 * */
import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";
import { ApprovalPage } from "./Approval"
import { ViewApprovalPage } from "./ViewApproval"
@Component({
    selector: 'page-list',
    templateUrl: './List.html'
})
export class WaitListPage {
    pet = "a1";
    searchQuery: string = '';
    items: string[];
    applylist;//待审批
    alreadylist//已审批
    constructor(private navCtrl: NavController, private http: HttpService) {
        //查询列表
        this.http.postJSON({
            Router: ServelUrl.Url.queryalladjustcourse,
            Method: 'POST',
            Body: {Status :"0"}
        }).then(
            comments => {
                if (comments.FeedbackCode == 0) {
                    this.applylist = comments.Data;
                }
            });
        this.http.postJSON({
            Router: ServelUrl.Url.queryalladjustcourse,
            Method: 'POST',
            Body: {Status :"1"}
        }).then(
            comments => {
                if (comments.FeedbackCode == 0) {
                    this.alreadylist = comments.Data;
                }
            });

    }

    urlApproval(item){//跳转审批页面
        this.navCtrl.push(ApprovalPage, {rid: item.RecordId});
    }
    urlViewApproval(item){//跳转已审批完成后,查看详细信息页面
        this.navCtrl.push(ViewApprovalPage, {rid: item.RecordId});
    }

    initializeItems(val) {
        this.http.postJSON({
            Router: ServelUrl.Url.queryalladjustcourse,
            Method: 'POST',
            Body: {Status :"1",Search:val}
        }).then(
            comments => {
                if (comments.FeedbackCode == 0) {
                    this.alreadylist = comments.Data;
                }
            });
    }

    getItems(ev: any) {
        // Reset items back to all of the items
        this.initializeItems(ev.target.value);
    }
}