import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from "../../http/http.service";


@Component({
    selector: 'app-academy',
    templateUrl: './academy.component.html',
    styleUrls: ['./academy.component.less','../common.less']
})
export class AcademyComponent implements OnInit {
    page={
        Page:0,
        Count:10000
    };
    Academys=[];
    constructor(private router: Router, private http: HttpService) {
    }

    ngOnInit(): void {
        this.getPageAcademy();
    }


    getPageAcademy(){
        this.http.POST('/pc/yxcheckinthrow/v2018academy',JSON.stringify(this.page)).subscribe(res => {
            if (!res.FeedbackCode) {
                this.Academys=res.Data.Academys||[];
                console.log(res);
            }
        });
    }
}
