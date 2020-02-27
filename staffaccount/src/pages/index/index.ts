import { Component } from '@angular/core';
import { IonicPage, NavParams, AlertController, NavController } from 'ionic-angular';
import { HttpService } from '../../http/http.service';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { ServelUrl } from "../../app/ServelUrl";
import { HelpUtils } from '../../app/utils/HelpUtils';

class Port {
    public code: string;
    public name: string;
}
declare var antlinker;
@IonicPage()

@Component({
    selector: 'page-index',
    templateUrl: 'index.html'
})
export class IndexPage {

    ports: Port[];
    port: Port;

    staffName = '';  //学工姓名
    departCode = ''; //部门代码

    constructor(public navParams: NavParams, public helpUtil: HelpUtils, private http: HttpService, public navCtrl: NavController, ) { }

    ionViewWillEnter() {
        antlinker.configTitle({
            type: "label",
            title: '学工账号',
            fail: function () { },
            success: function () { }
        });
        antlinker.configTitleButton({
            type: 'close',
            text: '关闭',
            fail: function () { },
            success: function () { },
            trigger: function () { }
        });

        this.ports = [
            { code: '1', name: '传媒技术学院' },
            { code: '2', name: '学生工作处' },
            { code: '3', name: '资助中心' },
            { code: '4', name: '体育学院' },
        ];
        //this.loadDepartCatgray();
    }

    //部门名称
    loadDepartCatgray() {
        this.http.postJSON({
            Router: ServelUrl.Url.GetRewardProgramList,
            Method: 'POST',
            Body: {
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.ports = res.Data
            } else {
                this.helpUtil.toastPopTop(res.FeedbackText);
            }
        },
            err => console.log(err)
        );
    }

    //查询
    searchUser() {
        if (!this.staffName.trim()) {
            this.helpUtil.toastPopTop('用户姓名不能为空!');
            return false
        }

        this.http.postJSON({
            Router: ServelUrl.Url.queryclassusers,
            Method: 'POST',
            Body: {

            }
        }).then(res => {
            if (!res.FeedbackCode) {
                //this.ports = res.Data
            } else {
                this.helpUtil.toastPopTop(res.FeedbackText);
            }
        },
            err => console.log(err)
        );
    }

    //选取部门
    portChange(event: { component: SelectSearchableComponent, value: any }) {
 
    }



}