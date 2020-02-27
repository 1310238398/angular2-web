import { SpecialcharacterEditComponent } from './specialcharacter-edit/specialcharacter-edit.component';
import { ScholarshipaidEditComponent } from './scholarshipaid-edit/scholarshipaid-edit.component';
import { FamilyEditComponent } from './family-edit/family-edit.component';
import { MessageComponent } from './message/message.component';
import { ModalHelper } from 'src/app/share/modalHelper';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/http/http.service';
import { CommonService } from '../service/common.service';
import { InfoService } from './Info.service';
import { forkJoin } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { HonourEditComponent } from './honour-edit/honour-edit.component';
import { PunishmentEditComponent } from './punishment-edit/punishment-edit.component';
import { SafetyincidentEditComponent } from './safetyincident-edit/safetyincident-edit.component';
import { StatusEditComponent } from './status-edit/status-edit.component';
import { CadreEditComponent } from './cadre-edit/cadre-edit.component';
import * as moment from 'moment';

declare var echarts: any;

@Component({ selector: 'app-info', templateUrl: './info.component.html', styleUrls: ['./info.component.less'] })
export class InfoComponent implements OnInit {
  expand_f = true;
  User;
  Other;
  uid;
  isVisible = true;
  AttendanceData = [];
  updateFlag = false;
  isSpinning = false;
  ScDutyName = '';
  IsEditable = 0;
  menus = [
    {
      name: '基础信息',
      checked: false,
      url: 'assets/images/jichuxinxi@2x.png',
      code: 'SbiInfo'
    }, {
      name: '学业信息',
      checked: false,
      url: 'assets/images/xueyexinxi@2x.png',
      code: 'academicInfo'
    }, {
      name: '学生成绩',
      checked: false,
      url: 'assets/images/xueshengchengji@2x.png',
      code: 'ScoreInfo'
    }, {
      name: '奖助信息',
      checked: false,
      url: 'assets/images/jiangzhu@2x.png',
      code: 'ScholarshipInfo'
    }, {
      name: '日常考勤',
      checked: false,
      url: 'assets/images/richangkaoqin@2x.png',
      code: 'DayAttendance'
    }, {
      name: '请假信息',
      checked: false,
      url: 'assets/images/qingjia@2x.png',
      code: 'LeaveInfo'
    }, {
      name: '特殊情况',
      checked: false,
      url: 'assets/images/teshuqingkuang@2x.png',
      code: 'SpecialInfo'
    }, {
      name: '综合测评',
      checked: false,
      url: 'assets/images/zonghekaoping@2x.png',
      code: 'ComprehensiveEvaluationInfo'
    }
  ];
  eye = {
    UPhoneFlag: false,
    SbiCreedName: false,
    SbiBankCardNumber: false
  };
  currentCode = '';
  basic = {
    uid: '',
    countryCode: null,
    nationalityCode: null,
    politicalCode: null,
    creed: '',
    maritalCode: null,
    birthday: '',
    originAreaCode: '', // 籍
    studentAreaCode: '', // 生源地
    qqAcct: '',
    weChatAcct: '', // 	微信
    hobbies: '', // 	爱好特长
    allPowerfulCardNum: '', // 	一卡通号
    accountBankCode: '', // 	开户行
    bankCardNumber: '', // 	银行卡号
    trainTicketInterval: '', // 	火车票优惠区间
    familyAddress: '', // 家庭地址
    detailAddress: '', // 	详细地址
    postCode: '', // 邮政编码
    homePhone: '' // 家庭电话
  };
  UserInfo = {
    uid: '',
    identityNum: '', // 	身份证号
    phone: '', // 	联系方式
    email: '' // 	电子邮件
  };
  originArea = {
    sheng: null,
    shi: null,
    xian: null
  };
  studentArea = {
    sheng: null,
    shi: null,
    xian: null
  };
  familyAddress = {
    sheng: null,
    shi: null,
    xian: null
  };
  Countrys = [];
  Politicals = [];
  Nationalitys = [];
  Maritals = [];
  OpenBanks = [];
  Creeds = [];

  ScholarShips = [];    //奖学金
  Studentgrant = [];    //助学金
  Studentloan = [];    //助学贷款
  Diligentstudy = [];   //勤工助学
  DifficultySubsidy = [];    //困难补助
  Tuitionfree = [];    //学费减免

  StudentHonours = [];  //荣誉信息
  StudentSpecialCharacters = [];
  StudentPunishments = [];
  StudentSafetyIncidents = [];
  /** ngModel value */
  public GeoValues: any[] = null;

  // tslint:disable-next-line:max-line-length
  radarChart: any;
  yearTermData = [];
  totalScore = '0';

  constructor(private msg: NzMessageService, private infoService: InfoService, private commonService: CommonService, public modalHelper: ModalHelper, private route: ActivatedRoute, private router: Router, private http: HttpService) {
  }

  ngOnInit() {
    this.uid = this.route.snapshot.queryParams['uid'];
    this.currentCode = this.route.snapshot.queryParams['currentcode'] || this.menus[0].code;
    this.getUserInfo(this.route.snapshot.queryParams['uid']);
    //国籍
    this.loadBizCode('Country');
    //民族
    this.loadBizCode('Nationality');
    //政治面貌
    this.loadBizCode('Political');
    //婚姻状况
    this.loadBizCode('Marital');
    //宗教信仰
    this.loadBizCode('Creed');
    //开户行
    this.loadBizCode('OpenBank');
    // 奖学金
    this.queryScholarShip();
    // 助学金
    this.queryStudentgrant();
    // 助学贷款
    this.queryStudentloan();
    // 勤工助学
    this.queryDiligentstudy();
    // 困难补助
    this.queryDifficultySubsidy();
    // 学费减免
    this.queryTuitionfree();

    // 荣誉信息
    this.queryStudentHonour();
    // 特殊群体
    this.queryStudentSpecialCharacter();
    // 违纪处分
    this.queryStudentPunishment();
    // 安全事故
    this.queryStudentSafetyIncident();
    this
      .commonService
      .getGeography()
      .subscribe(res => {
        if (!res.FeedbackCode) {
          this.GeoValues = res.Data;
        }
      });
    this
      .menus
      .forEach(menu => {
        if (menu.code === this.currentCode) {
          menu.checked = true;
        }
      });
  }

  /*加载bizcode*/
  loadBizCode(code) {
    this
      .commonService
      .loadBizCode(code)
      .subscribe(res => {
        if (!res.FeedbackCode) {
          const $_var = `${code}s`;
          this[$_var] = res.Data || [];
        }

      });
  }

  expand() {
    this.expand_f = !this.expand_f;
  }

  /**
   * 用户信息
   * @param uid
   */
  getUserInfo(uid) {
    this
      .http
      .POST({
        Router: '/api/pc/bigdata/studentinfo',
        Method: 'POST',
        Body: {
          uid: uid
        }
      })
      .subscribe(res => {
        console.log(res);
        if (!res.FeedbackCode) {
          this.User = res.Data.User;
          this.Other = res.Data.Other;
          this.IsEditable = res.Data.IsEditable;
          this.getFamily(this.route.snapshot.queryParams['uid']);
          // this.User.SbiInfo.SbiOriginAreaCode='140203';
          // this.User.SbiInfo.SbiStudentAreaCode='150203';
          // 设置修改时的编辑信息
          this.setUpateBasicInfo(this.User.SbiInfo);
          // 设置修改时的用户信息
          this.setUpateUserInfo(this.User.User);
          // 学生干部信息变更
          this.ScDutyName = '';
          if (this.User && this.User.StudentCadres && this.User.StudentCadres.length > 0) {
            this
              .User
              .StudentCadres
              .forEach(element => {
                console.log('dd', element);
                if (element.ScStatus !== '0') {
                  if (!this.ScDutyName) {
                    this.ScDutyName = `${element.ScDutyName}`;
                  } else {
                    this.ScDutyName = `${element.ScDutyName}、${this.ScDutyName}`;
                  }
                }
              });
            console.log('dd', this.ScDutyName);
          }
          if (this.User && this.User.StudentCadres && this.User.StudentCadres.length === 1) {
            this.ScDutyName = this.User.StudentCadres[0].ScDutyName;
          }
        } else {
          console.log('有问题');
        }
      });
  }

  /**
   * 延迟执行
   */
  getDetayUserInfo() {
    this.isSpinning = true;
    setTimeout(() => {
      this.getUserInfo(this.uid);
      this.isSpinning = false;
    }, 1000);
  }

  /**
   * 设置修改时的基本信息
   * @param basic
   */
  setUpateBasicInfo(basic) {
    const basicObj = this.basic;
    basicObj.uid = this.uid || ''; // uid
    basicObj.countryCode = basic.SbiCountryCode || null; // 国籍
    basicObj.nationalityCode = basic.SbiNationalityCode || null; // 民族
    basicObj.creed = basic.SbiCreed || null; // 宗教信仰
    basicObj.politicalCode = basic.SbiPoliticalCode || null; // 政治面貌
    basicObj.maritalCode = basic.SbiMaritalCode || null; // 婚姻状况
    basicObj.birthday = basic.SbiBirthday || ''; // 出生日期
    basicObj.qqAcct = basic.SbiQQAcct || ''; // QQ号
    basicObj.weChatAcct = basic.SbiWeChatAcct || ''; // 	微信
    basicObj.hobbies = basic.SbiHobbies || ''; // 	爱好特长
    basicObj.allPowerfulCardNum = basic.SbiAllPowerfulCardNum || ''; // 	一卡通号
    basicObj.accountBankCode = basic.SbiAccountBankCode || null; // 	开户行
    basicObj.bankCardNumber = basic.SbiBankCardNumber; // 	银行卡号
    basicObj.trainTicketInterval = basic.SbiTrainTicketInterval; // 	火车票优惠区间
    basicObj.familyAddress = basic.SbiFamilyAddressName; // 家庭地址
    basicObj.detailAddress = basic.SbiDetailAddress; // 	详细地址
    basicObj.postCode = basic.SbiPostCode || ''; // 邮政编码
    basicObj.homePhone = basic.SbiHomePhone || ''; // 家庭电话
  }

  /**
   * 设置修改时的用户信息
   * @param basic
   */
  setUpateUserInfo(User) {
    const UserInfo = this.UserInfo;
    UserInfo.uid = this.uid || ''; // uid
    UserInfo.identityNum = User.UIdentityNum || ''; // 身份证号
    UserInfo.email = User.UEmail || ''; // 电子邮件
    UserInfo.phone = User.UPhone || ''; // 联系方式

  }

  /**
   * 获取考勤信息
   */
  getAttendanceinfo(Attendance, status) {
    this
      .http
      .POST({
        Router: '/api/pc/bigdata/attendanceinfo',
        Method: 'POST',
        Body: {
          uid: this.uid,
          status: status,
          academy: '',
          year: Attendance.Year,
          term: Attendance.Term
        }
      })
      .subscribe(res => {
        console.log(res);
        if (!res.FeedbackCode) {
          this.AttendanceData = res.Data || [];
        } else {
          console.log('有问题');
        }
      });
  }

  /**
   * /api/pc/bigdata/querystudentfamilymember
   */
  getFamily(uid) {
    if (uid) {
      this
        .http
        .POST({ Router: '/api/pc/bigdata/querystudentfamilymember', Body: { uid: this.uid } })
        .subscribe(res => {
          if (!res.FeedbackCode) {
            this.User.Studentfamilymember = res.Data || [];
          }
        });
    }

  }

  /**
   * 切换菜单
   * @param item
   */
  changeMenu(item) {
    this
      .menus
      .forEach(menu => {
        // if (item.code === 'ComprehensiveEvaluationInfo') {
        //   this.router.navigate(['/assess'], { queryParams: { uid: this.uid } });
        // }
        // else
        if (menu.code === item.code) {
          item.checked = true;
          this.currentCode = item.code;
          if (menu.code === 'ComprehensiveEvaluationInfo') {
            // this.router.navigate(['/assess'], { queryParams: { uid: this.uid } });
            console.log('ComprehensiveEvaluationInfo');
            this.getSchoolCalendarNow();
          }
        } else {
          menu.checked = false;
        }
      });

  }

  /**
   * 打开modal
   * status:学生状态
   * StayInfo:住宿信息
   * StudentCadres:学生干部
   */
  openModal(data, type) {
    this
      .modalHelper
      .open(MessageComponent, {
        data: data,
        type: type,
        uid: this.route.snapshot.queryParams['uid']
      }, 600)
      .subscribe((geo) => {
        console.log('geo', geo);
      });
  }

  /**
   * 打开编辑modal
   * status:学生状态
   * StayInfo:住宿信息
   * StudentCadres:学生干部
   */
  openEditModal(type) {
    switch (type) {
      case 'StudentCadres':
        this
          .modalHelper
          .open(CadreEditComponent, { uid: this.uid }, 800)
          .subscribe((geo) => {
            this.getUserInfo(this.route.snapshot.queryParams['uid']);
          });
        break;
      case 'status':
        this
          .modalHelper
          .open(StatusEditComponent, { uid: this.uid }, 800)
          .subscribe((geo) => {
            this.getUserInfo(this.route.snapshot.queryParams['uid']);
          });
        break;
    }


  }

  /**
   * 眼睛
   * @param type
   */
  onEye(type) {
    console.log(type);
    this.eye[type] = !this.eye[type];
  }

  /**
   * 是否变更信息
   */
  updateInfo() {
    this.getUserInfo(this.uid);
    this.updateFlag = !this.updateFlag;
    console.log(this.updateFlag);
  }

  save() {
    this.saveBisicInfo();
  }

  /**
   * 基本信息保存(包含用户信息)
   */
  saveBisicInfo() {
    this.basic.originAreaCode = this.originArea.xian || '';
    this.basic.studentAreaCode = this.studentArea.xian || '';
    this.basic.familyAddress = this.familyAddress.xian || '';
    if (this.basic.birthday) {
      this.basic.birthday = moment(this.basic.birthday).format('YYYY-MM-DD');
    } else {
      this.basic.birthday = '';
    }
    console.log('originAreaCode:', this.originArea);
    console.log('studentAreaCode:', this.studentArea);
    // tslint:disable-next-line:max-line-length
    forkJoin(this.infoService.saveUser(this.UserInfo), this.infoService.saveBasic(this.commonService.mapObject(this.basic))).subscribe(res => {
      console.log(res);
      if (!res[0].FeedbackCode && !res[1].FeedbackCode) {
        this.msg.success('保存成功');
        this.updateFlag = false;
        this.getDetayUserInfo();
      } else if (res[0].FeedbackCode) {
        this.msg.error(res[0].FeedbackText);
      } else if (res[1].FeedbackCode) {
        this.msg.error(res[1].FeedbackText);
      }
    }, error => {
      this.msg.error(error);
    });

  }

  /**
   * 家庭成员编辑/新增
   * @param params
   */
  familyEdit(params = { uid: '' }) {
    params.uid = this.uid;
    this.modalHelper.static(FamilyEditComponent, { params: params }).subscribe(call => {
      this.getFamily(this.route.snapshot.queryParams['uid']);
    })
      ;
  }

  /**
   * 家庭成员删除
   * @param member
   */
  familyDelete(member) {
    console.log(member);
    if (member.RecordId) {
      this.http.POST({ Router: '/api/pc/bigdata/delstudentfamilymember', Body: { recordId: member.RecordId } }).subscribe(res => {
        if (!res.FeedbackCode) {
          this.getFamily(this.route.snapshot.queryParams['uid']);
          this.msg.success(res.FeedbackText);
        } else {
          this.msg.error(res.FeedbackText);
        }
      });
    }
  }

  /**
   * 奖学金
   */
  queryScholarShip() {
    this.http.POST({ Router: '/api/pc/prizeaidfreesupport/getprize', Body: { usercode: this.uid } }).subscribe(res => {
      if (!res.feedbackCode) {
        this.ScholarShips = res.Data || [];
      } else {
        console.log(res.feedbackText);
      }
    });
  }

  /**助学金*/
  queryStudentgrant() {
    this.http.POST({ Router: '/api/pc/prizeaidfreesupport/getaid', Body: { usercode: this.uid } }).subscribe(res => {
      if (!res.feedbackCode) {
        this.Studentgrant = res.Data || [];
      } else {
        console.log(res.feedbackText);
      }
    });
  }
  /**
 * 助学贷款
 */
  queryStudentloan() {
    this.http.POST({ Router: '/api/pc/prizeaidfreesupport/getloan', Body: { usercode: this.uid } }).subscribe(res => {
      if (!res.feedbackCode) {
        this.Studentloan = res.Data || [];
      } else {
        console.log(res.feedbackText);
      }
    });
  }
  /**
 * 勤工助学
 */
  queryDiligentstudy() {
    this.http.POST({ Router: '/api/pc/prizeaidfreesupport/getwork', Body: { usercode: this.uid } }).subscribe(res => {
      if (!res.feedbackCode) {
        this.Diligentstudy = res.Data || [];
      } else {
        console.log(res.feedbackText);
      }
    });
  }
  /**
 * 困难补助
 */
  queryDifficultySubsidy() {
    this.http.POST({ Router: '/api/pc/prizeaidfreesupport/getsubsidy', Body: { usercode: this.uid } }).subscribe(res => {
      if (!res.feedbackCode) {
        this.DifficultySubsidy = res.Data || [];
      } else {
        console.log(res.feedbackText);
      }
    });
  }
  /**
 * 学费减免
 */
  queryTuitionfree() {
    this.http.POST({ Router: '/api/pc/prizeaidfreesupport/getfree', Body: { usercode: this.uid } }).subscribe(res => {
      if (!res.feedbackCode) {
        this.Tuitionfree = res.Data || [];
      } else {
        console.log(res.feedbackText);
      }
    });
  }




  /**
   * 查询荣誉信息
   */
  queryStudentHonour() {
    this.http.POST({ Router: '/api/pc/bigdata/querystudenthonour', Body: { uid: this.uid } }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.StudentHonours = res.Data || [];
      } else {
        console.log(res.FeedbackText);
      }
    });
  }

  /**
   * 查询特殊群体
   */
  queryStudentSpecialCharacter() {
    this.http.POST({ Router: '/api/pc/bigdata/querystudentspecialcharacter', Body: { uid: this.uid } }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.StudentSpecialCharacters = res.Data || [];
      } else {
        console.log(res.FeedbackText);
      }
    });
  }

  /**
   * 查询违纪处分
   */
  queryStudentPunishment() {
    this.http.POST({ Router: '/api/pc/bigdata/querystudentpunishment', Body: { uid: this.uid } }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.StudentPunishments = res.Data || [];
      } else {
        console.log(res.FeedbackText);
      }
    });
  }

  /**
   * 查询安全事故
   */
  queryStudentSafetyIncident() {
    this.http.POST({ Router: '/api/pc/bigdata/querystudentsafetyincident', Body: { uid: this.uid } }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.StudentSafetyIncidents = res.Data || [];
      } else {
        console.log(res.FeedbackText);
      }
    });
  }

  /**
   * 奖助信息编辑
   * @param item
   */
  onScholarshipEdit(item = { uid: '' }) {
    item.uid = this.uid;
    this.modalHelper.static(ScholarshipaidEditComponent, { data: item }).subscribe(call => {
      this.queryScholarShip();
    });
  }

  /**
   * 奖助信息删除
   * @param item
   */
  onScholarshipDelete(item) {
    console.log(item);
    if (item.ssaRecordId) {
      this.http.POST({ Router: '/api/pc/bigdata/delstudentscholarshipaid', Body: { recordId: item.ssaRecordId } }).subscribe(res => {
        this.commonService.dealBack(res);
        this.queryScholarShip();
      });
    }
  }

  /**
   * 荣誉信息编辑
   * @param item
   */
  onHonourEdit(item = { uid: '' }) {
    item.uid = this.uid;
    this.modalHelper.static(HonourEditComponent, { data: item }).subscribe(call => {
      this.queryStudentHonour();
    });
  }

  /**
   * 荣誉信息删除
   * @param item
   */
  onHonourDelete(item) {
    console.log(item);
    if (item.shRecordId) {
      this.http.POST({ Router: '/api/pc/bigdata/delstudenthonour', Body: { recordId: item.shRecordId } }).subscribe(res => {
        this.commonService.dealBack(res);
        this.queryStudentHonour();
      });
    }
  }

  /**
   * 特殊群体编辑
   * @param item
   */
  onSpecialcharacterEdit(item = { uid: '' }) {
    item.uid = this.uid;
    this.modalHelper.static(SpecialcharacterEditComponent, { data: item }).subscribe(call => {
      this.queryStudentSpecialCharacter();
    });
  }

  /**
   * 特殊群体删除
   * @param item
   */
  onSpecialcharacterDelete(item) {
    console.log(item);
    if (item.sscRecordId) {
      this.http.POST({ Router: '/api/pc/bigdata/delstudentspecialcharacter', Body: { recordId: item.sscRecordId } }).subscribe(res => {
        this.commonService.dealBack(res);
        this.queryStudentSpecialCharacter();
      });
    }
  }

  /**
   * 违纪处分编辑
   * @param item
   */
  onStudentpunishmentEdit(item = { uid: '' }) {
    item.uid = this.uid;
    this.modalHelper.static(PunishmentEditComponent, { data: item }).subscribe(call => {
      this.queryStudentPunishment();
    });
  }

  /**
   * 违纪处分删除
   * @param item
   */
  onStudentpunishmentDelete(item) {
    console.log(item);
    if (item.spmRecordId) {
      this.http.POST({ Router: '/api/pc/bigdata/delstudentpunishment', Body: { recordId: item.spmRecordId } }).subscribe(res => {
        this.commonService.dealBack(res);
        this.queryStudentPunishment();
      });
    }
  }

  /**
   * 安全事故编辑
   * @param item
   */
  onStudentsafetyincidentEdit(item = { uid: '' }) {
    item.uid = this.uid;
    this.modalHelper.static(SafetyincidentEditComponent, { data: item }).subscribe(call => {
      this.queryStudentSafetyIncident();
    });
  }

  /**
   * 安全事故删除
   * @param item
   */
  onStudentsafetyincidentDelete(item) {
    console.log(item);
    if (item.ssiRecordId) {
      this.http.POST({ Router: '/api/pc/bigdata/delstudentsafetyincident', Body: { recordId: item.ssiRecordId } }).subscribe(res => {
        this.commonService.dealBack(res);
        this.queryStudentSafetyIncident();
      });
    }
  }


  // 综合素质评价——————————————————
  // 获取当前学年学期
  getSchoolCalendarNow() {
    this.infoService.querySchoolCalendarNow().subscribe(res => {
      if (!res.FeedbackCode) {
        this.getYearTermlist(res.Data.AcademicYear || '', this.uid);
      }
    });
  }

  // 展示学年学期数据
  showYearTermData(year: any, index: number) {
    if (year.show) {
      year.show = false;
      return;
    }
    year.show = true;
    this.getRadarChartData(this.yearTermData[index].AcademicYear, this.yearTermData[index].AcademicTerm, index);
    this.getRadarChartDataDetails(this.yearTermData[index].AcademicYear, this.yearTermData[index].AcademicTerm, index);
  }

  // 获取学年学期
  getYearTermlist(year: string, code: string) {
    this.infoService.queryYearTermlist(year, code).subscribe(res => {
      if (!res.FeedbackCode) {
        this.yearTermData = res.Data.Items || [];
        if (!this.yearTermData.length) {
          return;
        }
        this.yearTermData.forEach((value, index) => {
          if (index === 0) {
            value.show = true;
          } else {
            value.show = false;
          }
        });
        this.getRadarChartData(this.yearTermData[0].AcademicYear, this.yearTermData[0].AcademicTerm, 0);
        this.getRadarChartDataDetails(this.yearTermData[0].AcademicYear, this.yearTermData[0].AcademicTerm, 0);
      } else {
        this.msg.create('error', res.FeedbackText);
        this.yearTermData = [];
      }
    });
  }

  // 获取雷达图数据
  getRadarChartData(year: string, term: string, index: number) {
    this.infoService.queryRadarChartData(year, term, this.uid).subscribe(res => {
      if (!res.FeedbackCode) {
        this.yearTermData[index].radardata = [];
        this.yearTermData[index].radardata = res.Data.Items || [];
        if (this.yearTermData[index].radardata.length > 0) {
          let data = res.Data.Items || [];
          var totalScore = '';
          console.log('ddddddd');
          data.forEach(element => {
            totalScore = (parseFloat(totalScore || '0') + parseFloat(element.Score) / 10).toFixed(2);
          });
          this.yearTermData[index].totalScore = totalScore;
          this.showChart(this.yearTermData[index].radardata, index);
        }
      } else {
        this.msg.create('error', res.FeedbackText);
      }
    });
  }

  // 获取雷达图数据
  getRadarChartDataDetails(year: string, term: string, index: number) {
    this.infoService.queryRadarChartDataDetail(year, term, this.uid).subscribe(res => {
      if (!res.FeedbackCode) {
        let data = res.Data.Items || [];
        data.forEach(element => {
          element.score = 0;
          element.details.forEach(child => {
            element.score = (parseFloat(element.score) + parseFloat(child.score) / 10).toFixed(2);
          });
          element.score = element.score + '';
        });
        this.yearTermData[index].radardatadetail = [];
        this.yearTermData[index].radardatadetail = data;
      } else {
        this.msg.create('error', res.FeedbackText);
      }
    });
  }

  // 窗口
  onResize(event: any) {
    if (this.radarChart) {
      this.radarChart.resize();
    }
  }

  // 雷达图
  showChart(dataobj: any[], index: number) {
    let seriesData = [];
    let indicatorData = [];
    dataobj.forEach(element => {
      let d = parseFloat(element.Maximum) >= parseFloat(element.Score) ? parseFloat(element.Score) / 10 : parseFloat(element.Maximum) / 10;
      seriesData.push(d);
      indicatorData.push({
        name: element.BigEvaluateName,
        max: parseFloat(element.Maximum) / 10
      });
    });
    console.log('seriesData' + seriesData);
    console.log('indicatorData' + JSON.stringify(indicatorData));
    let option = {
      title: {
        text: ''
      },
      tooltip: {},
      legend: {
        // data: ['预算分配（Allocated Budget）']
      },
      radar: {
        name: {
          textStyle: {
            color: '#666',
            backgroundColor: '#fff',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        indicator: indicatorData
      },
      series: [{
        name: '',
        type: 'radar',
        itemStyle: { normal: { areaStyle: { type: 'default', color: '#cf6c69' } } },
        lineStyle: { color: '#cf6c69' },
        areaStyle: { color: '#cf6c69' },
        data: [
          {
            value: seriesData,
            itemStyle: {
              color: '#cf6c69'
            },
            // label: {
            //   normal: {
            //     show: true,
            //     formatter: function (params) {
            //       return params.value;
            //     }
            //   }
            // }
          }
        ]
      }]
    };
    setTimeout(() => {
      this.radarChart = undefined;
      this.radarChart = echarts.init(document.getElementById('radar' + index), 'antlinker');
      this.radarChart.setOption(option);
    }, 10);
  }
}
