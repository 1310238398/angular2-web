import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd";
import { RoomService } from "./room.service";

@Component({
    selector: 'app-room_search',
    templateUrl: './room_search.html',
    styleUrls: ['./room_search.css']
})
export class RoomSearchComponent implements OnInit {
    search = '';
    _dataSet = [];
    pageIndex = 1;
    pageSize = 30;
    total = 0;
    type = '';
    academyCode = '';
    dormitoryCode = '';
    sexCode = '';
    loading = false;
    sortName = '';
    sortValue = '';
    sortMap = {
        EmptyNums: null
    };
    tem = [];
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private msgsrv: NzMessageService,
        public roomServoce: RoomService
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe((params: Params) => {
            this.type = params['type'] || '';
            switch (this.type) {
                case 'hasPeopleRoom': //已住宿舍
                    this.sexCode = params['sex'] || '';
                    this.hasPeopleRoomQuery();
                    break;
                case 'noPeopleRoom': // 空闲宿舍
                    this.noPeopleRoomQuery();
                    break;
                case 'emptybedRoom': // 空床宿舍
                    this.sexCode = params['sex'] || '';
                    this.emptybedRoomQuery();
                    break;
                default:
                    this.academyCode = params['academy'] || '';
                    this.dormitoryCode = params['dormitory'] || '';
                    this.dormitoryQuery();
            }
            // this.dormitoryQuery();
        });
    }

    // 宿舍查询
    dormitoryQuery() {
        this.loading = true;
        this.roomServoce.dormitoryQuery(this.pageIndex, this.pageSize, this.type, this.dormitoryCode, this.academyCode, this.search.trim()).then((res) => {
            this.loading = false;
            if (res.total && res.total > 0) {
                this._dataSet = res.data;
                this.total = res.total;
            } else {
                this._dataSet = [];
                this.total = 0;
            }
        }).catch(() => {
            this.loading = false;
            this._dataSet = [];
            this.total = 0;
        });
    }

    // 已住宿舍查询
    hasPeopleRoomQuery() {
        this.loading = true;
        this.roomServoce.hasPeopleRoomQuery(this.pageIndex, this.pageSize, this.search.trim(), this.sexCode).then((res) => {
            this.loading = false;
            if (res.total && res.total > 0) {
                this._dataSet = res.data;
                this.total = res.total;
            } else {
                this._dataSet = [];
                this.total = 0;
            }
        }).catch(() => {
            this.loading = false;
            this._dataSet = [];
            this.total = 0;
        });
    }

    // 空闲宿舍查询
    noPeopleRoomQuery() {
        this.loading = true;
        this.roomServoce.noPeopleRoomQuery(this.pageIndex, this.pageSize, this.search.trim()).then((res) => {
            this.loading = false;
            if (res.total && res.total > 0) {
                this._dataSet = res.data;
                this.total = res.total;
            } else {
                this._dataSet = [];
                this.total = 0;
            }
        }).catch(() => {
            this.loading = false;
            this._dataSet = [];
            this.total = 0;
        });
    }

    // 空床宿舍查询
    emptybedRoomQuery() {
        this.loading = true;
        this.roomServoce.emptybedRoomQuery(this.pageIndex, this.pageSize, this.sexCode, this.search.trim()).then((res) => {
            this.loading = false;
            if (res.total && res.total > 0) {
                this._dataSet = res.data;
                this.total = res.total;
            } else {
                this._dataSet = [];
                this.total = 0;
            }
        }).catch(() => {
            this.loading = false;
            this._dataSet = [];
            this.total = 0;
        });
    }

    // 查询
    searchFun() {
        this.pageIndex = 1;
        switch (this.type) {
            case 'hasPeopleRoom': //已住宿舍
                this.hasPeopleRoomQuery();
                break;
            case 'noPeopleRoom': // 空闲宿舍
                this.noPeopleRoomQuery();
                break;
            case 'emptybedRoom': // 空床宿舍
                this.emptybedRoomQuery();
                break;
            default:
                this.dormitoryQuery();
        }
    }

    // pageChange
    pageChange(value) {
        if (value != this.pageIndex) {
            this.pageIndex = value;
            switch (this.type) {
                case 'hasPeopleRoom': //已住宿舍
                    this.hasPeopleRoomQuery();
                    break;
                case 'noPeopleRoom': // 空闲宿舍
                    this.noPeopleRoomQuery();
                    break;
                case 'emptybedRoom': // 空床宿舍
                    this.emptybedRoomQuery();
                    break;
                default:
                    this.dormitoryQuery();
            }
            // this.dormitoryQuery();
        }
    }

    // 学院排序
    sort(sortName, value) {
        if (!value) {
            return;
        }
        this.sortName = sortName;
        this.sortValue = value;
        this.sortMap[this.sortName] = value;
        this.sortMethod();
    }

    sortMethod() {
        this._dataSet = [...this._dataSet.sort((a, b) => {
            if (parseInt(a[this.sortName]) > parseInt(b[this.sortName])) {
                return (this.sortValue === 'ascend') ? 1 : -1;
            } else if (parseInt(a[this.sortName]) < parseInt(b[this.sortName])) {
                return (this.sortValue === 'ascend') ? -1 : 1;
            } else {
                // return 0;
                if (a['Academy'] > b['Academy']) {
                    return (this.sortValue === 'ascend') ? 1 : -1;
                } else if (a['Academy'] < b['Academy']) {
                    return (this.sortValue === 'ascend') ? -1 : 1;
                } else {
                    return 0;
                }                  
            }
        })];
    }

    emptyBedRoomCase(data: any): string {
        return '';
    }
}
