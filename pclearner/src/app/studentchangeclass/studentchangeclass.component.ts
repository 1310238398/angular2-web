import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../http/http.service";
import {ServelUrl} from "../ServelUrl";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-studentchangeclass',
  templateUrl: 'studentchangeclass.component.html'
})
export class StudentChangeClassComponent implements OnInit {
  _currentClass = {
    ClassCode: '',
    ClassName: ''
  };
  allChecked = false;
  allNotChecked = false;
  Orgs = [];
  HaveClassStudent = [];
  NotHaveClassStudent = [];
  $check={
    haveCheck:false,
    notHaveCheck:false,
  };

  options = {
    displayField: 'DepartmentName'
  };


  constructor(public httpService: HttpService, public msgSrv: NzMessageService) {
  }

  ngOnInit() {
    this.loadOrganization();
    this.getNotClassStudent();
  }

  loadOrganization() {
    this.httpService.postJSON(
      {
        Router: ServelUrl.Url.getOrg,
        Method: 'POST',
        Body: {}
      }).then(res => {
      if (!res.FeedbackCode) {
        this.disableChildren(res.children || []);
        this.Expanded(res.children);
        this.Orgs = res.children || [];

      }

    })
  }
  Expanded(nodes) {
    nodes.forEach(item => {
      item.isExpanded = true;
      if (item.children.length > 0) {
        item.children.forEach(i => {
          i.isExpanded = true;
        })
      }
    })
  }

  disableChildren(nodes) {
    for (let node of nodes) {
      if (node.children) {
        node.disableCheckbox = true;
        this.disableChildren(node.children);
      }
    }
  }

  getClassStudent(ClassCode) {
    this.httpService.POST({
      Router: ServelUrl.Url.getHaveClassStudent,
      Method: 'POST',
      Body: {
        ClassCode: ClassCode
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.HaveClassStudent = res.Data;
        this.$check.haveCheck=true;
        this.$check.notHaveCheck=true;
      }
    })
  }
  getNotClassStudent(){
    this.httpService.postJSON({
      Router: ServelUrl.Url.getHaveClassStudent,
      Method: 'POST',
      Body: {
        ClassCode: '',
        Default: true
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.NotHaveClassStudent = res.Data;
        this.$check.haveCheck=true;
        this.$check.notHaveCheck=true;
      }
    })
  }
  refreshStatus(){
    const $allHaveCheck=this.HaveClassStudent.every(value=>!value.checked);
    const $allUnChecked = this.NotHaveClassStudent.every(value => !value.checked);
    this.$check.haveCheck=$allHaveCheck;
    this.$check.notHaveCheck=$allUnChecked;
    console.log('$allHaveCheck:',$allHaveCheck);
    console.log('$allUnChecked:',$allUnChecked)
  }
  checkAll(value) {
    if (value) {
      this.HaveClassStudent.forEach(data => {
        data.checked = true;
      });
    } else {
      this.HaveClassStudent.forEach(data => {
        data.checked = false;
      });
    }
  };
  checkNotAll(value) {
    if (value) {
      this.NotHaveClassStudent.forEach(data => {
        data.checked = true;
      });
    } else {
      this.NotHaveClassStudent.forEach(data => {
        data.checked = false;
      });
    }
  };


  onEvent(ev: any) {
    if (ev.node && ev.node.data) {
      var nodeModel = ev.node.data;
      if (ev.checked) {
        this._currentClass.ClassCode = nodeModel.DepartmentCode;
        this._currentClass.ClassName = nodeModel.DepartmentName;
        if (ev.node.parent.children.length > 0) {
          ev.node.parent.children.forEach(node => {
            if (node.data.DepartmentCode != this._currentClass.ClassCode) {
              node.data.checked = false;
            }
          });
        }
        this.getClassStudent(ev.node.data.DepartmentCode);
      } else {
        if (nodeModel.DepartmentCode == this._currentClass.ClassCode) {
          this._currentClass = {
            ClassCode: '',
            ClassName: ''
          };
          this.HaveClassStudent = [];
        }
      }
    }
  }
  confirm(event){
    let $have = this.HaveClassStudent.some(item => {
      return item.checked;
    });
    if (!$have) {
      this.msgSrv.warning("至少选择一个已分配班级的学生！");
      event.stopPropagation();
      return
    }
  }
  onPush() {
    let $have = this.HaveClassStudent.some(item => {
      return item.checked;
    });
    if (!$have) {
      this.msgSrv.warning("至少选择一个已分配班级的学生！");
      return
    }
    let $Students = [];
    this.HaveClassStudent.forEach(item => {
      if (item.checked) {
        $Students.push({IntelUserCode: item.IntelUserCode});
      }
    });
    this.httpService.postJSON({
      Router: ServelUrl.Url.pushStudent,
      Method: 'POST',
      Body: {
        ClassCode: this._currentClass.ClassCode,
        Student: $Students
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.msgSrv.success(res.FeedbackText);
        this.getClassStudent(this._currentClass.ClassCode);
       this.getNotClassStudent()
      } else {
        this.msgSrv.error(res.FeedbackText)
      }
    })
  }

  onPull() {
    if (!this._currentClass.ClassCode) {
      this.msgSrv.warning("请选择一个班级且只选一个！");
      return
    }
    let $Students = [];
    let $Nothave = this.NotHaveClassStudent.some(item => {
      return item.checked;
    });
    if (!$Nothave) {
      this.msgSrv.warning("至少选择一个未分配班级的学生！");
      return
    }
    this.NotHaveClassStudent.forEach(item => {
      if (item.checked) {
        $Students.push({IntelUserCode: item.IntelUserCode});
      }
    });
    this.httpService.postJSON({
      Router: ServelUrl.Url.pullStudent,
      Method: 'POST',
      Body: {
        ClassCode: this._currentClass.ClassCode,
        Student: $Students
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.msgSrv.success(res.FeedbackText);
        this.getNotClassStudent();
        this.getClassStudent(this._currentClass.ClassCode);
      } else {
        this.msgSrv.error(res.FeedbackText)
      }
    })
  }
}
