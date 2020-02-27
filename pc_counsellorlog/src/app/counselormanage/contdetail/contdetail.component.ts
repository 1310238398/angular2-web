import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";
import { HttpService } from "../../../http/http.service";
import { ServelUrl } from "../../ServelUrl";
import { DomSanitizer } from "@angular/platform-browser";

declare var qiniu;
declare var $: any

@Component({
  selector: 'app-contdetail',
  templateUrl: './contdetail.component.html',
  styleUrls: ['./contdetail.component.css']
})
export class ContDetailComponent implements OnInit {
  itemObj = {
    LogTitle: '',
    TemplateText: '',
    ReleaseStatus: '0',  //0 未发布 1 已发布
    RecordID: '',
  };
  config: any = {
    width: 750,
    height: 400,
    language: 'zh_CN',
    theme: 'modern',
    // powerpaste advcode toc tinymcespellchecker a11ychecker mediaembed linkchecker help
    plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image imagetools link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists code textcolor wordcount contextmenu colorpicker textpattern',
    toolbar: 'formatselect fontselect fontsizeselect | bold italic strikethrough forecolor backcolor | link code | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent',
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
  fileLoading = false;
  CertifyImgs = [];
  RecordIdArr = [] //存储后台返回的RecordID

  constructor(private DomSanitizer: DomSanitizer, private httpService: HttpService, private router: Router, private route: ActivatedRoute, private msgSrv: NzMessageService) { }

  ngOnInit() {
    this.route.queryParams.forEach((params: Params) => {
      this.itemObj.ReleaseStatus = params['fabStatus'];
      this.itemObj.RecordID = params['RecordID'];
    });

    if (this.itemObj.RecordID == undefined) {
      this.route.params.forEach((params: Params) => {
        this.itemObj.ReleaseStatus = params['fabStatus'];
        this.itemObj.RecordID = params['RecordID'];
      });
    }

    this.loadYearCode();
    this.loadRizhi();
  }
  //加载学年学期
  loadYearCode() {
    this.httpService.POST({
      Router: ServelUrl.Url.schoolcalendarnowyearterm,
      Method: 'POST',
      Body: {
        Date: '',
      }
    }).subscribe(res => {
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
    this.httpService.POST({
      Router: ServelUrl.Url.counsellorlogcontent,
      Method: 'POST',
      Body: {
        RecordID: this.itemObj.RecordID,
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.itemObj = res.Data;
        if (res.Data.ImgURLArr != null) {
          this.CertifyImgs = res.Data.ImgURLArr;
        }
        this.oldTxt = res.Data.TemplateText
        console.log(this.CertifyImgs)
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

    this.httpService.POST({
      Router: ServelUrl.Url.savechangelog,
      Method: 'POST',
      Body: {
        RecordID: this.itemObj.RecordID,
        TemplateText: this.itemObj.TemplateText,
        ImgID: imgStr
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.msgSrv.success('保存成功');
        this.forbbien = true;
        const that = this;
        setTimeout(function () {
          that.router.navigate(['counselormanage']);
        }, 1200);
      }
    })
  }

  //删除日志
  deleteRizhi() {
    this.httpService.POST({
      Router: ServelUrl.Url.deletelog,
      Method: 'POST',
      Body: {
        RecordID: this.itemObj.RecordID,
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.msgSrv.success('删除成功');
        this.forbbien = true;
        const that = this;
        setTimeout(function () {
          that.router.navigate(['counselormanage']);
        }, 1200);
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

    this.httpService.POST({
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
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.msgSrv.success('发布成功');
        this.forbbien = true;
        const that = this;
        setTimeout(function () {
          that.router.navigate(['counselormanage']);
        }, 1200);
      }
    })
  }

  //弹出评级框
  tankbox(obj) {
    this.tabStatus = obj;

    if (obj == '返回' && this.oldTxt != this.itemObj.TemplateText) {
      this.titleTxt = '编辑的内容未保存，确定要退出吗？';
      this.disdden = true;
    } else if (obj == '返回' && this.oldTxt == this.itemObj.TemplateText) {
      this.router.navigate(['counselormanage']);
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
      this.router.navigate(['counselormanage']);
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

  // ==========================七牛上传==================================

  //点击上传
  handleFiles(event) {
    var file = event.target.files[0];

    if(file.type != 'image/jpeg' && file.type != 'image/png'){
      this.msgSrv.warning('请上传JPG或PNG格式图片');
      return false
    }

    if (file.size > 10485760) {
      this.msgSrv.warning('文件大小限制:10M');
      return false
    }

    this.httpService.POST({
      Router: ServelUrl.Url.getUpToken,
      Method: 'POST',
      Body: {
        Name: file.name,
        Size: file.size,
        BizType: "Subsidize"
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.upload({ file: file, key: res.Data.Key, token: res.Data.Proof })
      } else if (res.FeedbackText == '获取上传KEY有误，请稍后重试') {
        this.msgSrv.warning('图片错误,请重新选择其他图片上传');
      } else if (res.FeedbackCode == 97) {
        this.msgSrv.warning('图片错误,请重新选择其他图片上传');
      } else {
        this.msgSrv.warning(res.FeedbackText);
      }

    })
  }

  //发送后台
  upload(obj) {
    this.fileLoading = true;
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
        that.fileLoading = false;
        that.httpService.POST({
          Router: ServelUrl.Url.saveattach, Method: 'POST', Body: {
            BizType: 'StudentNeedSupport',
            AttachmentItemName: file.name || '',
            AttachmentItemType: file.type,
            AttachmentItemSize: file.size.toString(),
            AttachmentURL: res.key,
            Base64: '',
          }
        }).subscribe(response => {
          if (!response.FeedbackCode) {
            that.RecordIdArr.push(response.Data.RecordID);
            that.CertifyImgs.push({
              ImgOneID: response.Data.RecordID,
              AttachmentURL: window.URL.createObjectURL(file),
              AttachmentItemSize: file.size.toString(),
              AttachmentItemType: file.type,
              AttachmentItemName: file.name,
            });

            // var _input = $('.hiddenFile');
            // _input.val('');

          } else {
            that.msgSrv.warning(response.FeedbackText);
          }
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

  //点击查看大图
  viewBigImg() {
    $('#jq22').viewer();
  }




}
