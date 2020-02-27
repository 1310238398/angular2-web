import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../http/http.service';
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import {ServelUrl} from "../../../ServelUrl";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
    selector: 'app-dormitoryadjust',
    templateUrl: './dormitoryadjust.component.html',
    styleUrls: ['./dormitoryadjust.component.css']
})
export class DormitoryadjustComponent implements OnInit {
    isVisible = false;
    searchObj = {
        Campus: '',
        District: '',
        DormNumber: '',
    };

    UnStuSearch = '';
    allotCampusName = '';// 校区名

    //下拉框存值
    Campus = [];  //校区
    District = [];    //园区
    Dormitory = [];      //性别
    data = [];   //宿舍数据
    distributData =[];   //已分配宿舍的学生数据
    undistributData = [];   //未分配宿舍的学生宿舍数据
    _roomData =[]; //过滤选中的清退宿舍数据
    _SelectPull =[]; //选中移入要分配的学生数据
    _SelectPush =[]; //选中移出已分配的学生数据
    _SelectRoom ='' //选中的宿舍

    emptyBedNum = 0;  //获取选中的宿舍code剩余床位

    radioValue = '';
    selRow = null;



    _loading = false;
    _pushLoading = false;
    _undistributloading = false;

    page = {
        Page: 1,
        PageSize:30,
    };
    total = 0;


    constructor(public httpService: HttpService, private msgSrv: NzMessageService, private confirmServ: NzModalService,private message: NzMessageService) { }
    ngOnInit(): void {
        this.queryAcademyList();
    }

    _allChecked = false;
    _indeterminate = false;

    // 校区
    queryAcademyList() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.GetCampusData,
            Method: 'POST',
            Body: {
            }
        }).then(res => {

            if (res.FeedbackCode == 200) {
                this.Campus = res.Data;
            } else {
                this.msgSrv.success(res.FeedbackText);
            }
        })
    }

    // 校区园区联动
    campusDistrictLinkage(value) {
        this.searchObj.District = null;
        this.searchObj.DormNumber = null;
        if(value){

            this.Campus.forEach(item=>{
                if(item.CampusCode == value){
                    this.allotCampusName = item.CampusName
                    console.log(this.allotCampusName)
                    console.log(this.allotCampusName)
                    console.log(this.allotCampusName)
                }
            });

            this.httpService.postJSON({
                Router: ServelUrl.Url.GetDistrictData,
                Method: 'POST',
                Body: {
                    campus:value
                }
            }).then(res => {
                if (res.FeedbackCode == 200) {
                    this.District = res.Data;
                }
                // console.log(this.District)
            })
        }
    }

    //园区宿舍楼联动
    districtDormitoryLinkage(value) {
        this.searchObj.DormNumber = null;
        if(value){
            this.httpService.postJSON({
                Router: ServelUrl.Url.GetDormitoryData,
                Method: 'POST',
                Body: {
                    district:value
                }
            }).then(res => {
                if (res.FeedbackCode == 200) {
                    this.Dormitory = res.Data;
                }
                // console.log(this.Dormitory)
            })
        }
    }

    getCampusName(v){
        // console.log("v")
        // console.log(v)
        this.Campus.forEach(item=>{
            if(item.CampusCode == v){
                this.allotCampusName = item.CampusName
            }
        });

    }

    // reset
    resetForm(form) {
        form.reset();
        this.data= [];
        this._roomData =[];
        this.District =[];
        this.Dormitory =[];
        this.distributData =[];
        this.searchObj.Campus = null;
        this.searchObj.District = null;
        this.searchObj.DormNumber = null;
        this.emptyBedNum = 0;
        this._pushLoading = false;
        this._undistributloading = false;
        // console.log(this.searchObj)
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
        // 弹出确认框
        // this.isVisibles = true;
        var that = this;
        if(that._roomData.length >0){
            // console.log(that._roomData);
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
        this.httpService.postJSON({
            Router: ServelUrl.Url.GetRealRoomRetreatResult,
            Method: 'POST',
            Body: {
                // academy: this.searchObj.Academy,
                // major: this.searchObj.Major ? this.searchObj.Major: "",
                // grade: this.searchObj.Grade,
                room: this._roomData,
            }
        }).then(res => {
            if (res.Data ==='ok'){
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



    RoomRadio(index,RoomCode){
        this.selRow = index;
        if(RoomCode){
            this._pushLoading = true;
            this.httpService.postJSON({
                Router: ServelUrl.Url.GetOneAdjustRoomData,
                Method: 'POST',
                Body: {
                    roomcode: RoomCode,
                }
            }).then(res => {
                if (res.Data.Room){
                    this._pushLoading = false;
                    // console.log("res.Data.room")
                    // console.log(res.Data.Room)
                    this.distributData = res.Data.Room;
                    this.emptyBedNum = res.Data.emptynum;
                }else{
                    this.emptyBedNum = res.Data.emptynum;
                    this.distributData = [];
                    this._pushLoading = false;
                }
                // console.log("res.Data.room")
                // console.log(res.Data.Room)
                // console.log(this.distributData)
            });
            this._SelectRoom = RoomCode
        }
        // console.log(RoomCode+'+'+index);
    }

    // // 左侧宿舍点击
    // _refreshStatus(v,checked){
    //     this.data.forEach(item => {
    //         if(item.RoomCode==v.RoomCode){
    //             item.checked = true
    //         }else {
    //             item.checked = false
    //         }
    //     });
    //
    //     if(v.RoomCode && checked == true){
    //         // GetOneAdjustRoomData
    //         console.log(v.RoomCode);
    //         this._pushLoading = true;
    //         this.httpService.postJSON({
    //             Router: ServelUrl.Url.GetOneAdjustRoomData,
    //             Method: 'POST',
    //             Body: {
    //                 roomcode: v.RoomCode,
    //             }
    //         }).then(res => {
    //             if (res.Data.Room){
    //                 this._pushLoading = false;
    //                 // console.log("res.Data.room")
    //                 // console.log(res.Data.Room)
    //                 this.distributData = res.Data.Room;
    //                 this.emptyBedNum = res.Data.emptynum;
    //             }else{
    //                 this.emptyBedNum = res.Data.emptynum;
    //                 this.distributData = [];
    //                 this._pushLoading = false;
    //             }
    //             // console.log("res.Data.room")
    //             // console.log(res.Data.Room)
    //             // console.log(this.distributData)
    //         });
    //         this._SelectRoom = v.RoomCode
    //     }


        // console.log("this.rooms")
        // console.log(this._SelectRoom)

    // }

    // 中间移出学生点击
    _refreshdistributStatus(v){
        this._SelectPush = [];
        this.distributData.forEach(item => {
            // if(item.IntelUserCode == v.IntelUserCode){
            //     item.checked = true;
            // }else {
            //     item.checked = false;
            // }
            if(item.checked){
                var push = {};
                push["bedcode"] =item.BedCode;
                push["intelusercode"] =item.IntelUserCode;
                if (item.Sex === '男') {
                    push['sex'] = '0030001';
                }else if (item.Sex === '女') {
                    push['sex'] = '0030002';
                }

                this._SelectPush.push(push);
            }
        });
    }

    // 右边移入学生点击
    _refreshundistributStatus(v){
        // console.log("v")
        // console.log(v)
        // console.log(v)
        // console.log(v)
        // console.log(v.CampusName)
        // console.log("this.allotCampusName")
        // console.log(this.allotCampusName)

        this._SelectPull = [];
        this.undistributData.forEach(item => {
            // if(item.IntelUserCode == v.IntelUserCode){
            //     item.checked = true;
            // }else {
            //     item.checked = false;
            // }
            if(item.checked){
                var pull = {};
                pull["intelusercode"] =item.IntelUserCode;
                if (item.Sex === '男') {
                    pull['sex'] = '0030001';
                }else if (item.Sex === '女') {
                    pull['sex'] = '0030002';
                }

                this._SelectPull.push(pull);
            }
        });
    }



    //宿舍查询
    onSearch(reload = false) {
        this.emptyBedNum = 0;
        console.log(this.searchObj)
        if (this.searchObj.Campus == ""  || this.searchObj.District == "" || !this.searchObj.DormNumber) {
            this.confirmServ.info({
                title: '友情提示',
                content: '校区,园区,宿舍楼等查询条件都不能为空'
            });
        }else{
            this._loading = true;
            this._allChecked = false;
            // 获取宿舍数据
            this.httpService.postJSON({
                Router: ServelUrl.Url.GetDormitoryAdjustRoomData,
                Method: 'POST',
                Body: {
                    campus: this.searchObj.Campus,
                    district: this.searchObj.District,
                    dormitory: this.searchObj.DormNumber,
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

    // 未分配是学生查询
    onUnDistribution(reload = false){

        this._undistributloading = true;
        if (reload) {
            this.page.Page = 1;
        }

        // 获取未分配学生数据
        this.httpService.postJSON({
            Router: ServelUrl.Url.UnDistributionData,
            Method: 'POST',
            Body: {
                name: this.UnStuSearch,
                index: this.page.Page,
                size: this.page.PageSize,
            }
        }).then(res => {
            if (res.data){
                this._undistributloading = false;
                this.undistributData = res.data;

            }else{
                this.undistributData = [];
                this._undistributloading = false;
            }

            if (res.total > 0){
                this.total = res.total;
            }else{
                this.total = 0;
            }

        });
    }


    // 移入未分配的学生
    onPull(){

        // if(this.searchObj.Campus != this._SelectPull["Campus"]){
        //     alert("no")
        // }else{
        //     alert("ok")
        // }
        // console.log("this._SelectPull.Campus");
        // console.log("this._SelectPull[\"IntelUserCode\"]");
        // console.log(this._SelectPull["IntelUserCode"]);

        console.log("this._SelectPull")
        console.log(this._SelectPull)
        console.log(this._SelectPull)

        if(!this._SelectRoom){
            this.confirmServ.info({
                title: '友情提示',
                content: '请先选择一个宿舍'
            });
        }else if(this.emptyBedNum <= 0){
            this.confirmServ.info({
                title: '友情提示',
                content: '该宿舍已住满'
            });
        }else if(this._SelectPull.length <= 0){
            this.confirmServ.info({
                title: '友情提示',
                content: '请选择未分配的学生'
            });
        }else if( this.emptyBedNum < this._SelectPull.length ){
            this.confirmServ.info({
                title: '友情提示',
                content: '所选学生数不能大于剩余床位数,请重新操作'
            });
        }else{
            // 发起移入分配学生宿舍
            this.httpService.postJSON({
                Router: ServelUrl.Url.GetPullStuRoomResult,
                Method: 'POST',
                Body: {
                    room: this._SelectRoom,
                    pull:this._SelectPull
                }
            }).then(res => {
                // console.log(res)
                this.UnStuSearch = '';
                this.undistributData = [];
                this._SelectPull = [];
                if (res.Data ==='ok'){

                    this.confirmServ.success({
                        title: '友情提示',
                        content: '移入成功!!!'
                    });

                    this._pushLoading = true;
                    this.httpService.postJSON({
                        Router: ServelUrl.Url.GetOneAdjustRoomData,
                        Method: 'POST',
                        Body: {
                            roomcode: this._SelectRoom,
                        }
                    }).then(res => {
                        if (res.Data.Room){
                            this._pushLoading = false;
                            // console.log("res.Data.room")
                            // console.log(res.Data.Room)
                            this.distributData = res.Data.Room;
                            this.emptyBedNum = res.Data.emptynum;
                        }else{
                            this.emptyBedNum = res.Data.emptynum;
                            this.distributData = [];
                            this._pushLoading = false;
                        }
                        // console.log("res.Data.room")
                        // console.log(res.Data.Room)
                        // console.log(this.distributData)
                    });


                    this.onUnDistribution(true)
                }else{
                    this.confirmServ.info({
                        title: '友情提示',
                        content: '移入失败请重新操作!!!'
                    });
                }
            });
        }
    }

    //移出已分配的学生
    onPush(){
        if(this._SelectPush.length <= 0){
            this.confirmServ.info({
                title: '友情提示',
                content: '请选中至少一位要移出的学生'
            });
        }else{
            // 发起移出已分配宿舍的学生（宿舍清退）
            this.httpService.postJSON({
                Router: ServelUrl.Url.GetPushStuRoomResult,
                Method: 'POST',
                Body: {
                    // bedcode: this._SelectPush["BedCode"],
                    // intelcode: this._SelectPush["IntelUserCode"],
                    push:this._SelectPush
                }
            }).then(res => {
                if (res.Data ==='ok'){
                    this.emptyBedNum = 0;
                    this.distributData = [];
                    this._SelectPush = [];
                    this.confirmServ.success({
                        title: '友情提示',
                        content: '移出成功!!!'
                    });
                    this._SelectPush = [];
                    this._pushLoading = true;
                    this.httpService.postJSON({
                        Router: ServelUrl.Url.GetOneAdjustRoomData,
                        Method: 'POST',
                        Body: {
                            roomcode: this._SelectRoom,
                        }
                    }).then(res => {
                        if (res.Data.Room){
                            this._pushLoading = false;
                            // console.log("res.Data.room")
                            // console.log(res.Data.Room)
                            this.distributData = res.Data.Room;
                            this.emptyBedNum = res.Data.emptynum;
                        }else{
                            this.emptyBedNum = res.Data.emptynum;
                            this.distributData = [];
                            this._pushLoading = false;
                        }
                        // console.log("res.Data.room")
                        // console.log(res.Data.Room)
                        // console.log(this.distributData)
                    });

                    this.onUnDistribution(true)
                }else{
                    this.confirmServ.info({
                        title: '友情提示',
                        content: '移出失败请重新操作!!!'
                    });
                }
            });
        }
    }
}
