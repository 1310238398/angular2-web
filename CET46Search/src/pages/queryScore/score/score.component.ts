import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { ServelUrl } from "../../../app/ServelUrl";
import { HelpUtils } from "../../../app/utils/HelpUtils";
import { NavParams, IonicPage, NavController } from "ionic-angular";
import { HttpService } from "../../../http/http.Service";
import { loginPage } from "../loginOn/login.component";

import { CETData } from "../../../utility/queryScore";
@Component({
    selector: 'page-score',
    templateUrl: 'score.component.html'
})
export class scorePage {
    ID: '';
    isShare: number;
    allData = {
        IsSuccess: "", //是否胜利 1胜利 2失败
        Name: '',        //姓名
        CetType: '',   //准考证号
        EstimateScore: '',
        RealScore: '',
        HearScore: '',
        ReadScore: '',
        ComplexScore: '',
        WriteScore: '',
        IsOutside: '',
        RankText: '',
        IsWin: '',
        WinText: '',
    };
    //王者荣耀段位
    rank: string;
    //等级
    rankNum: string;
    //总分
    score: number;
    //展示详细成绩
    showDetail: boolean = false;
    //中奖信息
    zhongjiang: boolean = true;
    // 中奖蒙层
    cloak: boolean = true;
    //是否保存 (保存)
    isSave: boolean = false;
    constructor(private navCtrl: NavController, private http: HttpService, private params: NavParams, private HelpUtils: HelpUtils) {
        // this.allData = JSON.parse(this.params.get('data')) || '';
        this.ID = this.params.get('data');
        console.log(this.ID);
        this.isShare = +this.params.get('share');

    }
    // 展示详细成绩
    detail(): void {
        this.showDetail = true;
    }
    // 隐藏详细信息
    hideBigImage(): void {
        this.showDetail = false;
    }
    // 取消展示中奖信息
    ok(): void {
        this.zhongjiang = false;
        this.cloak = false;

    }

    ionViewWillEnter() {
        console.log(this.ID)
        // 页面所有数据
        this.http.postJSON({
            Router: ServelUrl.Url.queryScoreById,
            Method: 'POST',
            Body: {
                ID: this.ID
            }
        }).then(
            comments => {
                if (comments.FeedbackCode == 0) {

                    this.allData = comments.Data;
                    this.score = parseInt(this.allData.RealScore);

                    if (this.score >= 650 && this.score < 710) {
                        this.rank = '最强王者';
                        this.rankNum = '';
                    }
                    else if (this.score >= 600 && this.score < 650) {
                        this.rank = '永恒钻石';
                        if (this.score < 610 && this.score >= 600) {
                            this.rankNum = 'V';
                        } else if (this.score >= 610 && this.score < 620) {
                            this.rankNum = 'IV';
                        } else if (this.score >= 620 && this.score < 630) {
                            this.rankNum = 'III';
                        } else if (this.score >= 630 && this.score < 640) {
                            this.rankNum = 'II';
                        } else if (this.score >= 640 && this.score < 650) {
                            this.rankNum = 'I';
                        }
                    }
                    else if (this.score >= 500 && this.score < 600) {
                        this.rank = '尊贵铂金';
                        if (this.score < 520 && this.score >= 500) {
                            this.rankNum = 'V';
                        } else if (this.score >= 520 && this.score < 540) {
                            this.rankNum = 'IV';
                        } else if (this.score >= 540 && this.score < 560) {
                            this.rankNum = 'III';
                        } else if (this.score >= 560 && this.score < 580) {
                            this.rankNum = 'II';
                        } else if (this.score >= 580 && this.score < 600) {
                            this.rankNum = 'I';
                        }
                    }
                    else if (this.score >= 400 && this.score < 500) {
                        this.rank = '荣耀黄金';
                        if (this.score < 425 && this.score >= 400) {
                            this.rankNum = 'IV';
                        } else if (this.score >= 425 && this.score < 450) {
                            this.rankNum = 'III';
                        } else if (this.score >= 450 && this.score < 475) {
                            this.rankNum = 'II';
                        } else if (this.score >= 475 && this.score < 480) {
                            this.rankNum = 'I';
                        }
                    }
                    else if (this.score >= 300 && this.score < 400) {
                        this.rank = '秩序白金';
                        if (this.score < 325 && this.score >= 300) {
                            this.rankNum = 'IV';
                        } else if (this.score >= 325 && this.score < 350) {
                            this.rankNum = 'III';
                        } else if (this.score >= 350 && this.score < 375) {
                            this.rankNum = 'II';
                        } else if (this.score >= 375 && this.score < 400) {
                            this.rankNum = 'I';
                        }
                    }
                    else if (this.score >= 200 && this.score < 300) {
                        this.rank = '倔强青铜';
                        if (this.score < 233 && this.score >= 200) {
                            this.rankNum = 'III';
                        } else if (this.score >= 233 && this.score < 266) {
                            this.rankNum = 'II';
                        } else if (this.score >= 266 && this.score < 300) {
                            this.rankNum = 'I';
                        }
                    }
                    else if (this.score < 200) {
                        this.rank = '小学生';
                        if (this.score < 233) {
                            this.rankNum = '';
                        }
                    }
                }
                  antlinker.configNavigationButton({
            type: ['more', 'close'],
            option: ["refresh", "share"],
            buttonTitle: '更多',
            moreOption: ["share", "refresh"],
            sharePlatform: ['qq', 'qzone', 'wechat', 'weshare', 'weibo', 'square', 'u2u', 'u2g'],
            shareContent: {
                title: '我的王者荣耀版四六级成绩段位是' + this.rank + this.rankNum + '，快来查询下你的四六级段位吧！', // 分享标题
                desc: '王者荣耀版四六级查询', // 分享描述
                link: '', // 分享链接
                id: this.ID, // id
                type: 'cet46query', // 分享类型,music、video或link，不填默认为link
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
            });
        // 页面标题
        antlinker.configTitle({
            type: "label",
            title: '四六级查询',
            fail: function () {

            },
            success: function () {
            }
        });
      
    }

    share() {
        antlinker.sharePlatform({
            option: ['qq', 'qzone', 'wechat', 'weshare', 'weibo', 'square', 'u2u', 'u2g'],
            shareContent: {
                title: '我的王者荣耀版四六级成绩段位是' + this.rank + this.rankNum + '，快来查询下你的四六级段位吧！', // 分享标题
                desc: '王者荣耀版四六级查询', // 分享描述
                link: '', // 分享链接
                id: this.ID, // id
                type: 'cet46query', // 分享类型,music、video或link，不填默认为link
                dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
            },
            success: function () {
                //设置右上角按钮成功
                this.HelpUtils.toastPop("分享")
            },
            fail: function () {
                // 设置右上角按钮失败 
                
            }
        })
    }





    // savePhoto() {
    //     this.isSave = true;
    //     antlinker.savePhoto({
    //         success:  ()=> {
    //             this.HelpUtils.toastPop("保存成功");
    //             //  this.isSave = false;
    //         },
        
    //         fail: ()=> {
    //             this.HelpUtils.toastPop('保存失败');
    //             //  this.isSave = false;
    //         }
    //     });
    //     this.isSave = false;

    // }
}
