import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../../http/http.service';
import { ServelUrl } from "../../../ServelUrl";
import { NzMessageService } from "ng-zorro-antd";
@Component({
  selector: 'app-assigndormitory',
  templateUrl: './assigndormitory.component.html',
  styleUrls: ['./assigndormitory.component.css']
})
export class AssignDormitoryComponent implements OnInit {
  allDormChecked = false; // 全选公寓
  allCheckedChecked = false; // 全选检查人
  campusId;
  taskId;
  isVisible = false;
  checkerListData = [];
  checkedDorm: any[] = [];//已选择宿舍
  Checker: any[] = [];  //已选择检查人
  _loading = true;
  // 接收上一页的传值
  campusName: '';
  type: '';
  endDate: '';
  startDate: '';
  taskID: '';
  taskName: '';
  week: '';
  // 给上一页传值
  PreCampusId = '';
  PreType = '';
  PreWeek = '';
  PreStarttime = '';
  PreStartDate = '';
  PreEndDate = '';
  PreTaskName = '';
  PreTaskId = '';


  localTaskId = '';
  localCampusID = '';
  // 按钮置灰
  isgray = false;
  isYellow = false;
  constructor(private confirmServ: NzModalService, private route: Router, private router: ActivatedRoute,
    public msgSrv: NzMessageService, private httpService: HttpService) {

  }
  dataSet = [];
  parataskId = '';
  paracampusId = '';
  ngOnInit() {
    console.log(localStorage)
    this.router.params.subscribe((params: Params) => {
      console.log(params)
      this.campusId = params['campusId'] || [];
      this.taskId = params['taskId'] || [];
      this.campusName = params['campus'];
      this.endDate = params['endDate'];
      this.startDate = params['startDate'];
      this.taskName = params['taskName'];
      this.week = params['week'];
      this.type = params['type'];
      if (JSON.stringify(params) !== '{}') {
        localStorage.setItem('PreCampusID', this.campusId);
        localStorage.setItem('Pretaskid', this.taskId);
        localStorage.setItem('PreEndData', this.endDate);
        localStorage.setItem('PreStartData', this.startDate);
        localStorage.setItem('PreTaskName', this.taskName);
        localStorage.setItem('preWeek', this.week)
        localStorage.setItem('Pretype', this.type);
      }
    });
    this.paracampusId = localStorage.getItem('PreCampusID');
    this.parataskId = localStorage.getItem('Pretaskid');
    this.PreEndDate = localStorage.getItem("PreEndData");
    this.PreStartDate = localStorage.getItem("PreStartData");
    this.PreTaskName = localStorage.getItem("PreTaskName");
    this.PreWeek = localStorage.getItem("preWeek");
    this.PreType = localStorage.getItem("Pretype");

    this.list();
    this.checkerList();
  }
  // 列表
  list() {
    console.log("传值短点")
    this._loading = true;
    this.httpService.postJSON({
      Router: ServelUrl.Url.list,
      Method: 'POST',
      Body: {
        TaskId: this.parataskId,
        Campus: this.paracampusId
      }

    }).then(res => {
      // console.log(res)
      this._loading = false;
      if (!res.FeedbackCode) {

        this.dataSet = res.Data;


        this.isGray();
      }
    })
  }
  isGray() {
    // this.dataSet.forEach(element => {
    //   if (element.Checker == '') {
    //     this.isgray = true;
    //     this.isYellow = false;

    //   } else {
    //     this.isgray = false;
    //     this.isYellow = true;
    //   }
    // });
    const allUnDistribut = this.dataSet.every(element => element.Checker == '');
    if (allUnDistribut) {
      this.isgray = true;
      this.isYellow = false;
    } else {
      this.isgray = false;
      this.isYellow = true;
    }

  }
  // 检查人列表
  checkerList() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.checkerList,
      Method: 'POST',
      Body: {
        TaskId: this.parataskId,
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.checkerListData = res.Data;
      }
    })
  }
  // 选择检查人
  chooseChecker(e) {
    const allChecked = this.checkerListData.every(value => value.checked === true);
    this.allCheckedChecked = allChecked;
  }

  // 全选检查人
  chooseAllChecker(e) {
    this.checkerListData.forEach(value => {
      value.checked = this.allCheckedChecked;
    });
  }
  // 点击分配检查人
  checker(data) {
    data.checked = true;
    this.checkedDorm = [];
    this.checkedDorm.push(data.DormitoryCode);
    this.checkerListData.forEach(element => {
      if (data.Checker.indexOf(element.Name) != -1) {
        element.checked = true;
      } else {
        element.checked = false;
      }
    });
    const allChecked = this.checkerListData.every(value => value.checked === true);
    this.allCheckedChecked = allChecked;
    this.isVisible = true;
  }

  // 选择公寓
  chooseDorm(e) {
    const allChecked = this.dataSet.every(value => value.checked === true);
    this.allDormChecked = allChecked;
  }

  // 全选公寓
  chooseAllDorm(e) {
    this.dataSet.forEach(value => {
      value.checked = this.allDormChecked;
    });
  }

  // 批量处理
  plChoose() {
    this.dataSet.forEach(value => {
      if (value.checked == true) {
        this.checkedDorm.push(value.DormitoryCode);
      }
    });
    console.log("批量处理")
    if (this.checkedDorm.length == 0) {
      this.msgSrv.success("请先进行批量选择");
    } else {
      this.checkerListData.forEach(element => {
        element.checked = false;
      });
      this.isVisible = true;
    }
  }

  assignChecher() {
    this.isVisible = true;

  }
  handleOk() {
    this.Checker = [];
    this.checkerListData.forEach(element => {
      if (element.checked == true) {
        this.Checker.push(element.IntelUserCode);
      }
    });
    // if (this.Checker.length == 0) {
    //   this.msgSrv.success("请选择分配人员");
    //   return;
    // } else {
    this._loading = true;
    this.isVisible = false;
    // if (this.checker.length != 1) {
    this.httpService.postJSON({
      Router: ServelUrl.Url.distribute,
      Method: 'POST',
      Body: {
        TaskId: this.parataskId,
        Level: '1',
        Code: this.checkedDorm,
        Checker: this.Checker,
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this._loading = false;
        this.checkedDorm = [];
        this.list(); //重新刷新页面
        this.allDormChecked=false;
        this.checkerList();
      }
    })
    // }



  }

  handleCancel = (e) => {
    this.dataSet.forEach(value => {
      value.checked = false;
    });
    this.allDormChecked=false;
    this.isVisible = false;
  }

  prePage() {
    console.log("上一页")
    this.route.navigate(['./dormitorycheck/newtask', {
      campus: this.paracampusId, type: this.PreType, week: this.PreWeek, starttime: this.PreStartDate,
      endTime: this.PreEndDate, taskName: this.PreTaskName, taskId: this.parataskId
    }]);
  }
  nextPage() {
    this.dataSet.forEach(element => {
      if (element.Checker != '') {
        this.route.navigate(['./dormitorycheck/previewcheck', { CampusId: this.paracampusId, TaskId: this.parataskId }]);
        // this.msgSrv.success("请分配检查人");
      } else {

      }
    });


  }
}
