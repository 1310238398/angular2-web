import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from "../../http/http.service";


@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.less','../common.less']
})
export class IndexComponent implements OnInit {
    Logo = 'assets/images/default.png';
    currentDate;
    schoolObj;
    millisec=10000;
    Pretime={};
    max=0;
    keys=[];
    Interval;
    School;
    page={
        Page:0,
        Count:4
    };
    NextPage=0;
    Academys=[];
    currentDateTime;
    IntervalTime;
    constructor(private router: Router, private http: HttpService) {
    }

    ngOnInit(): void {
        this.currentDate = this.http.format(new Date(), 'yyyy-MM-dd');
        this.currentDateTime = this.http.format(new Date(), 'yyyy-MM-dd hh:mm:ss');
        this.getSchoolStatus();
        this.getPretime();
        this.getPageAcademy();
        this.getSchool();
        this.setInterval();
    }


    /**
     * id
     */
    navAcademy() {
        this
            .router
            .navigate(['academy']);
    }

    /**
     *
     * @param academy
     */
    onSearch() {


    }
    setInterval(){
       this.Interval= setInterval(()=>{
            this.getSchoolStatus();
            this.getPretime();
            this.page.Page=this.NextPage;
            this.getPageAcademy();
        },this.millisec)
        this.IntervalTime= setInterval(()=>{
         this.currentDateTime = this.http.format(new Date(), 'yyyy-MM-dd hh:mm:ss');
        },1000)
    }
    getSchoolStatus() {
        this.http.GET('/pc/yxcheckinthrow/v2018head').subscribe(res => {
            if (!res.FeedbackCode) {
                this.schoolObj=res.Data;
            }

        });
    }
    ngOnDestroy(){
        clearInterval(this.Interval);
        clearInterval(this.IntervalTime)
    }
    getPretime() {
        this.http.POST('/pc/yxcheckinthrow/v2018pretime',{}).subscribe(res => {
            if (!res.FeedbackCode) {
                this.Pretime=res.Data.cs;
                this.keys=Object.keys(res.Data.cs);
                this.max=res.Data.max||4128;
                console.log(res);
            }

        });
    }
    getPageAcademy(){
        this.http.POST('/pc/yxcheckinthrow/v2018academy',JSON.stringify(this.page)).subscribe(res => {
            if (!res.FeedbackCode) {
                this.Academys=res.Data.Academys||[];
                this.NextPage=res.Data.NextPage||0;
                console.log(res);
            }
        });
    }
    getSchool(){
      //  /pc/yxcheckinthrow/campus
        this.http.GET('/pc/yxcheckinthrow/campus').subscribe(res => {
            if (!res.FeedbackCode) {
                this.School=res.Data;
                console.log(res);
            }
        });
    }

}
