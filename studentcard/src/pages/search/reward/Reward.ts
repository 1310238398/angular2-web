/*
 * create by hanzhendong 2016/11/27
 * */
import {Component} from '@angular/core';
import {ToastController, NavParams} from 'ionic-angular';
import {HelpUtils} from "../../../app/utils/HelpUtils";
import {NavController} from "ionic-angular";
import {ServelUrl} from "../../../app/ServelUrl";
import {HttpService} from "../../../http/http.Service";
import {FamilyeconomyPage} from "../familyeconomy/familyeconomy";
import {SuccessfullPage} from "../successfull/Successfull";


@Component({
    selector: 'page-reward',
    templateUrl: 'reward.html'
})
export class RewardPage {
    InformationFilling: any;
    reader;
    loadingPop;  
    nowdata:any; 
    Reward = {
        PartyOrganization: '',
        HistoryIssues: '',
        WriteDate:''
        
    };
    schoolName=localStorage.getItem('schoolName');
    constructor(private params: NavParams, public toastCtrl: ToastController, private HelpUtils: HelpUtils,
                public navCtrl: NavController, private http: HttpService) {

        
        // this.InformationFilling = this.params.get('InformationFilling');
        
        this.reader = new FileReader();
         //初始请求数据
         this.http.postJSON({
            Router: ServelUrl.Url.queryfive,
            Method: 'POST',
            Body: ''
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    this.Reward = comments.Data[0];
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

    ionViewDidEnter() {
    }

    ionViewWillLeave() {

    }


    onDetailPageTJ() {
       
        if (!this.Reward.PartyOrganization.trim()) {
            this.HelpUtils.toastPop('请填写何时何地参加党组织！');
            return;
        }
        if (this.Reward.PartyOrganization.length > 500) {
            this.HelpUtils.toastPop('字数不能超过500！');
            return;
        }
        if (!this.Reward.HistoryIssues.trim()) {
            this.HelpUtils.toastPop('请填写主要亲属重大历史问题！');
            return;
        }
        if (this.Reward.HistoryIssues.length > 500) {
            this.HelpUtils.toastPop('字数不能超过500！');
            return;
        }
        if (!this.Reward.WriteDate) {
            this.HelpUtils.toastPop('请填写日期！');
            return;
        }
        console.log(moment(new Date()).locale('es').format());
        console.log(this.Reward.WriteDate);
        console.log(this.Reward.WriteDate);
        if (this.Reward.WriteDate > moment(new Date()).locale('es').format()) {
            this.HelpUtils.toastPop('填表日期不能在当前之后哦！');
            return;
        }
        console.log(this.Reward)
        this.loadingPop = this.HelpUtils.loadingPop('信息正在提交。。。。。');
        
        this.http.postJSON({
            Router: ServelUrl.Url.savefive,
            Method: 'POST',
            Body:  this.Reward
            
        }).then(
            comments => {
                this.loadingPop.dismiss();
                if (comments.FeedbackCode == '0') {
                    this.navCtrl.push(SuccessfullPage);
                } else {
                    this.HelpUtils.toastPop(`${comments.FeedbackText}`);
                }
            }
            )




    }

   

    onTopPage(){
        this.navCtrl.push(FamilyeconomyPage);
    }
}
