import {Component, OnInit} from '@angular/core';
import {HttpRequest, HttpClient, HttpResponse} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {DatePipe} from "@angular/common";
import {NzMessageService} from "ng-zorro-antd";
import * as moment from 'moment';
import {HttpService} from "../../http/http.service";
import {ActivityService} from "./activity.service";
import {CheckMenuFieldService} from "../service/checkMenuField.service";

import {ServelUrl} from "../ServelUrl";

@Component({
  selector: 'app-activityadd',
  templateUrl: './add.html',
  styleUrls: ['activity.css']
})
export class ActivityAddComponent implements OnInit {
  saveLoading = false;
  valForm: FormGroup;
  uploadimgs = [];
  isVisible = false;
  universitycode = '';
  campusList = [];
  academyList = [];
  majorList = [];
  gradeList = [];
  classList = [];
  now = new Date().getTime();
  scope = {
    campus: [],
    academy: [],
    major: [],
    grade: [],
    class: []
  };
  typeList = [
    {
      name: '文体活动',
      value: '文体活动'
    },
    {
      name: '公益活动',
      value: '公益活动'
    },
    {
      name: '学术科研',
      value: '学术科研'
    },
    {
      name: '休闲娱乐',
      value: '休闲娱乐'
    },
    {
      name: '外出旅行',
      value: '外出旅行'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private msgsrv: NzMessageService,
    public httpService: HttpService,
    private activityService: ActivityService,
    private checkMenuFieldService: CheckMenuFieldService
  ) {
  }

  ngOnInit() {
    this.valForm = this.fb.group({
      ACTIVITYTITLE: ['', [Validators.required, this.checkMenuFieldService.checkSpace, this.maxlength]],
      ACTIVITYDESC: ['', [Validators.required, this.checkMenuFieldService.checkSpace]],
      ACTIVITYLOWER: [''],
      ACTIVITYEND: ['', [Validators.required]],
      ACTIVITYSTART: [''],
      ACTIVITYADD: [''],
      ACTIVITYTYPE: ['', Validators.required],
      ACTIVITYSPONSOR: [''],
      CAMPUS: [[]],
      ACADEMY: [[]],
      MAJOR: [[]],
      CLASS: [[]],
      GRADE: [[]],
      ACADEMYNAME: [[]],
      MAJORNAME: [[]],
      CLASSNAME: [[]],
    });
    this.getUniversity(); // 请求学校
  }

  // 最大长度
  maxlength = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return;
    } else if (control.value.trim().length > 30) {
      return {maxlength: true, error: true};
    }
  }

  beforeUpload = (file: any) => {
    if (!file) {
      return;
    }
    const limit = 1024 * 1024 * 1;
    if (file.size > limit) {
      this.msgsrv.error('请上传小于1M的照片', {nzDuration: 5000});
      return false;
    }
    const fileType = file.name.substring(file.name.lastIndexOf('.'));
    const imageTypes = '.jpg.jpeg';
    if (imageTypes.indexOf(fileType) === -1) {
      this.msgsrv.error('上传失败，图标只能上传jpg、jpeg类型的图片', {nzDuration: 5000});
      return false;
    }

    console.log('this.uploadimgs.length  ' + this.uploadimgs.length);
    if (this.uploadimgs.length > 8) {
      this.msgsrv.error('最多只能上传9张图片', {nzDuration: 5000});
      return false;
    }
    this.uploadimgs.push(file);
    return false;
  }

  delete(index: number) {
    this.uploadimgs.splice(index, 1);
  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue) {
      return false;
    }
    return startValue.getTime() <= this.now;
  }

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue) {
      return false;
    } else {
      if (this.valForm.value.ACTIVITYEND && this.valForm.value.ACTIVITYEND.getTime()) {
        return endValue.getTime() < this.valForm.value.ACTIVITYEND.getTime()
      } else {
        return endValue.getTime() < this.now
      }

    }
  }


  // 精确查询
  getInfoOne(id: string): void {
    this.activityService.queryOne(id).then(res => {
      this.valForm.reset(res.Data);
      this.valForm.value.CAMPUS ? this.scope.campus = this.valForm.value.CAMPUS : [];
      this.valForm.value.GRADE ? this.scope.grade = this.valForm.value.GRADE : [];
      this.valForm.value.ACADEMY ? this.scope.academy = this.valForm.value.ACADEMY : [];
      this.valForm.value.MAJOR ? this.scope.major = this.valForm.value.MAJOR : [];
      this.valForm.value.CLASS ? this.scope.class = this.valForm.value.CLASS : [];
      if (this.scope.academy.length > 0) {
        this.academyChange(this.scope.academy, 'edit');
      }
      if (this.scope.grade.length > 0 && this.scope.major.length > 0) {
        this.gradeChange(this.scope.grade, 'edit');
      }
    });
  }

  // 请求学校
  getUniversity(): void {
    this.activityService.queryUniversity().then(res => {
      this.universitycode = res.Data.University;

      this.getCampus(this.universitycode); // 请求校区
      this.getAcademy(this.universitycode); // 请求学院
      this.getGrade(this.universitycode); // 请求年级
    });
  }

  // 请求校区
  getCampus(universitycode: string): void {
    this.activityService.queryCampus(universitycode).then(res => {
      this.campusList = res.Data;
    });
  }

  // 请求学院
  getAcademy(universitycode: string): void {
    this.activityService.queryAcademy(universitycode).then(res => {
      this.academyList = res.Data;
    });
  }

  // 请求专业
  getMajor(universitycode: string, academyids: string[]): void {
    this.activityService.queryMajor(universitycode, academyids).then(res => {
      this.majorList = res.Data;
    });
  }

  // 请求年级
  getGrade(universitycode: string): void {
    this.activityService.queryGrade(universitycode).then(res => {
      this.gradeList = res.Data;
    });
  }

  // 请求班级
  getClass(universitycode: string, majorids: string[], gradeids: string[]): void {
    this.activityService.queryClass(universitycode, majorids, gradeids).then(res => {
      this.classList = res.Data;
    });
  }

  // 学院变化
  academyChange(academyids: string[], type: string): void {
    console.log('academychange');
    if (!academyids) {
      return;
    }
    if (academyids.length === 0) {
      this.majorList.length = 0;
      this.scope.major = [];
    }
    if (type === 'select') {
      this.scope.major ? this.scope.major = [] : []; // 清空班级列表
    }

    // 专业
    this.getMajor(this.universitycode, academyids);
  }

  // 专业变化
  majorChange(majorids: string[], type: string): void {
    if (!majorids || !this.scope.grade) {
      return;
    }
    if (majorids.length === 0 || this.scope.grade.length === 0) {
      this.scope.class = [];
      this.classList = [];
      return;
    }
    if (type === 'select') {
      this.scope.class ? this.scope.class = [] : []; // 清空班级列表
    }
    // 班级
    this.getClass(this.universitycode, majorids, this.scope.grade);
  }

  // 年级变化
  gradeChange(grade: string[], type: string): void {
    if (!grade || !this.scope.major) {
      return;
    }
    if (grade.length === 0 || this.scope.major.length === 0) {
      this.scope.class = [];
      this.classList = [];
      return;
    }
    if (type === 'select') {
      this.scope.class ? this.scope.class = [] : []; // 清空班级列表
    }
    // const majorids = [];
    // this.scope.major.forEach((value, index) => {
    //     majorids.push(value.deptcode);
    // });
    // 班级
    this.getClass(this.universitycode, this.scope.major, grade);
  }

  handleOk = (e) => {
    this.isVisible = false;
    // 学院
    const academynames = [];
    this.scope.academy.forEach((value) => {
      for (let i = 0; i < this.academyList.length; i++) {
        if (this.academyList[i].deptcode === value) {
          academynames.push(this.academyList[i].deptname);
        }
      }
    });
    this.valForm.patchValue({ACADEMY: this.scope.academy});
    this.valForm.patchValue({ACADEMYNAME: academynames});

    // 班级
    const classnames = [];
    this.scope.class.forEach((value) => {
      for (let i = 0; i < this.classList.length; i++) {
        if (this.classList[i].deptcode === value) {
          classnames.push(this.classList[i].deptname);
        }
      }
    });
    this.valForm.patchValue({CLASS: this.scope.class});
    this.valForm.patchValue({CLASSNAME: classnames});

    // 专业
    const majornames = [];
    this.scope.major.forEach((value) => {
      for (let i = 0; i < this.majorList.length; i++) {
        if (this.majorList[i].deptcode === value) {
          majornames.push(this.majorList[i].deptname);
        }
      }
    });
    this.valForm.patchValue({MAJOR: this.scope.major});
    this.valForm.patchValue({MAJORNAME: majornames});

    this.valForm.patchValue({CAMPUS: this.scope.campus || []});
    this.valForm.patchValue({GRADE: this.scope.grade || []});
  }

  handleCancel = (e) => {
    this.isVisible = false;
  }

  // 列表请求
  save(): void {
    for (const i in this.valForm.controls) {
      this.valForm.controls[i].markAsDirty();
    }
    if (!this.valForm.valid) {
      return;
    }
    let url = ServelUrl.Url.activitysave;
    let formData = new FormData();
    formData.append("ACTIVITYTITLE", this.valForm.value.ACTIVITYTITLE.trim());
    formData.append("ACTIVITYDESC", this.valForm.value.ACTIVITYDESC.trim());
    formData.append("ACTIVITYLOWER", this.valForm.value.ACTIVITYLOWER.toString());
    formData.append("ACTIVITYEND", moment(this.valForm.value.ACTIVITYEND).format('YYYYMMDDHHmmss'));
    formData.append("ACTIVITYSTART", this.valForm.value.ACTIVITYSTART ? moment(this.valForm.value.ACTIVITYSTART).format('YYYYMMDDHHmmss') : '');
    formData.append("ACTIVITYADD", this.valForm.value.ACTIVITYADD.toString());
    formData.append("ACTIVITYTYPE", this.valForm.value.ACTIVITYTYPE);
    formData.append("ACTIVITYSPONSOR", this.valForm.value.ACTIVITYSPONSOR.toString());
    formData.append("CAMPUS", JSON.stringify(this.valForm.value.CAMPUS.length > 0 ? this.valForm.value.CAMPUS : ['']));
    formData.append("ACADEMY", JSON.stringify(this.valForm.value.ACADEMY.length > 0 ? this.valForm.value.ACADEMY : ['']));
    formData.append("MAJOR", JSON.stringify(this.valForm.value.ACADEMY.length > 0 ? this.valForm.value.MAJOR : ['']));
    formData.append("CLASS", JSON.stringify(this.valForm.value.CLASS.length > 0 ? this.valForm.value.CLASS : ['']));
    formData.append("GRADE", JSON.stringify(this.valForm.value.GRADE.length > 0 ? this.valForm.value.GRADE : ['']));
    formData.append("ACADEMYNAME", JSON.stringify(this.valForm.value.ACADEMYNAME.length > 0 ? this.valForm.value.ACADEMYNAME : ['']));
    formData.append("MAJORNAME", JSON.stringify(this.valForm.value.MAJORNAME.length > 0 ? this.valForm.value.MAJORNAME : ['']));
    formData.append("CLASSNAME", JSON.stringify(this.valForm.value.CLASSNAME.length > 0 ? this.valForm.value.CLASSNAME : ['']));
    formData.append("IMGCOUNT", this.uploadimgs.length.toString());
    this.uploadimgs.forEach((value, index) => {
      formData.append(`image${index}`, value);
    });
    formData.append('router', url);
    this.saveLoading = true;
    this.httpService.postFormData(formData, (res => {
      if (res.RE === 0) {
        this.msgsrv.success(res.Text);
        this.router.navigate(['/activity']);
      } else {
        if (res.status == '413') {
          this.msgsrv.error('文件总体积过大!');
        } else {
          this.msgsrv.error("出错了");
        }


      }
      this.saveLoading = false;
    }), '/api/appsrv/file');
  }

  cancle(): void {
    this.router.navigate(['/activity']);
  }
}
