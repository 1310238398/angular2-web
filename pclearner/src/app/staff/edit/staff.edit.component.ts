import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { HttpService } from "../../../http/http.service";
import { ServelUrl } from "../../ServelUrl";
import { CommonService } from "../../service/common.service";

@Component({
  selector: 'app-staff-edit',
  templateUrl: 'staff.edit.component.html'
})
export class StaffEditComponent implements OnInit {
  // item = {
  //   UserCode: '',
  //   IntelUserCode: '',
  //   Name: '',
  //   add: false,
  //   Sex: '',
  //   Password: '',
  //   Email: '',
  //   Department: '',
  //   UserType: '',
  //   AvailableLogin: 1,
  //   Items: [],
  //   Auths: []
  // };
  editeStaff = false;
  userAuths = [];
  Sexs = [];
  StaffTypes = [];
  data;
  Departments = [];
  Roles = [];
  validateForm: FormGroup;
  constructor(private fb: FormBuilder, private commonService: CommonService, private subject: NzModalSubject,
    public msgSrv: NzMessageService, private httpService: HttpService) {

  }

  ngOnInit() {
    this.loadBizCode('Sex');
    this.loadBizCode('StaffType');
    this.loadDepartment();
    this.loadRoles();
    this.validateForm = this.fb.group({
      UserCode: [null, [Validators.required, this.checkSpace, this.checkNumber]],
      IntelUserCode: [null],
      Name: [null, [Validators.required, this.checkSpace]],
      Department: [null, [Validators.required]],
      UserType: [null, [Validators.required]],
      Sex: [null, [Validators.required]],
      Phone: [null, [Validators.required, this.checkSpace, this.checkPhone]],
      Password: [null],
      RePassword: [null, this.confirmationValidator],
    });
    if (this.data) {
      this.editeStaff = true;
      this.validateForm.setValue({
        UserCode: this.data.UserCode,
        IntelUserCode: this.data.IntelUserCode,
        Name: this.data.Name || '',
        Department: this.data.Department || '',
        UserType: this.data.UserType || '',
        Sex: this.data.Sex || '',
        Phone: this.data.Phone || '',
        Password: this.data.Password || '',
        RePassword: this.data.Password || '',
      });
      if (this.data.Items) {
        debugger
        this.data.Items.forEach(element => {
          this.userAuths.push({
            DepartmentCode: element.ItemsDepartmentCode,
            RoleCode: element.ItemsRoleCode
          });
        })
      }
      console.log(this.userAuths);
      // this.item = this.data;
      // this.item.Auths = [];
    }
    // this.item.Items.forEach(value => {
    //   if (!value.ItemsDepartmentCode || !value.ItemsRoleCode) {
    //     value.delete = true;
    //   } else {
    //     value.delete = false;
    //   }
    // })
  }

  checkSpace = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return;
    } else if (control.value.length > 0 && control.value.trim().length === 0) {
      return { space: true, error: true };
    }
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
  checkNumber = (control: FormControl): { [s: string]: boolean } => {
    var reg = /(^[0-9]*$)/;
    if (!control.value) {
      return;
    } else if (reg.test(control.value) === false) {
      return { invalid: true, error: true };
    }
  }
  checkPhone = (control: FormControl): { [s: string]: boolean } => {
    var reg = /^\d{11,}$/;
    if (!control.value) {
      return;
    } else if (reg.test(control.value) === false) {
      return { invalid: true, error: true };
    }
  }
  /*加载bizcode*/
  loadBizCode(code) {
    this.commonService.loadBizCode(code).then(res => {
      if (!res.FeedbackCode) {
        let $_var = `${code}s`;
        this[$_var] = res.Data || [];
      }

    });
  }

  loadDepartment() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.getdepartment,
      Method: 'POST',
      Body: {}
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Departments = res.Data || [];
      }

    });
  }

  loadRoles() {
    //departmentinit
    this.httpService.postJSON({
      Router: ServelUrl.Url.getRole,
      Method: 'POST',
      Body: {}
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Roles = res.Data || [];
      }

    });
  }

  addRole() {
    this.userAuths.push({ DepartmentCode: '', RoleCode: '' })
  }

  save() {
    // if (!this.item.UserCode.trim()) {
    //   this.msgSrv.warning('工号不能为空！');
    //   return
    // }
    // if (!this.item.Name.trim()) {
    //   this.msgSrv.warning('姓名不能为空！');
    //   return
    // }
    // let $flag = this.item.Items.find(item => {
    //   console.log(!item.ItemsDepartmentCode);
    //   return (!item.ItemsDepartmentCode || !item.ItemsRoleCode) && !item.delete
    // });
    // if ($flag || !(this.item.Items.length > 0)) {
    //   this.msgSrv.warning('工作单位和角色不能为空！');
    //   return
    // }
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
    if (!this.validateForm.valid) {
      return;
    }
    if (this.userAuths.length === 0) {
      this.msgSrv.warning('用户角色不能为空');
      return;
    } else {
      let roleNull = false;
      this.userAuths.forEach(element => {
        if (!element.DepartmentCode || !element.RoleCode) {
          roleNull = true;
        }
      });
      if (roleNull) {
        this.msgSrv.warning('用户角色不能含有空数据');
        return;
      }
    }

    if (this.validateForm.value.Password && !this.validateForm.value.RePassword) {
      this.msgSrv.warning('请输入确认密码');
      return;
    }
    if (!this.data) {
      // let Auths = [];
      // this.userAuths.forEach(item => {
      //   Auths.push({ RoleCode: item.ItemsRoleCode, DepartmentCode: item.ItemsDepartmentCode });
      // })
      this.httpService.postJSON({
        Router: ServelUrl.Url.Useradd,
        Method: 'POST',
        Body: {
          UserCode: this.validateForm.value.UserCode,
          Name: this.validateForm.value.Name,
          Sex: this.validateForm.value.Sex,
          Phone: this.validateForm.value.Phone,
          Password: this.validateForm.value.Password,
          RePassword: this.validateForm.value.RePassword,
          Email: '',
          AvailableLogin: '1',
          Department: this.validateForm.value.Department,
          UserType: this.validateForm.value.UserType,
          Auths: this.userAuths
        }
      }).then(res => {
        if (!res.FeedbackCode) {
          this.msgSrv.success(res.FeedbackText);
          this.subject.next();
          this.close();
        } else {
          this.msgSrv.warning(res.FeedbackText);
        }

      })
    } else {
      // let Auths = [];
      // this.userAuths.forEach(item => {
      //   Auths.push({ RoleCode: item.ItemsRoleCode, DepartmentCode: item.ItemsDepartmentCode });
      // })
      this.httpService.postJSON({
        Router: ServelUrl.Url.Useredit,
        Method: 'POST',
        Body: {
          UserCode: this.validateForm.value.UserCode,
          IntelUserCode: this.validateForm.value.IntelUserCode,
          Name: this.validateForm.value.Name,
          Sex: this.validateForm.value.Sex,
          Email: '',
          AvailableLogin: '1',
          Department: this.validateForm.value.Department,
          UserType: this.validateForm.value.UserType,
          Auths: this.userAuths
        }
      }).then(res => {
        if (!res.FeedbackCode) {
          this.msgSrv.success(res.FeedbackText);
          this.subject.next();
          this.close();
        } else {
          this.msgSrv.warning(res.FeedbackText);
        }
      })
    }
  }

  deleteAuth(index) {
    this.userAuths.splice(index, 1);
  }

  close() {
    this.subject.destroy();
    /* this.item.Items.forEach((value, index) => {
       console.log(value);
       if (!value.ItemsDepartmentCode || value.ItemsRoleCode) {
         value.delete=true;
       }
     })*/
  }
}
