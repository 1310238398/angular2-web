import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from "../../../http/http.service";
import {ServelUrl} from "../../ServelUrl";

@Component({
  selector: 'ant-datascope',
  templateUrl: './datascope.component.html',
  styleUrls: ['./datascope.component.less']
})
export class DatascopeComponent implements OnInit {
@Input() searchObj;
  Academys=[];
  Majors=[];
  Grades=[];
  Classs=[];
  constructor(private httpService:HttpService) { }

  ngOnInit() {
    this.loadAcademy();
    this.loadGade();
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
  onSelect(type) {
    switch (type) {
      case 'major':
        this.loadMajor(this.searchObj['Academy']);
        break;
      case 'class':
        this.loadClass(this.searchObj);
        break;
    }

  }
}
