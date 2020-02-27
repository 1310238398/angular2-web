import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ServelUrl } from "../../../app/ServelUrl";
import { HttpService } from "../../../http/http.Service";
import { HelpUtils } from "../../../app/utils/HelpUtils";

declare var antlinker;

@IonicPage()
@Component({
  selector: 'newstudentinfodetail',
  templateUrl: 'newstudentinfodetail.html'
})
export class NewStudentInfoDetailPage {

  forbidBt = true; //禁用所有input框
  numdisb = false;  //审批通过按钮
  Headimgurl = '';  //  头像链接

  dataObj = {
    flow_code: '',
    flow_id: '',
    flow_name: '',
    id: 0,
    input_data: {},
    is_back: false,
    launch_time: '',
    launcher: '',
    launcher_name: '',
    node_instance_id: '',
    out_data: '',
    processor: '',
    processor_name: '',
    processor_time: '',
    record_id: '',
    status: 0,
    status_text: '',
    title: '',
  }; //整体数据

  FamilyAddress = {
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
      firstguardiantitleName:'',
      secondguardiantitleName:'',
    action: '',
    title: '',
    timestart: '',
    remarktxt: '',
    statustxt: '',
    status: '',

  };

  appStatus = '1';//审批状态  1待审批  2 已审批

  constructor(private navCtrl: NavController, private http: HttpService, private HelpUtils: HelpUtils, public navParams: NavParams) { }

  ionViewWillEnter() {
    antlinker.configTitleButton({
      showClose: true,
      type: "label",
      text: "",
      success: function () { },
      fail: function () { },
      trigger: function () { }
    });
    this.dataObj = this.navParams.get('dataPass');
    this.appStatus = this.navParams.get('appStatus');
    this.FamilyAddress = this.navParams.get('dataPass').input_data;
    console.log(this.dataObj)
    console.log(this.appStatus)
    this.loadGetLevelList();  //获取监护人称谓
    this.getImgPath();  //该显示的表单字段
  }


  //审批提交
  passTabBtn() {
    var fromdata = this.dataObj.input_data;
    fromdata['action'] = "counsellor";
    fromdata['statustxt'] = "辅导员审批已通过";
    fromdata['status'] = "2";
    fromdata['istrue'] = "true";

    this.numdisb = true;

    this.http.postFLOW({
      Router: ServelUrl.Url.starthandle,
      Method: 'POST',
      Body: {
        record_id: this.dataObj.node_instance_id,
        form_data: JSON.stringify(fromdata)
      }
    }).then(res => {
      if (res == 'ok') {
        this.HelpUtils.toastPop('审批成功');
        const that = this;
        setTimeout(function () {
          that.navCtrl.push('IndexApprovePage');
          that.numdisb = false;
        }, '1000');
      } else {
        console.log(res);
        this.numdisb = false;
      }
    },
      err => console.log(err)
    );
  }

  //跳转到拒绝原因页
  notpassTab() {
    this.navCtrl.push('NotPassReasonPage', { dataPass: this.dataObj, appStatus: this.appStatus })
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

        for (let i = 0; i < res.Data.length; i++) {
          if(this.FamilyAddress.firstguardiantitle == res.Data[i].Code){
            this.FamilyAddress['firstguardiantitleName'] = res.Data[i].CodeName
          }
          if(this.FamilyAddress.secondguardiantitle == res.Data[i].Code){
            this.FamilyAddress['secondguardiantitleName'] = res.Data[i].CodeName
          }
        }
      } else {
        console.log(res.FeedbackText);
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







}
