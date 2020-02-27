import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../../http/http.service';
import {ServelUrl} from "../../../ServelUrl";
import {ModalHelper} from "../../../shared/helper/modal.helper";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-apartmentsearchlist',
  templateUrl: './apartmentlist.component.html',
//   styleUrls: ['./studentlist.component.less']
})
export class ApartmentlistComponent implements OnInit {
//   search = {
//     UserCode: '',
//     Name: ''
//   };
//   page = {
//     Page: 1,
//     PageSize: 40,
//     Total: 0
//   };
//   Users = [];

  constructor(private msg: NzMessageService, private modal: ModalHelper, public httpService: HttpService) {

  }

  ngOnInit() {
  }

//   onSearch(load = false) {
//     if (load) {
//       this.page.Page = 1;
//     }
//     this.httpService.POST({
//       Router: ServelUrl.Url.getStudent, Method: 'POST', Body: Object.assign(this.search, {
//         Page: this.page.Page,
//         PageSize: this.page.PageSize
//       })
//     }).subscribe(res => {
//       if (!res.FeedBackCode) {
//         this.Users = res.Data.Datas || [];
//         //this.Users[0].Default ='1';
//         this.page.Total = res.Data.Total;
//       }
//     })
//   }

//   resetForm(form) {
//     form.reset();
//     Object.keys(this.search).forEach(value => {
//       this.search[value] = '';
//     })
//   }



}
