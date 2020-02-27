import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../http/http.service';
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import {ServelUrl} from "../../../ServelUrl";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
    selector: 'app-dormitoryretreat',
    templateUrl: './dormitoryretreat.component.html',
    styleUrls: ['./dormitoryretreat.component.css']
})
export class DormitoryretreatComponent implements OnInit {
    _isVisible = false;
    searchObj = {
        Academy: null,
        Grade: null,
        Major: null,
    };

    //下拉框存值
    Academy = [];  //学院
    Grade = [];    //年级
    Major = [];      //性别
    data = [];   //宿舍数据
    _roomData =[]; //过滤选中的清退宿舍数据


    _loading = false;


    constructor(public httpService: HttpService, private msgSrv: NzMessageService, private confirmServ: NzModalService,private message: NzMessageService) { }
    ngOnInit(): void {
        this.queryAcademyList();
        this.queryGradeList();
        // this.queryMajorList();
    }

    _allChecked = false;
    _indeterminate = false;

    // 学院
    queryAcademyList() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.GetStudentAcademyData,
            Method: 'POST',
            Body: {
            }
        }).then(res => {

            if (res.FeedbackCode == 200) {
                this.Academy = res.Data;
            } else {
                this.msgSrv.success(res.FeedbackText);
            }
        })
    }
    majorCilck(v){
       if(!v){
           this.confirmServ.warning({
               title: '提示信息',
               content: '请先选中您要清退的学院！！！'
           });
       }
    }
    // 年级
    queryGradeList() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.GetStudentGradeData,
            Method: 'POST',
            Body: {
            }
        }).then(res => {
            if (res.FeedbackCode == 200) {
                this.Grade = res.Data;
            }
        })
    }


    // 学院专业联动
    academyMajorLinkage(value) {
        this.searchObj.Major = null;
        this.searchObj.Grade = null;
        if(value){
            this.httpService.postJSON({
                Router: ServelUrl.Url.GetStudentMajorData,
                Method: 'POST',
                Body: {
                    academy:value
                }
            }).then(res => {
                if (res.FeedbackCode == 200) {
                    this.Major = res.Data;
                }
                console.log(this.Major)
            })
        }else{
            // this.confirmServ.warning({
            //     title: '提示信息',
            //     content: '请先选中您要清退的学院！！！'
            // });
        }
    }

    // // 专业
    // queryMajorList() {
    //     this.httpService.postJSON({
    //         Router: ServelUrl.Url.GetStudentMajorData,
    //         Method: 'POST',
    //         Body: {}
    //     }).then(res => {
    //         if (res.FeedbackCode == 200) {
    //             this.Major = res.Data;
    //         }
    //     })
    // }


    // reset
    resetForm(form) {
        form.reset();
        this.data= [];
        this._roomData =[];
        this.searchObj.Academy = null;
        this.searchObj.Major = null ;
        this.searchObj.Grade = null;
    }


    //获取选中的分配宿舍数据
    getRoomData(){
        this._roomData =[];
        // this._allotStuData = [];
        //获取待分配学院信息
        this.data.forEach(item => {
            if(item.checked == true){
                this._roomData.push(item)
                // var allotStu = item.campuscode+'|'+item.studentnum;
                // this._allotStuData.push(allotStu)
            }
        });

        console.log("this._roomData");
        console.log(this._roomData);
        console.log(this.data);
        // 弹出确认框
        // this.isVisibles = true;
        var that = this;
        if(that._roomData.length >0){
            console.log(that._roomData);
            that.confirmServ.confirm({
                title: '确认一下',
                content: '您是否确认要执行此操作吗',
                okText: "确定",
                cancelText: "取消",
                onOk() {
                    that.handleOk();
                },
                onCancel() {
                }
            });
        }else{
            this.confirmServ.info({
                title: '友情提示',
                content: '请先选择要清退的宿舍'
            });
        }
    }

    // 发起清退请求
    handleOk = () => {
        this._isVisible = true;
        this.httpService.postJSON({
            Router: ServelUrl.Url.GetRealRoomRetreatResult,
            Method: 'POST',
            Body: {
                academy: this.searchObj.Academy,
                major: this.searchObj.Major ? this.searchObj.Major: "",
                grade: this.searchObj.Grade,
                room: this._roomData,
            }
        }).then(res => {
            this._isVisible = false;
            if (res.Data ==='ok'){
                this.data= [];
                if (this.searchObj.Academy == null  || this.searchObj.Grade == null) {
                    this.confirmServ.info({
                        title: '友情提示',
                        content: '学院、年级等查询条件都不能为空'
                    });
                }else{
                    this._loading = true;
                    this._allChecked = false;
                    // 获取待清退宿舍数据
                    this.httpService.postJSON({
                        Router: ServelUrl.Url.GetRoomRetreatData,
                        Method: 'POST',
                        Body: {
                            academy: this.searchObj.Academy,
                            major: this.searchObj.Major ? this.searchObj.Major: "",
                            grade: this.searchObj.Grade,
                        }
                    }).then(res => {
                        if (res.Data.length> 0){
                            this._loading = false;
                            this.data = res.Data;
                        }else{
                            this.data = [];
                            this._loading = false;
                        }
                    });
                };
                this.confirmServ.success({
                    title: '友情提示',
                    content: '您已清退成功!!!'
                });
            }else{
                this.confirmServ.info({
                    title: '友情提示',
                    content: '清退数据有误请重新操作!!!'
                });
            }
        });
    }

    handleCancel(){

    }


    // 全选所有宿舍
    _checkAll(value) {
        if (value) {
            this.data.forEach(items => {
                items.checked = true;
            });
        } else {
            this.data.forEach(items => {
                items.checked = false;
            });
            this._allChecked = false;
        }
        console.log("this.data")
        console.log(this.data)
    }

    //查询
    onSearch(reload = false) {
        this.data= [];
        if (this.searchObj.Academy == null  || this.searchObj.Grade == null) {
            this.confirmServ.info({
                title: '友情提示',
                content: '学院、年级等查询条件都不能为空'
            });
        }else{
            this._loading = true;
            this._allChecked = false;
            // 获取待清退宿舍数据
            this.httpService.postJSON({
                Router: ServelUrl.Url.GetRoomRetreatData,
                Method: 'POST',
                Body: {
                    academy: this.searchObj.Academy,
                    major: this.searchObj.Major ? this.searchObj.Major: "",
                    grade: this.searchObj.Grade,
                }
            }).then(res => {
                if (res.Data.length> 0){
                    this._loading = false;
                    this.data = res.Data;
                }else{
                    this.data = [];
                    this._loading = false;
                }
            });
        }
    }
}