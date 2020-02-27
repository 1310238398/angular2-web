import { NoticeService } from './../../../Notice.service';
import { Component } from "@angular/core";
import { HttpService } from "../../../../http/http.Service";
/**
 * Created by hanzhendong on 2017/7/24.
 */
@Component({
    selector: 'page-Department',
    templateUrl: 'department.html'
})
export class DepartmentList {
    departments: Array<object> = [];
    showMemberList: boolean = false;
    partCheck: boolean = true;
    partMemberCheck: boolean = true;
    allCheck: boolean = false;
    allMemberCheck: boolean = false;
    curentDepartment = { members: [], DeptID: '' };
    currentIndex: number;


    constructor(private http: HttpService, private NoticeService: NoticeService) {
        this.http.postJSON('', '/app/userroll/depts').then(
            data => {
                this.departments = data.Data || [];
                this.departments.forEach((value, index) => {
                    value['showStaffList'] = false;
                })
            }
        );
        this.NoticeService.chekAll.subscribe(
            (item) => {
                console.log(item);
                if (item.flag) {
                    this.allCheck = false;
                }

            }
        );
    }

    dismiss() {
    }
    setState() {
        this.showMemberList = !this.showMemberList;
    }
    tiggerShowStaffList(department,index) {
        console.log(department);
        if (!department.check) {
            this.setState();
            this.curentDepartment = department;
            this.currentIndex = index;
            if (this.showMemberList) {
                if (!department.members) {
                    this.http.postJSON({ DeptID: department.DeptID }, '/app/userroll/staffs').then(
                        data => {
                            this.curentDepartment.members = data.Data || [];
                            department.members.forEach((value, index) => {
                                value['check'] = false;
                            })
                        }
                    );
                }
            }
        }
    }
    setContacts(item) {
        let index = this.NoticeService.getContacts().indexOf(item);
        if (item.check) {
            this.allCheck = true;
            item.dept = true;
            item.Type = 2;
            item.BuID = item.DeptID;
            item.Source = '';
            item.SourceBuID = '';
            if (index >= 0) {
                this.NoticeService.removeContact(item);
            }
           // this.NoticeService.getContacts().push(item);
            this.NoticeService.setContacts(item);
        } else {
            if (index >= 0) {
              this.NoticeService.removeContact(item);
            }
        }
        /*全选状态处理*/
       /* if (this.NoticeService.getContacts().some((value) => {
                return value.Type == 2
            })) {
            this.allCheck = true;
        } else {

            this.allCheck = false;
        }*/

        if (this.departments.some(ele => {
                return ele['check'] == true
            })) {
            if (this.departments.every(ele => {
                    return ele['check'] == true
                })) {
                this.partCheck = false;
                this.allCheck=true;
            }else{
                this.partCheck = true;
            }
        }else{
            this.allCheck=false
        }
    }
    setMemberContacts(item) {
         let index = this.NoticeService.getContacts().indexOf(item);
        if (item.check) {
            this.departments[this.currentIndex]['allMemberCheck']=true;
            item.DeptMember = true;
            item.Type = 0;
            item.Source = 2;
            item.BuID = item.UID;
            item.SourceBuID = this.curentDepartment.DeptID;
            this.NoticeService.setContacts(item);
            if (!this.departments[this.currentIndex]['memNum']) {
                this.departments[this.currentIndex]['memNum'] = 0;
            }
            this.departments[this.currentIndex]['memNum'] += 1;
        } else {
            if(this.departments[this.currentIndex]['memNum']>0){
                this.departments[this.currentIndex]['memNum'] -= 1;
            }
            if (index >= 0) {
                this.NoticeService.removeContact(item);
            }
        }
        /*全选状态处理*/
     /*   if (this.NoticeService.getContacts().some((value) => {
                return value.Type == 0&&value.Source==2
            })) {
            this.departments[this.currentIndex]['allMemberCheck'] = true;
        } else {
            this.departments[this.currentIndex]['allMemberCheck'] = false;
        }*/
        if (this.curentDepartment.members.some(ele => {
                return ele['check'] == true
            })) {
            if (this.curentDepartment.members.every(ele => {
                    return ele['check'] == true
                })) {
                this.partMemberCheck = false;
                this.departments[this.currentIndex]['allMemberCheck']=true;
            }else{
                this.partMemberCheck = true;
            }
        }else{
            this.departments[this.currentIndex]['allMemberCheck']=false
        }
    }
    onAll(event) {
        if (this.allCheck) {
            this.departments.forEach((value, index) => {
                value['check'] = true;
                this.setContacts(value);
            })
        } else {
            this.departments.forEach((value, index) => {
                value['check'] = false;
                this.setContacts(value);
            })
        }

    }
    onMemberAll(event) {
        if (this.departments[this.currentIndex]['allMemberCheck']) {
            this.curentDepartment.members.forEach((value, index) => {
                value['check'] = true;
                this.setMemberContacts(value);
            })
        } else {
            this.curentDepartment.members.forEach((value, index) => {
                value['check'] = false;
                this.setMemberContacts(value);
            })
        }
    }
}