import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { HttpService } from "../../../../http/http.service";
import { ServelUrl } from "../../../ServelUrl";
import { CommonService } from "../../../service/common.service";

@Component({
    selector: 'app-student-edit',
    templateUrl: 'student.edit.component.html'
})
export class StudentEditComponent implements OnInit {
    validateForm: FormGroup;
    data: any;
    editUser = false;
    Classs = [];
    constructor(private fb: FormBuilder, private commonService: CommonService, private subject: NzModalSubject,
        public msgSrv: NzMessageService, private httpService: HttpService) {

    }

    ngOnInit() {
        this.loadClass();
        this.validateForm = this.fb.group({
            UserCode: [null, [Validators.required, this.checkSpace, this.checkNumber]],
            IntelUserCode: [''],
            Name: [null, [Validators.required, this.checkSpace]],
            Department: [null, [Validators.required]],
            IDCard: [null, [Validators.required, this.checkIdCard]],
            Sex: ['0030001', [Validators.required]],
            Password: [null],
            RePassword: [null, this.confirmationValidator],
        });
        if (this.data) {
            this.editUser = true;
            this.validateForm.setValue({
                UserCode: this.data.UserCode,
                IntelUserCode: this.data.IntelUserCode,
                Name: this.data.Name || '',
                Department: this.data.Class || '',
                Sex: this.data.Sex || '',
                IDCard: this.data.IDCard || '',
                Password: this.data.Password || '',
                RePassword: this.data.Password || '',
            });
        }
    }

    /*加载班级*/
    loadClass() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.getClass,
            Method: 'POST',
            Body: {
                Campus: "",
                Academy: '',
                Major: '',
                Grade: ''
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.Classs = res.Data || [];
            }

        });

    }

    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return;
        } else if (control.value !== this.validateForm.controls['Password'].value) {
            return { confirm: true, error: true };
        }
    };
    updateConfirmValidator() {
        /** wait for refresh value */
        setTimeout(_ => {
            this.validateForm.controls['RePassword'].updateValueAndValidity();
        });
    }
    checkSpace = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return;
        } else if (control.value.length > 0 && control.value.trim().length === 0) {
            return { space: true, error: true };
        }
    }
    checkIdCard = (control: FormControl): { [s: string]: boolean } => {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!control.value) {
            return;
        } else if (reg.test(control.value) === false) {
            return { invalid: true, error: true };
        }
    }
    checkNumber = (control: FormControl): { [s: string]: boolean } => {
        var reg = /(^[0-9]*$)/;
        if (!control.value) {
            return;
        } else if (reg.test(control.value) === false) {
            return { invalid: true, error: true };
        }
    }
    addUser = () => {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
        }
        if (!this.validateForm.valid) {
            return;
        }
        if (this.validateForm.value.Password && !this.validateForm.value.RePassword) {
            this.msgSrv.warning('请输入确认密码');
            return;
        }
        let url = '';
        let body = {};
        if (this.editUser) {
            url = ServelUrl.Url.userEdit;
            body = {
                IntelUserCode: this.validateForm.value.IntelUserCode,
                UserCode: this.validateForm.value.UserCode,
                Name: this.validateForm.value.Name,
                Sex: this.validateForm.value.Sex,
                Class: this.validateForm.value.Department,
                IDCard: this.validateForm.value.IDCard,
                AvailableLogin: '1',
                Email: '',
                Type: '2',
                UserType: ''
            }
        } else {
            url = ServelUrl.Url.userAdd;
            body = {
                IntelUserCode: this.validateForm.value.IntelUserCode,
                UserCode: this.validateForm.value.UserCode,
                Name: this.validateForm.value.Name,
                Password: this.validateForm.value.Password || '',
                RePassword: this.validateForm.value.RePassword || '',
                Sex: this.validateForm.value.Sex,
                Department: this.validateForm.value.Department,
                IDCard: this.validateForm.value.IDCard,
                AvailableLogin: '1',
                Email: '',
                Type: '2'
            }
        }
        this.httpService.postJSON({
            Router: url,
            Method: 'POST',
            Body: body
        }).then(res => {
            if (!res.FeedbackCode) {
                this.msgSrv.success(res.FeedbackText);
                this.subject.next();
                this.close();
            } else {
                this.msgSrv.error(res.FeedbackText)
            }
        })
    }
    close() {
        this.subject.destroy();
    }
}
