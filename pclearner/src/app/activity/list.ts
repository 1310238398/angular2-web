import { Component, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { NzMessageService } from "ng-zorro-antd";

import { HttpService } from "../../http/http.service";
import { ServelUrl } from "../ServelUrl";

@Component({
    selector: 'app-activity',
    templateUrl: './list.html',
    styleUrls: ['./activity.css']
})
export class ActivityListComponent implements OnInit {
    pageIndex = 1;
    pageSize = 20;
    total: number;
    dataSet = [];
    condition = '';
    statuscode = '';
    statuslist = [
        {
            label: '全部',
            value: ''
        },
        {
            label: '待审核',
            value: '0'
        },
        {
            label: '正常',
            value: '1'
        },
        {
            label: '关闭',
            value: '2'
        },
        {
            label: '审核未通过',
            value: '3'
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
            Router: ServelUrl.Url.activitylist,
            Method: 'POST',
            Body: {
                Page: this.pageIndex,
                Count: this.pageSize,
                Status: this.statuscode,
                Condition: this.condition ? this.condition.trim() : ''
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
        this.condition = '';
        this.statuscode = '';
    }

    // 关闭
    close(id: string): void {
        this.httpService.PostJSON({
            Router: ServelUrl.Url.activityclose,
            Method: 'POST',
            Body: {
                ACTIVITYID: id
            }
        }).then(res => {
            if (res.RE === 0) {
                this.msgsrv.success(res.Text);
            } else {
                this.msgsrv.error(res.Text);
            }
            this.getInfoList();
        })
    }

    // 删除
    delete(id: string) {
        this.httpService.PostJSON({
            Router: ServelUrl.Url.activitydelete,
            Method: 'POST',
            Body: {
                ACTIVITYID: id
            }
        }).then(res => {
            if (res.RE === 0) {
                this.msgsrv.success(res.Text);
                this.getInfoList();
            } else {
                this.msgsrv.error(res.Text);
            }
        })
    }

    cancel = function () {

    };
}
