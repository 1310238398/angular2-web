import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../http/http.service";
import {ModalHelper} from "../shared/helper/modal.helper";
import {ServelUrl} from "../ServelUrl";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-leaveschool',
  templateUrl: './leaveschool.component.html',
  styleUrls: ['./leaveschool.component.css']
})
export class LeaveschoolComponent implements OnInit {

  constructor(private httpService: HttpService, private route: Router, private msgsrv: NzMessageService) {
  }

  searchObj = {
    Academy: '',
    Major: '',
    Grade: '',
  }

  page = {
    Page: 1,
    PageSize: 20,
  };
  total = 0;

  Academys = [];
  Majors = [];
  Grades = [];


  _indeterminate = false;

  _allChecked = false;
  dataSet = [];

  ngOnInit() {
    this.onSearch();
    this.loadAcademy();
    this.loadGade();

  }

  _displayDataChange($event) {
    this.dataSet = $event;
    // this._refreshStatus();
  }

  _refreshStatus() {

    const allChecked = this.dataSet.every(value => value.checked === true);
    const allUnChecked = this.dataSet.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
  }

  haveCheck(): boolean {

    var flag = this.dataSet.some(item => {
      return item.checked
    })
    console.log(flag)
    return flag
  }

  _checkAll(value) {

    if (value) {
      this.dataSet.forEach(data => data.checked = true);
    } else {
      this.dataSet.forEach(data => data.checked = false);
    }
    this._refreshStatus();
  }

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

  onSelect(major) {
    console.log(`${major}`)
    if (major == 'major') {
      this.loadMajor(this.searchObj['Academy']);
    }
  }

  onSearch(reload = false) {
    this._allChecked = false;
    if (reload) {
      this.page.Page = 1;
    }
    this.httpService.POST({
      Router: ServelUrl.Url.queryAll,
      Method: 'POST',
      Body: {
        Academy: this.searchObj.Academy,
        Major: this.searchObj.Major,
        Grade: this.searchObj.Grade,
        Page: this.page.Page,
        PageSize: this.page.PageSize
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.dataSet = res.Data.Class;
        this.total = res.Data.Total
      } else {
        this.msgsrv.success(res.FeedbackText);
      }

    })

  }

  leaveClass() {

    let $have = this.dataSet.some(item => {
      return item.checked;
    });
    if (!$have) {
      this.msgsrv.warning("至少选择一个班级！");
      return
    }

    let $checkedClass = [];
    this.dataSet.forEach(item => {
      if (item.checked) {
        console.log(item);
        $checkedClass.push(item.ClassCode);
      }
    });
    this.dataSet.some(value => value.checked);
    this.httpService.POST({
      Router: ServelUrl.Url.doleave,
      Method: 'POST',
      Body: {
        Class: $checkedClass
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        console.log(res)
        this.onSearch();
        this.msgsrv.success(res.FeedbackText);
      }
    });

  }


  resetForm(f) {
    f.reset();
  }

}
