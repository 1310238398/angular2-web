import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../http/http.service";
import {ServelUrl} from "../../ServelUrl";
import {ClassstudentadmineditComponent} from "../../classchange/classstudentadminedit/classstudentadminedit.component";
import {ModalHelper} from "../../shared/helper/modal.helper";
import {FuncEditComponent} from "./func-edit/func-edit.component";
import {NzModalSubject} from "ng-zorro-antd";

@Component({
  selector: 'app-func',
  templateUrl: './func.component.html',
  styleUrls: ['./func.component.less']
})
export class FuncComponent implements OnInit {
  fun = {
    mobile: true,
    pc: true
  };
  funItem = {
    ID: '',
    checked: false,
    Name: '',
    Icon: '',
    ChannelGroup: [],
    UserType: [],
    Desc: ''
  };
  funsList;
  selectedOption;
  Grades = [];

  constructor(private http: HttpService, private modalService: ModalHelper) {
  }

  ngOnInit() {
    this.getFuns()
  }

  /*平台选择*/
  onDevice(type) {
    //this.resetData();
    if (type == 'B') {
      this.fun.pc = !this.fun.pc;
    }
    if (type == 'A') {
      this.fun.mobile = !this.fun.mobile;
    }
    this.onDeviceSelect(this.fun);
  }

  onDeviceSelect(fun) {
    if (this.fun.pc && this.fun.mobile) {
      this.getFuns('')
    } else if (this.fun.pc) {
      this.getFuns('B')
    } else if (this.fun.mobile) {
      this.getFuns('A')
    } else {
      this.funsList = [];
    }
  }

  getFuns(ChannelGroup = '') {
    this.http.PostJSON({
      Router: ServelUrl.Url.getFuns,
      Method: 'POST',
      Body: {
        ChannelGroup: ChannelGroup
      }
    }).then(res => {
      if (!res.RE) {
        this.funsList = res.Data || [];
      }
      console.log(res);
    })
  }

  /*功能选择*/
  selectFun(item) {
    this.funsList.forEach(fun => {
      if (item.ID != fun.ID) {
        fun.checked = false;
      }
    });
    item.checked = !item.checked;

    this.funItem = item;
    this.modalService.static(FuncEditComponent, {funItem: item}, 600).subscribe(() => {
      this.getFuns();
    });
  }
}
