import {Component, OnInit} from '@angular/core';
import {ServelUrl} from "../../../ServelUrl";
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {HttpService} from "../../../../http/http.service";

@Component({
  selector: 'app-func-edit',
  templateUrl: './func-edit.component.html',
  styleUrls: ['./func-edit.component.less']
})
export class FuncEditComponent implements OnInit {
  funItem = {
    ID: '',
    checked: false,
    Name: '',
    Icon: '',
    ChannelGroup: [],
    UserType: [],
    Desc: ''
  };
  UserType = [];
  StaffConfs = [{name: '按角色配置', code: 'role'}, {name: '按人员配置', code: 'people'}];
  StudentConfs = [{name: '按职务配置', code: 'role'}, {name: '按年级配置', code: 'grade'}];
  StaffSelectedConf = 'role';
  StudentSelectedConf = 'role';
  StaffRoles = [];
  StudentRoles = [];
  StaffList = [];
  selectedOption;
  SelectRoleOptions = [];
  SelectStudentRoleOptions = [];
  SelectStaffOptions = [];
  DeleteSelectStaffOptions = [];
  SelectGradeOptions = [];
  DeleteSelectGradeOptions = [];
  staff_Config = false;
  student_Config = false;
  Grades = [];

  constructor(public subject: NzModalSubject, private http: HttpService, private confirmServ: NzModalService, private message: NzMessageService) {
  }

  ngOnInit() {
    console.log(this.funItem);
    this.UserType = this.funItem.UserType;
    this.getRoles('1', true);
    this.getGrades();
    this.getRoles('2', true);
  }

  /*获取老师列表*/
  queryStaff(value) {
    this.http.PostJSON({
      Router: ServelUrl.Url.querystaff,
      Method: 'POST',
      Body: {
        Name: value || ""
      }
    }).then(res => {
      if (!res.RE) {
        this.StaffList = res.Data || [];
        this.StaffList.forEach(staff => {
          staff.PhoneName = `${staff.Name}(${staff.Phone})`
        })
      }
      console.log(res);
    })
  }

  /*获取年级列表*/
  getGrades() {
    this.http.postJSON({
      Router: ServelUrl.Url.getFunGrades,
      Method: 'POST',
      Body: {
        Fid: this.funItem.ID || ""
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Grades = res.Data.map(val => {
          return {name: val.Name, code: val.Code}
        });
        //处理学生年级(自动选择)
        this.getGradeByFid(this.funItem.ID).then(res => {
          console.log('grade', res);
          if (!res.RE) {
            //每次保证清理下已自动选中的年级
            this.SelectGradeOptions = [];
            this.dealStudentGradeFidRole(this.Grades, res.Data);
          }
        });
        this.Grades.unshift({name: '全部年级', code: 'all'})
      }
      console.log(res);
    })
  }

  getRoles(uType = '2', checked) {
    if (checked) {
      this.http.postJSON({
        Router: ServelUrl.Url.getFunRoles,
        Method: 'POST',
        Body: {
          uType: uType || ''
        }
      }).then(res => {
        if (!res.FeedbackCode) {
          //this.funsList=res.Data||[]
          if (uType == '1') {
            this.StaffRoles = res.Data || [];
            this.getRolesByFid(uType, this.funItem.ID).then(res => {
              if (!res.FeedbackCode) {
                //老师-每次保证清理下已自动选中的角色
                this.SelectRoleOptions = [];
                this.dealStaffFidRole(this.StaffRoles, JSON.parse(res.Data.role) || [])
              }
            });
            this.getStaffByFid(this.funItem.ID).then(res => {
              if (!res.RE) {
                //每次保证清理下已自动选中的人员
                this.SelectStaffOptions = [];
                res.Data && res.Data.forEach(staff => {
                  this.SelectStaffOptions.push({code: staff.UID, name: staff.Name, phone: staff.Phone, staff: true})
                })
              }
            });
            this.StaffRoles.unshift({RoleName: '全部角色', RoleCode: 'all'})
          } else {
            this.StudentRoles = res.Data || [];
            console.log('学生处理');
            //处理学生角色(自动选择)
            this.getRolesByFid(uType, this.funItem.ID).then(res => {
              if (!res.FeedbackCode) {
                //学生-每次保证清理下已自动选中的角色
                this.SelectStudentRoleOptions = [];
                this.dealStudentFidRole(this.StudentRoles, JSON.parse(res.Data.role) || [])
              }
            });
            this.StudentRoles.unshift({RoleName: '全部职务', RoleCode: 'all'})

          }
        }
      })
    } else {
      this.StaffRoles = [];
      this.StudentRoles = [];
    }

  }

  /*获取功能的role列表*/
  getRolesByFid(userType, fid): Promise<any> {
    return this.http.postJSON({
      Router: ServelUrl.Url.getRolesByFid,
      Method: 'POST',
      Body: {
        userType: userType || '',
        fid: fid || ''
      }
    })
  }

  /*获取功能的人员列表*/
  getStaffByFid(fid): Promise<any> {
    return this.http.PostJSON({
      Router: ServelUrl.Url.getStaffByFid,
      Method: 'POST',
      Body: {
        Fid: fid || ''
      }
    })
  }

  /*获取功能的年级列表*/
  getGradeByFid(fid): Promise<any> {
    return this.http.PostJSON({
      Router: ServelUrl.Url.getFidFunGrades,
      Method: 'POST',
      Body: {
        Fid: fid || ''
      }
    })
  }

  /*处理老师功能角色(自动选中)*/
  dealStaffFidRole(Roles, FidRoles) {
    Roles.forEach(role => {
      FidRoles.forEach(fRole => {
        if (!fRole.RoleCode) {
          fRole.RoleCode = 'all';
        }
        if (fRole.RoleCode == role.RoleCode) {
          /*主动触发老师选中角色*/
          this.onStaffSelectRole(role)
        }
      })
    })

  }

  /*处理学生功能角色(自动选中)*/
  dealStudentFidRole(Roles, FidRoles) {
    Roles.forEach(role => {
      FidRoles.forEach(fRole => {
        if (!fRole.RoleCode) {
          fRole.RoleCode = 'all';
        }
        if (fRole.RoleCode == role.RoleCode) {
          /*主动触发学生选中角色*/
          this.onStudentSelectRole(role)
        }
      })
    })

  }

  /*处理学生功能年级(自动选中)*/
  dealStudentGradeFidRole(Grades, FidGrades) {
    Grades.forEach(grade => {
      FidGrades.forEach(fGrade => {
        if (fGrade == grade.name) {
          /*主动触发学生选中年级*/
          this.onStudentSelectGrade(grade)
        }
      })
    })

  }

  /*处理功能人员(自动选择)*/
  dealFidStaff(Roles, FidRoles) {
    Roles.forEach(role => {
      FidRoles.forEach(fRole => {
        if (fRole.RoleCode == role.RoleCode) {
          /*主动触发老师选中角色*/
          this.onStaffSelectRole(role)
        }
      })
    })

  }

  /*老师选中角色*/
  onStaffSelectRole(role) {
    role.checked = !role.checked;
    if (role.checked) {
      /*特别关照全部角色*/
      var allRole = this.StaffRoles.find(val => val.RoleCode == 'all' && val.checked);
      if (allRole) {
        this.SelectRoleOptions = [{name: '全部角色', code: 'all'}];
        this.StaffRoles.forEach(r => {
          if (r.RoleCode != 'all') {
            r.checked = false;
          }
        })
      } else {
        this.SelectRoleOptions.push({name: role.RoleName, code: role.RoleCode});
      }
    } else {
      this.SelectRoleOptions.splice(this.SelectRoleOptions.findIndex(item => item.code === role.RoleCode), 1)
    }
  }

  /*老师tab-人员选择*/
  selectStaff(event) {
    const flag = this.SelectStaffOptions.find(val => {
      return val.code == event.UID
    });
    if (!flag) {
      this.SelectStaffOptions.push({code: event.UID, name: event.Name, phone: event.Phone, staff: true})
    }
  }

  /*学生选中角色*/
  onStudentSelectRole(role) {
    role.checked = !role.checked;
    if (role.checked) {
      /*特别关照全部职务*/
      var allRole = this.StudentRoles.find(val => val.RoleCode == 'all' && val.checked);
      if (allRole) {
        this.SelectStudentRoleOptions = [{name: '全部职务', code: 'all'}];
        this.StudentRoles.forEach(r => {
          if (r.RoleCode != 'all') {
            r.checked = false;
          }
        })
      } else {
        this.SelectStudentRoleOptions.push({name: role.RoleName, code: role.RoleCode});
      }
    } else {
      this.SelectStudentRoleOptions.splice(this.SelectStudentRoleOptions.findIndex(item => item.code === role.RoleCode), 1)
    }
  }

  /*学生tab-选择年级*/
  onStudentSelectGrade(grade) {
    grade.checked = !grade.checked;
    if (grade.checked) {
      /*特别关照全部职务*/
      var allGrade = this.Grades.find(val => val.code == 'all' && val.checked);
      if (allGrade) {
        this.SelectGradeOptions = [{name: '全部年级', code: 'all', grade: true}];
        this.SelectGradeOptions.forEach(r => {
          if (r.code != 'all') {
            r.checked = false;
          }
        })
      } else {
        grade.grade = true;
        this.SelectGradeOptions.push(grade);
      }
    } else {
      this.SelectGradeOptions.splice(this.SelectGradeOptions.findIndex(item => item.code === grade.code), 1)
    }
  }

  /*删除学工角色选择*/
  onDeleteSelected(event): void {
    console.log(event);
    if (event.staff) {
      // 记忆删除的学工选项(不稳定操作)
      this
        .DeleteSelectStaffOptions
        .push(event);
      console.log('delete', this.DeleteSelectStaffOptions);
      this
        .SelectStaffOptions
        .splice(this.SelectStaffOptions.findIndex(item => item.code === event.code), 1);
      /*  this.http.PostJSON({
          Router: ServelUrl.Url.delStaff,
          Method: 'POST',
          Body: {
            Fid: this.funItem.ID || "",
            ChannelGroup: this.funItem.ChannelGroup[0] || "",
            UIDs: [event.code]
          }
        })*/

    } else {
      const currentRole = this
        .StaffRoles
        .find(item => item.RoleCode === event.code);
      currentRole.checked = false;
      this
        .SelectRoleOptions
        .splice(this.SelectRoleOptions.findIndex(item => item.code === event.code), 1);

    }
  }

  /*删除学生选择*/
  onDeleteStudentSelected(event): void {
    console.log(event);
    if (event.grade) {
      /*记忆删除的年级*/
      this
        .DeleteSelectGradeOptions
        .push(event);
      const currentGrade = this
        .Grades
        .find(item => item.code === event.code);
      currentGrade.checked = false;
      this
        .SelectGradeOptions
        .splice(this.SelectGradeOptions.findIndex(item => item.code === event.code), 1);
      /* this.http.PostJSON({
         Router: ServelUrl.Url.delFunGrade,
         Method: 'POST',
         Body: {
           Fid: this.funItem.ID || "",
           ChannelGroup: this.funItem.ChannelGroup[0] || "",
           Grades: [event.code]
         }
       })*/
    } else {
      const currentRole = this
        .StudentRoles
        .find(item => item.RoleCode === event.code);
      currentRole.checked = false;
      this
        .SelectStudentRoleOptions
        .splice(this.SelectStudentRoleOptions.findIndex(item => item.code === event.code), 1);

    }
  }

  // 删除选择的学工
  deleteStaffOptions(UIDs): Promise<any> {
    return this
      .http
      .PostJSON({
        Router: ServelUrl.Url.delStaff,
        Method: 'POST',
        Body: {
          Fid: this.funItem.ID || '',
          ChannelGroup: this.funItem.ChannelGroup[0] || '',
          UIDs: UIDs
        }
      });
  }

  // 删除选择的年级
  deleteGradeOptions(Grades): Promise<any> {
    return this
      .http
      .PostJSON({
        Router: ServelUrl.Url.delFunGrade,
        Method: 'POST',
        Body: {
          Fid: this.funItem.ID || '',
          ChannelGroup: this.funItem.ChannelGroup[0] || '',
          Grades: Grades
        }
      });
  }


  /*清空数据*/
  resetData() {
    this.StaffRoles = [];
    this.SelectRoleOptions = [];
    this.SelectStaffOptions = [];
    this.StudentRoles = [];
    this.SelectStudentRoleOptions = [];
    this.SelectGradeOptions = [];
    this.Grades = [];
  }


  staffConfirm() {
  /*  if (!this.SelectStaffOptions.length && !this.SelectRoleOptions.length) {
      if(this.DeleteSelectStaffOptions.length){

      }
      this.message.warning('请先选择要配置的角色或人员!');
      return;
    }*/
    this.subject.destroy();
    var that = this;
    console.log('确定');
    console.log('DeleteSelectStaffOptions', that.DeleteSelectStaffOptions);
    //添加人员配置
   // if (that.SelectStaffOptions.length || that.SelectRoleOptions.length) {
      if (this.SelectRoleOptions.length == 1 && this.SelectRoleOptions[0].code == 'all') {
        this.SelectRoleOptions = [{code: '*', name: '*'}]
      }
      Promise.all([
        that.deleteStaffOptions(that.DeleteSelectStaffOptions.map(staff => staff.code)),
        that.configRole({
          Fid: that.funItem.ID || '',
          UserType: '1' || '',
          Roles: JSON.stringify([
            ...that
              .SelectRoleOptions
              .map(item => {
                return {RoleCode: item.code, RoleName: item.name};
              })
          ])||[]
        }),
        that.configStaff()
      ]).then(res => {
        console.log(res);
        if (res[0].RE) {
          that
            .message
            .error(res[0].Text);
        } else if (res[1].FeedbackCode) {
          that
            .message
            .error(res[1].FeedbackText);
        } else if (res[2].RE) {
          that
            .message
            .error(res[2].Text);
        } else {
          that.subject.next();
          that.message.success('成功!');
        }
      });
    //}
  }

  cancel() {

  }

  studentConfirm() {
/*    if (!this.SelectStudentRoleOptions.length && !this.SelectGradeOptions.length) {
      this.message.warning('请先选择要配置的职务或年级!');
      return;
    }*/
    this.subject.destroy();
    var that = this;
    //添加配置
   // if (that.SelectStudentRoleOptions.length || that.SelectGradeOptions.length) {
      if (this.SelectStudentRoleOptions.length == 1 && this.SelectStudentRoleOptions[0].code == 'all') {
        this.SelectStudentRoleOptions = [{code: '*', name: '*'}]
      }
      Promise.all([
        that.configRole({
          Fid: that.funItem.ID || '',
          UserType: '2' || '',
          Roles: JSON.stringify([
            ...that
              .SelectStudentRoleOptions
              .map(item => {
                return {RoleCode: item.code, RoleName: item.name};
              })
          ])||[]
        }),
        that.deleteGradeOptions(that.DeleteSelectGradeOptions.map(item => item.name)),
        that.configGrade()
      ]).then(res => {
        console.log(res);
        if (res[0].FeedbackCode) {
          that
            .message
            .error(res[0].FeedbackText);
        } else if (res[1].RE) {
          that
            .message
            .error(res[1].Text);
        } else if (res[2].RE) {
          that
            .message
            .error(res[2].Text);
        } else {
          that.subject.next();
          that.message.success('成功!');
        }
      });
   // }
  }

  /* staffConfigOk() {

     if (!this.SelectStaffOptions.length && !this.SelectRoleOptions.length) {
       this.message.warning('请先选择要配置的角色或人员!');
       return;
     }
     this.subject.destroy();
     const data = this.SelectRoleOptions.concat(this.SelectStaffOptions);
     var that = this;
     this.confirmServ.confirm({
       title: `确定要为全校的${data.map(item => item.name).join()}分配该功能吗？`,
       maskClosable: false,
       onOk() {
         console.log('确定');
         console.log('DeleteSelectStaffOptions',that.DeleteSelectStaffOptions);
         //添加人员配置
         if (that.SelectStaffOptions.length || that.SelectRoleOptions.length) {
           Promise.all([
             that.deleteStaffOptions(that.DeleteSelectStaffOptions.map(staff => staff.code)),
             that.configRole({
               Fid: that.funItem.ID || '',
               UserType: '2' || '',
               Roles: JSON.stringify([
                 ...that
                   .SelectRoleOptions
                   .map(item => {
                     return {RoleCode: item.code, RoleName: item.name};
                   })
               ])
             }),
             that.configStaff()
           ]).then(res => {
             console.log(res);
             if (res[0].RE) {
               that
                 .message
                 .error(res[0].Text);
             } else if (res[1].FeedbackCode) {
               that
                 .message
                 .error(res[1].FeedbackText);
             } else if (res[2].RE) {
               that
                 .message
                 .error(res[2].Text);
             } else {
               that
                 .message
                 .success('成功!');
             }
           });
         }

       },
       onCancel() {
       }
     });
   }*/

  /*  studentConfigOk() {
      if (!this.SelectStudentRoleOptions.length && !this.SelectGradeOptions.length) {
        this.message.warning('请先选择要配置的职务或年级!');
        return;
      }
      this.subject.destroy();
      const data = this.SelectStudentRoleOptions.concat(this.SelectGradeOptions);
      var that = this;
      this.confirmServ.confirm({
        title: `确定要为全校的${data.map(item => item.name).join()}分配该功能吗？`,
        maskClosable: false,
        onOk() {

        },
        onCancel() {
        }
      });
    }*/

  /*配置角色-学工||学生*/
  configRole(params): Promise<any> {
    var allRole = JSON.parse(params.Roles).find(val => val.RoleCode == 'all');
    return this.http.postJSON({
      Router: ServelUrl.Url.addFuncRole,
      Method: 'POST',
      Body: {
        fid: params.Fid || "",
        userType: params.UserType || "",
        roles: allRole ? JSON.stringify([{RoleCode: "", RoleName: ""}]) : params.Roles
      }
    })
  }

  /*配置人员*/
  configStaff(): Promise<any> {
    return this.http.PostJSON({
      Router: ServelUrl.Url.addFuncUser,
      Method: 'POST',
      Body: {
        Fid: this.funItem.ID || "",
        ChannelGroup: this.funItem.ChannelGroup[0] || "",
        UIDs: [...this.SelectStaffOptions.map(item => item.code)]
      }
    })
  }


  /*配置年级*/
  configGrade(): Promise<any> {
    if (this.SelectGradeOptions.length == 1 && this.SelectGradeOptions[0].code == 'all') {
      this.Grades.forEach(grade => {
        if (!(grade.code == 'all')) {
          this.SelectGradeOptions.push(grade);
        }else {
          this.SelectGradeOptions.splice(this.SelectGradeOptions.findIndex(item => item.code =='all'),1)
        }
      });
    }
    return this.http.PostJSON({
      Router: ServelUrl.Url.addFunGrade,
      Method: 'POST',
      Body: {
        Fid: this.funItem.ID || "",
        ChannelGroup: this.funItem.ChannelGroup[0] || "",
        Grades: [...this.SelectGradeOptions.map(item => item.name)]
      }
    })
  }

  tabSelected() {
    console.log('click')
  }
}
