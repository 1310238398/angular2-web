import {Component, OnInit} from '@angular/core';
import {ServelUrl} from "../../ServelUrl";
import {HttpService} from "../../../http/http.service";
import {ModalHelper} from "../../shared/helper/modal.helper";
import {EditComponent} from "../edit/edit.component";
import {NzMessageService} from "ng-zorro-antd";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  constructor(private datePipe:DatePipe,private msg: NzMessageService, private  modal: ModalHelper, public httpService: HttpService) {
  }

  searchObj = {
    name: ''
  };
  messageId;
  dataSet = [];
  page = {
    current: 1,
    pageSize: 40,
    total: 0
  };

  ngOnInit() {
  }

  upload(event, data) {
    if (!event.target.files[0]) {
      this.msg.warning('请选择xlsx文件!');
      return;
    }
    var formData = new FormData();
    formData.append('file_data', event.target.files[0]);
    formData.append('router', ServelUrl.Url.wenjuanImport);
    formData.append('record_id', data.record_id);
    console.log(event.target.files[0]);
    this.import(formData);
    this.messageId= this.msg.loading(`${event.target.files[0].name}正在导入...`, {nzDuration: 0}).messageId;

  }

  onSearch(reload = false) {
    if (reload) {
      this.page.current = 1
    }
    console.log(this.searchObj);
    this.httpService.POST({
      Router: ServelUrl.Url.wenjuanQuerypage,
      Method: 'POST',
      Body: {
        name: this.searchObj.name,
        current: this.page.current,
        pageSize: this.page.pageSize
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.dataSet = res.Data.data;
        this.page.total = res.Data.total;
      }
    })
  }

  import(form) {
    this.httpService.postFormData(form, (res) => {
      this.msg.success(res.FeedbackText);
      this.msg.remove(this.messageId);
    })
  }

  edit(data = '') {
    this.modal.open(EditComponent, {data},800).subscribe(res => {
      this.onSearch();
    })

  }
  del(record_id){
    this.httpService.postJSON({
      Router: ServelUrl.Url.wenjuanDelete,
      Method: 'POST',
      Body: {
        record_id:record_id,
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.onSearch();
        this.msg.success(res.FeedbackText);
      } else {
        this.msg.warning(res.FeedbackText);
      }
    });
  }
}
