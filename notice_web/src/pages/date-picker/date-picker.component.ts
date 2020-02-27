import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
/*


接收通知列表、发布通知列表，排列顺序不对，应该是最新的在最顶部，而且服务器给的第一页内容不对，应该是最晚的通知，现在是最早的
*/

@Component({
    selector: 'app-ant-date-picker',
    templateUrl: 'date-picker.component.html',
    styles: ['date-picker.component.scss']
})

export class DatePickerComponent implements OnInit {
    @Input()
    dateStyle: string = "yyyyMMdd";

    @Input()
    dateString: string;
    @Output()
    dateStringChange = new EventEmitter<string>();

    // @Output()
    // dateChanged = new EventEmitter<string>();

    // currentDate: Date;

    currentYear: number;
    currentMonth: number;
    currentDay: number;
    currentHour: number;
    currentMinute: number;
    currentSecond: number;

    years: number[] = [];
    months: number[] = [];
    days: number[] = [];

    showHhmmss: boolean = false;
    showHhmm: boolean = false;
    hours: number[] = [];
    minutes: number[] = [];
    seconds: number[] = [];

    // constructor(public datepipe: DatePipe){}

    ngOnInit(): void {
        let currentDate = new Date();
        this.currentYear = currentDate.getFullYear();
        for (let i = 0; i < 5; ++i) {
            this.years.push(this.currentYear + i);
        }

        this.currentMonth = currentDate.getMonth() + 1;
        for (let i = 1; i <= 12; ++i) {
            this.months.push(i);
        }

        this.currentDay = currentDate.getDate()+1;
        this.updateDays();
        
        if (this.dateStyle === 'yyyyMMddhhmm') {
            this.currentHour = currentDate.getHours();
            this.currentMinute = currentDate.getMinutes();
            this.currentSecond = currentDate.getSeconds();
            this.showHhmm = true;
            for (let i = 0; i < 24; ++i) {
                this.hours.push(i);
            }
            for (let i = 0; i < 60; ++i) {
                this.minutes.push(i);
                this.seconds.push(i);
            }
        } else {
            this.currentHour = 0;
            this.currentMinute = 0;
            this.currentSecond = 0;
        }
        this.emmitDate();
    }

    getMonthDays(year: number, month: number) {
        let date = new  Date(year, month, 0);
        return date.getDate();
    }

    onYearChange(year: number) {
        this.currentYear = year;
        this.updateDays();
        this.emmitDate();
    }

    onMonthChange(month: number) {
        this.currentMonth = month;
        this.updateDays();
        this.emmitDate();
    }

    onDayChange(day: number) {
        this.currentDay = day;
        this.emmitDate();
    }

    onHourChange(hour: number) {
        this.currentHour = hour;
        this.emmitDate();
    }

    onMinuteChange(minute: number) {
        this.currentMinute = minute;
        this.emmitDate();
    }

    onSecondChange(second: number) {
        this.currentSecond = second;
        this.emmitDate();
    }

    updateDays() {
        let dateCount = this.getMonthDays(this.currentYear, this.currentMonth);
        this.days = [];
        for (let j = 1; j <= dateCount; ++j) {
            this.days.push(j);
        }
    }

    emmitDate() {
        console.log("emmit");
        let date = new Date(this.currentYear, this.currentMonth - 1, this.currentDay, this.currentHour, this.currentMinute, this.currentSecond);
        // if (this.dateStyle === "yyyyMMdd") {
        //     this.dateChanged.emit();
        // } else if (this.dateStyle === "yyyyMMddhhmm") {
        //     this.dateChanged.emit(new DatePipe("en-US").transform(date, 'yyyyMMddhhmmss'));
        // }
        this.dateString = new DatePipe("en-US").transform(date, 'yyyyMMddHHmmss');
        this.dateStringChange.emit(new DatePipe("en-US").transform(date, 'yyyyMMddHHmmss'));
    }
}
