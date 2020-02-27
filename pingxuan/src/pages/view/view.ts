/*
 * create by hanzhendong 2017/10/18
 * */
import {Component} from '@angular/core';
import {NavController, AlertController, NavParams, IonicPage} from "ionic-angular";
import {HttpService} from "../../http/http.Service";
import {ServelUrl} from "../../app/ServelUrl";

@IonicPage({
  segment: 'view/:vid'
})
@Component({
  selector: 'page-view',
  templateUrl: 'view.html'
})
export class ViewPage {
  vId;
  videos: Array<string> = [];
  voteInfo = {
    Vote: 0,
    Video: '',
    Name: '',
    Link:'',
    Check:false
  };
  Photos;//老师照片
  voteStatus = false;//当前是否已经投票过,投票过为true
  constructor(private navCtrl: NavController, private http: HttpService, private alertCtrl: AlertController, private params: NavParams) {
    this.vId = this.params.get('vid');
  }

  ionViewWillEnter() {
    antlinker.configTitle({
      type: "label",
      title: "十佳班主任评选",
      fail: function () {

      },
      success: function () {
      }
    });

    antlinker.configNavigationButton({
      type: ['more', 'close'],
      option: ["refresh"],
      buttonTitle: '',
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

    //获得投票列表
    this.http.postJSON({
      Router: ServelUrl.evaluPrefix + '/' + this.vId,
      Method: 'GET',
      Body: {}
    }).then(
      comments => {
        this.voteInfo = comments;
        if (comments.Video) {
          this.videos = (comments.Video || '').split(';');
        }
        this.Photos = comments.Photo || []
      });
  }

  onVoteOn() {

    //投票
    this.http.postJSON({
      Router: ServelUrl.evaluPrefix + '/' + this.vId,
      Method: 'PUT',
      Body: {}
    }).then(
      comments => {
        if (!comments.Status) {
          this.voteInfo.Check = true;
          this.voteInfo.Vote = this.voteInfo.Vote + 1;
        }
        let confirm = this.alertCtrl.create({
          title: '提示',
          message: comments.Message || '',
          buttons: [
            {
              text: '确定',

            }
          ]
        });
        confirm.present();
      });
  }

  onVoteOff() {
    let confirm = this.alertCtrl.create({
      title: '提示',
      message: '该老师您已投过票',
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
      message: '感谢您的支持',
      buttons: [
        {
          text: '确定',
          handler: () => {
            window.history.back()
          }
        }
      ]
    });
    confirm.present();
  }

  navDetail(params) {
    this.navCtrl.push('DetailPage', params)
  }
}
