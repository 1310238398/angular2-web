import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../http/http.service";
import {ServelUrl} from "../../ServelUrl";
import {ModalHelper} from "../../shared/helper/modal.helper";
import {NzMessageService} from "ng-zorro-antd";
import {ClassstudentadmineditComponent} from "../classstudentadminedit/classstudentadminedit.component";
import {ClassstudenteditComponent} from "../classstudentedit/classstudentedit.component";

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.less']
})
export class StudentlistComponent implements OnInit {
  search = {
    UserCode: '',
    Name: ''
  };
  page = {
    Page: 1,
    PageSize: 40,
    Total: 0
  };
  Users = [];

  constructor(private msg: NzMessageService, private modal: ModalHelper, public httpService: HttpService) {

  }

  ngOnInit() {
  }

  onSearch(load = false) {
    if (load) {
      this.page.Page = 1;
    }
    this.httpService.POST({
      Router: ServelUrl.Url.getStudent, Method: 'POST', Body: Object.assign(this.search, {
        Page: this.page.Page,
        PageSize: this.page.PageSize
      })
    }).subscribe(res => {
      if (!res.FeedBackCode) {
        this.Users = res.Data.Datas || [];
        //this.Users[0].Default ='1';
        this.page.Total = res.Data.Total;
      }
    })
  }

  resetForm(form) {
    form.reset();
    Object.keys(this.search).forEach(value => {
      this.search[value] = '';
    })
  }

  edit(data) {
    if (data.Purview=='0') {
      this.modal.open(ClassstudentadmineditComponent, {data}).subscribe(() => {
        this.onSearch();
      })
    } else {
      this.modal.open(ClassstudenteditComponent, {data}).subscribe(() => {
        this.onSearch();
      })
    }
  }

  /**
   * 移出
   * @param code
   */
  onShitout(code) {
    this.httpService.postJSON({
      Router: ServelUrl.Url.pushStu, Method: 'POST', Body: {IntelUserCode: code}
    }).then(res => {
      if (!res.FeedbackCode) {
        this.onSearch();
        this.msg.success(res.FeedBackText);
      } else {
        this.msg.warning(res.FeedBackText)
      }
    })

  }
}
