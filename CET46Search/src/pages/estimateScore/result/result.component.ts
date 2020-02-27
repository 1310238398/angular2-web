import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { ServelUrl } from "../../../app/ServelUrl";
import { HelpUtils } from "../../../app/utils/HelpUtils";
import { NavParams, IonicPage, NavController } from "ionic-angular";
import { HttpService } from "../../../http/http.Service";
@Component({
    selector: 'page-result',
    templateUrl: 'result.component.html'
})

export class resultPage {
    Estimate='';
    UId='';
    close:boolean=false;
    isShare:string;

    constructor(private navCtrl: NavController, private http: HttpService, private params: NavParams, private HelpUtils: HelpUtils) {
            this.isShare= this.params.get('share');
            this.UId = this.params.get('UId')||'';
              this.close = this.params.get('close')||false;
            console.log(this.UId);
      this.http.postJSON({
            Router: ServelUrl.Url.queryEstimateScore,
            Method: 'POST',
            Body: {
                ID :this.UId
            }
        }).then(
            comments => {
            //    console.log(comments.Data)
               this.Estimate = comments.Data.EstimateScore || [];
        })
   
            // alert(this.UId);
    }
ionViewCanLeave(){
    if(this.close){
antlinker.closeView({
            success: function() {
                
             },
            fail: function() {
               
             }
         })
    }
    
}
    ionViewDidEnter(){
           antlinker.configTitle({
            type: "label",
            title: '四六级估分',
            fail: function () {

            },
            success: function () {
            }
        });
        antlinker.configNavigationButton({
            type: ['more', 'close'],
            option: ["refresh", "share"],
            buttonTitle: '更多',
            moreOption: ["share", "refresh"],
            sharePlatform: ['qq', 'qzone', 'wechat', 'weshare', 'weibo', 'square', 'u2u', 'u2g'],
            shareContent: {
                title: '我正在参加四六级成绩预估的活动，来跟我一起瓜分666现金大奖吧', // 分享标题
                desc: '估分拿大奖', // 分享描述
                link: '', // 分享链接
                id: this.UId, // id
                type: 'cet46score', // 分享类型,music、video或link，不填默认为link
                dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
            },
            success: function () {
                // alert('success被调用');
                //设置右上角按钮成功
            },
            fail: function () {
                // alert('fail被调用');
                // 设置右上角按钮失败
            },
            trigger: function () {
                // alert('trigger被调用');
                //点击标题时调用
            }
        });


     console.log(this.UId+'enter');
 this.http.postJSON({
            Router: ServelUrl.Url.queryEstimateScore,
            Method: 'POST',
            Body: {
                ID :this.UId
            }
        }).then(
            comments => {
            //    console.log(comments.Data)
               this.Estimate = comments.Data.EstimateScore || [];
        })

       
    }
    // console.log(this.UId)
    shareScore(){
             antlinker.sharePlatform({
            option: ['qq', 'qzone', 'wechat', 'weshare', 'weibo', 'square', 'u2u', 'u2g'],
            shareContent: {
                title: '我正在参加四六级成绩预估的活动，来跟我一起瓜分666现金大奖吧', // 分享标题
                desc: '估分拿大奖', // 分享描述
                link: '', // 分享链接
                id: this.UId, // id
                type: 'cet46score', // 分享类型,music、video或link，不填默认为link
                dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
            },
            success: function () {
                //设置右上角按钮成功
            },
            fail: function () {
                // 设置右上角按钮失败
            }
        })
    }

}