import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ServelUrl} from "../../app/ServelUrl";
import {HttpService} from "../../http/http.Service";
import {QuestionServiceProvider} from "../../providers/question-service/question-service";

declare var antlinker;

@IonicPage({
  segment: 'home/:code'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  aggree: false;
  qRecord_id = '';
  wenjuan = {
    record_id: '', 
    name: '调查问卷',
    memo: '',
    agreement: ''
  };

  constructor(private questionService: QuestionServiceProvider, public navCtrl: NavController, public navParams: NavParams, private http: HttpService) {
    console.log(this.navParams.get('code'));
    console.log(this.navParams);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
  }

  ionViewDidEnter() {
    antlinker.configTitle({
      type: "label",
      title: '调查问卷',
      fail: () => {
      },
      success: ''
    });
    antlinker.configTitleButton({
      showClose: false,
      type: "empty",
      success: function () {
        // 设置右上角按钮成功
      },
      fail: function () {
        // 设置右上角按钮失败
      }
    });
    antlinker.configTitleButton({
      type: 'back',
      text: '',
      fail: () => {
      },
      success: ''

    });

    if (!this.questionService.getCode()) {
      this.questionService.setCode(this.navParams.get('code'));
    }
    localStorage.setItem('wCode',this.navParams.get('code'));
    /*
* 设置题目
* */
    if (this.navParams.get('code')) {
      this.http.postJSON({
        Router: ServelUrl.Url.onebycode,
        Method: 'POST',
        Body: {code: this.questionService.getCode() ? this.questionService.getCode() : this.navParams.get('code')}
      }).then(res => {
        if (!res.FeedbackCode) {
          if (res.Data) {
            this.wenjuan = res.Data;
            if(this.wenjuan.record_id){
              localStorage.setItem('questionnaire_id',this.wenjuan.record_id)
            }
            if (res.Data) {
              this.questionService.setWenjuanName(res.Data.name);
              this.setQustions();
            }
          }else {
            alert('获取题目信息失败!');
          }

        }
      })
    } else {
      alert('获取问卷代码失败!');
    }

  }

  setQustions() {
    this.http.postJSON({
      Router: ServelUrl.Url.querytopics,
      Method: 'POST',
      Body: {record_id: this.wenjuan.record_id}
    }).then(res => {
      this.qRecord_id = res.Data[0].record_id;
      this.questionService.setQuestionList(res.Data || []);
    })
    /*  this.http.get('assets/data.json').then(res => {
        console.log(res);
        this.questionService.setQuestionList(res.question || []);
      })*/
  }

  onStart() {
    this.questionService.setQuestionIndex(0);
    this.navCtrl.push('QuestionPage', {record_id: this.qRecord_id}).then(r => {

    });
  }
}
