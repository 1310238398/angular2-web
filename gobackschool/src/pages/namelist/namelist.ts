import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { DomSanitizer } from "@angular/platform-browser";
import { HttpService } from "../../http/http.Service";
import { ServelUrl } from "../../app/ServelUrl";
import { HelpUtils } from "../../app/utils/HelpUtils";

declare var qiniu;
declare var antlinker;

@IonicPage()
@Component({
  selector: 'namelist',
  templateUrl: 'namelist.html',
})
export class NameListPage {

  dataSet = [];
  isvilible = '';    //是否显示 已到 未到
  totalNum = 0;     //班级应到人数
  trueNum = 0;      //实到人数
  leaveNum = 0;     //未到人数
  notRoll = 0;      //未统计

  isDeName = true;     //是否在点名时间内  true  在时间内
  taskID = '';
  taskstartTime = '';
  sscBox = false;   //蒙层
  mengGo = true;    //加载动画

  classcode = '';  //班级Code
  NowIntelUserCode = '';  //当前选中的IntelUserCode

  banBT = false;
  // ============未到原因填写模块文件==========
  inputBoxShow = false;
  noBackName = ''
  fileLoading;
  CertifyImgs = [];
  RecordIdArr = [] //存储后台返回的RecordID
  reasonNot = '';
  filetext = '';

  reasonObj = [];
  values = 18;
  // =============END===========

  constructor(public navParams: NavParams, private http: HttpService, private HelpUtils: HelpUtils, public navCtrl: NavController, private DomSanitizer: DomSanitizer) { }
  //初始化加载
  ionViewWillEnter() {
    antlinker.configTitleButton({
      type: 'close',
      text: '关闭',
      fail: function () { },
      success: function () { },
      trigger: function () {
      }
    });
    this.classcode = JSON.parse(sessionStorage.getItem('classcode'));
  }

  ionViewDidEnter() {
    this.loadTitleTime();
    this.loadStatus();

  }

  //获取未到原因关键字
  loadStatus() {
    this.http.postJSON({
      Router: ServelUrl.Url.getreturnstatuskey,
      Method: 'GET',
      Body: {
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.reasonObj = res.data.items
        for (let i = 0; i < this.reasonObj.length; i++) {
          this.reasonObj[i]['checked'] = false;
        }
      }
    },
      err => console.log(err));
  }

  //获取抬头以及任务时间
  loadTitleTime() {
    this.http.postJSON({
      Router: ServelUrl.Url.getclassclocknums,
      Method: 'POST',
      Body: {
        class: this.classcode
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.totalNum = parseInt(res.data.total);
        this.trueNum = parseInt(res.data.back);
        this.leaveNum = parseInt(res.data.noback);
        this.taskID = res.data.taskid;
        this.taskstartTime = res.data.startdate;
        this.notRoll = parseInt(res.data.total) - parseInt(res.data.back) - parseInt(res.data.noback)

        var timestamp = new Date().getTime();

        if (res.data.enddate) {
          if (timestamp > parseInt(res.data.startdate) * 1000 && timestamp < parseInt(res.data.enddate) * 1000) {
            this.isDeName = true;
            this.loadNameOver();  //获取点名列表
          } else {
            this.isDeName = false;
          }
        } else {
          this.isDeName = false;
        }
      }
    },
      err => console.log(err));
  }

  //获取点名列表
  loadNameOver() {
    this.http.postJSON({
      Router: ServelUrl.Url.getclassclock,
      Method: 'POST',
      Body: {
        class: this.classcode,
        task: this.taskID,
        starttime: this.taskstartTime
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.mengGo = false;
        this.dataSet = res.data.items;
      }
    },
      err => console.log(err));
  }

  //出现弹框
  tabBox(obj) {
    if (this.isDeName) {
      this.isvilible = obj;
    }
  }

  //一键全部返校
  allBack() {
    this.dataSet.forEach(element => {
      element.status = '1';
    });

    this.trueNum = this.totalNum;   //实到人数
    this.leaveNum = 0;  //未到人数
    this.notRoll = 0;  //未设置
  }

  //提交 
  submitInfo() {
    var dataArr = []; //传向后台的数据

    for (let i = 0; i < this.dataSet.length; i++) {
      if (this.dataSet[i].status == '1') {
        var dataObj = {}
        dataObj['code'] = this.dataSet[i].code;
        dataObj['status'] = this.dataSet[i].status;
        dataObj['returnstatuskey'] = '';
        dataObj['reason'] = '';
        dataObj['image'] = '';
        dataObj['taskid'] = this.dataSet[i].taskid;
        dataArr.push(dataObj);
      } else if (this.dataSet[i].status == '2') {
        var imgStr = [];
        for (let j = 0; j < this.dataSet[i].image.length; j++) {
          imgStr.push(this.dataSet[i].image[j].RecordID)
        }
        var dataObj = {}
        dataObj['code'] = this.dataSet[i].code;
        dataObj['status'] = this.dataSet[i].status;
        dataObj['returnstatuskey'] = this.dataSet[i].reasonstatus;
        dataObj['reason'] = this.dataSet[i].reason;
        dataObj['image'] = imgStr.join(",");
        dataObj['taskid'] = this.dataSet[i].taskid;
        dataArr.push(dataObj);
      }
    }

    if (!dataArr.length) {
      this.HelpUtils.toastPopTop('请先点名后提交');
    }

    this.http.postJSON({
      Router: ServelUrl.Url.postclassclock,
      Method: 'POST',
      Body: {
        items: dataArr
      }
    }).then(data => {
      if (!data.FeedbackCode) {
        this.HelpUtils.toastPopTop('提交完成');
        this.banBT = true;
        setTimeout(function () {
          antlinker.closeView({
            success: function () { },
            fail: function () { }
          });
        }, 1200);

      }
    },
      err => console.log(err));
  }

  //选择已到校
  changeStatusOver(obj1) {
    var shidaoMen = 0;
    var weidaoMen = 0;
    for (let i = 0; i < this.dataSet.length; i++) {
      if (this.dataSet[i].code == obj1) {
        this.dataSet[i].status = '1';
        this.sscBox = false;
        this.isvilible = '';
      }

      if (this.dataSet[i].status == '1') {
        shidaoMen++
      }

      if (this.dataSet[i].status == '2') {
        weidaoMen++
      }

      this.trueNum = shidaoMen;   //实到人数
      this.leaveNum = weidaoMen;  //未到人数
      this.notRoll = this.totalNum - this.trueNum - this.leaveNum  //未设置
    }
  }

  //选择未到校
  changeStatusNot(obj1, obj2) {
    this.isvilible = '';
    this.reasonNot = '';
    this.reasonObj.forEach(element => {
      element.checked = false;
    });

    for (let i = 0; i < this.dataSet.length; i++) {
      if (this.dataSet[i].code == obj1) {
        this.NowIntelUserCode = obj1;
        this.noBackName = obj2
        this.sscBox = true;
        this.inputBoxShow = true;
        this.reasonNot = this.dataSet[i].reasonstatus;

        this.reasonObj.forEach(element => {
          if (this.dataSet[i].reasonstatus == element.Code) {
            element.checked = true;
          }
        });

        this.filetext = this.dataSet[i].reason;
        this.CertifyImgs = this.dataSet[i].image;

      }
    }
  }

  //未到原因保存
  tabAlert() {
    var shidaoMen = 0;
    var weidaoMen = 0;

    if (this.reasonNot == '') {
      this.HelpUtils.toastPopTop('请选择原因');
      return false
    }

    if (this.filetext.trim() == '') {
      this.HelpUtils.toastPopTop('请输入未到详情');
      return false
    }

    for (let i = 0; i < this.dataSet.length; i++) {
      if (this.NowIntelUserCode == this.dataSet[i].code) {
        this.dataSet[i].status = '2';
        this.dataSet[i].reasonstatus = this.reasonNot;
        this.dataSet[i].reason = this.filetext;
        this.dataSet[i].image = this.CertifyImgs
      }
      if (this.dataSet[i].status == '1') {
        shidaoMen++
      }
      if (this.dataSet[i].status == '2') {
        weidaoMen++
      }
    }
    this.trueNum = shidaoMen;   //实到人数
    this.leaveNum = weidaoMen;  //未到人数
    this.notRoll = this.totalNum - this.trueNum - this.leaveNum  //未设置

    const that = this;
    setTimeout(function () {
      that.isvilible = '';
      that.sscBox = false;
      that.inputBoxShow = false;
      that.CertifyImgs = [];
      that.RecordIdArr = [];
      that.reasonNot = ''
      that.filetext = '';
      that.values = 18;
    }, 600);
  }

  //选择未到关键字
  checkWhyBtn(obj) {
    this.reasonNot = '';
    this.reasonObj.forEach(element => {
      element.checked = false;
      if (element.Code == obj) {
        element.checked = true;
        this.reasonNot = element.Code;
      }
    });
  }

  //点击返回  关闭弹框
  closeTabBox() {
    this.isvilible = '';
    this.sscBox = false;
    this.inputBoxShow = false;
    this.CertifyImgs = [];
    this.RecordIdArr = [];
    this.reasonNot = '';
    this.filetext = '';
    this.values = 18;
  }

  //备注框字数变化
  txtChange(value: string) {
    var valueTxt = value.trim();
    this.values = 18 - valueTxt.length;
  }

  // ==========================未到原因填写模块文件==============================

  //======七牛上传

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
        console.log(res)
        // ...
      },
      error(err) {
        that.HelpUtils.toastPop(err.message);
        return false
        // ...
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
              RecordID: response.Data.RecordID,
              Caption: '',	//字符串	说明
              AttachmentURL: window.URL.createObjectURL(file),
              AttachmentItemSize: file.size.toString(),
              AttachmentItemType: file.type,
              AttachmentItemName: file.name,
            });

          } else {
            that.HelpUtils.toastPop(response.FeedbackText);
          }
          console.log(res);
        })
      }
    };
    var subscription = observable.subscribe(observer); // 上传开始
  }

  handleFiles(event) {
    var file = event.target.files[0];

    if (file.size > 5242880) {
      this.HelpUtils.toastPop('文件大小限制:5M');
      return
    }
    if (file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/jpg') {
      this.HelpUtils.toastPop('格式错误,请选择"png,jpeg,jpg"格式文件上传');
      return
    }
    this.http.postJSON({
      Router: ServelUrl.Url.getUpToken,
      Method: 'POST',
      Body: {
        Name: file.name,
        Size: file.size,
        BizType: "SchoolApply"
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.upload({ file: file, key: res.Data.Key, token: res.Data.Proof })
      } else if (res.FeedbackText == '获取上传KEY有误，请稍后重试') {
        this.HelpUtils.toastPopTop('图片错误,请重新选择其他图片上传');
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    })
  }

  //删除附件
  deleteCertify(event, index) {
    this.CertifyImgs.splice(index, 1);
    this.RecordIdArr.splice(index, 1);
    event.stopPropagation();
  }

  //返回主菜单

  backSource() {
    antlinker.closeView({
      success: function () {
      },
      fail: function () {
      }
    });
  }





}
