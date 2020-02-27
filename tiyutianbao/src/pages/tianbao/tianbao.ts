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
  selector: 'page-tianbao',
  templateUrl: 'tianbao.html'
})
export class TianbaoPage {

  subStop = false;
  megoDis = true; //蒙层显示与隐藏
  fileLoading;
  forbidBt = false; //
  changeBtn = true;
  indexSize;
  page = {
    pageIndex: 1,
    PageSize: 100
  };

  objTitle = [];  //监护人称谓
  BeliefArr = [];  //宗教信仰
  Headimgurl = '';  //  头像链接
  flow_code = '';    //工作流流程ID
  record_id = '';    //工作流record_id
  StudentInfo = {};  //个人信息
  sexy = [];  //性别
  Nationality = [];  //民族
  Major = [];  //专业
  Academy = []; //院系
  Class = [];  //班级
  PoliticalFace = [];  //政治面貌
  shoesizes = [];
  TaskTime = this.nowDay();
  dataObj = {
    status: '1',  //审批状态 1审批中 2已通过  3不通过
    remarktxt: '',  //不通过原因
  }

  FamilyAddress = {
    UserCode: '', //  学号
    CandidateCode: '', //  考生号
    Name: '', //  姓名
    Sex: '', //  性别
    Nationality: '', //  民族
    IdentityNum: '', //  身份证号
    Education: '', //  学历
    Major: '', //  专业
    TrainingMethod: '', //  培养方式
    SourceLocation: '', //  生源所在地
    SourceLocationCode: '', //  生源所在地代码
    SchoolSystem: '', //  学制
    Minor: '', //  辅修专业
    Birthday: '', //  出生日期
    Bachelor: '', //  学位
    MajorForeignLanguage: '', //  主学外语语种
    ForeignLanguageLevel: '', //  外语水平
    ComputerLevel: '', //  计算机水平
    AdmissionTime: '', //  入学年份
    GraduationTime: '', //  毕业时间
    CommissioningUnit: '', //  委培定向单位
    CommissioningLocation: '', //  委培单位所在地
    UniversityCode: '', //  学校
    AdmissionMethod: '', //  入学方式
    Academy: '', //  院系
    Class: '', //  班级
    Extension1: '', //  扩展项1
    HouseholdRegistration: '', //  户籍性质
    ProfessionalQualification: '', //  职业资格
    PoliticalFace: '', //  政治面貌
    Extension2: '', //  扩展项2
    Extension3: '', //  扩展项3
    Extension4: '', //  扩展项4
    Extension5: '', //  扩展项5
    Extension6: '', //  扩展项6
    Remarks: '', //  备注
    ResidentAddress: '', //  常住详细地址
    HouseholdCity: '', //  现户籍所在地市区县
    HouseholdCityCode: '', //现户籍所在地市区县代码
    HouseholdCountry: '', //  现户籍所在地乡镇街道办事处
    HouseholdCountryCode: '', //  现户籍所在地乡镇街道办事处代码
    HouseholdDescription: '', //  现户籍所在地乡镇街道办事处描述
    HouseholdHouseNumber: '', //  现户籍所在地详细（街道门牌号）
    HouseholdRegistrationDate: '', //  户籍登记日期
    Phone: '', //  家庭常用联系电话
    ProfessionalDirection: '', //  专业方向
    WeChat: '', //  常用微信号
    Status: 0
  };

  //通用省市县代码
  Code;
  CodeName;
  Type;
  constructor(private navCtrl: NavController, private http: HttpService, private DomSanitizer: DomSanitizer, private HelpUtils: HelpUtils, public navParams: NavParams, private appService: AppService) {
    this.Type = this.navParams.get('Type');

  }

  ionViewWillEnter() {
    antlinker.configTitleButton({
      showClose: true,
      type: "label",
      text: "",
      success: function () { },
      fail: function () { },
      trigger: function () { }
    });

    // let tankIdStr = sessionStorage.getItem('FamilyAddress');
    let tankIdStr = sessionStorage.getItem('FamilyAddress');
    if (tankIdStr != null) {
      this.FamilyAddress = JSON.parse(tankIdStr);
    }

    this.getsex();
    this.getNationality();
    this.getMajor();
    this.getAcademy();
    this.getClass();
    this.getPoliticalFace();
    this.humansocietyown();
    // this.UploadAwardAidFile();
  }

  //初始化加载
  ionViewDidEnter() {

    if (this.Type == 'HouseholdCountry') {
      if (this.appService.getCurrentProvince() != undefined && this.appService.getCurrentCity() != undefined && this.appService.getCurrentCounty() != undefined
        && this.appService.getCurrentStreet().GeographyName != '无' && this.appService.getCurrentRegion().GeographyName != '无') {
        console.log(7777);
        // this.CodeName = this.appService.getCurrentProvince().GeographyName
        //   + this.appService.getCurrentCity().GeographyName + this.appService.getCurrentCounty().GeographyName
        //   + this.appService.getCurrentStreet().GeographyName + this.appService.getCurrentRegion().GeographyName;
        this.CodeName = this.appService.getCurrentRegion().GeographyName;
        this.Code = JSON.parse(this.appService.getCurrentRegion().GeographyCode).toString();
        // location.href = "#HouseholdCountry";
        // setTimeout(()=>{
        document.querySelector("#HouseholdCountry").scrollIntoView();
        // },1000);
        // if (this.appService.getCurrentCounty() != undefined) {
        //   if (this.CodeName == '香港特别行政区无无') {
        //     this.Code = '810000000000';
        //     this.CodeName = this.CodeName.substr(0, this.CodeName.length - 2);
        //   } else if (this.CodeName == '澳门特别行政区无无') {
        //     this.Code = '820000000000';
        //     this.CodeName = this.CodeName.substr(0, this.CodeName.length - 2);
        //   } else if (this.CodeName == '台湾省无无') {
        //     this.Code = '710000000000';
        //     this.CodeName = this.CodeName.substr(0, this.CodeName.length - 2);
        //   } else {
        //     this.Code = JSON.parse(this.appService.getCurrentRegion().GeographyCode).toString();
        //   }
        // } else {
        //   this.Code = JSON.parse(this.Code).toString();
        // }
      } else if (this.appService.getCurrentProvince() != undefined && this.appService.getCurrentCity() != undefined && this.appService.getCurrentCounty() != undefined
        && this.appService.getCurrentStreet().GeographyName != '无') {
        console.log(88888);
        document.querySelector("#HouseholdCountry").scrollIntoView();
        this.CodeName = this.appService.getCurrentStreet().GeographyName;
        this.Code = JSON.parse(this.appService.getCurrentStreet().GeographyCode).toString();
      } else {
        console.log(99999);
        document.querySelector("#HouseholdCountry").scrollIntoView();
        this.CodeName = this.appService.getCurrentCounty().GeographyName;
        this.Code = JSON.parse(this.appService.getCurrentCounty().GeographyCode).toString();
      }

    } else {

      if (this.appService.getCurrentProvince() != undefined && this.appService.getCurrentCity().GeographyName != '无' && this.appService.getCurrentCounty().GeographyName != '无') {
        if (this.Type == 'HouseholdCity') {
          document.querySelector("#HouseholdCity").scrollIntoView();
        }
        this.CodeName = this.appService.getCurrentCounty().GeographyName;
        this.Code = JSON.parse(this.appService.getCurrentCounty().GeographyCode).toString();
        //   if (this.appService.getCurrentCounty() != undefined) {

        //     if (this.CodeName == '香港特别行政区无无') {
        //       this.Code = '810000';
        //       this.CodeName = this.CodeName.substr(0, this.CodeName.length - 2);
        //     } else if (this.CodeName == '澳门特别行政区无无') {
        //       this.Code = '820000';
        //       this.CodeName = this.CodeName.substr(0, this.CodeName.length - 2);
        //     } else if (this.CodeName == '台湾省无无') {
        //       this.Code = '710000';
        //       this.CodeName = this.CodeName.substr(0, this.CodeName.length - 2);
        //     } else {
        //       this.Code = JSON.parse(this.appService.getCurrentCounty().GeographyCode).toString();
        //     }
        //   } else {
        //     this.Code = JSON.parse(this.Code).toString();
        //   }
        // }
      } else if (this.appService.getCurrentProvince() != undefined && this.appService.getCurrentCity().GeographyName != '无') {
        if (this.Type == 'HouseholdCity') {
          document.querySelector("#HouseholdCity").scrollIntoView();
        }
        this.CodeName = this.appService.getCurrentProvince().GeographyName;
        this.Code = JSON.parse(this.appService.getCurrentProvince().GeographyCode).toString();
      } else if (this.appService.getCurrentProvince() != undefined) {
        if (this.Type == 'HouseholdCity') {
          document.querySelector("#HouseholdCity").scrollIntoView();
        }
        this.CodeName = this.appService.getCurrentProvince().GeographyName;
        this.Code = JSON.parse(this.appService.getCurrentProvince().GeographyCode).toString();

      }
    }

    if (this.Type == 'SourceLocation') {
      this.FamilyAddress.SourceLocationCode = this.Code;
      this.FamilyAddress.SourceLocation = this.CodeName;
      this.sesstionCuta(this.FamilyAddress.SourceLocationCode, this.FamilyAddress.SourceLocation);
    }

    if (this.Type == 'HouseholdCity') {
      this.FamilyAddress.HouseholdCityCode = this.Code;
      this.FamilyAddress.HouseholdCity = this.CodeName;
      this.sesstionCutb(this.FamilyAddress.HouseholdCityCode, this.FamilyAddress.HouseholdCity);
    }

    if (this.Type == 'HouseholdCountry') {
      this.FamilyAddress.HouseholdCountryCode = this.Code;
      this.FamilyAddress.HouseholdCountry = this.CodeName;
      this.sesstionCutc(this.FamilyAddress.HouseholdCountryCode, this.FamilyAddress.HouseholdCountry);
    }
  
    console.log(this.FamilyAddress.SourceLocation,'dd',Boolean(this.FamilyAddress.SourceLocation));
    if (!this.FamilyAddress.SourceLocation) {
      console.log('s888');
      this.FamilyAddress.SourceLocation = sessionStorage.getItem('SourceLocation');
      this.FamilyAddress.SourceLocationCode = sessionStorage.getItem('SourceLocationCode')
    }
    if (!this.FamilyAddress.HouseholdCity) {
      console.log('s777');
      this.FamilyAddress.HouseholdCity = sessionStorage.getItem('HouseholdCity');
      this.FamilyAddress.HouseholdCityCode = sessionStorage.getItem('HouseholdCityCode')
    }

    if (!this.FamilyAddress.HouseholdCountry) {
      console.log('s999');
      this.FamilyAddress.HouseholdCountry = sessionStorage.getItem('HouseholdCountry');
      this.FamilyAddress.HouseholdCountryCode = sessionStorage.getItem('HouseholdCountryCode')
    }

    console.log('tt1',this.FamilyAddress.HouseholdCountryCode);

  }

  //存储缓存
  sesstionCuta(m, n) {
    sessionStorage.setItem('SourceLocationCode', m);
    sessionStorage.setItem('SourceLocation', n);
    console.log(7);
    console.log(sessionStorage.getItem('SourceLocation'));
    console.log(sessionStorage.getItem('SourceLocationCode'));

  }
  sesstionCutb(m, n) {
    sessionStorage.setItem('HouseholdCityCode', m);
    sessionStorage.setItem('HouseholdCity', n);
    console.log(8);
    console.log(sessionStorage.getItem('HouseholdCity'));
    console.log(sessionStorage.getItem('HouseholdCityCode'));

  }
  sesstionCutc(m, n) {
    sessionStorage.setItem('HouseholdCountryCode', m);
    sessionStorage.setItem('HouseholdCountry', n);
    console.log(9);
    console.log(sessionStorage.getItem('HouseholdCountry'));
    console.log(sessionStorage.getItem('HouseholdCountryCode'));

  }



  //进入申请模块页
  // NavigationToApplyList() {
  //   this.navCtrl.push('ApplyListPage');
  // }

  //获取流程版本
  // getFlowBand() {
  //   this.http.postFLOW({
  //     Router: ServelUrl.Url.flowflows,
  //     Method: 'GET',
  //     Body: {
  //       type_code: 'XSXXTB'
  //     }
  //   }).then(res => {
  //     if (res.length > 0) {
  //       this.flow_code = res[0].code;
  //       this.record_id = res[0].record_id;
  //       this.loadIndexJson();
  //     }
  //   },
  //     err => console.log(err)
  //   );
  // }



  UploadAwardAidFile() {
    this.http.postJSON({
      Router: ServelUrl.Url.UploadAwardAidFile,
      Method: 'POST',
      Body: {
      }
    }).then(res => {
      // if (!res.FeedbackCode) {
      // } else {
      // }
    },
      err => console.log(err)
    );

  }
  //进入页面获取数据
  humansocietyown() {
    this.http.postJSON({
      Router: ServelUrl.Url.humansocietyown,
      Method: 'POST',
      Body: {
      }
    }).then(res => {
      if (!res.FeedbackCode && res.Data) {
        this.FamilyAddress = res.Data
        console.log('bb', this.FamilyAddress.HouseholdCountry);
        console.log('tt2',this.FamilyAddress.HouseholdCountryCode);

        console.log('aa', Number(this.FamilyAddress.Status));
        let tankIdStr = sessionStorage.getItem('FamilyAddress');
        if (tankIdStr != null) {
          this.FamilyAddress = JSON.parse(tankIdStr);
          console.log('rr',this.FamilyAddress.HouseholdCountryCode);

        }

        if (this.Type == 'HouseholdCountry') {
          if (this.appService.getCurrentProvince() != undefined && this.appService.getCurrentCity() != undefined && this.appService.getCurrentCounty() != undefined
            && this.appService.getCurrentStreet().GeographyName != '无' && this.appService.getCurrentRegion().GeographyName != '无') {
            console.log(17777);
            this.CodeName = this.appService.getCurrentRegion().GeographyName;
            this.Code = JSON.parse(this.appService.getCurrentRegion().GeographyCode).toString();
            document.querySelector("#HouseholdCountry").scrollIntoView();
            // if (this.appService.getCurrentCounty() != undefined) {
            //   if (this.CodeName == '香港特别行政区无无') {
            //     this.Code = '810000000000';
            //     this.CodeName = this.CodeName.substr(0, this.CodeName.length - 2);
            //   } else if (this.CodeName == '澳门特别行政区无无') {
            //     this.Code = '820000000000';
            //     this.CodeName = this.CodeName.substr(0, this.CodeName.length - 2);
            //   } else if (this.CodeName == '台湾省无无') {
            //     this.Code = '710000000000';
            //     this.CodeName = this.CodeName.substr(0, this.CodeName.length - 2);
            //   } else {
            //     this.Code = JSON.parse(this.appService.getCurrentRegion().GeographyCode).toString();
            //   }
            // } else {
            //   this.Code = JSON.parse(this.Code).toString();
            // }
          } else if (this.appService.getCurrentProvince() != undefined && this.appService.getCurrentCity() != undefined && this.appService.getCurrentCounty() != undefined
            && this.appService.getCurrentStreet().GeographyName != '无') {
            console.log(188888);
            this.CodeName = this.appService.getCurrentStreet().GeographyName;
            this.Code = JSON.parse(this.appService.getCurrentStreet().GeographyCode).toString();
            document.querySelector("#HouseholdCountry").scrollIntoView();

          } else {
            console.log(199999);
            this.CodeName = this.appService.getCurrentCounty().GeographyName;
            this.Code = JSON.parse(this.appService.getCurrentCounty().GeographyCode).toString();
            document.querySelector("#HouseholdCountry").scrollIntoView();

          }

        } else {

          if (this.appService.getCurrentProvince() != undefined && this.appService.getCurrentCity().GeographyName != '无' && this.appService.getCurrentCounty().GeographyName != '无') {
            if (this.Type == 'HouseholdCity') {
              document.querySelector("#HouseholdCity").scrollIntoView();
            }
            this.CodeName = this.appService.getCurrentCounty().GeographyName;
            this.Code = JSON.parse(this.appService.getCurrentCounty().GeographyCode).toString();
            //   if (this.appService.getCurrentCounty() != undefined) {

            //     if (this.CodeName == '香港特别行政区无无') {
            //       this.Code = '810000';
            //       this.CodeName = this.CodeName.substr(0, this.CodeName.length - 2);
            //     } else if (this.CodeName == '澳门特别行政区无无') {
            //       this.Code = '820000';
            //       this.CodeName = this.CodeName.substr(0, this.CodeName.length - 2);
            //     } else if (this.CodeName == '台湾省无无') {
            //       this.Code = '710000';
            //       this.CodeName = this.CodeName.substr(0, this.CodeName.length - 2);
            //     } else {
            //       this.Code = JSON.parse(this.appService.getCurrentCounty().GeographyCode).toString();
            //     }
            //   } else {
            //     this.Code = JSON.parse(this.Code).toString();
            //   }
            // }
          } else if (this.appService.getCurrentProvince() != undefined && this.appService.getCurrentCity().GeographyName != '无') {
            if (this.Type == 'HouseholdCity') {
              document.querySelector("#HouseholdCity").scrollIntoView();
            }
            this.CodeName = this.appService.getCurrentProvince().GeographyName;
            this.Code = JSON.parse(this.appService.getCurrentProvince().GeographyCode).toString();
          } else if (this.appService.getCurrentProvince() != undefined) {
            if (this.Type == 'HouseholdCity') {
              document.querySelector("#HouseholdCity").scrollIntoView();
            }
            this.CodeName = this.appService.getCurrentProvince().GeographyName;
            this.Code = JSON.parse(this.appService.getCurrentProvince().GeographyCode).toString();

          }
        }
        if (this.Type == 'SourceLocation') {
          this.FamilyAddress.SourceLocationCode = this.Code;
          this.FamilyAddress.SourceLocation = this.CodeName;
          this.sesstionCuta(this.FamilyAddress.SourceLocationCode, this.FamilyAddress.SourceLocation);
        }

        if (this.Type == 'HouseholdCity') {
          this.FamilyAddress.HouseholdCityCode = this.Code;
          this.FamilyAddress.HouseholdCity = this.CodeName;
          this.sesstionCutb(this.FamilyAddress.HouseholdCityCode, this.FamilyAddress.HouseholdCity);
        }

        if (this.Type == 'HouseholdCountry') {
          this.FamilyAddress.HouseholdCountryCode = this.Code;
          this.FamilyAddress.HouseholdCountry = this.CodeName;
          this.sesstionCutc(this.FamilyAddress.HouseholdCountryCode, this.FamilyAddress.HouseholdCountry);
        }

        if (!this.FamilyAddress.SourceLocation) {
          this.FamilyAddress.SourceLocation = sessionStorage.getItem('SourceLocation');
          this.FamilyAddress.SourceLocationCode = sessionStorage.getItem('SourceLocationCode')
        }
        if (!this.FamilyAddress.HouseholdCity) {
          this.FamilyAddress.HouseholdCity = sessionStorage.getItem('HouseholdCity');
          this.FamilyAddress.HouseholdCityCode = sessionStorage.getItem('HouseholdCityCode')
        }

        if (!this.FamilyAddress.HouseholdCountry) {
          this.FamilyAddress.HouseholdCountry = sessionStorage.getItem('HouseholdCountry');
          this.FamilyAddress.HouseholdCountryCode = sessionStorage.getItem('HouseholdCountryCode')
        }


      } else {
        this.FamilyAddress.Status = 2;
        console.log('再次登录获取数据失败' + res.FeedbackText)
        // this.HelpUtils.toastPop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );

  }

  //总提交
  tabSubmit() {
    // if (!this.FamilyAddress.email.trim()) {
    //   this.HelpUtils.toastPop('请填写邮箱！');
    //   return;
    // }
    // var myreegs = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/;
    // if (this.FamilyAddress.email.trim() != '') {
    //   if (!myreegs.test(this.FamilyAddress.email)) {
    //     this.HelpUtils.toastPop('请填写正确格式的邮箱！');
    //     return;
    //   }
    // }

    if (!this.FamilyAddress.UserCode.trim()) {
      this.HelpUtils.toastPop('请填写学号！');
      return;
    }
    if (!this.FamilyAddress.CandidateCode.trim()) {
      this.HelpUtils.toastPop('请填写考生号！');
      return;
    }
    if (!this.FamilyAddress.Name.trim()) {
      this.HelpUtils.toastPop('请填写姓名！');
      return;
    }
    if (!this.FamilyAddress.Sex.trim()) {
      this.HelpUtils.toastPop('请填写性别！');
      return;
    }
    if (!this.FamilyAddress.Nationality.trim()) {
      this.HelpUtils.toastPop('请填写民族！');
      return;
    }
    if (!this.FamilyAddress.IdentityNum.trim()) {
      this.HelpUtils.toastPop('请填写身份证号！');
      return;
    }
    var myreegs = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d|x|X)$/;
    if (this.FamilyAddress.IdentityNum !== "") {
      if (!myreegs.test(this.FamilyAddress.IdentityNum)) {
        this.HelpUtils.toastPop('请填写正确的身份证号！');
        return;
      }

    }

    if (!this.FamilyAddress.Education.trim()) {
      this.HelpUtils.toastPop('请填写学历！');
      return;
    }
    if (!this.FamilyAddress.Major.trim()) {
      this.HelpUtils.toastPop('请填写专业！');
      return;
    }
    console.log(this.FamilyAddress.Major);
    if (!this.FamilyAddress.TrainingMethod.trim()) {
      this.HelpUtils.toastPop('请填写培养方式！');
      return;
    }
    console.log(this.FamilyAddress.SourceLocation);
    if (!this.FamilyAddress.SourceLocation) {
      this.HelpUtils.toastPop('请填写生源所在地！');
      return;
    }
    if (!this.FamilyAddress.SchoolSystem.trim()) {
      this.HelpUtils.toastPop('请填写学制！');
      return;
    }
    if (!this.FamilyAddress.Birthday.trim()) {
      this.HelpUtils.toastPop('请填写出生日期！');
      return;
    }
    if (!this.FamilyAddress.AdmissionTime.trim()) {
      this.HelpUtils.toastPop('请填写入学年份！');
      return;
    }
    this.FamilyAddress.AdmissionTime = this.FamilyAddress.AdmissionTime + '-01';
    if (!this.FamilyAddress.UniversityCode.trim()) {
      this.HelpUtils.toastPop('请填写学校！');
      return;
    }
    if (!this.FamilyAddress.Academy.trim()) {
      this.HelpUtils.toastPop('请填写院系！');
      return;
    }
    if (!this.FamilyAddress.Class.trim()) {
      this.HelpUtils.toastPop('请填写班级！');
      return;
    }
    if (!this.FamilyAddress.PoliticalFace.trim()) {
      this.HelpUtils.toastPop('请填写政治面貌！');
      return;
    }
    // if (!this.FamilyAddress.Extension3.trim()) {
    //   this.HelpUtils.toastPop('请填写扩展项3！');
    //   return;
    // }
    // if (!this.FamilyAddress.Extension4.trim()) {
    //   this.HelpUtils.toastPop('请填写扩展项4！');
    //   return;
    // }
    if (!this.FamilyAddress.ResidentAddress.trim()) {
      this.HelpUtils.toastPop('请填写常住详细地址！');
      return;
    }
    if (!this.FamilyAddress.HouseholdCity) {
      this.HelpUtils.toastPop('请填写现户籍所在地市区县！');
      return;
    }
    if (!this.FamilyAddress.HouseholdCountry) {
      this.HelpUtils.toastPop('请填写现户籍所在地乡镇街道办事处！');
      return;
    }
    if (!this.FamilyAddress.HouseholdDescription.trim()) {
      this.HelpUtils.toastPop('请填写现户籍所在地乡镇街道办事处描述！');
      return;
    }
    if (!this.FamilyAddress.HouseholdHouseNumber.trim()) {
      this.HelpUtils.toastPop('请填写现户籍所在地详细（街道门牌号）！');
      return;
    }
    if (!this.FamilyAddress.Phone.trim()) {
      this.HelpUtils.toastPop('请填写家庭常用联系电话！');
      return;
    }
    if (!this.FamilyAddress.WeChat.trim()) {
      this.HelpUtils.toastPop('请填写微信号！');
      return;
    }
    console.log(this.FamilyAddress.AdmissionTime);

    this.subStop = true;

    this.http.postJSON({
      Router: ServelUrl.Url.addhumansociety,
      Method: 'POST',
      Body: {
        UserCode: this.FamilyAddress.UserCode,
        CandidateCode: this.FamilyAddress.CandidateCode,
        Name: this.FamilyAddress.Name,
        Sex: this.FamilyAddress.Sex,
        Nationality: this.FamilyAddress.Nationality,
        IdentityNum: this.FamilyAddress.IdentityNum,
        Education: this.FamilyAddress.Education,
        Major: this.FamilyAddress.Major,
        TrainingMethod: this.FamilyAddress.TrainingMethod,
        SourceLocation: this.FamilyAddress.SourceLocation,
        SourceLocationCode: this.FamilyAddress.SourceLocationCode,
        SchoolSystem: this.FamilyAddress.SchoolSystem,
        Minor: this.FamilyAddress.Minor,
        Birthday: this.FamilyAddress.Birthday,
        Bachelor: this.FamilyAddress.Bachelor,
        MajorForeignLanguage: this.FamilyAddress.MajorForeignLanguage,
        ForeignLanguageLevel: this.FamilyAddress.ForeignLanguageLevel,
        ComputerLevel: this.FamilyAddress.ComputerLevel,
        AdmissionTime: this.FamilyAddress.AdmissionTime,
        GraduationTime: this.FamilyAddress.GraduationTime,
        CommissioningUnit: this.FamilyAddress.CommissioningUnit,
        CommissioningLocation: this.FamilyAddress.CommissioningLocation,
        UniversityCode: this.FamilyAddress.UniversityCode,
        AdmissionMethod: this.FamilyAddress.AdmissionMethod,
        Academy: this.FamilyAddress.Academy,
        Class: this.FamilyAddress.Class,
        Extension1: this.FamilyAddress.Extension1,
        HouseholdRegistration: this.FamilyAddress.HouseholdRegistration,
        ProfessionalQualification: this.FamilyAddress.ProfessionalQualification,
        PoliticalFace: this.FamilyAddress.PoliticalFace,
        Extension2: this.FamilyAddress.Extension2,
        Extension3: this.FamilyAddress.Extension3,
        Extension4: this.FamilyAddress.Extension4,
        Extension5: this.FamilyAddress.Extension5,
        Extension6: this.FamilyAddress.Extension6,
        Remarks: this.FamilyAddress.Remarks,
        ResidentAddress: this.FamilyAddress.ResidentAddress,
        HouseholdCity: this.FamilyAddress.HouseholdCity,
        HouseholdCityCode: this.FamilyAddress.HouseholdCityCode,
        HouseholdCountry: this.FamilyAddress.HouseholdCountry,
        HouseholdCountryCode: this.FamilyAddress.HouseholdCountryCode,
        HouseholdDescription: this.FamilyAddress.HouseholdDescription,
        HouseholdHouseNumber: this.FamilyAddress.HouseholdHouseNumber,
        HouseholdRegistrationDate: this.FamilyAddress.HouseholdRegistrationDate,
        Phone: this.FamilyAddress.Phone,
        ProfessionalDirection: this.FamilyAddress.ProfessionalDirection,
        WeChat: this.FamilyAddress.WeChat,
        Status: Number(this.FamilyAddress.Status)
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.HelpUtils.toastPop('提交成功');
        sessionStorage.clear();
      } else {
        this.HelpUtils.toastPop('请检查必填项是否填写');
        console.log(res.FeedbackText);
        this.subStop = false;
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
  //获取性别
  getsex() {
    this.http.postJSON({
      Router: ServelUrl.Url.mabiaolist,
      Method: 'POST',
      Body: {
        Type: 'Sex',
        PageNum: this.page.pageIndex,
        PageSize: this.page.PageSize
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.sexy = res.Data.Datas
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }

  //获取民族
  getNationality() {
    this.http.postJSON({
      Router: ServelUrl.Url.mabiaolist,
      Method: 'POST',
      Body: {
        Type: 'Nationality',
        PageNum: this.page.pageIndex,
        PageSize: this.page.PageSize
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Nationality = res.Data.Datas
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }

  //获取专业
  getMajor() {
    this.http.postJSON({
      Router: ServelUrl.Url.mabiaolist,
      Method: 'POST',
      Body: {
        Type: 'Major',
        PageNum: this.page.pageIndex,
        PageSize: this.page.PageSize
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Major = res.Data.Datas
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }

  //获取院系
  getAcademy() {
    this.http.postJSON({
      Router: ServelUrl.Url.mabiaolist,
      Method: 'POST',
      Body: {
        Type: 'Academy',
        PageNum: this.page.pageIndex,
        PageSize: this.page.PageSize
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Academy = res.Data.Datas
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }

  //获取班级
  getClass() {
    this.http.postJSON({
      Router: ServelUrl.Url.mabiaolist,
      Method: 'POST',
      Body: {
        Type: 'Class',
        PageNum: this.page.pageIndex,
        PageSize: this.page.PageSize
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Class = res.Data.Datas
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }

  //获取政治面貌
  getPoliticalFace() {
    this.http.postJSON({
      Router: ServelUrl.Url.mabiaolist,
      Method: 'POST',
      Body: {
        Type: 'PoliticalFace',
        PageNum: this.page.pageIndex,
        PageSize: this.page.PageSize
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.PoliticalFace = res.Data.Datas
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );

  }
  //获取家庭地址
  navGetAdd(m) {
    this.appService.setCurrentParentPage('TianbaoPage');
    // this.navCtrl.push('ProvincePage');
    console.log(m);
    this.navCtrl.push('ProvincePage', {
      Type: m,
    });
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

  // onSelect(ev) {
  //   console.log(ev);
  //   this.clothsizes.forEach(item => {
  //     if (item.CodeName == ev) {
  //       this.indexSize = item.remark1 || "";
  //     }
  //   })
  // }
  changeStatus() {
    this.forbidBt = false; //可以修改
    this.changeBtn = false;
    sessionStorage.setItem('changeBtnStatus', JSON.stringify('1'));
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
