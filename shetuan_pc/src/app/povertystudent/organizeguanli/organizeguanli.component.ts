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
import { ModalHelper } from "../../shared/helper/modal.helper";



declare var $: any




@Component({
  selector: 'app-organizeguanli',
  templateUrl: './organizeguanli.component.html',
  styleUrls: ['./organizeguanli.component.scss']
})
export class OrganizeGuanliComponent implements OnInit {

  t1: any
  validateForm: FormGroup;
  optionrole = []
  Activity = [];
  shenpiStatus = 1;
  isVisible = false;

  page = {
    Page: 1,
    PageSize: 20,
  };

  pagem = {
    Page: 1,
    PageSize: 10,
  };

  Atotal;
  stotal; //负责人数量
  mtotal; //指导老师数量

  SheTuanHonor = [];

  honorpage = {
    lastid: 1,
    count: 10
  };

  Total;
  Totar;
  Htotal;
  inputShe = {
    ActivityInfo: '',           //社团简介
  };

  union = {
    UnionName: '',           //社团名称
    CodeName: '',           //类别
    Createtime: '',      //创建时间
    StudentName: '',         //负责人学号
    StaffName: '',           //指导教师
    phone: '',          //联系方式
    UnionInfo: ''            //社团简介
  };

  CertifyImg = {
    AttachmentURL: ''
  }

  ActivityOne = {
    UnionName: '',
    membernum: '',
    activitynum: '',
    UnionInfo: '',
    RecordId: ''
  }


  UnionCode = '';
  StudentCode = ''; //前回页面送过来的
  MemberCode = {
    Member: ''
  }//从社团列表取出的
  dataSet = [];
  dataSetf = [];
  dataSetr = [];
  dataSetTeacher = [];
  // dataSetf = {
  //   AcademyName: '',           //学院名称
  //   majorname: '',             //专业名称
  //   Grade: '',                 //年级
  //   classname: '',             //班级
  //   usercode: '',              //学号
  //   phone: '',                 //联系方式
  //   name: '' ,                 //姓名
  //   CodeName: ''               //性别
  // };
  isConfirmLoading = false;
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
  constructor(private modalHelper: ModalHelper, private DomS: DomSanitizer, public httpService: HttpService, private route: ActivatedRoute, private router: Router, private msgSrv: NzMessageService, private fb: FormBuilder) {

    this.validateForm = this.fb.group({
      // ActivityInfo: ['', [this.infoValidator]]
    });


  }


  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.UnionCode = params['UnionCode'];
      this.currentCode = params['currentCode'];
    });
    if (!this.UnionCode) {
      this.route.queryParams.subscribe(queryParams => {
        this.UnionCode = queryParams.UnionCode;
        this.currentCode = queryParams.currentCode;
        if (!this.currentCode) {
          this.currentCode = 'SbiInfo';
        }
      })

    }
    this.GetShetuanSlide();
    this.GetShetuanMember();
    this.getallactivityinfo();
    this.getunionhonorinfo();
    this.getshetuaninfo();
    this.GetUnionTeacher();
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  cardbodychange() {
    this.router.navigate(['shetuanmanage'], { queryParams: { UnionCode: this.UnionCode, StudentCode: this.StudentCode } })
  }

  GoTeacherManage() {
    this.router.navigate(['shetuanmanage'], { queryParams: { UnionCode: this.UnionCode, StudentCode: this.StudentCode, IsTeacher: 'Teacher' } })
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
        } else {
          menu.checked = false;
        }
      });

  }

  goback() {
    this.router.navigate([''])
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
        PageNum: this.pagem.Page,
        PageSize: this.pagem.PageSize,
        Code: this.UnionCode,
        Scode: this.StudentCode
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {

        this.dataSet = res.Data.Datas;
        this.dataSetf = res.Data.Dataf;
        this.Total = parseInt(res.Data.Total);
        this.Totar = parseInt(res.Data.Totar);
        console.log(this.dataSetf);
      }
    })
  }


  GetUnionTeacher() {
    this.httpService.POST({
      Router: ServelUrl.Url.getunionteacher,
      Method: 'POST',
      Body: {
        Code: this.UnionCode,
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.dataSetTeacher = res.Data;
        console.log('aaa', this.dataSetTeacher);
      }
    })

  }


  //加载社团活动
  getallactivityinfo() {
    this.httpService.POST({
      Router: ServelUrl.Url.getallactivityinfo,
      Method: 'POST',
      Body: {
        PageNum: this.page.Page,
        PageSize: this.page.PageSize,
        Aname: null,
        Uname: this.UnionCode,
        Code: null,
        Sbtime: null,
        Setime: null,
        Pbtime: null,
        Petime: null
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {

        this.Activity = res.Data.Datas;
        this.Htotal = res.Data.Total;

      }
    })

  }



  //加载社团荣誉
  getunionhonorinfo() {
    console.log(9);
    this.httpService.postJSON({
      Router: ServelUrl.Url.getunionhonorinfo,
      Method: 'POST',
      Body: {
        Uname: this.UnionCode,
        pageindex: this.honorpage.lastid,
        pagesize: this.honorpage.count
      }
    }).then(res => {
      if (!res.FeedbackCode && res.Data.data) {
        // for (let i = 0; i < res.length; i++) {
        //   res[i].Data = JSON.parse(res[i].Data);
        // }
        this.SheTuanHonor = res.Data.data;
        this.Atotal = res.Data.total;
        console.log(this.SheTuanHonor);
        // this.gengduocheck();

      }
    })

  }

  //点击查看大图
  viewBigImg(i) {
    console.log(i);
    $('#jq33' + i).viewer();
    console.log($('#jq33' + i))

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
        // alert(this.ActivityOne.UnionInfo);
        this.ActivityOne = res.Data;
        this.CertifyImg.AttachmentURL = res.Data.AttachmentURL


      }
    })

  }

  goorganize(data) {
    if (data.status == 5) {
      this.router.navigate(['shetuanactivity'], { queryParams: { UnionCode: data.UnionCode, StudentCode: data.StudentCode, ActivityCode: data.ActivityCode, shenpiStatus: 3 } })

    } else {
      this.router.navigate(['shetuanactivity'], { queryParams: { UnionCode: data.UnionCode, StudentCode: data.StudentCode, ActivityCode: data.ActivityCode, shenpiStatus: 2 } })

    }
  }



}





