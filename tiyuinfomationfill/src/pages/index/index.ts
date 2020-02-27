import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DomSanitizer } from "@angular/platform-browser";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";
import { HelpUtils } from "../../app/utils/HelpUtils";
import { AppService } from "../../app/app.service";

declare var qiniu;
declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html'
})
export class IndexPage {

  megoDis = true; //蒙层显示与隐藏
  fileLoading;
  forbidBt = false; //
  changeBtn = true;
    indexSize;

  objTitle = [];  //监护人称谓
  BeliefArr = [];  //宗教信仰
  Headimgurl = '';  //  头像链接
  flow_code = '';    //工作流流程ID
  record_id = '';    //工作流record_id
    StudentInfo = {};  //个人信息
    clothsizes = [];
    shoesizes = [];
  TaskTime = this.nowDay();
  dataObj = {
    status: '1',  //审批状态 1审批中 2已通过  3不通过
    remarktxt: '',  //不通过原因
  }

  FamilyAddress = {
      AttachmentCode: '',  //上传图片的AttachmentCode
      image: '',  //  头像代码
      qq: '',   //  QQ
      email: '',     //  邮箱
      wechat: '',    // 微信
      hobby: '',     // 爱好特长
      StudentAreaName: '',   //家庭地址
      familyaddress: '',   //家庭地址代码
      detailaddress: '',   //详细地址
      postalcode: '',   //邮编
      homephone: '',   //家庭电话
      height: '',    //身高
      weight: "",//体重
      clothsize:'',
      shoesize:'',
      faith: '',   //宗教信仰
      bank: '',   //开户行
      bankcard: '',   //银行卡号
      offersrange: '',    //优惠区间
      firstguardianname: '',   //监护人一姓名
      firstguardiantitle: '',   //监护人一称谓代码
      firstguardianemployer: '',   //监护人一工作单位
      firstguardianposition: '',   //监护人一职务
      firstguardiancontact: '',   //监护人一联系方式
      secondguardianname: '',   //监护人二姓名
      secondguardiantitle: '',   //监护人二称谓代码
      secondguardianemployer: '',   //监护人二工作单位
      secondguardianposition: '',   //监护人二职务
      secondguardiancontact: '',   //监护人二联系方式
  };

  //所有存在三种情况  '' 不存在 1必选 0非必选
  fieldRequird = {
    image: '',  //  头像代码
    qq: '',   //  QQ
    email: '',     //  邮箱
    wechat: '',    // 微信
    hobby: '',     // 爱好特长
    StudentAreaName: '',   //家庭地址
    familyaddress: '',   //家庭地址代码
    detailaddress: '',   //详细地址
    postalcode: '',   //邮编
    homephone: '',   //家庭电话
      height:'',
      weight:'',
      clothsize:'',
      shoesize:"",
    faith: '',   //宗教信仰
    bank: '',   //开户行
    bankcard: '',   //银行卡号
    offersrange: '',    //优惠区间
    firstguardianname: '',   //监护人一姓名
    firstguardiantitle: '',   //监护人一称谓代码
    firstguardianemployer: '',   //监护人一工作单位
    firstguardianposition: '',   //监护人一职务
    firstguardiancontact: '',   //监护人二联系方式
    secondguardianname: '',   //监护人二姓名
    secondguardiantitle: '',   //监护人二称谓代码
    secondguardianemployer: '',   //监护人二工作单位
    secondguardianposition: '',   //监护人二职务
    secondguardiancontact: ''   //监护人二联系方式
  };

  constructor(private navCtrl: NavController, private http: HttpService, private DomSanitizer: DomSanitizer, private HelpUtils: HelpUtils, public navParams: NavParams, private appService: AppService) { }

  ionViewWillEnter() {
    antlinker.configTitleButton({
      showClose: true,
      type: "label",
      text: "",
      success: function () { },
      fail: function () { },
      trigger: function () { }
    });

    let tankIdStr = sessionStorage.getItem('FamilyAddress');
    if (tankIdStr != null) {
      this.FamilyAddress = JSON.parse(tankIdStr);
      this.getImgPath();  //获取头像
    }

    this.loadGetLevelList();  //获取监护人称谓
      this.queryclothsize();
      this.queryshoesize();
    this.loadStudentInfo();   //获取本人基本信息
    //this.getCreedlist();      //获取宗教信仰
    this.getFlowBand();       //获取版本流程
    this.getFormfieldlist();  //该显示的表单字段
  }
  //初始化加载
  ionViewDidEnter() {

    if (this.appService.getCurrentProvince() != undefined && this.appService.getCurrentCity() != undefined && this.appService.getCurrentCounty() != undefined) {
      this.FamilyAddress.StudentAreaName = this.appService.getCurrentProvince().GeographyName
        + this.appService.getCurrentCity().GeographyName + this.appService.getCurrentCounty().GeographyName;
      if (this.appService.getCurrentCounty() != undefined) {

        if (this.FamilyAddress.StudentAreaName == '香港特别行政区无无') {
          this.FamilyAddress.familyaddress = '810000';
          this.FamilyAddress.StudentAreaName = this.FamilyAddress.StudentAreaName.substr(0, this.FamilyAddress.StudentAreaName.length - 2);
        } else if (this.FamilyAddress.StudentAreaName == '澳门特别行政区无无') {
          this.FamilyAddress.familyaddress = '820000';
          this.FamilyAddress.StudentAreaName = this.FamilyAddress.StudentAreaName.substr(0, this.FamilyAddress.StudentAreaName.length - 2);
        } else if (this.FamilyAddress.StudentAreaName == '台湾省无无') {
          this.FamilyAddress.familyaddress = '710000';
          this.FamilyAddress.StudentAreaName = this.FamilyAddress.StudentAreaName.substr(0, this.FamilyAddress.StudentAreaName.length - 2);
        } else {
          this.FamilyAddress.familyaddress = JSON.parse(this.appService.getCurrentCounty().GeographyCode).toString();
        }
      } else {
        this.FamilyAddress.familyaddress = JSON.parse(this.FamilyAddress.familyaddress).toString();
      }
    }
  }

  //进入申请模块页
  NavigationToApplyList() {
    this.navCtrl.push('ApplyListPage');
  }

  //获取流程版本
  getFlowBand() {
    this.http.postFLOW({
      Router: ServelUrl.Url.flowflows,
      Method: 'GET',
      Body: {
        type_code: 'XSXXTB'
      }
    }).then(res => {
      if (res.length > 0) {
        this.flow_code = res[0].code;
        this.record_id = res[0].record_id;
        this.loadIndexJson();
      }
    },
      err => console.log(err)
    );
  }

  //进入页面获取数据
  loadIndexJson() {
    this.http.postFLOW({
      Router: ServelUrl.Url.flowslaunch,
      Method: 'GET',
      Body: {
        type_code: 'XSXXTB',
        flow_code: this.flow_code,
        count: 20,
        last_id: 0
      }
    }).then(
      res => {
        if (res.length > 0) {
          this.FamilyAddress = JSON.parse(res[0].input_data);
          this.dataObj = JSON.parse(res[0].input_data);
          this.getImgPath(); //获取头像
          this.forbidBt = true;

          let tankIdStr = sessionStorage.getItem('FamilyAddress');
          if (tankIdStr != null) {
            this.FamilyAddress = JSON.parse(tankIdStr);
            this.getImgPath();  //获取头像
          }

          let changeBtnStatus = sessionStorage.getItem('changeBtnStatus');
          if (changeBtnStatus != null) {
            this.forbidBt = false
          } else {
            this.forbidBt = true
          }

          if (this.appService.getCurrentProvince() != undefined && this.appService.getCurrentCity() != undefined && this.appService.getCurrentCounty() != undefined) {
            this.FamilyAddress.StudentAreaName = this.appService.getCurrentProvince().GeographyName
              + this.appService.getCurrentCity().GeographyName + this.appService.getCurrentCounty().GeographyName;
            if (this.appService.getCurrentCounty() != undefined) {

              if (this.FamilyAddress.StudentAreaName == '香港特别行政区无无') {
                this.FamilyAddress.familyaddress = '810000';
                this.FamilyAddress.StudentAreaName = this.FamilyAddress.StudentAreaName.substr(0, this.FamilyAddress.StudentAreaName.length - 2);
              } else if (this.FamilyAddress.StudentAreaName == '澳门特别行政区无无') {
                this.FamilyAddress.familyaddress = '820000';
                this.FamilyAddress.StudentAreaName = this.FamilyAddress.StudentAreaName.substr(0, this.FamilyAddress.StudentAreaName.length - 2);
              } else if (this.FamilyAddress.StudentAreaName == '台湾省无无') {
                this.FamilyAddress.familyaddress = '710000';
                this.FamilyAddress.StudentAreaName = this.FamilyAddress.StudentAreaName.substr(0, this.FamilyAddress.StudentAreaName.length - 2);
              } else {
                this.FamilyAddress.familyaddress = JSON.parse(this.appService.getCurrentCounty().GeographyCode).toString();
              }
            } else {
              this.FamilyAddress.familyaddress = JSON.parse(this.FamilyAddress.familyaddress).toString();
            }
          }
        }
      },
      err => console.log(err)
    );
  }

  //总提交
  tabSubmit() {

    if (!this.FamilyAddress.image) {
      this.HelpUtils.toastPop('请上传本人照片');
      return false
    }

    if (!this.FamilyAddress.qq.trim()) {
      this.HelpUtils.toastPop('请填写QQ号！');
      return;
    }
    if (!this.FamilyAddress.email.trim()) {
      this.HelpUtils.toastPop('请填写邮箱！');
      return;
    }
    var myreegs = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/;
    if (this.FamilyAddress.email.trim() != '') {
      if (!myreegs.test(this.FamilyAddress.email)) {
        this.HelpUtils.toastPop('请填写正确格式的邮箱！');
        return;
      }
    }

    if (!this.FamilyAddress.wechat.trim()) {
      this.HelpUtils.toastPop('请填写微信号！');
      return;
    }

    if (!this.FamilyAddress.hobby.trim()) {
      this.HelpUtils.toastPop('请填写爱好特长！');
      return;
    }

    if (!this.FamilyAddress.StudentAreaName.trim()) {
      this.HelpUtils.toastPop('请填写家庭地址！');
      return;
    }
    if (!this.FamilyAddress.height.trim()) {
      this.HelpUtils.toastPop('请填写身高！');
      return;
    }
    if (!this.FamilyAddress.weight.trim()) {
      this.HelpUtils.toastPop('请填写体重！');
      return;
    }
    if (!this.FamilyAddress.clothsize.trim()) {
      this.HelpUtils.toastPop('请填写尺码！');
      return;
    }
    if (!this.FamilyAddress.shoesize.trim()) {
      this.HelpUtils.toastPop('请填写鞋码！');
      return;
    }

    if (!this.FamilyAddress.detailaddress.trim()) {
      this.HelpUtils.toastPop('请填写详细地址！');
      return;
    }

    if (!this.FamilyAddress.firstguardianname.trim()) {
      this.HelpUtils.toastPop('请填写监护人一姓名！');
      return;
    }

    if (!this.FamilyAddress.firstguardiantitle) {
      this.HelpUtils.toastPop('请选择监护人一称谓！');
      return;
    }

    if (!this.FamilyAddress.firstguardianemployer.trim()) {
      this.HelpUtils.toastPop('请填写监护人一工作单位！');
      return;
    }

    if (!this.FamilyAddress.firstguardianposition.trim()) {
      this.HelpUtils.toastPop('请填写监护人一职务！');
      return;
    }

    if (!this.FamilyAddress.firstguardiancontact.trim()) {
      this.HelpUtils.toastPop('请填写监护人一联系方式！');
      return;
    }

    var formData = {
      action: "studentApply",
      code: this.flow_code,
      record_id: this.record_id,
      title: '新生信息填报',
      timestart: this.TaskTime,
      statustxt: '辅导员审批进行中',
      remarktxt: '', //不通过原因
      status: '1',
    }

    this.FamilyAddress['action'] = 'studentApply';
    this.FamilyAddress['timestart'] = this.TaskTime;
    this.FamilyAddress['statustxt'] = '辅导员审批进行中';
    this.FamilyAddress['remarktxt'] = '';
    this.FamilyAddress['status'] = '1';

    var assignObj = Object.assign(formData, this.FamilyAddress);
    var originObj = Object.assign(assignObj, this.StudentInfo);

    console.log(originObj, '1111111111111111')

    this.http.postFLOW({
      Router: ServelUrl.Url.launch,
      Method: 'POST',
      Body: {
        flow_id: '',
        flow_code: this.flow_code,
        form_data: JSON.stringify(originObj)
      }
    }).then(res => {
      if (res == 'ok') {
        sessionStorage.clear()
        this.HelpUtils.toastPop('提交成功');
        this.forbidBt = true;

        setTimeout(function () {
          antlinker.closeView({
            success: function () {
            },
            fail: function () {
            }
          });
        }, '1000');

      } else {
        console.log(res)
      }
    },
      err => console.log(err)
    );
  }

  //获取该显示的表单字段接口
  getFormfieldlist() {
    this.http.postJSON({
      Router: ServelUrl.Url.getformfieldlist,
      Method: 'GET',
      Body: {
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.megoDis = false;
        var dataArr = res.Data.Items;
        for (let i = 0; i < dataArr.length; i++) {
          //qq号是否需要
          if (dataArr[i].field == 'qq' && dataArr[i].required == 'Required') {
            this.fieldRequird.qq = '1'
          } else if (dataArr[i].field == 'qq' && dataArr[i].required == 'NotRequired') {
            this.fieldRequird.qq = '0'
          }
          //email是否需要
          if (dataArr[i].field == 'email' && dataArr[i].required == 'Required') {
            this.fieldRequird.email = '1'
          } else if (dataArr[i].field == 'email' && dataArr[i].required == 'NotRequired') {
            this.fieldRequird.email = '0'
          }
          //微信是否需要
          if (dataArr[i].field == 'wechat' && dataArr[i].required == 'Required') {
            this.fieldRequird.wechat = '1'
          } else if (dataArr[i].field == 'wechat' && dataArr[i].required == 'NotRequired') {
            this.fieldRequird.wechat = '0'
          }
          //hobby是否需要
          if (dataArr[i].field == 'hobby' && dataArr[i].required == 'Required') {
            this.fieldRequird.hobby = '1'
          } else if (dataArr[i].field == 'hobby' && dataArr[i].required == 'NotRequired') {
            this.fieldRequird.hobby = '0'
          }
          //身高是否需要
          if (dataArr[i].field == 'height' && dataArr[i].required == 'Required') {
            this.fieldRequird.height = '1'
          } else if (dataArr[i].field == 'height' && dataArr[i].required == 'NotRequired') {
            this.fieldRequird.height = '0'
          }
          //体重是否需要
          if (dataArr[i].field == 'weight' && dataArr[i].required == 'Required') {
            this.fieldRequird.weight = '1'
          } else if (dataArr[i].field == 'weight' && dataArr[i].required == 'NotRequired') {
            this.fieldRequird.weight = '0'
          }
          //尺码是否需要
          if (dataArr[i].field == 'clothsize' && dataArr[i].required == 'Required') {
            this.fieldRequird.clothsize = '1'
          } else if (dataArr[i].field == 'clothsize' && dataArr[i].required == 'NotRequired') {
            this.fieldRequird.clothsize = '0'
          }
          //鞋码是否需要
          if (dataArr[i].field == 'shoesize' && dataArr[i].required == 'Required') {
            this.fieldRequird.shoesize = '1'
          } else if (dataArr[i].field == 'shoesize' && dataArr[i].required == 'NotRequired') {
            this.fieldRequird.shoesize = '0'
          }
          //familyaddress是否需要
          if (dataArr[i].field == 'familyaddress' && dataArr[i].required == 'Required') {
            this.fieldRequird.StudentAreaName = '1'
          } else if (dataArr[i].field == 'familyaddress' && dataArr[i].required == 'NotRequired') {
            this.fieldRequird.StudentAreaName = '0'
          }
          //detailAddress是否需要
          if (dataArr[i].field == 'detailaddress' && dataArr[i].required == 'Required') {
            this.fieldRequird.detailaddress = '1'
          } else if (dataArr[i].field == 'detailaddress' && dataArr[i].required == 'NotRequired') {
            this.fieldRequird.detailaddress = '0'
          }
          //postalcode是否需要
          if (dataArr[i].field == 'postalcode' && dataArr[i].required == 'Required') {
            this.fieldRequird.postalcode = '1'
          } else if (dataArr[i].field == 'postalcode' && dataArr[i].required == 'NotRequired') {
            this.fieldRequird.postalcode = '0'
          }
          //homephone是否需要
          if (dataArr[i].field == 'homephone' && dataArr[i].required == 'Required') {
            this.fieldRequird.homephone = '1'
          } else if (dataArr[i].field == 'homephone' && dataArr[i].required == 'NotRequired') {
            this.fieldRequird.homephone = '0'
          }
          //faith是否需要
          if (dataArr[i].field == 'faith' && dataArr[i].required == 'Required') {
            this.fieldRequird.faith = '1'
          } else if (dataArr[i].field == 'faith' && dataArr[i].required == 'NotRequired') {
            this.fieldRequird.faith = '0'
          }
          //bank是否需要
          if (dataArr[i].field == 'bank' && dataArr[i].required == 'Required') {
            this.fieldRequird.bank = '1'
          } else if (dataArr[i].field == 'bank' && dataArr[i].required == 'NotRequired') {
            this.fieldRequird.bank = '0'
          }
          //bankcard是否需要
          if (dataArr[i].field == 'bankcard' && dataArr[i].required == 'Required') {
            this.fieldRequird.bankcard = '1'
          } else if (dataArr[i].field == 'bankcard' && dataArr[i].required == 'NotRequired') {
            this.fieldRequird.bankcard = '0'
          }
          //offersrange是否需要
          if (dataArr[i].field == 'offersrange' && dataArr[i].required == 'Required') {
            this.fieldRequird.offersrange = '1'
          } else if (dataArr[i].field == 'offersrange' && dataArr[i].required == 'NotRequired') {
            this.fieldRequird.offersrange = '0'
          }
          //firstguardianname是否需要
          if (dataArr[i].field == 'firstguardianname' && dataArr[i].required == 'Required') {
            this.fieldRequird.firstguardianname = '1'
          } else if (dataArr[i].field == 'firstguardianname' && dataArr[i].required == 'NotRequired') {
            this.fieldRequird.firstguardianname = '0'
          }
          //firstguardiantitle是否需要
          if (dataArr[i].field == 'firstguardiantitle' && dataArr[i].required == 'Required') {
            this.fieldRequird.firstguardiantitle = '1'
          } else if (dataArr[i].field == 'firstguardiantitle' && dataArr[i].required == 'NotRequired') {
            this.fieldRequird.firstguardiantitle = '0'
          }
          //firstguardianemployer是否需要
          if (dataArr[i].field == 'firstguardianemployer' && dataArr[i].required == 'Required') {
            this.fieldRequird.firstguardianemployer = '1'
          } else if (dataArr[i].field == 'firstguardianemployer' && dataArr[i].required == 'NotRequired') {
            this.fieldRequird.firstguardianemployer = '0'
          }
          //firstguardianposition是否需要
          if (dataArr[i].field == 'firstguardianposition' && dataArr[i].required == 'Required') {
            this.fieldRequird.firstguardianposition = '1'
          } else if (dataArr[i].field == 'firstguardianposition' && dataArr[i].required == 'NotRequired') {
            this.fieldRequird.firstguardianposition = '0'
          }
          //firstguardiancontact是否需要
          if (dataArr[i].field == 'firstguardiancontact' && dataArr[i].required == 'Required') {
            this.fieldRequird.firstguardiancontact = '1'
          } else if (dataArr[i].field == 'firstguardiancontact' && dataArr[i].required == 'NotRequired') {
            this.fieldRequird.firstguardiancontact = '0'
          }

          //secondguardianname是否需要
          if (dataArr[i].field == 'secondguardianname' && dataArr[i].required == 'Required') {
            this.fieldRequird.secondguardianname = '1'
          } else if (dataArr[i].field == 'secondguardianname' && dataArr[i].required == 'NotRequired') {
            this.fieldRequird.secondguardianname = '0'
          }
          //secondguardiantitle是否需要
          if (dataArr[i].field == 'secondguardiantitle' && dataArr[i].required == 'Required') {
            this.fieldRequird.secondguardiantitle = '1'
          } else if (dataArr[i].field == 'secondguardiantitle' && dataArr[i].required == 'NotRequired') {
            this.fieldRequird.secondguardiantitle = '0'
          }
          //secondguardianemployer是否需要
          if (dataArr[i].field == 'secondguardianemployer' && dataArr[i].required == 'Required') {
            this.fieldRequird.secondguardianemployer = '1'
          } else if (dataArr[i].field == 'secondguardianemployer' && dataArr[i].required == 'NotRequired') {
            this.fieldRequird.secondguardianemployer = '0'
          }
          //secondguardianposition是否需要
          if (dataArr[i].field == 'secondguardianposition' && dataArr[i].required == 'Required') {
            this.fieldRequird.secondguardianposition = '1'
          } else if (dataArr[i].field == 'secondguardianposition' && dataArr[i].required == 'NotRequired') {
            this.fieldRequird.secondguardianposition = '0'
          }
          //secondguardiancontact是否需要
          if (dataArr[i].field == 'secondguardiancontact' && dataArr[i].required == 'Required') {
            this.fieldRequird.secondguardiancontact = '1'
          } else if (dataArr[i].field == 'secondguardiancontact' && dataArr[i].required == 'NotRequired') {
            this.fieldRequird.secondguardiancontact = '0'
          }

        }
      } else {
        this.HelpUtils.toastPop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }
  //获取监护人称谓
  loadGetLevelList() {
    this.http.postJSON({
      Router: ServelUrl.Url.bankyquery,
      Method: 'POST',
      Body: {
        CodeType: "MemberType"
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.objTitle = res.Data;
      } else {
        this.HelpUtils.toastPop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }
  //获取衣服
    queryclothsize() {
    this.http.postJSON({
      Router: 'api/newstudentinfo/queryclothsize',
      Method: 'POST',
      Body: {
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.clothsizes = res.Data;
      } else {
        this.HelpUtils.toastPop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }
    //获取衣服
    queryshoesize() {
        this.http.postJSON({
            Router: 'api/newstudentinfo/queryshoesize',
            Method: 'POST',
            Body: {
            }
        }).then(res => {
                if (!res.FeedbackCode) {
                    this.shoesizes = res.Data;
                } else {
                    this.HelpUtils.toastPop(res.FeedbackText);
                }
            },
            err => console.log(err)
        );
    }
  //获取头像
  getImgPath() {
    this.http.postJSON({
      Router: ServelUrl.Url.GetAvatarAddress,
      Method: 'POST',
      Body: {
        avatar: this.FamilyAddress.image
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Headimgurl = res.Data.url;
      } else {
        this.HelpUtils.toastPop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }
  //获取宗教信仰
  getCreedlist() {
    this.http.postJSON({
      Router: ServelUrl.Url.getcreedlist,
      Method: 'GET',
      Body: {
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.BeliefArr = res.Data.Items;
      } else {
        this.HelpUtils.toastPop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }
  //获取家庭地址
  navGetAdd() {
    this.appService.setCurrentParentPage('IndexPage');
    this.navCtrl.push('ProvincePage');
  }

  //获取个人信息
  loadStudentInfo() {
    this.http.postJSON({
      Router: ServelUrl.Url.GetStudentInfo,
      Method: 'POST',
      Body: {
        uid: '',
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.StudentInfo = res.Data
      } else {
        this.HelpUtils.toastPop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }

  //失去焦点储存以填入文本
  blurInput() {
    sessionStorage.setItem('FamilyAddress', JSON.stringify(this.FamilyAddress));
  }

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
      next(res) { },
      error(err) {
        that.HelpUtils.toastPop(err.message);
        return false
        // ...
      },
      complete(res) {
        var file = obj.file;
        that.fileLoading.dismiss();

        that.http.postJSON({
          Router: ServelUrl.Url.saveAttach, Method: 'POST', Body: {
            BizType: 'StudentNeedSupport',
            AttachmentItemName: file.name || '',
            AttachmentItemType: file.type,
            AttachmentItemSize: file.size.toString(),
            AttachmentURL: res.key,
            Base64: '',
          }
        }).then(response => {
          if (!response.FeedbackCode) {

            that.FamilyAddress.image = response.Data.RecordID
            that.Headimgurl = window.URL.createObjectURL(file)

          } else {
            that.HelpUtils.toastPop(response.FeedbackText);
          }
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
        this.FamilyAddress.AttachmentCode = res.Data.AttachmentCode;
        this.upload({ file: file, key: res.Data.Key, token: res.Data.Proof })
      } else if (res.FeedbackText == '获取上传KEY有误，请稍后重试') {
        this.HelpUtils.toastPop('图片错误,请重新选择其他图片上传');
      } else {
        this.HelpUtils.toastPop(res.FeedbackText);
      }
    })
  }
    onSelect(ev){
      console.log(ev);
      this.clothsizes.forEach(item=>{
          if(item.CodeName==ev){
              this.indexSize=item.remark1||"";
          }
      })
    }
  changeStatus() {
    this.forbidBt = false; //可以修改
    this.changeBtn = false;
    sessionStorage.setItem('changeBtnStatus', JSON.stringify('1'));
  }

  //删除附件
  deleteCertify(event, index) {
    this.FamilyAddress.image = ''
    this.Headimgurl = ''
    event.stopPropagation();
  }

  //离开页面事件
  ionViewWillLeave() {
    var event = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
    var d = document.querySelector('ion-backdrop');
    if (d) {
      d.dispatchEvent(event)
    }
  }

  //获取当前时间
  nowDay() {
    const Dates = new Date();
    const year: number = Dates.getFullYear();
    const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
    const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    return year + '-' + month + '-' + day
  }

}
