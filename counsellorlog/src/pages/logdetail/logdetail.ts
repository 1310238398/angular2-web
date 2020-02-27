import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../../http/http.Service";
import { ServelUrl } from "../../app/ServelUrl";
import { HelpUtils } from "../../app/utils/HelpUtils";
import { DomSanitizer } from "@angular/platform-browser";

declare var $: any;
declare var antlinker;
declare var qiniu;

@IonicPage()
@Component({
  selector: 'logdetail',
  templateUrl: 'logdetail.html',
})
export class LogDetailPage {
  //别的页面传入数据
  contInfo = {
    LogTitle: "",
    InsertDatetime: "",
    PublishDatetime: "",
    RecordID: '',
    RecordType: "",
    ReleaseStatus: "",
  }
  //接口获取数据
  itemObj = {
    LogTitle: '',
    TemplateText: '',
    ReleaseStatus: '',  //0 未发布 1 已发布
    RecordID: '',
  };
  //富文本编辑器配置
  config: any = {
    height: 400,
    language: 'zh_CN',
    theme: 'modern',
    plugins: 'image table imagetools link media template codesample charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists code textcolor wordcount contextmenu colorpicker textpattern',
    toolbar: 'fontsizeselect | bold italic forecolor backcolor | alignleft aligncenter',
    image_advtab: true,
    imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
    templates: [
      { title: '模板', content: '校园集结号' },
    ]
  };

  disdden = false;

  titleTxt = ''; //当前弹出的提示文字
  tabStatus = '';//当前弹出按钮的状态

  yearTerm = {
    AcademicYearCode: '',
    AcademicTermCode: '',
    AcademicYear: '',
    AcademicTerm: '',
    Weeks: '',
  }

  oldTxt = '';
  forbbien = false;

  //七牛上传
  fileLoading;
  CertifyImgs = [];
  RecordIdArr = [] //存储后台返回的RecordID

  constructor(private DomSanitizer: DomSanitizer, private http: HttpService, public navCtrl: NavController, public navParams: NavParams, private HelpUtils: HelpUtils) { }

  ionViewWillEnter() {
    antlinker.configTitleButton({
      showClose: true,
      type: "label",
      text: "",
      success: function () { },
      fail: function () { },
      trigger: function () { }
    });
    this.contInfo = this.navParams.get('contInfo');
  }

  ionViewDidEnter() {
    this.loadYearCode();
    this.loadRizhi();
  }

  //加载学年学期
  loadYearCode() {
    this.http.postJSON({
      Router: ServelUrl.Url.schoolcalendarnowyearterm,
      Method: 'POST',
      Body: {
        Date: '',
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.yearTerm.AcademicYearCode = res.Data.AcademicYearCode,
          this.yearTerm.AcademicTermCode = res.Data.AcademicTermCode,
          this.yearTerm.AcademicYear = res.Data.AcademicYear,
          this.yearTerm.AcademicTerm = res.Data.AcademicTerm,
          this.yearTerm.Weeks = res.Data.Weeks
      }
    })
  }

  //进入页面  加载数据
  loadRizhi() {
    this.http.postJSON({
      Router: ServelUrl.Url.counsellorlogcontent,
      Method: 'POST',
      Body: {
        RecordID: this.contInfo.RecordID,
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.itemObj = res.Data;
        if (res.Data.ImgURLArr != null) {
          this.CertifyImgs = res.Data.ImgURLArr;
        }
        this.oldTxt = res.Data.TemplateText;
      }
    })
  }

  //保存日志
  saveRizhi() {

    var imgArr = []
    for (let i = 0; i < this.CertifyImgs.length; i++) {
      imgArr.push(this.CertifyImgs[i]['ImgOneID'])
    }

    var imgStr = imgArr.join(",");
    var reg = /,$/gi;
    imgStr = imgStr.replace(reg, "");

    this.http.postJSON({
      Router: ServelUrl.Url.savechangelog,
      Method: 'POST',
      Body: {
        RecordID: this.itemObj.RecordID,
        TemplateText: this.itemObj.TemplateText,
        ImgID: imgStr
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.HelpUtils.toastPopTop('保存成功')
        this.forbbien = true;
        const that = this;
        setTimeout(function () {
          that.navCtrl.push('IndexPage');
        }, '1200');
      }
    })
  }

  //删除日志
  deleteRizhi() {
    this.http.postJSON({
      Router: ServelUrl.Url.deletelog,
      Method: 'POST',
      Body: {
        RecordID: this.itemObj.RecordID,
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.HelpUtils.toastPopTop('删除成功');
        this.forbbien = true;
        const that = this;
        setTimeout(function () {
          that.navCtrl.push('IndexPage');
        }, '1200');
      }
    })
  }

  //发布日志
  publishRizhi() {

    var imgArr = []
    for (let i = 0; i < this.CertifyImgs.length; i++) {
      imgArr.push(this.CertifyImgs[i]['ImgOneID'])
    }

    var imgStr = imgArr.join(",");
    var reg = /,$/gi;
    imgStr = imgStr.replace(reg, "");

    this.http.postJSON({
      Router: ServelUrl.Url.publishlog,
      Method: 'POST',
      Body: {
        RecordID: this.itemObj.RecordID,
        TemplateText: this.itemObj.TemplateText,
        AcademicYearCode: this.yearTerm.AcademicYearCode,
        AcademicTermCode: this.yearTerm.AcademicTermCode,
        WeekTime: this.yearTerm.Weeks,
        ImgID: imgStr
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.HelpUtils.toastPopTop('发布成功');
        this.forbbien = true;
        const that = this;
        setTimeout(function () {
          that.navCtrl.push('IndexPage');
        }, '1200');
      }
    })
  }

  //弹出提示框
  tankbox(obj) {
    this.tabStatus = obj;
    if (obj == '返回' && this.oldTxt != this.itemObj.TemplateText) {
      this.titleTxt = '编辑的内容未保存，确定要退出吗？';
      this.disdden = true;
    } else if (obj == '返回' && this.oldTxt == this.itemObj.TemplateText) {
      this.navCtrl.push('IndexPage');
    }

    if (obj == '发布') {
      this.titleTxt = '确定要发布吗？（请避免在寒/暑假发布）';
      this.disdden = true;
    }

    if (obj == '删除') {
      this.titleTxt = '确定要删除吗？';
      this.disdden = true;
    }
  }

  //点击弹出框的确定按钮
  onPass() {
    if (this.tabStatus == '返回') {
      this.navCtrl.push('IndexPage');
    }

    if (this.tabStatus == '发布') {
      this.publishRizhi()
    }

    if (this.tabStatus == '删除') {
      this.deleteRizhi()
    }
  }

  //关闭提示框
  overbox() {
    this.disdden = false;
  }

  //返回上一页
  returnPage() {
    window.history.back()
  }

  //离开页面
  ionViewWillLeave() {
    var event = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
    $('.mce-arrow-up').hide();
    this.fileLoading.dismiss();
  }

  // ===================七牛上传======================

  //点击上传
  handleFiles(event) {
    var file = event.target.files[0];

    if(file.type != 'image/jpeg' && file.type != 'image/png'){
      this.HelpUtils.toastPopTop('请上传JPG或PNG格式图片');
      return false
    }

    if (file.size > 10485760) {
      this.HelpUtils.toastPopTop('文件大小限制:10M');
      return false
    }
    this.http.postJSON({
      Router: ServelUrl.Url.getUpToken,
      Method: 'POST',
      Body: {
        Name: file.name,
        Size: file.size,
        BizType: "Subsidize"
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.upload({ file: file, key: res.Data.Key, token: res.Data.Proof })
      } else if (res.FeedbackText == '获取上传KEY有误，请稍后重试') {
        this.HelpUtils.toastPopTop('图片错误,请重新选择其他图片上传');
      } else if (res.FeedbackCode == 97) {
        this.HelpUtils.toastPopTop('图片错误,请重新选择其他图片上传');
      } else {
        console.log(res.FeedbackText);
      }
    })
  }

  //发送后台
  upload(obj) {
    this.fileLoading = this.HelpUtils.loadingPop('正在上传，请稍等...');
    var that = this;
    var observable = qiniu.upload(obj.file, obj.key, obj.token, {
      mimeType: ["image/png", "image/jpeg", "image/jpg"]
    }, {
        useCdnDomain: true
      });
    var observer = {
      next(res) {
      },
      error(err) {
      },
      complete(res) {
        var file = obj.file;
        that.fileLoading.dismiss();
        that.http.postJSON({
          Router: ServelUrl.Url.saveattach, Method: 'POST', Body: {
            BizType: 'StudentNeedSupport',
            AttachmentItemName: file.name || '',
            AttachmentItemType: file.type,
            AttachmentItemSize: file.size.toString(),
            AttachmentURL: res.key,
            Base64: '',
          }
        }).then(response => {
          if (!response.FeedbackCode) {

            that.RecordIdArr.push(response.Data.RecordID);
            that.CertifyImgs.push({
              ImgOneID: response.Data.RecordID,
              AttachmentURL: window.URL.createObjectURL(file),
              AttachmentItemSize: file.size.toString(),
              AttachmentItemType: file.type,
              AttachmentItemName: file.name,
            });

            console.log(that.CertifyImgs)
          } else {
            console.log(response.FeedbackText);
          }
          console.log(res);
        })
      }
    };
    var subscription = observable.subscribe(observer); // 上传开始
  }

  //删除附件
  deleteCertify(event, index) {
    this.CertifyImgs.splice(index, 1);
    this.RecordIdArr.splice(index, 1);
    event.stopPropagation();
  }

  //跳转图片放大
  navPreview(params) {
    this.navCtrl.push('PreviewPage', params)
  }



}
