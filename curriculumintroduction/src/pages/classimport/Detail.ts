/**
 * Created by hanzhendong on 2016/11/29.
 */
import { Component } from '@angular/core';
import { HttpService } from "../../http/http.Service";
import { ToastController, NavParams } from 'ionic-angular';
import { HelpUtils } from "../../app/utils/HelpUtils";
import { NavController } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { DomSanitizer } from '@angular/platform-browser';
import {DescPage} from "../desc/desc";
@Component({
    selector: 'page-detail',
    templateUrl: 'detail.html'
})
export class DetailPage {
    captaid= {
        captcha: '',
        captchaUrl: '',
        jSessionId: '',};
    loadingPop;
    filesrc;
    name= '';
    password= '';
    captchaa='';
    agree=false;
    s:number;
    imgUrl:string='';
    constructor(private params: NavParams, public toastCtrl: ToastController, private HelpUtils: HelpUtils,
        private http: HttpService, public navCtrl: NavController, private DomSanitization: DomSanitizer) {
       this.catpat();

        /*、
         * 调用jssdk
         *
         * */
        antlinker.configTitle({
            type: "label",
            title: '课程表导入',
            fail: function () {

            },
            success: function () {
            }
        });
        antlinker.configTitleButton({
            type: 'close',
            text: '关闭',
            fail: function () {

            },
            success: function () {
            },
            trigger: function () {
            }

        });
    }
    //验证码
    catpat(){
        this.http.postJSON({
            Router: ServelUrl.Url.capta,
            Method: 'POST',
            Body: {}
        }).then(
            comments => {
                if (comments.Data) {
                    console.log("sdasda");
                    this.captaid = comments.Data || [];
                     this.s = Math.random();
                    // console.log(this.captaid);
                    if(!this.captaid.captchaUrl||!this.captaid.jSessionId){
                        this.HelpUtils.toastPop('教务服务器错误，请稍后重试');
                    }
                }
            },
            err => console.log(err));
    }
    showToast(position: string, mes: string) {
        let toast = this.toastCtrl.create({
            message: mes,
            duration: 2000,
            cssClass: 'zj-toast',
            position: position
        });

        toast.present(toast);
    }
    desc(ev){
        ev.stopPropagation();
        this.navCtrl.push(DescPage)
    }
    //提交数据
    query(): void {
        if (!this.name) {
            this.HelpUtils.toastPop('请输入教务账号！');
            return;

        }
        if (!this.password) {
            this.HelpUtils.toastPop('请输入教务密码！');
            return;

        }
        if (!this.captchaa) {
            this.HelpUtils.toastPop('请输入验证码！');
            return;
        }
        // if (this.Estimate !== Estimate ) {
        //     this.HelpUtils.toastPop('验证码输入有误！');
        //     return;
        // }
        this.loadingPop = this.HelpUtils.loadingPop('正在导入数据，请稍后');
        this.http.postJSON({
            Router: ServelUrl.Url.classimport,
            Method: 'POST',
            Body: {
                name: this.name,
                password: this.password,
                captcha: this.captchaa,
                jSessionId: this.captaid.jSessionId
            }
        }).then(
            comments => {
                if (comments.FeedbackCode == '1') {
                    this.loadingPop.dismiss();
                    this.HelpUtils.toastPop('导入失败，请检查填入信息是否正确');
                    this.catpat();
                    return;
                }
                else if (comments.FeedbackCode == '0') {
                    this.loadingPop.dismiss();
                    antlinker.closeView({
                        success: function() {

                         },
                        fail: function() {

                         }
                     })
                }
            }
            )
    }

}
