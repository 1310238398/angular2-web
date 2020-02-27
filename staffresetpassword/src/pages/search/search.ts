import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { StaffService } from '../staff.service';
import { HelpUtils } from '../../app/utils/HelpUtils';
@IonicPage(
    {
        name: 'page-search',
        segment: 'search'
    }
)
@Component({
    selector: 'page-search',
    templateUrl: 'search.html'
})
export class SearchPage {
    name = '';
    nameNull = false;
    department = '';
    departmentData = [];
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        public staffService: StaffService,
        public helpUtil: HelpUtils
    ) {
    }

    ionViewWillEnter() {
        this.queryDepartment();
    }

    ionViewDidEnter() {
        antlinker.configTitle({
            type: "label",
            title: '学工账号',
            fail: function () {

            },
            success: function () {
            }
        });
        console.log('ionViewDidEnter');
    }

    // 所属单位
    queryDepartment(): void {
        this.staffService.queryDepartmentInit().then(res => {
            if (res.FeedbackCode === 0) {
                this.departmentData = res.Data;
            } else {
                this.departmentData = [];
                this.helpUtil.toastPop(res.FeedbackText);
            }
        })
    }
    onChange(event) {
        console.log(event);
        if (event && event.trim().length > 0) {
            this.nameNull = false;
        } else {
            this.nameNull = true;
        }
    }
    onBlur(event) {
        console.log(event);
        console.log('blur');
        window.scrollTo(0, 0);
    }
    // search
    search() {
        if (!this.name || (this.name && !this.name.trim().length)) {
            this.nameNull = true;
            return;
        }
        this.navCtrl.push('page-staff', {
            name: this.name,
            department: this.department
        });
    }
}