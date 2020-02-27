import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from 'src/http/http.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.less', './common.less']
})
export class IndexComponent implements OnInit {
    dataSet = [];
    gradeAllCount;
    gradeArr = [];
    loading;

    constructor(private router: Router, private http: HttpService) {
    }

    ngOnInit(): void {
        this.onSearch();
    }

    /**
     * id
     */
    navAcademy(QBID, GRADE,QBTITLE) {
        this
            .router
            .navigate(['academy'], {queryParams: {QBID: QBID, GRADE: GRADE,QBTITLE:QBTITLE}});
    }

    /**
     *
     * @param academy
     */
    onSearch() {
        this.loading = true;
        this.http.POST({
            Router: '/app/qbrandom/speed/grade',
            Body: {}
        }).subscribe(res => {
            this.loading = false;
            if (!res.FeedbackCode) {
                this.dataSet = res.Data.list || [];
                this.gradeAllCount = res.Data.gradeAllCount;
                this.gradeArr = Object.keys(res.Data.gradeAllCount || {}) || [];
            }

        });
    }

}
