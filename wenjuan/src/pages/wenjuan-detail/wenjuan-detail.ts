import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, Navbar, NavController, NavParams} from 'ionic-angular';
import {HelpUtils} from "../../app/utils/HelpUtils";
import {ServelUrl} from "../../app/ServelUrl";
import {HttpService} from "../../http/http.Service";
import {QuestionServiceProvider} from "../../providers/question-service/question-service";
import {DomSanitizer} from "@angular/platform-browser";

/**
 * Generated class for the WenjuanDetailPage page.
 *
 */
declare var antlinker;
declare var Qiniu;
declare var plupload;
declare var $;

@IonicPage({
  segment: 'detail/:code'
})
@Component({
  selector: 'page-wenjuan-detail',
  templateUrl: 'wenjuan-detail.html',
})
export class WenjuanDetailPage {

  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild("b_button", {read: ElementRef}) browse_button: ElementRef;

  CertifyImgs = [];
  Certify = {
    AttachmentKey: '',
    AttachmentCode: ''
  };
  fileLoading;
  //题目id
  record_id;
  //问卷名称
  WenjuanName;
  QuestionList = [];
  QuestionIndex = 0;
  //文本内容
  textArea = '';
  //其他文本内容
  otherTextArea = '';
  //打分题分数
  score = '';
  //七牛
  uploader;
  rate;
  answer = {
    option_result: '',
    text_result: '',
    option_id: '',
    attachs: []
  };

  constructor(private DomSanitizer: DomSanitizer, private HelpUtils: HelpUtils, private loadingCtrl: LoadingController, public questionService: QuestionServiceProvider, private http: HttpService, public navCtrl: NavController, public navParams: NavParams) {
    this.QuestionIndex = this.questionService.getQuestIndex();
    console.log('QuestionIndex', this.questionService.getQuestIndex());
    console.log('当前位置', this.QuestionIndex);
  }

  getWenjuan() {
    if (this.navParams.get('code')) {
      this.http.postJSON({
        Router: ServelUrl.Url.onebycode,
        Method: 'POST',
        Body: {code: this.questionService.getCode() ? this.questionService.getCode() : this.navParams.get('code')}
      }).then(res => {
        if (!res.FeedbackCode) {
          if (res.Data) {
            console.log('问卷:', res.Data);
            this.getTopics(res.Data.record_id)
          } else {
            alert('获取题目信息失败!');
          }

        }
      })
    } else {
      alert('获取问卷代码失败!');
    }
  }

  getTopics(record_id) {
    this.http.postJSON({
      Router: ServelUrl.Url.querytopics,
      Method: 'POST',
      Body: {record_id: record_id}
    }).then(res => {
      console.log('题目:', res.Data);
      this.QuestionList = res.Data || [];
      this.questionService.setQuestionList(res.Data || []);
      console.log(this.questionService.getQuestionList());
      this.getOption(this.questionService.getQuestionList()[this.QuestionIndex].record_id)
    })
  }

  getOption(record_id) {
    this.http.postJSON({
      Router: '/api/questionnaire/getoption',
      Method: 'POST',
      Body: {
        topic_id: record_id,
        bu_type: "wenjuan",
        bu_id: ""
      }
    }).then(res => {
      console.log(res);
      this.answer = res.Data || {};
      console.log('问题:', res.Data);
      const question = this.QuestionList[this.QuestionIndex];
      console.log('question:', question);
      //单选或者多选
      if (question) {
        if (question.type == 1 || question.type == 2) {
          const opthios = question.options;
          console.log("question.options", question.options);
          const option_result = this.answer.option_id.split(',');
          console.log("option_result", option_result);
          if (option_result && option_result.length) {

            opthios.forEach(item => {
              item.checked = false;
              option_result.map(result => {
                if (item.record_id == result) {
                  item.checked = true;
                  /**
                   * 证明是其他选项
                   */
                  if (this.answer.text_result) {
                    item.is_other = true;
                    this.otherTextArea = this.answer.text_result;
                  }
                }
              })
            })
          }
        }
        //填空题
        if (question.type == 3) {
          this.textArea = this.answer.text_result;
        }
        //打分题
        if (question.type == 4) {
          this.score = this.answer.option_result;
        }
        //量表题
        if (question.type == 5) {
          this.rate = this.answer.option_result;
        }
      }
      /**
       * 附件
       */
      this.CertifyImgs=[];
      if (this.answer.attachs.length) {
        this.answer.attachs.forEach(item => {
          /**
           * 诡异转换:请注意
           */
          item.url = `${item.path}&imageView2/2/w/150/h/200/interlace/0/q/100`;
          item.path = item.key;
        });
        this.CertifyImgs.push(...this.answer.attachs);
      }
    })
  }


  ionViewWillEnter() {
    this.getWenjuan();
    this.record_id = this.navParams.get('record_id');
    this.QuestionList = this.questionService.getQuestionList() || [];
    console.log('index:', this.QuestionIndex);
    antlinker.configTitle({
      type: "label",
      title: '校园资助',
      fail: () => {
      },
      success: ''
    });
    antlinker.configTitleButton({
      showClose: true,
      type: "empty",
      success: '',
      fail: () => {
      }
    });
  }

  getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
  }


  ngAfterViewInit() {

    setTimeout(() => {
      $(".my-rating").starRating({
        initialRating: this.rate / 2,
        disableAfterRate: false,
        onHover: (currentIndex, currentRating, $el) => {
          this.rate = currentIndex * 2;

          // $('.live-rating').text(currentIndex);
        },
        onLeave: (currentIndex, currentRating, $el) => {
          this.rate = currentIndex * 2;
        }
      });
    }, 200)

  }

  /**
   *
   * @param params
   */
  navPreview(params) {
    console.log('para,s',params);
    this.navCtrl.push('PreviewPage', params)
  }


  /*
  * 上一题
  * */
  onPrivious(question) {
    if (this.navCtrl.canGoBack()) {
      if (this.QuestionIndex != 0) {
        this.questionService.reduceQuestionIndex();
      }
      this.navCtrl.push('WenjuanDetailPage', {
        code: this.navParams.get('code'),
        record_id: question.record_id
      }).then(res => {
      })
    }
  }

  /*
  * 下一题
  * */
  onNext(question) {
    this.questionService.addQuestionIndex();
    this.navCtrl.push('WenjuanDetailPage', {
      code: this.navParams.get('code'),
      record_id: question.record_id
    }).then(res => {
    });

  }

  onFinish(question) {
    var wCode = localStorage.getItem('wCode');
    if (wCode == 'antlinker-jjdc' || wCode == 'antlinker-xszp' || wCode == 'antlinker-xzpy') {
      /* antlinker.openNewView({
         uri: 'ant://h5app/open?URL=poolstudents/index.html',
         fail: function () {
         }
       });*/
      location.replace('/poolstudents/index.html?tipe=1')
    } else {
      antlinker.closeView({
        success: function () {
          //设置右上角按钮成功
        },
        fail: function () {
          // 设置右上角按钮失败
        }
      });
    }
  }

  swipeEvent(event) {
    if (event.direction == 4) {
      //this.onPrivious();
    }
    if (event.direction == 1 || event.direction == 2) {
      if ((this.QuestionIndex + 1) != this.QuestionList.length) {
        this.onNext(this.QuestionList[this.QuestionIndex].record_id);
      }
    }
    console.log(event)
  }

  onSwipeUp(event) {
    console.log(event)
  }

  onSwipeDown(event) {
    console.log(event)
  }

}
