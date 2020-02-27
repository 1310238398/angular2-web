import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { HttpService } from "../../../http/http.service";
import { ServelUrl } from "../../ServelUrl";
import { NzMessageService } from "ng-zorro-antd";
import { ModalHelper } from "../../shared/helper/modal.helper";
import { EditStudentstatusComponent } from "./edit-studentstatus/edit-studentstatus.component";
import { StudentEditComponent } from "./edit/student.edit.component";

@Component({
  selector: 'app-studentreset',
  templateUrl: './studentreset.component.html',
  encapsulation: ViewEncapsulation.None
})
export class StudentresetComponent implements OnInit {
  validateForm: FormGroup;
  isUserAddVisible = false;
  dataSet = [];
  Campuss = [];
  Academys = [];
  Majors = [];
  Grades = [];
  Classs = [];
  StudentTypes = [];
  StudentStatuss = [];
  searchObj = {
    UserCode: '',
    Name: '',
    Campus: '',
    Academy: '',
    Major: '',
    Grade: '',
    Class: '',
    UserType: '',
    StudentStatus: ''
  };
  page = {
    Page: 1,
    PageSize: 40,
  };
  total = 0;

  constructor(private fb: FormBuilder, private modalHelper: ModalHelper, public httpService: HttpService, public msgSrv: NzMessageService) {
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
    this.loadBizCode('StudentStatus');
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
      Router: ServelUrl.Url.getStaff,
      Method: 'POST',
      Body: {
        Academy: this.searchObj.Academy,
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
        this.loadMajor(this.searchObj.Academy || '');
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
    this.httpService.POST({
      Router: ServelUrl.Url.getStudentList,
      Method: 'POST',
      Body: {
        params: this.searchObj,
        start: this.page.Page - 1,
        limit: this.page.PageSize
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.dataSet = res.items;
        this.total = res.total;
      }

    })
  }

  resetForm(form) {
    form.reset();
    Object.keys(this.searchObj).forEach(value => {
      this.searchObj[value] = '';
    })
  }

  onReset(code) {
    this.httpService.postJSON({
      Router: ServelUrl.Url.userpasswdreset,
      Method: 'POST',
      Body: {
        IntelUserCode: code
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.msgSrv.success(res.FeedbackText)
      } else {
        this.msgSrv.error(res.FeedbackText)
      }

    })
  }

  onLogout(code) {
    this.httpService.postJSON({
      Router: ServelUrl.Url.userdelete,
      Method: 'POST',
      Body: {
        IntelUserCode: code
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.msgSrv.success(res.FeedbackText);
        this.onSearch(true);
      } else {
        this.msgSrv.error(res.FeedbackText)
      }
    })
  }

  // 编辑
  edit(data) {
    this.modalHelper.open(EditStudentstatusComponent, { data }).subscribe(() => {
      this.onSearch();
    })
  }

  // 添加用户
  addUser() {
    this.modalHelper.open(StudentEditComponent, {}).subscribe(() => {
      this.onSearch();
    });
  }

  // 编辑用户
  editUser(data) {
    this.modalHelper.open(StudentEditComponent, {data}).subscribe(() => {
      this.onSearch();
    });
  }
}
