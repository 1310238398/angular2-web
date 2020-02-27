import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, LoadingController, Navbar, NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../../http/http.Service";
import { ServelUrl } from "../../app/ServelUrl";
import { QuestionServiceProvider } from "../../providers/question-service/question-service";
import { DomSanitizer } from "@angular/platform-browser";
import { HelpUtils } from "../../app/utils/HelpUtils";
import { HomePage } from "../home/home";
import * as qiniu from 'qiniu-js'

declare var antlinker;
declare var $;

/**
 * Generated class for the QuestionPage page.
 *
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'question/:record_id',
  defaultHistory: ['HomePage'],
  priority: 'high'
})
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',

})
export class QuestionPage implements AfterViewInit {
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild("b_button", { read: ElementRef }) browse_button: ElementRef;

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
    option_id: '',
    text_result: '',
    attachs: []
  };

  constructor(private DomSanitizer: DomSanitizer, private HelpUtils: HelpUtils, private loadingCtrl: LoadingController, public questionService: QuestionServiceProvider, private http: HttpService, public navCtrl: NavController, public navParams: NavParams) {
    this.record_id = this.navParams.get('record_id');
    this.WenjuanName = this.questionService.getWenjuanName();
    this.QuestionList = this.questionService.getQuestionList();
    this.QuestionIndex = this.questionService.getQuestIndex();
    /*
    * 单选或者多选时处理checked
    * */
    /*  if (this.QuestionList[this.QuestionIndex].type == 1) {
        this.QuestionList[this.QuestionIndex].options.forEach(item => {
          item.checked = false;
        })
      }*/
    console.log('全部问卷:', this.QuestionList);
    console.log('当前位置', this.QuestionIndex);
    console.log(this.QuestionList[this.QuestionIndex]);
    this.http.postJSON({
      Router: '/api/questionnaire/getoption',
      Method: 'POST',
      Body: {
        topic_id: this.QuestionList[this.QuestionIndex].record_id,
        bu_type: "wenjuan",
        bu_id: ""
      }
    }).then(res => {
      console.log(res);
      this.answer = res.Data || {};
      const question = this.QuestionList[this.QuestionIndex];

      //单选或者多选
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
      /**
       * 附件
       */
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
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

  /**
   * 删除附件
   * @param event
   * @param index
   */
  deleteCertify(event, index) {
    console.log(event);
    this.CertifyImgs.splice(index, 1);
    event.stopPropagation();

  }

  /*  async ionViewCanLeave(): Promise<boolean> {
      try {
        await  this.HelpUtils.presentAlert({
          title: '提示',
          enableBackdropDismiss: true,
          subTitle:'确定要离开么?',
          buttons: [
            {
              text: '取消', role: 'cancel'
            },
            {
              text: '确定', handler: () => {
                this.navCtrl.push('HomePage',{code:123456});
                return true;
              }
            }
          ]
        });
      } catch (err) {
        console.log('ionViewCanLeave HomePage', false);

        return false;
      }
    }*/
  ngAfterViewInit() {
    console.log(this.browse_button.nativeElement.class);
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
    this.navCtrl.push('PreviewPage', params)
  }

  /*
  * 七牛初始化
  * */

  /*initQiniu() {
    this.uploader = Qiniu.uploader({
      runtimes: 'html5,flash,html4',
      browse_button: this.browse_button.nativeElement,
      domain: 'http://qiniu-plupload.qiniudn.com/',
      uptoken_func: (file) => {    // 在需要获取uptoken时，该方法会被调用
        console.log('uptoken_func' + file.size);
        var uptoken = '';
        var nativeFile = file.getNative();
        /!*  for (; nativeFile.size<=0;){
            console.log('图片还未生成！')
          }*!/
        this.http.postXhr({
          Router: ServelUrl.Url.getUpToken,
          Method: 'POST',
          Body: {
            Name: file.name,
            Size: file.size,
            BizType: "Subsidize"
          }
        }, (value) => {
          if (value.Data && value.Data.Proof) {
            this.Certify.AttachmentKey = value.Data.Key || "";
            this.Certify.AttachmentCode = value.Data.AttachmentCode || "";
            uptoken = `${value.Data.Proof}`;
          }
        });
        console.log(uptoken);
        return uptoken
      },
      filters: {
        max_file_size: '5mb',
        prevent_duplicates: false,
        mime_types: [
          {title: "Image files", extensions: "jpg,jpeg,gif,png"}, // 限定jpg,gif,png后缀上传
        ]
      },
      save_key: false,
      disable_statistics_report: true,
      unique_names: false,
      get_new_uptoken: true,
      max_file_size: '5mb',
      max_retries: 4,
      log_level: 5,
      flash_swf_url: 'assets/lib/Moxie.swf',
      multi_selection: false,
      dragdrop: false,
      chunk_size: '4mb',
      auto_start: true,
      /!*  resize: {
          quality: 30
        },*!/
      init: {
        'Key': (up, file) => {
          console.log('Key' + file.size);
          return this.Certify.AttachmentKey || ''

        },
        'FilesAdded': (up, files) => {
          /!*   var fsize = 0;
             for (; !files[0].getNative().size || files[0].getNative().size > fsize;) {
               console.log('图片还未生成！' + files[0].getNative().size);
               fsize = files[0].getNative().size;
               for (var i = 0; i < 100; i++) {
                 console.log('图片还未生成！')
               }
             }*!/
          console.log('FilesAdded' + files[0].getNative().size);
          // this.CertifyImgs = [];
          //选择文件后进行操作
          if (this.CertifyImgs.length >= 9) {
            up.removeFile(files[0]);
            this.HelpUtils.alert('材料最多可选择九张');
          } else {
            this.fileLoading = this.loadingCtrl.create({
              content: '正在上传，请稍等...'
            });
            this.fileLoading.present();
          }

        },
        'BeforeUpload': (up, file) => {
          //上传之前可能的操作
          console.log('BeforeUpload' + file.size);
        },
        'UploadProgress': function (up, file) {
        },
        'FileUploaded': (up, file, info) => {
          var obj = Object.assign(
            {
              url: window.URL.createObjectURL(file.getNative()),
              name: file.name,
              path: JSON.parse(info.response).key,
              ext: this.getFileExtension(file.name),
              size: file.size
            },
            this.Certify);
          console.log(obj);
          this.CertifyImgs.push(obj);
        },
        'UploadComplete': () => {
          this.fileLoading.dismiss();
        },
        'Error': (up, err, errTip) => {
          //如果报错可能的操作
          up.removeFile(err.file);
          switch (err.code) {
            case -600:
              this.HelpUtils.toastPop('上传文件超出大小限制！');
              break;
            case -601:
              this.HelpUtils.toastPop('文件扩展名不正确！');
              break;
            case 401:
              this.HelpUtils.toastPop('认证授权失败！');
              break;
            case 404:
              this.HelpUtils.toastPop('资源不存在！');
              break;
            default:
              this.HelpUtils.toastPop(`${err.status}:${err.response}`);
          }

        }
      }
    })
  }*/
  upload(obj) {
    this.fileLoading = this.HelpUtils.loadingPop('正在上传，请稍等...');
    console.log('file:', obj);
    var that = this;
    var observable = qiniu.upload(obj.file, obj.key, obj.token, {
      mimeType: ["image/png", "image/jpeg", "image/jpg", "image/gif"]

    }, {
        useCdnDomain: true
      });
    var observer = {
      next(res) {
        console.log(res)
        // ...
      },
      error(err) {
        that.HelpUtils.toastPop(err.message);
        console.log(err)
        // ...
      },
      complete(res) {
        var file = obj.file;
        that.fileLoading.dismiss();
        console.log('obj.file', file);
        that.http.postJSON({
          Router: ServelUrl.Url.saveAttach, Method: 'POST', Body: {
            BizType: 'QuestionWenjuan',
            AttachmentItemName: file.name || '',
            AttachmentItemType: file.type,
            AttachmentItemSize: file.size.toString(),
            AttachmentURL: res.key
          }
        }).then(response => {
          if (response.Data.RecordID) {
            that.CertifyImgs.push({
              RecordID: response.Data.RecordID,
              url: window.URL.createObjectURL(file),
              path: res.key,
              name: file.name || '',
              ext: file.type,
              size: file.size.toString(),
            });
          }
          console.log(res);
        })
      }
    };
    var subscription = observable.subscribe(observer); // 上传开始
  }

  handleFiles(event) {
    console.log(event);
    var file = event.target.files[0];
    if (file.size > 5242880) {
      this.HelpUtils.toastPop('文件大小限制:5M');
      return
    }
    this.http.postJSON({
      Router: ServelUrl.Url.getUpToken,
      Method: 'POST',
      Body: {
        Name: file.name,
        Size: file.size,
        BizType: "wenjuan"
      }
    }).then(res => {
      console.log(res);
      this.upload({ file: file, key: res.Data.Key, token: res.Data.Proof })

    })
  }

  /*
  * 单选题控制只能单选
  * */
  updateRadio(question, record_id) {
    var options = question.options;

    if (question.type == 1) {
      console.log('type:1', question);
      for (let item of question.options) {
        if (item.record_id != record_id) {
          console.log('type:1', item);
          item.checked = false;
        }
      }
      /* options.forEach(item => {
         if (item.record_id != record_id) {
           console.log('type:1', item);
           item.check = false;
         }
       })*/
    }
  }

  /*
  * 上一题
  * */
  onPrivious(question) {
    if (this.navCtrl.canGoBack()) {
      if (this.QuestionIndex != 0) {
        this.questionService.reduceQuestionIndex();
      }
      this.navCtrl.push('QuestionPage', { record_id: question.record_id }).then(res => {
      })
    }
  }

  deal(question): boolean {
    var submitOption = {
      topic_id: question.record_id,
      option_result: '',
      text_result: '',
      option_id: '',
      bu_type: "wenjuan",
      bu_id: "",
      attachs: []
    };
    /*
    * 单选多选处理
    * */
    if (question.type == 1 || question.type == 2) {
      var flag = question.options.some(item => item.checked);
      console.log(flag);
      if (!flag) {
        this.HelpUtils.toastPop('答案不能空!');
        return false;
      }
      var tempArr = [];
      question.options.forEach(item => {
        if (item.checked) {
          if (item.is_other == 1) {
            submitOption.text_result = this.otherTextArea || ''
          }
          tempArr.push(item.record_id);
        }
      });
      submitOption.option_id = tempArr.join();
      submitOption.option_result = tempArr.join();
    }
    /*
    * 文本题处理
    * */
    if (question.type == 3) {
      if (!this.textArea.trim()) {
        this.HelpUtils.toastPop('请填写内容!');
        return false;
      }
      submitOption.text_result = this.textArea || '';
      console.log('文本题：', this.textArea);
    }
    /*
    * 打分题
    * */
    if (question.type == 4) {
      if (!this.score) {
        this.HelpUtils.toastPop('请打分!');
        return false;
      }
      submitOption.option_result = this.score || "";
      submitOption.text_result = this.otherTextArea || ''
      console.log('打分：', this.score);
    }
    /*
 * 量表题
 * */
    if (question.type == 5) {
      if (!this.rate) {
        this.HelpUtils.toastPop('请选择!');
        return false;
      }
      submitOption.option_result = this.rate.toString() || "";
      console.log('星星：', this.rate);
    }
    /*
    * 附件处理
    * */
    if (question.is_attach == 1) {
      submitOption.attachs = this.CertifyImgs || [];
      /* if(!this.rate){
         this.HelpUtils.toastPop('请选择!');
         return;
       }*/
    }
    console.log('最终数据：', submitOption);
    this.http.postJSON({
      Router: ServelUrl.Url.submitoption, Method: 'POST',
      Body: submitOption
    }).then(res => {
      if (!res.FeedbackCode) {
        if (res.Data) {
        }
      }
    });
    return true
  }

  /*
  * 下一题
  * */
  onNext(question) {
    var flag = this.deal(question);
    if (flag) {
      this.questionService.addQuestionIndex();
      this.navCtrl.push('QuestionPage', { record_id: question.record_id }).then(res => {
      })
    }

  }

  completion() {
    this.http.postJSON({
      Router: ServelUrl.Url.completion, Method: 'POST',
      Body: {
        Type: localStorage.getItem('wCode') || "",
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        var wCode = localStorage.getItem('wCode');
        if (wCode == 'antlinker-jjdc' || wCode == 'antlinker-xszp' || wCode == 'antlinker-xzpy') {
       /*   antlinker.openNewView({
            uri: 'ant://h5app/open?URL=poolstudents/index.html&tipe=1',
            fail: function () {
            }
          });*/
          location.replace('/poolstudents/index.html?tipe=1');
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
    });
  }

  submitcompletion() {
    this.http.postJSON({
      Router: ServelUrl.Url.submitcompletion, Method: 'POST',
      Body: {
        questionnaire_id: localStorage.getItem('questionnaire_id'),
        bu_type: 'wenjuan',
        bu_id: ''
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.completion();
      }
    })
  }

  onFinish(question) {
    const flag = this.deal(question);
    if (flag) {
      this.submitcompletion();
    }
    /*this.navCtrl.setRoot('HomePage', {code: this.questionService.getCode()}).then(res => {
    })*/
  }

  onModelChange(event) {
    console.log(event)

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
