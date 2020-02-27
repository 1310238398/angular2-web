import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpService } from "../../http/http.service";
import { ModalHelper } from "../shared/helper/modal.helper";
import { ClassinfoEditComponent } from "./edit/classinfo.edit.component";
import { ClassCadreComponent } from "./classcadre/cadre";

import { ServelUrl } from "../ServelUrl";

@Component({
  selector: 'app-classinfo',
  templateUrl: './classinfo.list.html',
  styleUrls: ['classinfo.list.css']
})
export class ClassinfoListComponent implements OnInit {
  searching=false;
  exporting = false;
  dataSet = [];
  Campuss = [];
  Academys = [];
  Majors = [];
  Grades = [];
  Classs = [];
  StudentTypes = [];
  Counselors = [];
  Advisers = [];
  classCadre = [
    {
      Name: '有班委',
      value: '1'
    },
    {
      Name: '无班委',
      value: '0'
    }
  ];
  classStatus = [
    {
      Name: '正常',
      value: '1'
    },
    {
      Name: '已毕业',
      value: '4'
    }
  ];
  searchObj = {
    Campus: '',
    Academy: '',
    Major: '',
    Grade: '',
    Class: '',
    StudentType: '',
    Counselor: '',
    Adviser: '',
    ClassCadre: '', //是否设置了班委
    IsGraduate:'' //1正常 4已毕业 其他为正常+已毕业
  };
  page = {
    Page: 1,
    PageSize: 20,
  };
  total = 0;

  constructor(
    public _message: NzMessageService,
    public httpService: HttpService,
    private modalHelper: ModalHelper) {
  }

  ngOnInit() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.getCampus,
      Method: 'POST',
      Body: {}
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Campuss = res.Data || [];
      }

    });
    this.loadAcademy();
    this.loadGade();
    this.loadBizCode('StudentType');
    this.onSearch(); // 数据查询
  }


  /*加载学院*/
  loadAcademy() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.getAcademy,
      Method: 'POST',
      Body: {}
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Academys = res.Data || [];
      }

    });

  }

  /*加载专业*/
  loadMajor(code) {
    this.httpService.postJSON({
      Router: ServelUrl.Url.getMajor,
      Method: 'POST',
      Body: {
        Academy: code
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Majors = res.Data || [];
      }

    });

  }

  /*加载年级*/
  loadGade() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.getGrade,
      Method: 'POST',
      Body: {}
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Grades = res.Data || [];
      }

    });

  }

  /*加载班级*/
  loadClass(condition) {
    this.httpService.postJSON({
      Router: ServelUrl.Url.getClass,
      Method: 'POST',
      Body: {
        Campus: condition.Campus || "",
        Academy: condition.Academy || '',
        Major: condition.Major || '',
        Grade: condition.Grade || ''
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Classs = res.Data || [];
      }

    });

  }

  /*加载bizcode*/
  loadBizCode(code) {
    this.httpService.postJSON({
      Router: ServelUrl.Url.getBizCode,
      Method: 'POST',
      Body: {
        parameter: [code]
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        let $_var = `${code}s`;
        this[$_var] = res.Data || [];
      }

    });

  }

  /*加载辅导员、班主任*/
  loadStaff(code) {
    this.httpService.postJSON({
      // Router: ServelUrl.Url.getStaff,
      Router: '/api/classinfo/staffuserdownboxinit2',
      Method: 'POST',
      Body: {
        Academy: this.searchObj.Academy || '',
        StaffType: code
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        let $_var = `${code}s`;
        this[$_var] = res.Data || [];
      }

    });

  }


  onChange(_form, type) {
    console.log(_form);
    /*    for (let name in _form.controls) {
          this.searchObj[name] = null;
        }*/
    //this.searchObj.Academy=null;
    /*  switch (type) {
        case 1:
          this.loadAcademy(this.searchObj.Campus);
          break;
      }*/
  }

  onSelect(type) {
    switch (type) {
      case 'major':
        console.log(this.searchObj);
        this.loadMajor(this.searchObj.Academy);
        break;
      case 'class':
        console.log(this.searchObj);
        this.loadClass(this.searchObj);
        break;
    }

  }

  onSearch(reload = false) {
    if (reload) {
      this.page.Page = 1
    }
    console.log(this.searchObj);
    //this.searchObj.InsertDatetime = this.datePipe.transform(this.searchObj.InsertDatetime, 'yyyy-MM-dd');
    this.searching=true;
    this.httpService.POST({
      Router: ServelUrl.Url.getList,
      Method: 'POST',
      Body: {
        params: this.searchObj,
        start: this.page.Page - 1,
        limit: this.page.PageSize
      }
    }).subscribe(res => {
      this.searching=false;
      if (!res.FeedbackCode) {
        this.dataSet = res.items;
        this.total = res.total;
      }

    })
  }

  resetForm(form) {
    form.reset();
  }

  export() {
    this.exporting = true;
    this.httpService.POST({
      Router: 'api/classinfo/classqueryexport',
      Method: 'POST',
      Body: {
        params: this.searchObj
      }
    }).subscribe(res => {
      this.exporting = false;
      if (!res.FeedbackCode) {
        window.location.href = res.Data.url;
      } else {
        this._message.create('error', res.FeedbackText);
      }
    })
  }

  edit(data) {
    this.modalHelper.open(ClassinfoEditComponent, { data }).subscribe((res) => {
      if (res) {
        this.onSearch();
      }
    });
  }

  showClassCadre(data) {
    this.modalHelper.open(ClassCadreComponent, { data }).subscribe(() => {
      //this.msgSrv.info('修改成功');
    });
  }
}
