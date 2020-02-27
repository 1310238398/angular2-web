import { FamilyEditComponent } from '../../family-edit/family-edit.component';
import { MessageComponent } from '../../message/message.component';
// import {ModalHelper} from '../../../app/share/modalHelper';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { CommonService } from '../../service/common.service';
import { InfoService } from './Info.service';
// import {forkJoin} from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ServelUrl } from "../../ServelUrl";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { isNgTemplate } from '@angular/compiler';
import { DomSanitizer } from "@angular/platform-browser";



declare var $: any





@Component({
  selector: 'app-shetuanactivity',
  templateUrl: './shetuanactivity.component.html',
  styleUrls: ['./shetuanactivity.component.scss']
})
export class ShetuanActivityComponent implements OnInit {

  srole;
  lrole;
  validateForm: FormGroup;
  Activity = [];
  ActivityCode;
  shenpiActivityCode;
  ActivityStatus;
  notNeedExplanationValid = false;
  Totar;
  pos;
  Tstatus;

  stotal;
  mtotal;
  CertifyImg = {
    AttachmentURL: ''
  }

  ActivitytT = {
    UnionName: '',
    membernum: '',
    activitynum: '',
    UnionInfo: '',
    RecordId: ''
  }

  inputShe = {
    ActivityInfo: '',           //社团简介
  };

  TeacherInfo = {
    IsThis: ''
  }

  union = {
    UnionName: '',           //社团名称
    CodeName: '',           //类别
    Createtime: '',      //创建时间
    StudentName: '',         //负责人学号
    StaffName: '',           //指导教师
    phone: '',          //联系方式
    UnionInfo: ''            //社团简介
  };

  ActivityOne = {
    Activity: '',           //活动名称
    Info: '',           //活动内容
    Starttime: '',           //举办时间
    Place: '',           //举办地点
    Connect: '',           //活动联络人
    phone: '',           //联系方式
    name: '',           //负责人
    peoplenum: '',           //预计参加人数
  }


  ActivityEnd = [];
  dataSetr = [];

  Endpage = {
    lastid: 1,
    count: 10
  };


  UnionCode = '';
  shenpiStatus;
  StudentCode = ''; //前回页面送过来的
  MemberCode = {
    Member: ''
  }//从社团列表取出的
  isAVisible = false;
  iszhidao = false;
  isleader = false;
  isshow = true;
  expand_f = true;
  menus = [
    {
      name: '社团成员',
      checked: false,
      code: 'SbiInfo'
    }, {
      name: '社团活动',
      checked: false,
      code: 'academicInfo'
    }, {
      name: '社团荣誉',
      checked: false,
      code: 'ScoreInfo'
    }
  ];
  currentCode = this.menus[0].code;
  /** ngModel value */
  public GeoValues: any[] = null;

  // tslint:disable-next-line:max-line-length
  constructor(private DomS: DomSanitizer, public httpService: HttpService, private route: ActivatedRoute, private router: Router, private msgSrv: NzMessageService, private fb: FormBuilder) {

    this.validateForm = this.fb.group({
      // ActivityInfo: ['', [this.infoValidator]]
    });


  }


  ngOnInit(): void {
    // this.route.params.forEach((params: Params) => {
    //   this.UnionCode = params['UnionCode'];
    //   this.StudentCode = params['StudentCode'];
    //   this.ActivityCode = params['ActivityCode'];
    //   this.shenpiStatus = params['shenpiStatus'];
    //   this.pos = params['pos'];
    // });

    this.route.queryParams.subscribe(queryParams => {
      this.UnionCode = queryParams.UnionCode;
      this.StudentCode = queryParams.StudentCode;
      this.ActivityCode = queryParams.ActivityCode;
      this.shenpiStatus = queryParams.shenpiStatus;
      this.pos = queryParams.pos;
    })


    this.GetShetuanSlide();
    this.GetShetuanMember();
    this.getactivityinfo();
    this.zongjiebegin();
    this.getteachername();
    this.GetUnionrole();
    this.getshetuaninfo();

  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }


  expand() {
    this.expand_f = !this.expand_f;
  }

  /**
 * 切换菜单
 * @param item
 */
  changeMenu(item) {
    this
      .menus
      .forEach(menu => {
        if (menu.code === item.code) {
          item.checked = true;
          this.currentCode = item.code;
          if (this.currentCode != 'academicInfo') {
            this.router.navigate(['organizeguanli'], { queryParams: { currentCode: menu.code, UnionCode: this.UnionCode, StudentCode: this.StudentCode } })
          }
        } else {
          menu.checked = false;
        }
      });

  }

  goback() {
    if (!this.pos) {
      this.router.navigate(['organizeguanli'], { queryParams: { currentCode: 'academicInfo', UnionCode: this.UnionCode, StudentCode: this.StudentCode } })
    } else {
      this.router.navigate([''])
    }
  }


  notNeedExplanationOnChange(value) {
    value && value.trim().length > 0 ? this.notNeedExplanationValid = false : this.notNeedExplanationValid = true;
  }

  //获取当属社团详情
  GetShetuanSlide() {

    this.httpService.POST({
      Router: ServelUrl.Url.shetuanslide,
      Method: 'POST',
      Body: {
        Code: this.UnionCode,
        Scode: this.StudentCode
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {

        this.union = res.Data.Datas;
        this.stotal = parseInt(res.Data.Stotal);
        this.mtotal = parseInt(res.Data.Ttotal);

      }
    })
  }

  //获取社团负责人详情
  GetShetuanMember() {

    this.httpService.POST({
      Router: ServelUrl.Url.shetuanmember,
      Method: 'POST',
      Body: {
        Code: this.UnionCode,
        Scode: this.StudentCode
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {

        this.Totar = parseInt(res.Data.Totar);
      }
    })
  }



  getactivityinfo() {

    this.httpService.POST({
      Router: ServelUrl.Url.getactivityinfo,
      Method: 'POST',
      Body: {
        Uname: this.UnionCode,
        Code: this.ActivityCode
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        if (this.shenpiStatus == 2) {
          this.ActivityOne = res.Data;

        }

      }
    })

  }

  //判断登录者是否为指导老师
  getteachername() {

    this.httpService.POST({
      Router: ServelUrl.Url.getteachername,
      Method: 'POST',
      Body: {
        Uname: this.UnionCode,
        Code: this.ActivityCode
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.TeacherInfo = res.Data;
      }
    })

  }


  //审批通过
  shenpisuccess(m) {
    console.log(m);
    this.shenpiActivityCode = m.ActivityCode;
    this.ActivityStatus = 3;

    this.httpService.POST({
      Router: ServelUrl.Url.updateshenpi,
      Method: 'POST',
      Body: {
        Status: this.ActivityStatus,
        Info: null,
        Code: this.shenpiActivityCode,
        Srole: this.srole,
        Lrole: this.lrole
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {

        this.msgSrv.success('审批完成');
        this.getactivityinfo();
        this.router.navigate(['organizeguanli'], { queryParams: { currentCode: 'academicInfo', UnionCode: this.UnionCode, StudentCode: this.StudentCode } })

      }
    })


  }

  //指导老师审批通过
  tshenpisuccess(m) {
    console.log(m);
    this.shenpiActivityCode = m.ActivityCode;
    this.ActivityStatus = 3;
    this.Tstatus = 1;

    this.httpService.POST({
      Router: ServelUrl.Url.tupdateshenpi,
      Method: 'POST',
      Body: {
        Status: this.ActivityStatus,
        Tstatus: this.Tstatus,
        Code: this.shenpiActivityCode
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {

        this.msgSrv.success('审批完成');
        this.getactivityinfo();
        this.router.navigate(['organizeguanli'], { queryParams: { currentCode: 'academicInfo', UnionCode: this.UnionCode, StudentCode: this.StudentCode } })
      }
    })


  }


  //审批不通过
  shenpifail(m) {
    console.log(m);
    this.isAVisible = true;
    this.shenpiActivityCode = m.ActivityCode;
    this.ActivityStatus = 2;
  }

  shenpihandleOk = (e) => {
    this.isAVisible = false;
    console.log(e);

    this.httpService.POST({
      Router: ServelUrl.Url.updateshenpi,
      Method: 'POST',
      Body: {
        Status: this.ActivityStatus,
        Info: this.inputShe.ActivityInfo,
        Code: this.shenpiActivityCode,
        Srole: this.srole,
        Lrole: this.lrole
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {

        this.msgSrv.success('审批完成');
        this.getactivityinfo();
        this.router.navigate(['organizeguanli'], { queryParams: { currentCode: 'academicInfo', UnionCode: this.UnionCode, StudentCode: this.StudentCode } })

      }
    })

    this.inputShe.ActivityInfo = "";
  }

  shenpihandleCancel = (e) => {
    this.isAVisible = false;
    this.inputShe.ActivityInfo = "";
  }


  zongjiebegin() {
    if (this.shenpiStatus != 3) {
      return
    }

    this.httpService.postJSON({
      Router: ServelUrl.Url.getunionendoneinfo,
      Method: 'POST',
      Body: {
        Uname: this.ActivityCode,
        pageindex: this.Endpage.lastid,
        pagesize: this.Endpage.count
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        // for (let i = 0; i < res.length; i++) {
        //   res[i].Data = JSON.parse(res[i].Data);
        // }
        this.ActivityEnd = res.Data.data
        console.log(this.ActivityEnd);
      }
    })


  }



  //加载社团头像
  getshetuaninfo() {
    console.log(2);
    this.httpService.postJSON({
      Router: ServelUrl.Url.getshetuaninfo,
      Method: 'POST',
      Body: {
        Uname: this.UnionCode,
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.ActivitytT = res.Data;
        this.CertifyImg.AttachmentURL = res.Data.AttachmentURL


      }
    })

  }

  //获取当该社团的社长和副社长
  GetUnionrole() {
    console.log('rolerorle');
    this.httpService.POST({
      Router: ServelUrl.Url.getUnionrole,
      Method: 'POST',
      Body: {
        Code: this.UnionCode,
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.dataSetr = res.Data;
        console.log(this.dataSetr);
        var role = this.dataSetr.map(item => item.Member);
        this.srole = (role.splice(0, 1)).join();
        this.lrole = (role.splice(0, 1)).join();
        console.log(this.srole);
        console.log(this.lrole);
      }
    })

  }


    //点击查看大图
    viewBigImg(i) {
      console.log(i);
      $('#jq33' + i).viewer();
      console.log($('#jq33' + i))
  
    }
  

}





