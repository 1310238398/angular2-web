import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { PromiseService } from '../promise.servise';
import { SignResult } from '../promise';
import { StudentsPage } from './students';

@Component({
    selector: 'non-worker-class',
    templateUrl: 'non-worker-class.html'
})
export class ClassPage {
    commitID = '';
    classList: SignResult[] = [];
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private promiseServise: PromiseService
    ) { }
    ionViewDidEnter(): void {
        this.commitID = this.navParams.get('commitid');
        const majorID = this.navParams.get('majorid');
        const majorName = this.navParams.get('majorname');
        antlinker.configTitle({
            type: "label",
            title: majorName,
            fail: function () {
      
            },
            success: function () {
            }
          });
        //   antlinker.configNavigationButton({
        //     type: ['more'],
        //     moreOption: ["refresh"],
        //     success: function () {
        //       //设置右上角按钮成功
        //     },
        //     fail: function () {
        //       // 设置右上角按钮失败
        //     },
        //     trigger: function () {
        //       //点击标题时调用
        //     }
        //   });

        if (this.commitID && majorID) {
            this.getClassList(this.commitID, majorID);
        }
    }

    // 模板内容
    getClassList(commitid: string, majorid: string): void {
        this.promiseServise.queryNoSchWorkersResult(commitid, 2, majorid).then(res => {
            if (res.RE === 0) {
                this.classList = res.Data;
            }
        });
    }

    // 使用
    goToStudents(cl: SignResult): void {
        this.navCtrl.push(StudentsPage, { commitid: this.commitID, classid: cl.DeptID, classname: cl.DeptName, status: 9 });
    }

}