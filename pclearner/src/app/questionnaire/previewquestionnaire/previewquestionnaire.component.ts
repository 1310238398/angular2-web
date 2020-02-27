import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { HttpService } from "../../../http/http.service";
import { ModalHelper } from "../../shared/helper/modal.helper";
import { ServelUrl } from "../../ServelUrl";
import { DatePipe } from "@angular/common";
import { NzMessageService } from "ng-zorro-antd";
import { NzModalService } from 'ng-zorro-antd';
import { QuestionnaireComponent } from '../questionnaire.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { SelFont } from '@ng-zorro-antd';
declare var moment;

@Component({
  selector: 'app-previewquestionnaire',
  templateUrl: './previewquestionnaire.component.html',
  styleUrls: ['./previewquestionnaire.component.css']
})

export class PreviewquestionnaireComponent implements OnInit {
  ceshi: string[] = [];
  @ViewChild('selFont') selFont;
  constructor(private zone: NgZone, private datePipe: DatePipe,
    public httpService: HttpService, public msgSrv: NzMessageService, private modalHelper: ModalHelper, private router: ActivatedRoute, private route: Router,
     private confirmServ: NzModalService) {

  }


  isVisible = false;
  isOnlyVisible = false;
  id: string = '';
  status: string = '';
  // 蒙层2
  universityID: string = '';
  Campuss = [];
  Academys = [];
  Majors = [];
  Grades = [];
  Classs = [];
  startTimes: string = '';
  endTimes: string = '';
  now;
  academy = [];
  grade = [];
  major = [];

  show_value = "已选择";

  items = {
    Title: '',
    Status: '',
    StartTime: '',
    EndTime: '',
    Campus: [],
    Academy: [],
    Major: [],
    Grade: [],
    Class: [],
    SruveyDesc: '',
    Questions: '',
    Creator: '',
  }
  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.status = params['status'];

    });

    this.httpService.Post({
      Router: ServelUrl.Url.getQuestionnaireDetail,
      Method: 'POST',
      Body: {
        SurveyID: this.id
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.items = res.Data;
        this.httpService.PostJSON({
          Router: ServelUrl.Url.getUniversity,
          Method: 'POST',
          Body: {
          }
        }).then(res => {
          if (!res.FeedbackCode) {
            this.universityID = res.Data.University;
            this.loadCampus(this.universityID);
            this.loadAcademy(this.universityID);
            this.loadGade(this.universityID);
            this.loadMajor(this.universityID, this.items.Academy);
            this.loadClass(this.universityID, this.items.Major, this.items.Grade);
            this.judgeScope();
          }
        })
      }
    })

  }

  // 判断受众范围是否 已选择
  judgeScope() {
    if (this.items.Campus.length == 0) {
      this.items.Campus = [""];
      // console.log(`${this.items.Campus}`)
    }
    if (this.items.Academy.length == 0) {
      this.items.Academy = [""];
      // console.log(`${this.items.Academy}`)
    }
    if (this.items.Grade.length == 0) {
      this.items.Grade = [""]
    }
    if (this.items.Major.length == 0) {
      this.items.Major = [""]
    }
    if (this.items.Class.length == 0) {
      this.items.Class = [""]
    }
    if (this.items.Campus[0] == "" && this.items.Academy[0] == "" && this.items.Major[0] == "" && this.items.Grade[0] == "" && this.items.Class[0] == "") {
      this.show_value = "不做选择默认受众范围为整个学校";
    } else {
      this.show_value = "已选择";
    }
  }


  // 发布
  onPublish() {
    this.startTimes = this.datePipe.transform(this.items.StartTime, 'yyyyMMddHHmmss');
    this.endTimes = this.datePipe.transform(this.items.EndTime, 'yyyyMMddHHmmss');
    this.now = this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    if (this.startTimes > this.endTimes) {
      this.msgSrv.info('开始时间不能在结束时间之后！');
      return
    }
    if (this.now > this.endTimes) {
      this.msgSrv.success("截止时间不能早于当前时间");
      return;
    }
    // console.log("判断时间")
    this.items.Title = this.items.Title.trim();
    if (this.items.Title == '') {
      this.msgSrv.success("标题不能为空！");
      return;
    }
    if (this.startTimes == '') {
      this.msgSrv.success("起始时间不能为空！");
      return;
    }
    if (this.endTimes == '') {
      this.msgSrv.success("结束时间不能为空！");
      return;
    }
    if (this.items.Title.length > 30) {
      this.msgSrv.success("标题的字数不能超过30");
      return;
    }
    if (this.items.SruveyDesc.length > 300) {
      this.msgSrv.success("说明的字数不能超过300");
      return;
    }
    if (this.items.Campus.length == 0) {
      this.items.Campus = [""];

    }
    if (this.items.Academy.length == 0) {
      this.items.Academy = [""];

    }
    if (this.items.Grade.length == 0) {
      this.items.Grade = [""]
    }
    if (this.items.Major.length == 0) {
      this.items.Major = [""]
    }
    if (this.items.Class.length == 0) {
      this.items.Class = [""]
    }
    var majorname = [];
    this.httpService.Post({
      Router: ServelUrl.Url.publishQustionnaire,
      Method: 'POST',
      Body: {
        SurveyID: this.id,
        Title: this.items.Title,
        StartDate: this.startTimes,
        EndDate: this.endTimes,
        Campus: this.items.Campus || [""],
        Academy: this.items.Academy || [""],
        Major: this.items.Major || [""],
        Grade: this.items.Grade || [""],
        Class: this.items.Class || [""],
        Explain: this.items.SruveyDesc,
      }
    }).subscribe(res => {
      // this.isVisible = true;
      if (!res.RE) {
        this.items = res.Data;
        this.msgSrv.success("设置成功");
        this.route.navigate(['/questionnaire/ques']);
      }else {
        this.msgSrv.success(res.Text);
      }
    })
  }
  // 进行中的问卷修改时间 并保存
  onSave() {
    this.startTimes = this.datePipe.transform(this.items.StartTime, 'yyyyMMddHHmmss');
    this.endTimes = this.datePipe.transform(this.items.EndTime, 'yyyyMMddHHmmss');
    this.now = this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    if (this.now > this.endTimes) {
      this.msgSrv.success("结束时间不能再当前时间之前");
      return;
    }
    if (this.startTimes > this.endTimes) {
      this.msgSrv.info('开始时间不能在结束时间之后！');
      return
    }
    // if ()
    this.httpService.Post({
      Router: ServelUrl.Url.modifyOne,
      Method: 'POST',

      Body: {
        SurveyID: this.id,
        StartDate: this.startTimes,
        EndDate: this.endTimes,
      }
    }).subscribe(res => {
      if (!res.RE) {

        this.msgSrv.info(res.Text);
      }
    })
  }



  resetForm(form) {
    form.reset();
  }
  scals() {

    this.isOnlyVisible = true;
  }
  handleOnlyCancel(e) {
    this.isOnlyVisible = false;
  }


  handleCancel(e) {
    var that = this;
    this.confirmServ.confirm({
      title: '您编辑的内容未保存，确定退出吗？',
      content: '',
      zIndex: 10000,
      onOk() {
        that.isVisible = false;

      },
      onCancel() {
        that.isVisible = true;
      }
    });
  }

  scalsModal() {
    this.isVisible = true;
  }

  /*校区*/
  loadCampus(id) {
    this.httpService.PostJSON({
      Router: ServelUrl.Url.getCampusList,
      Method: 'POST',
      Body: {
        UniversityID: [id],
      }
    }).then(res => {
      if (!res.RE) {

        this.Campuss = res.Data;

      }
    });

  }
  compare(val1, val2) {
    if (val1.CampusID == val2.CampusID) {
      return true;
    } else {
      return false;
    }
  }
  // 学院
  loadAcademy(id) {
    this.httpService.PostJSON({
      Router: ServelUrl.Url.getAcademyList,
      Method: 'POST',
      Body: {
        University: id,
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Academys = res.Data;
      }

    });
  }
  // 专业
  loadMajor(code, condition) {
    this.httpService.PostJSON({
      Router: ServelUrl.Url.getMajorList,
      Method: 'POST',
      Body: {
        University: code,
        Academy: condition || [''],
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Majors = res.Data;

      }

    });

  }

  // 年级
  loadGade(code) {
    this.httpService.PostJSON({
      Router: ServelUrl.Url.getGradeList,
      Method: 'POST',
      Body: {
        University: code
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Grades = res.Data || [];
      }
    });
  }
  // 班级
  loadClass(code, major, grade) {

    this.httpService.PostJSON({
      Router: ServelUrl.Url.getClassList,
      Method: 'POST',
      Body: {
        University: code,
        Major: major || '',
        Grade: grade || '',
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Classs = res.Data;
      }

    });
  }
  onSelect(type) {
    switch (type) {
      case 'major':
        this.loadMajor(this.universityID, this.items.Academy)
        break;
      case 'class':
        this.loadClass(this.universityID, this.items.Major, this.items.Grade);
        break;
    }
  }

  handleOk = (e) => {
    this.judgeScope();
    this.isVisible = false;
  }
}
