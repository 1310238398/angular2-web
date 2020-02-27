import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../http/http.service';
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import {ServelUrl} from "../../../ServelUrl";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
    selector: 'app-dormitorydistribut',
    templateUrl: './dormitorydistribut.component.html',
    styleUrls: ['./dormitorydistribut.component.css']
})
export class DormitorydistributComponent implements OnInit {
    isVisible = false;
    buttonDisabled = false;
    searchObj = {
        Campus: null,
        Grade: null,
        Sex: null,
    }

    allotCampusName = '';// 校区名

    //下拉框存值
    Campus = [];  //学院
    Grade = [];    //年级
    Sex = [];      //性别
    data = [];   //学生待分配数据
    _stuData =[]; //中间过滤选中的待分配学生学院数据
    _allotStuData =[]; //最终待分配学生学院数据
    _roomData =[]; //中间过滤选中的待分配学生公寓数据
    _allotRoom =[]; //最终待分配的room数据
    _loading = false;
    maxheight = "" //固定高度 滚动条
    nodes = []; //宿舍公寓树数据
    _stuNum = 0; //待分配学生总人数
    _bedNum :number = 0; //待分配床位总数
    num_stu :number = 0; //实时给前端显示选中的学生总数
    num_bed :number = 0; //实时给前端显示选中的床位总数

    isVisibles = false; //模态框是否显示
    _isVisible = false; //loading
    _nodeloading = false; //宿舍loading
    _nodelnil = false; //显示tree公寓数没有数据的描述

    showModel = []; // 模态框展示班级与宿舍对应关系数据
    showModelData = []; // 待分配传给后台的数据


    constructor(public httpService: HttpService, private msgSrv: NzMessageService, private confirmServ: NzModalService,private message: NzMessageService) { }
    ngOnInit(): void {
        this.queryCampusList();
        this.queryGradeList();
        this.querySexList();
    }

    _allChecked = false;
    _indeterminate = false;

    // 校区
    queryCampusList() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.GetStudentCampusData,
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

    querySexList() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.GetSexList,
            Method: 'POST',
            Body: {}
        }).then(res => {
            if (res.FeedbackCode == 200) {
                this.Sex = res.Data;
            }
        })
    }

    options = {
        // useCheckbox: true,
        allowDrag:true,
        // 获取子节点
        getChildren: (node: any) => {
            // console.log('node:',node)
            var ischeckd = false
            if(node.data.checked){
                ischeckd = true;
            }else{
                ischeckd = false;
            }

            return new Promise((resolve, reject) => {
                var treeName = "";
                var children = {};
                var childrenarr = [];
                if(node.data.code && node.data.hasChildren == true){
                    treeName = node.data.code;
                    this.httpService.postJSON({
                        Router: ServelUrl.Url.GetEmptyChildBedDorm,
                        Method: 'POST',
                        Body: {
                            treename:treeName,
                            sex: this.searchObj.Sex
                        }
                    }).then(res => {
                        if (res.Data){
                            for (var i=0;i <res.Data.length; i++){
                                if(res.Data[i].level < 6){
                                    res.Data[i].name = res.Data[i].name+ "(空:"+ res.Data[i].emptyBedNum +" 张)";
                                }
                                if(res.Data[i].emptyBedNum>0 && res.Data[i].level < 5){
                                    res.Data[i]["hasChildren"] = true;
                                }
                                if(ischeckd == true){
                                    res.Data[i]["checked"] = true;
                                }else{
                                    res.Data[i]["checked"] = false;
                                }

                                res.Data[i]["halfChecked"] = false;
                                childrenarr.push(res.Data[i])
                            }
                            console.log(childrenarr);
                            resolve(childrenarr)
                        }
                    })
                }
            });
        }
    };


    getCampusName(v){
        // console.log("v")
        // console.log(v)
        this.Campus.forEach(item=>{
            if(item.CampusCode == v){
               this.allotCampusName = item.CampusName
            }
        });

    }

    onEvent(ev: any) {
        // 实时显示分配的床位数
        this._roomData['room'] =[];
        this._roomData['floor'] =[];
        this._roomData['unit'] = [];
        this._roomData['dormitory'] = [];
        this._roomData['district'] = [];
        for(var i= 0; i< this.nodes.length; i++){
            if( this.nodes[i].checked == true && this.nodes[i].halfChecked == false){
                var str_distict = this.nodes[i].level+'|'+this.nodes[i].code+'|'+this.nodes[i].name.substr(0,this.nodes[i].name.indexOf('('))+'|'+this.nodes[i].emptyBedNum;
                this._roomData["district"].push(str_distict)

            }else if(this.nodes[i].checked === false && this.nodes[i].halfChecked === true ){
                // 遍历宿舍楼
                var Dormitory = [];
                for(var j= 0; j< this.nodes[i].children.length; j++){
                    if( this.nodes[i].children[j].checked === true && this.nodes[i].children[j].halfChecked === false ){
                        var str_dormitory = this.nodes[i].children[j].level+'|'+this.nodes[i].children[j].code+'|'+this.nodes[i].children[j].name.substr(0,this.nodes[i].children[j].name.indexOf('('))+'|'+this.nodes[i].children[j].emptyBedNum;
                        Dormitory.push(str_dormitory);
                    }else if(this.nodes[i].children[j].checked === false && this.nodes[i].children[j].halfChecked === true ){
                        var Unit = [];
                        for(var m= 0; m< this.nodes[i].children[j].children.length; m++){
                            if( this.nodes[i].children[j].children[m].checked === true && this.nodes[i].children[j].children[m].halfChecked === false ){
                                var str_unit = this.nodes[i].children[j].children[m].level+'|'+this.nodes[i].children[j].children[m].code+'|'+this.nodes[i].children[j].children[m].name.substr(0,this.nodes[i].children[j].children[m].name.indexOf('('))+'|'+this.nodes[i].children[j].children[m].emptyBedNum;
                                Unit.push(str_unit);
                            }else if(this.nodes[i].children[j].children[m].checked === false && this.nodes[i].children[j].children[m].halfChecked === true ){
                                // 遍历楼层
                                var Floor = [];
                                for(var n= 0; n< this.nodes[i].children[j].children[m].children.length; n++){
                                    if( this.nodes[i].children[j].children[m].children[n].checked === true && this.nodes[i].children[j].children[m].children[n].halfChecked === false ){
                                        var str_floor = this.nodes[i].children[j].children[m].children[n].level+'|'+this.nodes[i].children[j].children[m].children[n].code+'|'+this.nodes[i].children[j].children[m].children[n].name.substr(0,this.nodes[i].children[j].children[m].children[n].name.indexOf('('))+'|'+this.nodes[i].children[j].children[m].children[n].emptyBedNum;
                                        Floor.push(str_floor);
                                    }else if(this.nodes[i].children[j].children[m].children[n].checked === false && this.nodes[i].children[j].children[m].children[n].halfChecked === true ){
                                        // 遍历宿舍
                                        var Room = [];
                                        for(var x= 0; x< this.nodes[i].children[j].children[m].children[n].children.length; x++){
                                            if( this.nodes[i].children[j].children[m].children[n].children[x].checked === true && this.nodes[i].children[j].children[m].children[n].children[x].halfChecked === false ){
                                                var room_name = this.nodes[i].children[j].children[m].children[n].children[x].name.substr(0,this.nodes[i].children[j].children[m].children[n].children[x].name.indexOf('('))+'宿舍';
                                                var str_room = this.nodes[i].children[j].children[m].children[n].children[x].level+'|'+this.nodes[i].children[j].children[m].children[n].children[x].code+'|'+room_name+'|'+this.nodes[i].children[j].children[m].children[n].children[x].emptyBedNum;
                                                Room.push(str_room);
                                            }else if(this.nodes[i].children[j].children[m].children[n].children[x].checked === false && this.nodes[i].children[j].children[m].children[n].children[x].halfChecked === true ){

                                            }
                                        }
                                        if (Room.length != 0) {
                                            this._roomData['room'].push(Room)
                                        }
                                    }
                                }
                                if (Floor.length != 0) {
                                    this._roomData['floor'].push(Floor)
                                }
                            }
                        }
                        if (Unit.length != 0) {
                            this._roomData['unit'].push(Unit)
                        }
                    }
                }
                if (Dormitory.length != 0) {
                    this._roomData['dormitory'].push(Dormitory)
                }
            }
        }

        // 最终处理好的为发起分配接口调用的宿舍空床位数据
        // console.log(this._roomData);
        this._allotRoom['district'] =[];  //整个园区要分配的
        this._allotRoom['dormitory'] =[];  //整个宿舍楼要分配的
        this._allotRoom['unit'] =[];  //整个单元要分配的
        this._allotRoom['floor'] =[];  //整个楼层要分配的
        this._allotRoom['room'] =[];  //整个宿舍要分配的

        // 组织数据
        var districtnum :number = 0;
        if(this._roomData) {
            // 园区
            if (this._roomData['district'].length != 0) {
                // console.log('district');
                if (this._roomData['district']) {
                    this._roomData['district'].forEach(item1 => {
                        // console.log(item1);
                        // var district_split = [];
                        // district_split['level'] = item1.split("|")[0];
                        // district_split['code'] = item1.split("|")[1];
                        // district_split['name'] = item1.split("|")[2];
                        // district_split['emptyNum'] = item1.split("|")[3];
                        districtnum += parseInt(item1.split("|")[3]);
                        //
                        // console.log('item1.split("|")[3]');
                        // console.log(item1.split("|")[3]);

                        this._allotRoom['district'].push(item1);
                    })
                }
            }

            // 宿舍楼
            var dormitorynum: number = 0;
            if (this._roomData['dormitory'].length != 0) {
                this._roomData['dormitory'].forEach(dormitory => {
                    console.log('dormitory');
                    if (dormitory) {
                        dormitory.forEach(item2 => {
                            // console.log(item2);
                            // var dormitory_split = [];
                            // dormitory_split['level'] = item2.split("|")[0];
                            // dormitory_split['code'] = item2.split("|")[1];
                            // dormitory_split['name'] = item2.split("|")[2];
                            // dormitory_split['emptyNum'] = item2.split("|")[3];
                            dormitorynum += parseInt(item2.split("|")[3]);
                            // console.log('item2.split("|")[3]');
                            // console.log(item2.split("|")[3]);
                            this._allotRoom['dormitory'].push(item2);
                        })
                    }
                })
            }

            // 单元
            var unitnum: number = 0;
            if (this._roomData['unit'].length != 0) {
                this._roomData['unit'].forEach(unit => {
                    // console.log('unit')
                    if (unit) {
                        unit.forEach(item3 => {
                            // console.log(item3);
                            // var unit_split = [];
                            // unit_split['level'] = item3.split("|")[0];
                            // unit_split['code'] = item3.split("|")[1];
                            // unit_split['name'] = item3.split("|")[2];
                            // unit_split['emptyNum'] = item3.split("|")[3];
                            unitnum += parseInt(item3.split("|")[3]);
                            this._allotRoom['unit'].push(item3);
                        })
                    }
                })
            }

            // 楼层
            var floornum: number = 0;
            if (this._roomData['floor'].length != 0) {
                this._roomData['floor'].forEach(floor => {
                    // console.log('floor');
                    if (floor) {
                        floor.forEach(item4 => {
                            // console.log(item4);
                            // var floor_split = [];
                            // floor_split['level'] = item4.split("|")[0];
                            // floor_split['code'] = item4.split("|")[1];
                            // floor_split['name'] = item4.split("|")[2];
                            // floor_split['emptyNum'] = item4.split("|")[3];
                            floornum += parseInt(item4.split("|")[3]);

                            // console.log('item5.split("|")[3]');
                            // console.log(item4.split("|")[3]);
                            this._allotRoom['floor'].push(item4);
                        })
                    }
                })
            }


            // 宿舍
            var roomnum: number = 0;
            if (this._roomData['room'].length != 0) {
                this._roomData['room'].forEach(room => {
                    // console.log('room');
                    if (room) {
                        room.forEach(item5 => {
                            // console.log(item5)
                            // var room_split = [];
                            // room_split['level'] = item5.split("|")[0];
                            // room_split['code'] = item5.split("|")[1];
                            // room_split['name'] = item5.split("|")[2];
                            // room_split['emptyNum'] = item5.split("|")[3];
                            roomnum += parseInt(item5.split("|")[3]);
                            // console.log('item5.split("|")[3]');
                            // console.log(item5.split("|")[3]);
                            this._allotRoom['room'].push(item5);
                        })
                    }
                })
            }

            // console.log('kk实时床位数')
            // console.log(this._allotRoom['room']);
            //
            // console.log('kk实时床位数roomnum');
            // console.log(roomnum)
        }

        this.num_bed = districtnum + dormitorynum + unitnum + floornum + roomnum;

        // console.log('num_bed')
        // console.log(this.num_bed)
    }


    // 宿舍公寓树选中事件
    onCheck(ev:any){
        // console.log(ev)
    }


    // reset
    resetForm(form) {
        form.reset();
        this.data= [];
        this.nodes= [];
        this._roomData =[];
        this._allotRoom =[];
        this._allotStuData =[];
        this._stuNum = 0;
        this._bedNum = 0;
        this.searchObj.Campus = null;
        this.searchObj.Sex = null;
        this.searchObj.Grade = null;
        this._loading = false;
        this._nodeloading = false;
        this.allotCampusName = '';
    }


    //获取选中的分配宿舍数据
    getDistributStudent(){

        // 按钮不可点
        this.buttonDisabled = true;

        this._stuData =[];
        this._roomData =[];
        this._allotRoom =[];
        this._allotStuData = [];
        this._stuNum = 0;
        this._bedNum = 0;
        this.showModel = [];
        this.showModelData = [];
        //获取待分配学院信息
        this.data.forEach(item => {
            if(item.checked == true){
                this._stuData.push(item);
                var allotStu = item.academycode+'|'+item.studentnum;
                // var allotStu = item.studentnum;
                this._allotStuData.push(allotStu)
            }
        });
        this._roomData.forEach( allot => {
            if(allot.checked == true){
                var allotStu = allot.academycode+'|'+allot.studentnum+'|'+allot.academyname;
                this._allotStuData.push(allotStu)
            }
        })

        // 获取未分配的公寓 最外层(遍历园区)
        // this._roomData['bed'] = []
        this._roomData['room'] =[];
        this._roomData['floor'] =[];
        this._roomData['unit'] = [];
        this._roomData['dormitory'] = [];
        this._roomData['district'] = [];
        for(var i= 0; i< this.nodes.length; i++){
            if( this.nodes[i].checked == true && this.nodes[i].halfChecked == false){
                // console.log(this.nodes[i].name +'全选了');
                var str_distict = this.nodes[i].level+'|'+this.nodes[i].code+'|'+this.nodes[i].name.substr(0,this.nodes[i].name.indexOf('('))+'|'+this.nodes[i].emptyBedNum;
                this._roomData["district"].push(str_distict)

            }else if(this.nodes[i].checked === false && this.nodes[i].halfChecked === true ){
                // console.log(this.nodes[i].name +'选中了一部分');
                // 遍历宿舍楼
                var Dormitory = [];
                for(var j= 0; j< this.nodes[i].children.length; j++){
                    if( this.nodes[i].children[j].checked === true && this.nodes[i].children[j].halfChecked === false ){
                        var str_dormitory = this.nodes[i].children[j].level+'|'+this.nodes[i].children[j].code+'|'+this.nodes[i].children[j].name.substr(0,this.nodes[i].children[j].name.indexOf('('))+'|'+this.nodes[i].children[j].emptyBedNum;
                        Dormitory.push(str_dormitory);
                    }else if(this.nodes[i].children[j].checked === false && this.nodes[i].children[j].halfChecked === true ){
                        // console.log(this.nodes[i].children[j].name +'选中了一部分');
                        var Unit = [];
                        for(var m= 0; m< this.nodes[i].children[j].children.length; m++){
                            if( this.nodes[i].children[j].children[m].checked === true && this.nodes[i].children[j].children[m].halfChecked === false ){
                                // console.log(this.nodes[i].children[j].children[m].name +'全选了');
                                var str_unit = this.nodes[i].children[j].children[m].level+'|'+this.nodes[i].children[j].children[m].code+'|'+this.nodes[i].children[j].children[m].name.substr(0,this.nodes[i].children[j].children[m].name.indexOf('('))+'|'+this.nodes[i].children[j].children[m].emptyBedNum;
                                Unit.push(str_unit);
                            }else if(this.nodes[i].children[j].children[m].checked === false && this.nodes[i].children[j].children[m].halfChecked === true ){
                                // console.log(this.nodes[i].children[j].children[m].name +'选中了一部分');
                                // 遍历楼层
                                var Floor = [];
                                for(var n= 0; n< this.nodes[i].children[j].children[m].children.length; n++){
                                    if( this.nodes[i].children[j].children[m].children[n].checked === true && this.nodes[i].children[j].children[m].children[n].halfChecked === false ){
                                        // console.log(this.nodes[i].children[j].children[m].children[n].name +'全选了');
                                        var str_floor = this.nodes[i].children[j].children[m].children[n].level+'|'+this.nodes[i].children[j].children[m].children[n].code+'|'+this.nodes[i].children[j].children[m].children[n].name.substr(0,this.nodes[i].children[j].children[m].children[n].name.indexOf('('))+'|'+this.nodes[i].children[j].children[m].children[n].emptyBedNum;
                                        Floor.push(str_floor);
                                    }else if(this.nodes[i].children[j].children[m].children[n].checked === false && this.nodes[i].children[j].children[m].children[n].halfChecked === true ){
                                        // console.log(this.nodes[i].children[j].children[m].children[n].name +'选中了一部分');
                                        // 遍历宿舍
                                        var Room = [];
                                        for(var x= 0; x< this.nodes[i].children[j].children[m].children[n].children.length; x++){
                                            if( this.nodes[i].children[j].children[m].children[n].children[x].checked === true && this.nodes[i].children[j].children[m].children[n].children[x].halfChecked === false ){
                                                // console.log(this.nodes[i].children[j].children[m].children[n].children[x].name +'选了');
                                                var room_name = this.nodes[i].children[j].children[m].children[n].children[x].name.substr(0,this.nodes[i].children[j].children[m].children[n].children[x].name.indexOf('('))+'宿舍';
                                                var str_room = this.nodes[i].children[j].children[m].children[n].children[x].level+'|'+this.nodes[i].children[j].children[m].children[n].children[x].code+'|'+room_name+'|'+this.nodes[i].children[j].children[m].children[n].children[x].emptyBedNum;
                                                Room.push(str_room);
                                            }else if(this.nodes[i].children[j].children[m].children[n].children[x].checked === false && this.nodes[i].children[j].children[m].children[n].children[x].halfChecked === true ){
                                                // console.log(this.nodes[i].children[j].children[m].children[n].children[x].name +'选了一部分');
                                                // 遍历床位
                                                // var Bed = [[]];
                                                // for(var y= 0; y< this.nodes[i].children[j].children[m].children[n].children[x].children.length; y++){
                                                //     if( this.nodes[i].children[j].children[m].children[n].children[x].children[y].checked === true && this.nodes[i].children[j].children[m].children[n].children[x].children[y].halfChecked === false ){
                                                //         console.log(this.nodes[i].children[j].children[m].children[n].children[x].children[y].name +'选中');
                                                //         var str_bed = this.nodes[i].children[j].children[m].children[n].children[x].children[y].level+'|'+this.nodes[i].children[j].children[m].children[n].children[x].children[y].code+'|'+this.nodes[i].children[j].children[m].children[n].children[x].children[y].name;
                                                //         var bed_arr = [];
                                                //         bed_arr.push(str_bed)
                                                //         Bed.push(bed_arr)
                                                //     }else if(this.nodes[i].children[j].children[m].children[n].children[x].children[y].checked === false && this.nodes[i].children[j].children[m].children[n].children[x].children[y].halfChecked === true ){
                                                //         console.log(this.nodes[i].children[j].children[m].children[n].children[x].children[y].name +'没选');
                                                //     }
                                                // }
                                                // // this._roomData[i].push(Bed)
                                                // if (Bed.length != 0) {
                                                //     this._roomData['bed'].push(Bed)
                                                // }
                                            }
                                        }
                                        if (Room.length != 0) {
                                            this._roomData['room'].push(Room)
                                        }
                                    }
                                }
                                if (Floor.length != 0) {
                                    this._roomData['floor'].push(Floor)
                                }
                            }
                        }
                        if (Unit.length != 0) {
                            this._roomData['unit'].push(Unit)
                        }
                    }
                }
                if (Dormitory.length != 0) {
                    this._roomData['dormitory'].push(Dormitory)
                }
            }
        }

        // 最终处理好的为发起分配接口调用的宿舍空床位数据
        console.log(this._roomData);
        this._allotRoom['district'] =[];  //整个园区要分配的
        this._allotRoom['dormitory'] =[];  //整个宿舍楼要分配的
        this._allotRoom['unit'] =[];  //整个单元要分配的
        this._allotRoom['floor'] =[];  //整个楼层要分配的
        this._allotRoom['room'] =[];  //整个宿舍要分配的

        // 组织数据
        var districtnum :number = 0;
        if(this._roomData){
            // 园区
            if ( this._roomData['district'].length != 0) {
                    console.log('district');
                    if(this._roomData['district']){
                        this._roomData['district'].forEach(item1 => {
                            console.log(item1);
                            // var district_split = [];
                            // district_split['level'] = item1.split("|")[0];
                            // district_split['code'] = item1.split("|")[1];
                            // district_split['name'] = item1.split("|")[2];
                            // district_split['emptyNum'] = item1.split("|")[3];
                            districtnum += parseInt(item1.split("|")[3]);
                            this._allotRoom['district'].push(item1);
                        })
                    }
            }

            // 宿舍楼
            var dormitorynum :number = 0;
            if ( this._roomData['dormitory'].length != 0) {
                this._roomData['dormitory'].forEach( dormitory =>{
                    console.log('dormitory');
                    if(dormitory){
                        dormitory.forEach(item2 => {
                            console.log(item2);
                            // var dormitory_split = [];
                            // dormitory_split['level'] = item2.split("|")[0];
                            // dormitory_split['code'] = item2.split("|")[1];
                            // dormitory_split['name'] = item2.split("|")[2];
                            // dormitory_split['emptyNum'] = item2.split("|")[3];
                            dormitorynum += parseInt(item2.split("|")[3]);
                            this._allotRoom['dormitory'].push(item2);
                        })
                    }
                })
            }

            // 单元
            var unitnum :number = 0;
            if ( this._roomData['unit'].length != 0) {
                this._roomData['unit'].forEach( unit =>{
                    console.log('unit')
                    if(unit){
                        unit.forEach(item3 => {
                            console.log(item3);
                            // var unit_split = [];
                            // unit_split['level'] = item3.split("|")[0];
                            // unit_split['code'] = item3.split("|")[1];
                            // unit_split['name'] = item3.split("|")[2];
                            // unit_split['emptyNum'] = item3.split("|")[3];
                            unitnum += parseInt(item3.split("|")[3]);
                            this._allotRoom['unit'].push(item3);
                        })
                    }
                })
            }

            // 楼层
            var floornum :number = 0;
            if ( this._roomData['floor'].length != 0) {
                this._roomData['floor'].forEach( floor =>{
                    console.log('floor');
                    if(floor){
                        floor.forEach(item4 => {
                            console.log(item4);
                            // var floor_split = [];
                            // floor_split['level'] = item4.split("|")[0];
                            // floor_split['code'] = item4.split("|")[1];
                            // floor_split['name'] = item4.split("|")[2];
                            // floor_split['emptyNum'] = item4.split("|")[3];
                            floornum += parseInt(item4.split("|")[3]);
                            this._allotRoom['floor'].push(item4);
                        })
                    }
                })
            }


            // 宿舍
            var roomnum :number = 0;
            if ( this._roomData['room'].length != 0) {
                this._roomData['room'].forEach( room =>{
                    console.log('room');
                    if(room){
                        room.forEach(item5 => {
                            console.log(item5)
                            // var room_split = [];
                            // room_split['level'] = item5.split("|")[0];
                            // room_split['code'] = item5.split("|")[1];
                            // room_split['name'] = item5.split("|")[2];
                            // room_split['emptyNum'] = item5.split("|")[3];
                            roomnum += parseInt(item5.split("|")[3]);
                            this._allotRoom['room'].push(item5);
                        })
                    }
                })
            }

            //床位
            // if ( this._roomData['level6'].length != 0) {
            //     alert(6)
            //     this._roomData['level6'].forEach( level6 =>{
            //         console.log('level6')
            //         console.log(level6)
            //     })
            // }

            // console.log(this.data);
            // console.log("_stuData");
            // console.log(this._stuData);
            // console.log("_allotStuData");
            // console.log(this._allotStuData);
            // // console.log('nodes');
            // // console.log(this.nodes);
            // console.log("_roomData");
            // console.log(this._allotRoom);

            // 统计待分配学生总数
            this._stuData.forEach( stu =>{
                this._stuNum +=  parseInt(stu['studentnum'])
            });
            // 统计待分配床位总数
            // this._bedNum = districtnum + dormitorynum + unitnum + floornum + roomnum;


            // console.log("this._stuNum")
            // console.log(this._stuNum)
            // console.log('this._bedNum');
            // console.log(this.num_bed);


                if(this._stuData.length != 0 && (this._allotRoom['district'].length != 0 || this._allotRoom['dormitory'].length != 0 || this._allotRoom['unit'].length != 0 || this._allotRoom['floor'].length != 0 || this._allotRoom['room'].length != 0)){
                    if (this._stuNum <= this.num_bed ){
                        // 获取待分配前班级和宿舍对应数据
                        this.httpService.postJSON({
                            Router: ServelUrl.Url.GetStudentRoomBeforeAllocation,
                            Method: 'POST',
                            Body: {
                                academys: this._allotStuData,
                                sex: this.searchObj.Sex,
                                campus: this.searchObj.Campus,
                                grade: this.searchObj.Grade,
                                districts: this._allotRoom['district'],
                                dormitorys: this._allotRoom['dormitory'],
                                units: this._allotRoom['unit'],
                                floors: this._allotRoom['floor'],
                                rooms: this._allotRoom['room'],
                            }
                        }).then(res => {
                            if (res.Data){
                                this._loading = false;
                                //组织模态框显示数据
                                for(var i=0; i <res.Data.length; i++) {
                                    var rooms = [];
                                    var room = [];
                                    res.Data[i].bednum.forEach( item => {
                                        var ro = [];
                                        ro.push(item.roomname + '(' + item.emptybednum + '个人)');
                                        room.push(ro.toString());
                                    });
                                    // rooms['classcode'] = res.Data[i].classcode;
                                    rooms['classname'] = res.Data[i].classname;
                                    rooms['studnum'] = res.Data[i].studnum;
                                    rooms['bednum'] = room.toString();
                                    this.showModel.push(rooms);
                                }
                                //传给后台分配的数据
                                this.showModelData = [];
                                this.showModelData = res.Data
                            }else{
                                this.showModel = [];
                                this.showModelData = [];
                            }
                            this.isVisibles = true;
                        });
                    }else{
                        // this.buttonDisabled = true;
                        this.buttonDisabled = false;
                        this.confirmServ.info({
                            title: '友情提示',
                            content: '分配学生总数不能大于空床位总数'
                        });
                    }

                }else {
                    // this.buttonDisabled = true;
                    this.buttonDisabled = false;
                    this.confirmServ.info({
                        title: '友情提示',
                        content: '请选择要分配的学院和要分配的公寓'
                    });
                }

        }
    }

    //确认分配信息后发起最终的分配请求
    handleOk = (e) => {
        this.isVisibles = false;
        this._isVisible = true;
        this.buttonDisabled = true;
        // console.log(this.showModelData);
        // 获取待分配班级和宿舍对应数据
        this.httpService.postJSON({
            Router: ServelUrl.Url.GetStudentRoomRealAllocation,
            Method: 'POST',
            Body: {
                real: this.showModelData,
                sex: this.searchObj.Sex,
                grade: this.searchObj.Grade,
            }
        }).then(res => {
            this._isVisible = false;

            if(res.Data){
                if (res.Data ==='update'){
                    this.confirmServ.success({
                        title: '友情提示',
                        content: '分配失败，请重新分配'
                    });
                    this.data= [];
                    this.nodes= [];
                    this._roomData =[];
                    this._allotRoom =[];
                    this._allotStuData =[];
                    this._stuNum = 0;
                    this._bedNum = 0;
                    this.num_bed = 0;
                    // this.allotCampusName = '';

                    this.onSearch(true)
                }

                if (res.Data ==='insert'){
                    this.confirmServ.success({
                        title: '友情提示',
                        content: '分配失败，请重新分配'
                    });
                    this.data= [];
                    this.nodes= [];
                    this._roomData =[];
                    this._allotRoom =[];
                    this._allotStuData =[];
                    this._stuNum = 0;
                    this._bedNum = 0;
                    this.num_bed = 0;
                    // this.allotCampusName = '';

                    this.onSearch(true)
                }

                if (res.Data.assigned){
                    this.confirmServ.success({
                        title: '友情提示',
                        content: res.Data.assigned
                    });
                    this.data= [];
                    this.nodes= [];
                    this._roomData =[];
                    this._allotRoom =[];
                    this._allotStuData =[];
                    this._stuNum = 0;
                    this._bedNum = 0;
                    this.num_bed = 0;
                    // this.allotCampusName = '';

                    this.onSearch(true)
                }

                if (res.Data ==='ok'){
                    this.confirmServ.success({
                        title: '友情提示',
                        content: '您已分配成功!!!'
                    });
                    this.buttonDisabled = false;
                    this.data= [];
                    this.nodes= [];
                    this._roomData =[];
                    this._allotRoom =[];
                    this._allotStuData =[];
                    this._stuNum = 0;
                    this._bedNum = 0;
                    this.num_bed = 0;
                    // this.allotCampusName = '';

                    this.onSearch(true)
                    // this.searchObj.Campus = null;
                    // this.searchObj.Sex = null;
                    // this.searchObj.Grade = null;
                }else{
                    this.confirmServ.info({
                        title: '友情提示',
                        content: '分配数据有误请重新分配!!!'
                    });
                }
            }

        });
    }

    //取消
    handleCancel = (e) => {
        this.buttonDisabled = false;
        this.isVisibles = false;
    }

    _refreshStatus(){

        this.num_stu = 0;
        this.data.forEach(item => {
            if(item.checked == true){
                // this._stuData.push(item);
                this.num_stu += parseInt(item.studentnum)
                // var allotStu = item.campuscode+'|'+item.studentnum;
                // this._allotStuData.push(allotStu)
            }
        });
    }
    // 多个学院全选
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

        this.num_stu = 0;
        this.data.forEach(item => {
            if(item.checked == true){
                // this._stuData.push(item);
                this.num_stu += parseInt(item.studentnum)
                // var allotStu = item.campuscode+'|'+item.studentnum;
                // this._allotStuData.push(allotStu)
            }
        });

        // console.log(this.data)
    }

    //查询
    onSearch(reload = false) {
        this.data= [];
        this.nodes= [];
        this.num_stu= 0;
        if (this.searchObj.Campus == null || this.searchObj.Sex == null || this.searchObj.Grade == null) {
            this.confirmServ.info({
                title: '友情提示',
                content: '校区、性别、年级等查询条件都不能为空'
            });
        }else{
            this._loading = true;
            this._nodeloading = true;
            this._allChecked = false;
            // 获取待分配学生数据
            this.httpService.postJSON({
                Router: ServelUrl.Url.GetUndistributedStudentData,
                Method: 'POST',
                Body: {
                    campus: this.searchObj.Campus,
                    sex: this.searchObj.Sex,
                    grade: this.searchObj.Grade,
                }
            }).then(res => {
                this._loading = false;
                if (res.Data.length> 0){
                    for (var i=0;i <res.Data.length; i++){
                        res.Data[i].checked = false;
                    }
                    this._loading = false;
                    this.data = res.Data;
                }else{
                    this.data = [];
                }
            });

            // 获取待分配空床位数据（校区下单园区空床位总数）
            this.httpService.postJSON({
                Router: ServelUrl.Url.GetEmptyDistrictBedDorm,
                Method: 'POST',
                Body: {
                    campus: this.searchObj.Campus,
                    sex: this.searchObj.Sex,
                }
            }).then(res => {
                if (res.Data.length> 0){
                    for (var i=0;i <res.Data.length; i++){
                        if(res.Data[i].level <6){
                            res.Data[i].name =res.Data[i].name+ "(空:"+ res.Data[i].emptyBedNum +" 张)";
                        }
                        if(res.Data[i].emptyBedNum >0){
                            res.Data[i]["hasChildren"] =true;
                        }
                        res.Data[i]["checked"] = false;
                        res.Data[i]["halfChecked"] = false;

                        this.nodes.push(res.Data[i])
                    }
                    // console.log(res.Data);
                    // console.log(this.nodes);
                    this._loading = false;
                    this._nodeloading = false;
                }else{
                    this._loading = false;
                    this._nodeloading = false;
                    this._nodelnil = true;
                    this.nodes = [];
                }
            })
        }
    }
}
