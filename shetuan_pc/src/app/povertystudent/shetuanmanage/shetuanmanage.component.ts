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







@Component({
  selector: 'app-shetuanmanage',
  templateUrl: './shetuanmanage.component.html',
  styleUrls: ['./shetuanmanage.component.scss']
})
export class ShetuanManageComponent implements OnInit {

  editRow = null;
  tempEditObject = {};
  validateForm: FormGroup;
  optionrole = []
  dataSetTeacher = [];
  optionteacherwork = [];
  isVisible = false;
  isShow = false;

  urlrouter;
  page = {
    Page: 1,
    PageSize: 2,
  };


  Totar;
  inputShe = {
    xname: '',          //名称
    role: '',           //职位
    Start: '',          //开始时间
    End: new Date("2999-01-01"),            //结束时间
    xuehao: '',         //学号
    ActivityInfo: '',           //社团简介
    teacherwork: '',
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

  stotal;
  mtotal;
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
  dataSetr = [];
  IsTeacher;
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
  constructor(private DomS: DomSanitizer, public httpService: HttpService, private route: ActivatedRoute, private router: Router, private msgSrv: NzMessageService, private fb: FormBuilder) {

    this.validateForm = this.fb.group({
      xuehao: ['', [this.codeValidator]],
      xname: ['', [this.nameValidator]],
      role: [null],
      teacherwork: [null],
      Start: ['', [Validators.required]],
      End: ['', [Validators.required]],
      // ActivityInfo: ['', [this.infoValidator]]
    });


  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.UnionCode = queryParams.UnionCode;
      this.StudentCode = queryParams.StudentCode;
      this.IsTeacher = queryParams.IsTeacher;
    })


    this.GetShetuanSlide();
    this.GetUnionrole();
    this.GetShetuanMember();
    this.Getoptionrole();
    this.getshetuaninfo();
    this.GetUnionTeacher();

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
          if (this.currentCode != 'SbiInfo') {
            this.router.navigate(['organizeguanli'], { queryParams: { currentCode: menu.code, UnionCode: this.UnionCode, StudentCode: this.StudentCode } })
          }
        } else {
          menu.checked = false;
        }
      });

  }

  goback() {
    this.router.navigate(['organizeguanli'], { queryParams: { currentCode: 'SbiInfo', UnionCode: this.UnionCode, StudentCode: this.StudentCode } })

  }

  showModal = () => {
    this.inputShe.End = new Date("2999-01-01");
    this.isVisible = true;
    this.Getoptionrole();
  }

  tshowModal = () => {
    this.inputShe.End = new Date("2999-01-01");
    this.isShow = true;
    this.teacherworkinfo();

  }

  handleOk = (e) => {
    // this.isConfirmLoading = true;


    if (!this.MemberCode.Member) {
      this.msgSrv.error('提交失败，失败原因可能社团中并无此人');
      // this.isVisible = false;
      // this.isConfirmLoading = false;
      // this.validateForm.reset();
      return
    }

    if (!this.inputShe.role) {
      this.msgSrv.error('提交失败，请选择社团职位');
      // this.isVisible = false;
      // this.isConfirmLoading = false;
      // this.validateForm.reset();
      return
    }

    if (!this.inputShe.Start) {
      this.msgSrv.error('提交失败，请填写任职开始时间');
      // this.isVisible = false;
      // this.isConfirmLoading = false;
      // this.validateForm.reset();
      return
    }

    // if (!this.inputShe.End) {
    //   this.msgSrv.error('提交失败，请填写任职结束时间');
    //   return
    // }

    var datestart = new Date((this.inputShe).Start);
    var start = datestart.getFullYear() + '-' + (datestart.getMonth() + 1) + '-' + datestart.getDate();

    var dateend = new Date((this.inputShe).End);
    var end = dateend.getFullYear() + '-' + (dateend.getMonth() + 1) + '-' + dateend.getDate();

    // if (datestart > dateend || datestart == dateend) {
    //   this.msgSrv.error('提交失败，任职开始时间不能大于或等于任职结束时间');
    //   this.isVisible = false;
    //   // this.isConfirmLoading = false;
    //   this.validateForm.reset();
    //   return
    // }

    this.httpService.POST({
      Router: ServelUrl.Url.addrole,
      Method: 'POST',
      Body: {
        Code: this.MemberCode.Member,
        UCode: this.UnionCode,
        StartTime: start,
        EndTime: end,
        Role: this.inputShe.role,
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.msgSrv.success('提交成功');
        this.GetUnionrole();
        this.isVisible = false;
        // this.isConfirmLoading = false;
      }
    })
    this.validateForm.reset();
  }

  handleCancel = (e) => {
    this.isVisible = false;
    this.validateForm.reset();
  }

  thandleOk = (e) => {
    this.inputShe.End = new Date("2999-01-01");

    if (!this.inputShe.xname) {
      this.msgSrv.error('提交失败，请输入姓名');
      return
    }

    if (!this.MemberCode.Member) {
      this.msgSrv.error('提交失败，请选择工作单位！');
      return
    }


    if (!this.inputShe.Start) {
      this.msgSrv.error('提交失败，请填写任职开始时间');
      return
    }

    // if (!this.inputShe.End) {
    //   this.msgSrv.error('提交失败，请填写任职结束时间');
    //   return
    // }

    var datestart = new Date((this.inputShe).Start);
    var start = datestart.getFullYear() + '-' + (datestart.getMonth() + 1) + '-' + datestart.getDate();

    var dateend = new Date((this.inputShe).End);
    var end = dateend.getFullYear() + '-' + (dateend.getMonth() + 1) + '-' + dateend.getDate();

    // if (datestart > dateend || datestart == dateend) {
    //   this.msgSrv.error('提交失败，任职开始时间不能大于或等于任职结束时间');
    //   this.isVisible = false;
    //   // this.isConfirmLoading = false;
    //   this.validateForm.reset();
    //   return
    // }

    this.httpService.POST({
      Router: ServelUrl.Url.addunionteacher,
      Method: 'POST',
      Body: {
        Code: this.MemberCode.Member,
        UCode: this.UnionCode,
        StartTime: start,
        EndTime: end,
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.msgSrv.success('提交成功');
        this.GetUnionTeacher();
        this.GetShetuanMember();
        this.GetShetuanSlide();
        this.isShow = false;
        // this.isConfirmLoading = false;
      }
    })
    this.validateForm.reset();
  }

  thandleCancel = (e) => {
    this.isShow = false;
    this.validateForm.reset();
  }


  nameValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true }
    } else if ((control.value).length > 10) {
      return { expired: true, error: true };
    }
  }

  // infoValidator = (control: FormControl): { [s: string]: boolean } => {
  //   if (control.value) {
  //     if ((control.value).length > 50) {
  //       return { expired: true, error: true };
  //     }
  //   }
  // }


  codeValidator = (control: FormControl): { [s: string]: boolean } => {
    const CODE_REGEXP = /^[0-9a-zA-Z-]+$/;
    if (!control.value) {
      return { required: true }
    } else if (!CODE_REGEXP.test(control.value)) {
      return { expired: true, error: true };
    }
  }

  _disabledDate(current: Date): boolean {
    return current && current.getTime() > Date.now();
  }

  _disabledEndDate(current: Date): boolean {
    return current && current.getTime() < Date.now();
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



  GetUnionrole() {
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

  edit(data) {
    console.log(88);
    this.tempEditObject[data.MemberCode] = { ...data };
    console.log(this.tempEditObject[data.MemberCode]);
    this.editRow = data.MemberCode;

  }

  save(data) {
    console.log(this.tempEditObject[data.MemberCode]);

    if (this.tempEditObject[data.MemberCode].Starttime) {
      console.log(7);
      var datea = new Date(this.tempEditObject[data.MemberCode].Starttime);
      var date_values = datea.getFullYear() + '-' + (datea.getMonth() + 1) + '-' + datea.getDate();

    } else {
      this.msgSrv.error('任职开始时间不能为空');
      return false;
    }

    if (this.tempEditObject[data.MemberCode].Endtime) {
      console.log(8);
      var dateb = new Date(this.tempEditObject[data.MemberCode].Endtime);
      var date_valuee = dateb.getFullYear() + '-' + (dateb.getMonth() + 1) + '-' + dateb.getDate();

    }

    if (datea > dateb || date_values == date_valuee) {
      console.log(date_values, '时间大于')
      this.msgSrv.error('提交失败，任职开始时间不能大于或等于任职结束时间');
      // this.tempEditObject[data.MemberCode] = {};
      return false;
    }

    Object.assign(data, this.tempEditObject[data.MemberCode]);
    this.editRow = null;


    console.log({
      Code: data.MemberCode,
      StartTime: date_values,
      EndTime: date_valuee,
      Role: data.code,
    });
    if (this.IsTeacher == 'Teacher') {
      this.httpService.POST({
        Router: ServelUrl.Url.updateunionteacher,
        Method: 'POST',
        Body: {
          Code: data.MemberCode,
          StartTime: date_values,
          EndTime: date_valuee,
        }
      }).subscribe(res => {
        if (!res.FeedbackCode) {
          this.msgSrv.success('保存成功');
          this.GetUnionTeacher();

        }
      })

    } else {
      this.httpService.POST({
        Router: ServelUrl.Url.updaterole,
        Method: 'POST',
        Body: {
          Code: data.MemberCode,
          StartTime: date_values,
          EndTime: date_valuee,
          Role: data.Code,
        }
      }).subscribe(res => {
        if (!res.FeedbackCode) {
          this.msgSrv.success('保存成功');
          this.GetUnionrole();

        }
      })

    }

  }

  cancel(data) {
    this.tempEditObject[data.MemberCode] = {};
    this.editRow = null;
  }

  delete(data, index) {
    if (this.IsTeacher == 'Teacher') {
      this.dataSetTeacher.splice(index, 1);
      this.urlrouter = ServelUrl.Url.deunionteacher;
    } else {
      this.dataSetr.splice(index, 1);
      this.urlrouter = ServelUrl.Url.deleterole;
    }

    this.httpService.POST({
      Router: this.urlrouter,
      Method: 'POST',
      Body: {
        Code: data.MemberCode,
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        console.log(2);
        this.msgSrv.success('删除成功');
        this.GetShetuanMember();
        this.GetShetuanSlide();
      }
    })

  }


  check(value) {
    if (!this.inputShe.xuehao) {
      console.log('ttttt');
      return false;
    }

    this.httpService.postJSON({
      Router: ServelUrl.Url.getmember,
      Method: 'POST',
      Body: {
        Code: value,                       // 学号
        Scode: this.UnionCode,                          // 社团
      }
    }).then(res => {
      console.log(1);
      if (!res.FeedbackCode && res.Data) {
        this.MemberCode.Member = res.Data.Member;
        this.inputShe.xname = res.Data.Name;
        console.log(this.MemberCode.Member);
      } else {
        this.inputShe.xname = '';
        this.MemberCode.Member = '';
        this.msgSrv.warning('社团成员中查无此人');
      }
    });

  }


  tcheck(value) {
    if (!this.inputShe.teacherwork) {
      console.log('ttttt');
      return false;
    }

    this.httpService.postJSON({
      Router: ServelUrl.Url.getteacherintel,
      Method: 'POST',
      Body: {
        Code: this.inputShe.teacherwork,       // departmentcode
        Name: this.inputShe.xname,             // name         
      }
    }).then(res => {
      console.log(2);
      if (!res.FeedbackCode && res.Data) {
        this.MemberCode.Member = res.Data.IntelUserCode;
        console.log(this.MemberCode.Member);
      } else {
        this.MemberCode.Member = '';
        this.msgSrv.warning('社团成员中查无此人');
      }
    });

  }


  Getoptionrole() {

    this.httpService.postJSON({
      Router: ServelUrl.Url.getmemberrole,
      Method: 'POST',
      Body: {

      }
    }).then(res => {
      if (!res.FeedbackCode) {

        this.optionrole = res.Data;
      }
    });
  }

  teacherworkinfo() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.teacherworkinfo,
      Method: 'POST',
      Body: {

      }
    }).then(res => {
      if (!res.FeedbackCode) {

        this.optionteacherwork = res.Data;
      }
    });

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





}





