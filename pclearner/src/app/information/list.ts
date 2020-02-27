import { Component, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { NzMessageService } from "ng-zorro-antd";

import { HttpService } from "../../http/http.service";
import { InformationService } from "./information.service";

import { ServelUrl } from "../ServelUrl";
import { ThrowStmt } from '@angular/compiler';

@Component({
    selector: 'app-information',
    templateUrl: './list.html',
    styleUrls: ['./info.css']
})
export class InfoListComponent implements OnInit {
    isVisible = false;
    infoDetail = {
        INFOTITLE: '',
        INFOTIME: '',
        INFOHTML: ''
    };
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
        public httpService: HttpService,
        public informationService: InformationService
    ) { }

    ngOnInit() {
        this.getInfoList();
    }

    // 列表请求
    getInfoList() {
        this.httpService.PostJSON({
            Router: ServelUrl.Url.infolist,
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
            Router: ServelUrl.Url.infopublish,
            Method: 'POST',
            Body: {
                INFOID: id
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
            Router: ServelUrl.Url.infodelete,
            Method: 'POST',
            Body: {
                INFOID: id
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

    // 精确查询
    getInfoOne(id: string): void {
        this.informationService.queryOne(id).then(res => {
            if (res.RE === 0) {
                this.isVisible = true;
                this.infoDetail.INFOHTML = res.Data.INFOHTML;
                this.infoDetail.INFOTIME = res.Data.INFOTIME;
                this.infoDetail.INFOTITLE = res.Data.INFOTITLE;
            } else {
                this.msgsrv.error(res.Text);
            }
        });
    }

    handleCancel() {
        this.isVisible = false;
    }

    closeOk() {
        this.isVisible = false;
    }
    formatTime(date: string): string {
        if (!date) {
            return '';
        }
        const year = date.substring(0, 4);
        const month = date.substring(4, 6);
        const day = date.substring(6, 8);
        const hour = date.substring(8, 10);
        const minute = date.substring(10, 12);
        return year + '年' + month + '月' + day + '日' + ' ' + hour + ':' + minute;
    }
}
