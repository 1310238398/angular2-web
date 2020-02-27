/*
 * create by hanzhendong 2016/11/27
 * */
import {Component} from '@angular/core';
import {ToastController} from 'ionic-angular';
import {HelpUtils} from "../../../app/utils/HelpUtils";
import {NavController} from "ionic-angular";
import {ServelUrl} from "../../../app/ServelUrl";
import {HttpService} from "../../../http/http.Service";
import {PersonreponPage} from "../personrepon/Personrepon";
import {RewardPage} from "../reward/Reward";
import { AlertController } from 'ionic-angular';


@Component({
    selector: 'page-familyeconomy',
    templateUrl: 'familyeconomy.html'
})
export class FamilyeconomyPage {
    InformationFilling: any;
    reader;
    loadingPop;
    item: any;
    Familyeconmomy = {
        EconomicSources: ''
    }
    schoolName=localStorage.getItem('schoolName');
nowStartDate = `${new Date().getFullYear()}年${new Date().getMonth()}月`;
nowEndDate = `${new Date().getFullYear()}年${new Date().getMonth() + 1}月`;
    Learning: any = [{StartDate: "", EndDate: "", School: "", Duties: "", Witness: "",}];
    RewardsAndPunishments: any = [{StartDate: "", EndDate: "",RewardsName:'', Details: "",}];

    constructor(public toastCtrl: ToastController, private HelpUtils: HelpUtils,
                public navCtrl: NavController, private http: HttpService,private alertCtrl: AlertController) {

        this.reader = new FileReader();
        //初始请求数据
        this.http.postJSON({
            Router: ServelUrl.Url.queryfour,
            Method: 'POST',
            Body: ''
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    if (comments.Data.EconomicSources && comments.Data.Learning && comments.Data.RewardsAndPunishments) {
                        this.Familyeconmomy.EconomicSources = comments.Data.EconomicSources;
                        this.Learning = comments.Data.Learning;
                        if(comments.Data.RewardsAndPunishments.length){
                            this.RewardsAndPunishments = comments.Data.RewardsAndPunishments;
                        }

                    }
                    // console.log( this.InformationFilling[0].Academy)

                }
            });
        /*、
         * 调用jssdk
         *
         * */
        antlinker.configTitle({
            type: "label",
            title: '学籍信息采集',
            fail: function () {

            },
            success: function () {
            }
        });
        antlinker.configNavigationButton({
            type: ['more', 'close'],
            option: ["refresh"],
            buttonTitle: '更多',
            moreOption: ["refresh"],
            success: function () {
                // alert('success被调用');
                //设置右上角按钮成功
            },
            fail: function () {
                // alert('fail被调用');
                // 设置右上角按钮失败
            },
        });
        antlinker.configTitleButton({
            type: 'close',
            text: '关闭',
            fail: function () {

            },
            success: function () {
            },
            // trigger: function () {
            // }

        });

    }

//添加家庭成员
    addPage() {

        if (this.Learning.length + 1 <= 5) {
            this.Learning.push({StartDate: "", EndDate: "", School: "", Duties: "", Witness: "",});
        } else {
            this.HelpUtils.toastPop("最多只能添加5个！");
        }
    }

    removePage() {
        let confirm = this.alertCtrl.create({
            title: '确定删除此项吗？',
            message: '',
            buttons: [
              {
                text: '确定',
                handler: () => {
                    this.Learning.pop({StartDate: "", EndDate: "",RewardsName:"", Details: "",});
                }
              },
              {
                text: '取消',
              }
            ]
          });
          confirm.present()
       
    }

    addsoPage() {
        //this.shouInfo++;
        if (this.RewardsAndPunishments.length + 1 <= 5) {
            this.RewardsAndPunishments.push({StartDate: "", EndDate: "",RewardsName:"", Details: "",});
        } else {
            this.HelpUtils.toastPop("最多只能添加5个！");
        }
    }

    removeScoPage() {
       
        let confirm = this.alertCtrl.create({
            title: '确定删除此项吗？',
            message: '',
            buttons: [
              {
                text: '确定',
                handler: () => {
                    this.RewardsAndPunishments.pop({StartDate: "", EndDate: "",RewardsName:'', Details: "",});
                }
              },
              {
                text: '取消',
              }
            ]
          });
          confirm.present()
    }

    onDetailPageTJ() {
        if (!this.Familyeconmomy.EconomicSources.trim()) {
            this.HelpUtils.toastPop('请填写家庭经济来源！');
            return;
        }
        if (this.Familyeconmomy.EconomicSources.length > 500) {
            this.HelpUtils.toastPop('字数不能超过500！');
            return;
        }
        var w;
        for (w = 0; w < this.Learning.length; w++) {
            if (!this.Learning[w].StartDate) {
                console.log(this.Learning[w].StartDate.trim());
                this.HelpUtils.toastPop('请填写学习经历开始日期！');
                return;

            }
            if (!this.Learning[w].EndDate.trim()) {
                this.HelpUtils.toastPop('请填写学习经历的结束日期！');
                return;

            }
            if (!this.Learning[w].School.trim()) {
                this.HelpUtils.toastPop('请填写学校名称！');
                return;

            }

        }
        var t;
        for (t = 0; t < this.RewardsAndPunishments.length; t++) {
            if (!this.RewardsAndPunishments[t].StartDate.trim()) {
                console.log(this.RewardsAndPunishments[t].StartDate);
                this.HelpUtils.toastPop('请填写奖惩开始时间！');
                return;

            }
            if (!this.RewardsAndPunishments[t].EndDate.trim()) {
                this.HelpUtils.toastPop('请填写奖惩结束时间！');
                return;

            }
            if (!this.RewardsAndPunishments[t].RewardsName.trim()) {
                this.HelpUtils.toastPop('请填写奖惩名称！');
                return;

            }
            if (!this.RewardsAndPunishments[t].Details.trim()) {
                this.HelpUtils.toastPop('请填写奖惩情况！');
                return;

            }
        
            if (this.RewardsAndPunishments[t].Details.length > 500) {
                this.HelpUtils.toastPop('字数不能超过500！');
                return;
            }
        }
        this.loadingPop = this.HelpUtils.loadingPop('信息正在提交。。。。。');
        this.http.postJSON({
            Router: ServelUrl.Url.savefour,
            Method: 'POST',
            Body: {
                EconomicSources: this.Familyeconmomy.EconomicSources,
                Learning: this.Learning,
                RewardsAndPunishments: this.RewardsAndPunishments
            }

        }).then(
            comments => {
                this.loadingPop.dismiss();
                if (comments.FeedbackCode == '0') {
                    this.navCtrl.push(RewardPage);
                } else {
                    this.HelpUtils.toastPop(`${comments.FeedbackText}`);
                }
            }
        )

    }


    onTopPage() {
        this.navCtrl.push(PersonreponPage);
    }
}
