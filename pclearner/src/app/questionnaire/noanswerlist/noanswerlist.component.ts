import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../../http/http.service";
import { ModalHelper } from "../../shared/helper/modal.helper";
import { ServelUrl } from "../../ServelUrl";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd";
import { NzModalService } from 'ng-zorro-antd';
@Component({
  selector: 'app-noanswerlist',
  templateUrl: './noanswerlist.component.html',
  styleUrls: ['./noanswerlist.component.css']
})
export class NoanswerlistComponent implements OnInit {
  isVisible = false;
  surveyId: string = '';
  dataItem = [];
  Items = [];
  title = [];
  Campuss = [];
  Academys = [];
  Majors = [];
  Grades = [];
  Classs = [];
  Academy: string[] = [];
  Campus: string[] = [];
  Major: string[] = [];
  Grade: string[] = [];
  Class: string[] = [];
  universityID = '';
  status = 1;
  loadingSpin = true;
  loading = false;
  isVisibleSelect = false;
  show_value = "已选择";
  sta = '';
  modaiData = {
    Academy: [],
  };

  constructor(public msgSrv: NzMessageService, private confirmServ: NzModalService, public httpService: HttpService, private modalHelper: ModalHelper, private router: ActivatedRoute, private route: Router) {

  }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.surveyId = params['id'] || [];
      this.title = params['title'] || [];
      this.sta = params['sta'];
      // if (params.hasOwnProperty('academy')) {
        
        this.Campus = params['campus'].split(",");
        this.Academy = params['academy'].split(",");
        this.Grade = params['grade'].split(",");
        this.Major = params['major'].split(",");
        this.Class = params['class'].split(",");
      // } 
    });
    this.httpService.PostJSON({
      Router: ServelUrl.Url.getUniversity,
      Method: 'POST',
      Body: {
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        console.log("分割线" + 121);
        this.universityID = res.Data.University;
        this.loadCampus(this.universityID);
        this.loadAcademy(this.universityID);
        this.loadGade(this.universityID);
        this.loadMajor(this.universityID, this.Academy);
        this.loadClass(this.universityID, this.Major, this.Grade);
      }
    })
    this.judgeScope();
    this.nodoList();

  }

  // 查询为答题人员数据
  nodoList() {
    this.loading = false;
    this.loadingSpin = true;
    if (this.Campus.length == 0) {
      this.Campus = [""];

    }
    if (this.Academy.length == 0) {
      this.Academy = [""];
    }
    if (this.Grade.length == 0) {
      this.Grade = [""]
    }
    if (this.Major.length == 0) {
      this.Major = [""]
    }
    if (this.Class.length == 0) {
      this.Class = [""]
    }
    this.httpService.Post({

      Router: ServelUrl.Url.getNoDoList,
      Method: 'POST',
      Body: {
        SurveyID: this.surveyId,
        Status: this.status,
        Campus: this.Campus || [""],
        Academy: this.Academy || [""],
        Major: this.Major || [""],
        Grade: this.Grade || [""],
        Class: this.Class || [""],
      }
    }).subscribe(res => {
      this.loadingSpin = false;
      if (!res.RE) {
        this.loading = true;
        this.modaiData.Academy = res.Data[0].Academy;
        this.dataItem = [];
        for (var i = 1; i < res.Data.length; i++) {
          this.dataItem.push(res.Data[i]);
        }
        this.Items = this.dataItem;
        // console.log(this.Items);
      } else {
        this.msgSrv.success("问卷数据有误，请联系小助手");
      }
      // else{}

    })
  }
  // 判断受众范围是否 已选择
  judgeScope() {
    // console.log(this.modaiData)
    if (this.Campus.length == 0) {
      this.Campus = [""];
      // console.log(`${this.Campus}`)
    }
    if (this.Academy.length == 0) {
      this.Academy = [""];
      // console.log(`${this.Academy}`)
    }
    if (this.Grade.length == 0) {
      this.Grade = [""]
    }
    if (this.Major.length == 0) {
      this.Major = [""]
    }
    if (this.Class.length == 0) {
      this.Class = [""]
    }
    if (this.modaiData.Academy == [""]) {
      this.modaiData.Academy = [""];
    }
    if (this.Campus[0] == "" && this.Academy[0] == "" && this.Major[0] == "" && this.Grade[0] == "" && this.Class[0] == "") {
      this.show_value = "不做选择默认查询已发布的全部范围";
    } else {
      this.show_value = "已选择";
      console.log(this.status)
      this.status = 1;
      console.log(this.status)
    }
  }
  modal() {
    this.isVisibleSelect = true;
  }
  handleCancelSelect(e) {
    // this.isVisibleSelect = false;

    var that = this;
    this.confirmServ.confirm({
      title: '您编辑的内容未保存，确定退出吗？',
      content: '',
      zIndex: 10000,
      onOk() {
        that.isVisibleSelect = false;

      },
      onCancel() {
        that.isVisibleSelect = true;
      }
    });

  }
  handleOkSelect(e) {
    this.isVisibleSelect = true;  
    this.nodoList();
    this.judgeScope();
    this.isVisibleSelect = false;
  }

  download() {
    this.httpService.PostJSON({
      Router: ServelUrl.Url.exportNoDoList,
      Method: 'POST',
      Body: {
        Status: this.status,
        SurveyID: this.surveyId,
        Campus: this.Campus,
        Academy: this.Academy,
        Major: this.Major,
        Grade: this.Grade,
        Class: this.Class,
      }
    }).then(res => {
      if (!res.RE) {
        this.msgSrv.success(res.FeedbackText);
        var a = document.createElement('a');
        var filename = '未答题人员信息.xlsx';
        a.href = res.Data.URL;
        a.download = filename;
        a.click();
      }
      else if (res.RE == 1) {
        this.msgSrv.success("问卷数据有误，请联系小助手");
      }
    });
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
      if (!res.FeedbackCode) {
        this.Campuss = res.Data;
        console.log(this.Campuss)
      }
    });

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
    console.log(condition);
    if (condition[0] == "" && this.modaiData.Academy.length != 0) {
      condition = this.modaiData.Academy;
    }

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
        this.Grades = res.Data;
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
    console.log()
    switch (type) {
      case 'major':
        this.loadMajor(this.universityID, this.Academy)
        break;
      case 'class':
        this.loadClass(this.universityID, this.Major, this.Grade);
        break;
    }
  }


}
