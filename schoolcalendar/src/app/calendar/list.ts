import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';

import * as moment from 'moment';
import { CalendarService } from './calendar.service';

@Component({
    templateUrl: './list.html',
    styleUrls: ['./list.css']
})
export class ListComponent implements OnInit {
    after = '0';
    loading = false;
    startDate: Date = null;
    endDate: Date = null;
    calendar = {
        AcademicYearCode: null,
        AcademicTermCode: null,
        FirstWeek: '1',
        FirstWeeks: '1',
        startDate: '',
        endDate: ''
    };
    weeksDataSet = [];
    AcademicTerm = [];
    AcademicYear = [];
    calendarForm: FormGroup;
    searchForm: FormGroup;
    constructor(
        private message: NzMessageService,
        private modalService: NzModalService,
        private fb: FormBuilder,
        private calendarService: CalendarService) { }

    ngOnInit() {
        this.calendarForm = this.fb.group({
            AcademicYearCode: [null, [Validators.required]],
            AcademicTermCode: [null, [Validators.required]],
            FirstWeek: ['1', [Validators.required]],
            FirstWeeks: ['1', [Validators.required]],
            start: [null, [Validators.required]],
            StartDate: [null],
            end: [null, [Validators.required]],
            EndDate: [null]
            // IsCurrent: ['', [Validators.required]]
        });
        this.searchForm = this.fb.group({
            AcademicYearCode: [null, [Validators.required]],
            AcademicTermCode: [null, [Validators.required]],
        });
        this.getSchoolCalendarWeeks();
        this.parameterInit('AcademicYear');
        this.parameterInit('AcademicTerm');
    }


    // 学年
    parameterInit(code: string) {
        this.calendarService.queryParameterInit(code).subscribe(res => {
            if (res.Data && res.Data.length > 0) {
                this[code] = res.Data;
            } else {
                this[code] = res.Data;
            }
        });
    }

    // 重置
    reset() {
        this.calendarForm.reset();
        this.calendarForm.patchValue({ FirstWeek: '1' });
        this.calendarForm.patchValue({ FirstWeeks: '1' });
        // this.calendarForm.patchValue({ IsCurrent: '1' });
    }

    // 生成校历
    generateCalendar() {
        for (const i in this.calendarForm.controls) {
            this.calendarForm.controls[i].markAsDirty();
            this.calendarForm.controls[i].updateValueAndValidity();
        }
        console.log(this.calendarForm.value);
        if (this.calendarForm.valid) {
            this.calendarForm.patchValue({ StartDate: moment(this.calendarForm.value.start).format('YYYY-MM-DD') });
            this.calendarForm.patchValue({ EndDate: moment(this.calendarForm.value.end).format('YYYY-MM-DD') });
            this.calendarService.schoolCalendar(this.calendarForm.value).subscribe(res => {
                if (res.FeedbackCode === 0) {
                    this.message.create('success', '生成成功');
                    this.getSchoolCalendarWeeks(this.calendarForm.value.AcademicYearCode, this.calendarForm.value.AcademicTermCode);
                } else {
                    this.message.create('error', res.FeedbackText);
                }
            });
        }
    }


    // 查询周次
    searchFuc() {
        for (const i in this.searchForm.controls) {
            this.searchForm.controls[i].markAsDirty();
            this.searchForm.controls[i].updateValueAndValidity();
        }
        if (this.searchForm.valid) {
            let year = this.searchForm.value.AcademicYearCode;
            let term = this.searchForm.value.AcademicTermCode;
            this.getSchoolCalendarWeeks(year, term);
        }
    }

    // 重置查询
    resetSearch() {
        this.searchForm.reset();
    }
    // 请求周次
    getSchoolCalendarWeeks(year?: string, term?: string) {
        this.loading = true;
        this.calendarService.queryWeeks(this.after, year, term).subscribe(res => {
            console.log(`res+${res}`)
            this.loading = false;
            if (res.FeedbackCode === 0) {
                this.weeksDataSet = res.Data || [];
            } else {
                this.weeksDataSet = [];
                this.message.create('error', res.FeedbackText);
            }
        });
    }

    cancel(): void {
    }

    confirm(recordid: string): void {
        this.deleteSchoolCalendarWeeks(recordid);
    }

    // 删除周次
    deleteSchoolCalendarWeeks(recordid: string) {
        this.calendarService.deleteWeeks(recordid).subscribe(res => {
            if (res.FeedbackCode === 0) {
                this.message.create('success', '删除成功');
                this.calendarForm.value.AcademicYearCode && this.calendarForm.value.AcademicTermCode ? this.getSchoolCalendarWeeks(this.calendarForm.value.AcademicYearCode, this.calendarForm.value.AcademicTermCode) : this.getSchoolCalendarWeeks();
            }
        });
    }

    disabledStartDate = (startValue: Date): boolean => {
        if (!startValue || !this.calendarForm.value.end) {
            return false;
        }
        return startValue.getTime() > this.calendarForm.value.end.getTime();
    };

    disabledEndDate = (endValue: Date): boolean => {
        if (!endValue || !this.calendarForm.value.start) {
            return false;
        }
        return endValue.getTime() <= this.calendarForm.value.start.getTime();
    };
}
