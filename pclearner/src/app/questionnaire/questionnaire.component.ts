import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../http/http.service";
import { ModalHelper } from "../shared/helper/modal.helper";
import { ServelUrl } from "../ServelUrl";
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd";


declare var antlinker;
@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  isVisible = false;
  universityCode: string = '';
  loadingPop;
  constructor(public msgSrv: NzMessageService, public httpService: HttpService, private modalHelper: ModalHelper, private router: Router) {


  }
  loading = true;
  dataItems = [];
  datas = [];
  // 显示更多按钮
  showMore: boolean;
  // 问卷id
  surveyID = '';
  total;
  searchObj = {
    Title: '',
    Status: '',
    sortTime: '',
  }

  ngOnInit() {
    // this.onSearch();

    this.httpService.PostJSON({
      Router: ServelUrl.Url.checkUser,
      Method: 'POST',
      Body: {}
    }).then(res => {
      if (!res.FeedbackCode) {
        // this.Campuss = res.Data || [];
        if (res.Data.Staff == 1) {
          this.onSearch();
        }
        else if (res.Data.Staff == 0) {
          this.msgSrv.success("您无权限进行该操作！");
        }
      }
    });
  }




  help() {
    this.isVisible = true;
  }

  // 重置
  resetForm(form) {
    form.reset();
    this.searchObj.Title = null;
    this.searchObj.Status = null;
    this.searchObj.sortTime = null;
  }
  // 查询
  onSearch() {
    this.loading = true;
    this.datas = [];
    this.searchObj.sortTime = '';
    Object.keys(this.searchObj).forEach(value => {
      this.searchObj[value] = this.searchObj[value] || '';
    });
    if (this.searchObj.Status == '') {
      this.searchObj.Status = '999'
    }
    this.httpService.Post({
      Router: ServelUrl.Url.getquestionnaaires,
      Method: 'POST',
      Body: {
        Title: this.searchObj.Title,
        Status: this.searchObj.Status,
        SortTime: this.searchObj.sortTime,
        Count: 5
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.dataItems = res.Data;
        this.loading = false;
        if (this.dataItems != null) {
          for (var i = 0; i < this.dataItems.length; i++) {
            this.datas.push(this.dataItems[i]);
          }
          if (this.dataItems.length < 5) {
            this.showMore = false;    //没了，
          } else if (this.dataItems.length == 5) {
            this.showMore = true;
          }

        } else {
          this.datas = [];
        }
      } else {
        this.msgSrv.success(res.Text);
      }
    })
  }
  onMore() {
    this.loading = true;
    Object.keys(this.searchObj).forEach(value => {
      this.searchObj[value] = this.searchObj[value] || '';
    });
    if (this.searchObj.Status == '') {
      this.searchObj.Status = '999'
    }
    if (this.dataItems.length != 0) {
      this.searchObj.sortTime = this.dataItems[this.dataItems.length - 1].SortTime;

    }
    this.httpService.Post({
      // surId:
      Router: ServelUrl.Url.getquestionnaaires,
      Method: 'POST',
      Body: {
        Title: this.searchObj.Title,
        Status: this.searchObj.Status,
        SortTime: this.searchObj.sortTime,
        Count: 5
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.loading = false;
        this.dataItems = res.Data;
        console.log(this.dataItems);
        if (this.dataItems != null) {
          for (var i = 0; i < this.dataItems.length; i++) {
            this.datas.push(this.dataItems[i]);
          }
        }
        console.log(this.datas)

        if (this.dataItems.length < 5) {
          this.showMore = false;    //没了，
        } else {
          this.showMore = true;     //需要继续点击
        }
      } else {
        this.msgSrv.success(res.Text);
      }
    })

  }




  handleCancel(e) {
    this.isVisible = false;
  }
  // 问卷分析
  quetionAnalysis(data) {
    this.router.navigate(['/questionnaire/analysis', { id: data.SurveyID, title: data.Title, campus: data.Campus, academy: data.Academy, class: data.Class, grade: data.Grade, major: data.Major }]);
  }
}
