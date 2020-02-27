import { Component, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { NzMessageService } from "ng-zorro-antd";

import { HttpService } from "../../http/http.service";
import { ServelUrl } from "../ServelUrl";

@Component({
    selector: 'app-notice',
    templateUrl: './list.html',
    styleUrls: ['./notice.css']
})
export class NoticeListComponent implements OnInit {
    pageIndex = 1;
    pageSize = 20;
    total: number;
    dataSet = [];
    title = '';
    statuscode = '';
    statuslist = [
        {
            label: '全部',
            value: ''
        },
        {
            label: '保存',
            value: '0'
        },
        {
            label: '已发布',
            value: '1'
        },
        {
            label: '敏感词待审核',
            value: '9'
        }
    ];
    constructor(
        private datePipe: DatePipe,
        private msgsrv: NzMessageService,
        public httpService: HttpService
    ) { }

    ngOnInit() {
        this.getInfoList();
    }

    // 列表请求
    getInfoList() {
        this.httpService.PostJSON({
            Router: ServelUrl.Url.noticelist,
            Method: 'POST',
            Body: {
                Page: this.pageIndex,
                Count: this.pageSize,
                Status: this.statuscode,
                Title: this.title ? this.title.trim() : ''
            }
        }).then(res => {
            if (res.RE === 0) {
                this.dataSet = res.Data.ResultList ? res.Data.ResultList : [];
                this.total = res.Data.TotalCount
            } else {
                this.msgsrv.error(res.Text);
            }
        })
    }

    onSearch(): void {
        this.pageIndex = 1;
        this.getInfoList();
    }

    resetForm(): void {
        this.title = '';
        this.statuscode = '';
    }

    // 发布
    publish(id: string): void {
        this.httpService.PostJSON({
            Router: ServelUrl.Url.noticepublish,
            Method: 'POST',
            Body: {
                NOTICEID: id
            }
        }).then(res => {
            if (res.RE === 0) {
                this.msgsrv.success('发布成功');
            } else {
                this.msgsrv.error(res.Text);
            }
            this.getInfoList();
        })
    }

    // 删除
    delete(id: string) {
        this.httpService.PostJSON({
            Router: ServelUrl.Url.noticedelete,
            Method: 'POST',
            Body: {
                NOTICEID: id
            }
        }).then(res => {
            if (res.RE === 0) {
                this.msgsrv.success('删除成功');
                this.getInfoList();
            } else {
                this.msgsrv.error(res.Text);
            }
        })
    }

    cancel = function () {

    };
}
