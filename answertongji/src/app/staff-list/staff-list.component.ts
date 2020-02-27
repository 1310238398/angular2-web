import {Component, OnInit} from '@angular/core';
import {CommonService} from '../service/common.service';
import {HttpService} from 'src/http/http.service';
import {ActivatedRoute} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
    selector: 'app-staff-list',
    templateUrl: './staff-list.component.html',
    styleUrls: ['./staff-list.component.less']
})
export class StaffListComponent implements OnInit {
    searchObj = {
        QBID: 14,
        USERCODE: '',
        REALNAME: '',
        ACADEMYNAME: null,
        CLASSNAME: null,
        GRADE: null,
        Status: null,
        P1: '',
        P2: '',
        Which:'first'
    };
    flag = false;
    dataSet = [];
    page = {
        PAGE: 1,
        COUNT: 20,
        total: 0
    };
    Titles = [];
    Academys = [];
    Classs = [];
    Grades = [];
    Statuss = [{ItemName: '未完成', ItemCode: '0'}, {ItemName: '已完成', ItemCode: '1'}];
    Results = [{ItemName: '第一次答题', ItemCode: 'first'}, {ItemName: '最后一次答题', ItemCode: 'least'},{ItemName: '答题正确率最高', ItemCode: ''}];
    loading = false;
    isDisabled;

    constructor(private msgSrv: NzMessageService, private route: ActivatedRoute, private http: HttpService, private commonService: CommonService) {
    }

    ngOnInit() {
        const routeParams = this.route.snapshot.queryParams;
        this.searchObj.QBID = parseInt(routeParams['QBID'] || 0);
        this.searchObj.ACADEMYNAME = routeParams['ACADEMYNAME'] || '';
        this.searchObj.GRADE = routeParams['GRADE'] || '';
        this.loadTitle(true);
        this.loadAcademy(true);
        this.loadGrade();
        this.onSearch(true);
    }

    onSelect() {
        console.log(this.searchObj);
        const academy = this.Academys.find(item => {
            if (item.DepartmentName === this.searchObj.ACADEMYNAME) {
                return item;
            }
        });
        const grade = this.Grades.find(item => {
            if (item.GradeName === this.searchObj.GRADE) {
                return item;
            }
        });
        this.loadClass(academy ? academy.DepartmentCode : '' || '', grade ? grade.GradeCode : '');
    }

    /**
     * 学院
     */
    loadAcademy(set = false) {
        this
            .commonService
            .loadAcademy()
            .subscribe(res => {
                if (!res.FeedbackCode) {
                    this.Academys = res.Data || [];
                    if (set) {
                        this.searchObj.ACADEMYNAME = this.route.snapshot.queryParams['ACADEMYNAME'];

                    }
                }
            });
    }

    loadTitle(set = false) {
        this
            .http
            .POST({Router: '/app/qbrandom/speed/qb'})
            .subscribe(res => {
                if (!res.RE) {
                    console.log('ggggg');
                    this.Titles = res.Data || [];
                    if (set) {
                        this.searchObj.QBID = Number.parseInt(this.route.snapshot.queryParams['QBID']);

                    }
                }
            });
    }

    /**
     * 年级
     */
    loadGrade() {
        this
            .commonService
            .loadGade()
            .subscribe(res => {
                if (!res.FeedbackCode) {
                    this.Grades = res.Data || [];
                }
            });
    }

    /**
     * 班级
     */
    loadClass(academy = '', grade = '') {
        this
            .commonService
            .loadClass({
                Campus: '',
                Academy: academy,
                Major: '',
                Grade: grade
            })
            .subscribe(res => {
                if (!res.FeedbackCode) {
                    this.Classs = res.Data || [];
                }
            });
    }

    onSearch(reload = false) {
        this.loading = true;
        if (reload) {
            this.page.PAGE = 0;
        }
        /*  if (!this.searchObj.ACADEMYNAME) {
              this.searchObj.ACADEMYNAME = ''
          }
          if (!this.searchObj.GRADE) {
              this.searchObj.GRADE = ''
          }
          if (!this.searchObj.CLASSNAME) {
              this.searchObj.CLASSNAME = ''
          }
          if (!this.searchObj.Status) {
              this.searchObj.Status = ''
          }*/

        const obj = this.commonService.mapObject(this.searchObj);
        obj['P1'] = obj['P1'].toString();
        obj['P2'] = obj['P2'].toString();
        this.http.POST({
            Router: '/app/qbrandom/speed/person',
            Body: Object.assign(obj, {PAGE: this.page.PAGE > 0 ? this.page.PAGE - 1 : 0, COUNT: this.page.COUNT})
        }).subscribe(res => {
            this.loading = false;
            if (!res.FeedbackCode) {
                this.dataSet = res.Data.datas || [];
                this.page.total = res.Data.tatol || 0;
            }
        });
    }

    resetForm(f) {
        f.reset();
        console.log('fff');
        this.searchObj.Status= null;
        this.loadTitle(true);
        // this.searchObj.QBID = Number.parseInt(this.route.snapshot.queryParams['QBID']);

    }

    changeStatus(val) {
        if (val == 0) {
            this.flag = true;
            this.searchObj.P1 = '';
            this.searchObj.P2 = '';
        } else {
            this.flag = false;
        }
    }

    changeP1(val) {
        if (val >= 0) {
            this.searchObj.Status = '1';
        }
        if (val === '') {
            this.searchObj.Status = null;
        }
    }

    export() {
        this.isDisabled = true;
        this.searchObj.P1 = this.searchObj.P1 ? this.searchObj.P1.toString() : '';
        this.searchObj.P2 = this.searchObj.P2 ? this.searchObj.P2.toString() : '';
        this.http.POST({
            Router: '/app/qbrandom/speed/person/export',
            Method: 'POST',
            Body: this.searchObj
        }).subscribe(value => {
            this.isDisabled = false;
            if (!value.FeedbackCode) {
                // window.open(value.Data.url);
                const a = document.createElement('a');
                const filename = '各人员进度.xlsx';
                a.href = value.Data.url;
                a.download = filename;
                a.click();
            } else {
                this.msgSrv.warning(value.FeedbackText);
            }
        });
        // window.open(ServelUrl.Url.export+params);
    }
}
