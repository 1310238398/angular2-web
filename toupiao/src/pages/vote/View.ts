/*
 * create by lizan 2017/02/28
 * */
import {Component} from '@angular/core';
import {NavController, AlertController, NavParams} from "ionic-angular";
import {ServelUrl} from "../../app/ServelUrl";
import {HttpService} from "../../http/http.Service";

@Component({
  selector: 'view-page',
  templateUrl: './View.html'
})
export class ViewPage {
  vId;
  voteInfo = {
    Vote: 0,
    Video: ''
  };
  voteNum = true;//当天当前登录用户是否已经投票超过3次,3次为true,3次以内为false
  voteStatus = true;//当前项目是否已经投票过,投票过为true
  constructor(private navCtrl: NavController, private http: HttpService, private alertCtrl: AlertController, private params: NavParams) {
    this.vId = params.get('vid');
  }

  ionViewWillEnter() {

    //获得投票列表
    this.http.postJSON({
      Router: 'api/vote/' + this.vId,
      Method: 'GET',
      Body: {}
    }).then(
      comments => {
        this.voteInfo = comments;
      });
    //检查当天是否投票
    this.http.postJSON({
      Router: 'api/vote/check/' + this.vId,
      Method: 'GET',
      Body: {}
    }).then(
      comments => {
        this.voteNum = comments.VoteNum;
        this.voteStatus = comments.VoteStatus;
      });
  }

  ionViewDidLeave() {
    this.voteInfo.Video = ''
  }

  onVoteOn() {
    if (this.voteNum) {
      let confirm = this.alertCtrl.create({
        title: '提示',
        message: '今天您已经投票过3次,不能再次投票',
        buttons: [
          {
            text: '确定',

          }
        ]
      });
      confirm.present();
      return;
    }
    //投票
    this.http.postJSON({
      Router: 'api/vote/' + this.vId,
      Method: 'PUT',
      Body: {}
    }).then(
      comments => {
        if (comments.code != 2) {
          if (this.voteNum) {
            let confirm = this.alertCtrl.create({
              title: '提示',
              message: '今天您已经投票3次,不能再次投票',
              buttons: [
                {
                  text: '确定',

                }
              ]
            });
            confirm.present();
            return;
          }
          this.voteStatus = true;
          this.voteInfo.Vote = this.voteInfo.Vote + 1;
          let confirm = this.alertCtrl.create({
            title: '感谢您的支持',
            message: comments.message,
            buttons: [
              {
                text: '暂时不去了',
                handler: () => {

                }
              },
              {
                text: '分享到微信朋友圈',
                handler: () => {

                  antlinker.shareContent({
                    title: '创业大赛投票', // 分享标题
                    desc: '创业大赛投票', // 分享描述
                    link: '', // 分享链接
                    id: 'default', // id
                    type: 'cydsvote', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                    },
                    cancel: function () {
                    }
                  })
                }
              }
            ]
          });
          confirm.present();
        } else {
          let confirm = this.alertCtrl.create({
            title: '感谢您的支持',
            message: comments.message,
            buttons: [
              {
                text: '确定'
              }
            ]
          });
          confirm.present();
        }
      });
  }

  onVoteOff() {
    let confirm = this.alertCtrl.create({
      title: '提示',
      message: '当前项目您已投过票',
      buttons: [
        {
          text: '确定',
        }
      ]
    });
    confirm.present();
  }

  tpBtn() {
    let confirm = this.alertCtrl.create({
      title: '提示',
      message: '感谢新的支持',
      buttons: [
        {
          text: '确定',
          handler: () => {
            window.history.back()
          }
        },
        {
          text: '分享到微信朋友圈',
          handler: () => {

          }
        }
      ]
    });
    confirm.present();
  }
}
