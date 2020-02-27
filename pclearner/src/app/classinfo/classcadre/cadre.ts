import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../../http/http.service";
import { ServelUrl } from "../../ServelUrl";

@Component({
    selector: 'app-classinfo-cadre',
    templateUrl: 'cadre.html'
})
export class ClassCadreComponent implements OnInit {
    cadreData = [];
    classCode = '';
    data;

    constructor(private subject: NzModalSubject,
        public msgSrv: NzMessageService, private httpService: HttpService) {
    }

    ngOnInit() {
        if (this.data) {
            this.classCode = this.data || '';
            if (this.classCode) {
                this.loadClassCadre(this.classCode);
            }
        }
    }

    /*加载班委*/
    loadClassCadre(code) {
        this.httpService.postJSON({
            Router: '/api/classzone/getcadre',
            Method: 'POST',
            Body: {
                ClassCode: code
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.cadreData = res.Data;
            } else {
                this.cadreData = [];
            }
        });

    }

    close() {
        this.subject.destroy();
    }
}
