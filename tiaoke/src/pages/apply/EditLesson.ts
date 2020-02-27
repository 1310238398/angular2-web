
import { Component } from '@angular/core';
import { NavController,ModalController,Platform, NavParams, ViewController,AlertController } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";
import { ListPage } from "./List";

@Component({
    selector: 'page-editlesson',
    templateUrl: './EditLesson.html'
})
export class EditLessonPage {
    shouInfo = 0;
    infoId;
    qualitylist;//课程性质
    info = {
        CourseName:'',//课程名称
        CourseType:'',//课程性质
        ClassName:'',//班级名称
        AdjustReason:'',//调课原因
        Details:[],
        Status:''//调课信息状态
    }
    BeforeAdjustAddress_1='';//原课程地点
    AdjustAddress_1='';//调课后地点
    BeforeAdjustAddress_2='';//原课程地点
    AdjustAddress_2='';//调课后地点

    weekselect_1 = {code:[],name:[]};
    dayselect_1 = {code:[],name:[]};
    sectionselect_1 = {code:[],name:[]};
    weekselect_2 = {code:[],name:[]};
    dayselect_2 = {code:[],name:[]};
    sectionselect_2 = {code:[],name:[]};
    weekselect_3 = {code:[],name:[]};
    dayselect_3 = {code:[],name:[]};
    sectionselect_3 = {code:[],name:[]};
    weekselect_4 = {code:[],name:[]};
    dayselect_4 = {code:[],name:[]};
    sectionselect_4 = {code:[],name:[]};
    detailsId_1;
    detailsId_2;
    constructor(private navCtrl: NavController,private params: NavParams,public modalCtrl: ModalController, private http: HttpService, private alertCtrl: AlertController) {
        antlinker.configTitle({
            type: "label",
            title: "调课申请",
            fail: function () {

            },
            success: function () {
            }
        });
        this.infoId = params.get('rid');
        console.log(this.infoId);

        //查询课程性质
        this.http.postJSON({
            Router: ServelUrl.Url.getcoursenature,
            Method: 'POST',
            Body: {}
        }).then(
            comments => {
                if (comments.FeedbackCode == 0) {
                    this.qualitylist = comments.Data;

                    this.http.postJSON({
                        Router: ServelUrl.Url.queryoneadjustcourse,
                        Method: 'POST',
                        Body: {RecordId:this.infoId}
                    }).then(
                        comments => {
                            if (comments.FeedbackCode == 0) {
                                this.info = comments.Data;
                                for(var i = 0;i<this.qualitylist.length;i++){
                                    if(this.qualitylist[i].Code == this.info.CourseType) {
                                        this.info.CourseType = this.qualitylist[i].CodeName;
                                    }
                                }
                                //获取调课信息
                                for(var i = 0;i<this.info.Details.length;i++) {
                                    if(i == 0) {
                                        this.detailsId_1 = this.info.Details[i].Id;
                                        //原课程时间code
                                        this.weekselect_1 = JSON.parse(this.info.Details[i].BeforeAdjustTimeCode).weekCode;
                                        this.dayselect_1 = JSON.parse(this.info.Details[i].BeforeAdjustTimeCode).dayCode;
                                        this.sectionselect_1 = JSON.parse(this.info.Details[i].BeforeAdjustTimeCode).sectionCode;

                                        this.BeforeAdjustAddress_1 = this.info.Details[i].BeforeAdjustAddress;//原课程地点

                                        //调整后时间code
                                        this.weekselect_2 = JSON.parse(this.info.Details[i].AdjustTimeCode).weekCode;
                                        this.dayselect_2 = JSON.parse(this.info.Details[i].AdjustTimeCode).dayCode;
                                        this.sectionselect_2 = JSON.parse(this.info.Details[i].AdjustTimeCode).sectionCode;
                                        this.AdjustAddress_1 = this.info.Details[i].AdjustAddress;//调整后地点

                                    }
                                    if(i == 1){
                                        this.shouInfo = 1;
                                        this.detailsId_2 = this.info.Details[i].Id;
                                        this.BeforeAdjustAddress_2 = this.info.Details[i].BeforeAdjustAddress;//原课程地点
                                        //原课程时间code
                                        this.weekselect_3 = JSON.parse(this.info.Details[i].BeforeAdjustTimeCode).weekCode;
                                        this.dayselect_3 = JSON.parse(this.info.Details[i].BeforeAdjustTimeCode).dayCode;
                                        this.sectionselect_3 = JSON.parse(this.info.Details[i].BeforeAdjustTimeCode).sectionCode;


                                        //调整后时间code
                                        this.weekselect_4 = JSON.parse(this.info.Details[i].AdjustTimeCode).weekCode;
                                        this.dayselect_4 = JSON.parse(this.info.Details[i].AdjustTimeCode).dayCode;
                                        this.sectionselect_4 = JSON.parse(this.info.Details[i].AdjustTimeCode).sectionCode;

                                        this.AdjustAddress_2 = this.info.Details[i].AdjustAddress;//调整后地点
                                    }
                                }
                            }
                        });

                }
            });



    }


    openModal(flag,pageData) {
        console.log(pageData);
        let profileModal = this.modalCtrl.create(EditModalContentPage, pageData);
        profileModal.onDidDismiss(data =>{
                if (flag == 1) {
                    this.weekselect_1 = data.week;
                    this.dayselect_1 = data.day;
                    this.sectionselect_1 = data.section;
                } else if (flag == 2) {
                    this.weekselect_2 = data.week;
                    this.dayselect_2 = data.day;
                    this.sectionselect_2 = data.section;
                } else if (flag == 3) {
                    this.weekselect_3 = data.week;
                    this.dayselect_3 = data.day;
                    this.sectionselect_3 = data.section;
                } else {
                    this.weekselect_4 = data.week;
                    this.dayselect_4 = data.day;
                    this.sectionselect_4 = data.section;
                }
        });
        profileModal.present();

    }

    addLesInfo(){
        this.shouInfo = 1;
    }
    delLesInfo(){
        this.shouInfo = 0;
    }

    editlessonBtn(){
        console.log("提交调课申请");
        var detailsObj = [];
        var objAll = {},BeforeAdjustTime = {},BeforeAdjustTimeCode = {},AdjustTime = "",AdjustTimeCode = {};
        //一个调课信息
        //BeforeAdjustTime = JSON.stringify(this.weekselect_1.name)+JSON.stringify(this.dayselect_1.name)+JSON.stringify(this.sectionselect_1.name);//原课程时间
        BeforeAdjustTime = "第"+this.weekselect_1.name+"周"+this.dayselect_1.name+"第"+this.sectionselect_1.name+"节";//原课程时间
        BeforeAdjustTimeCode = {//原课程时间code
            weekCode:this.weekselect_1,
            dayCode:this.dayselect_1,
            sectionCode:this.sectionselect_1
        }
        if(this.weekselect_2.name.length != 0) {
            AdjustTime = "第" + this.weekselect_2.name + "周" + this.dayselect_2.name + "第" + this.sectionselect_2.name + "节";//调整后时间
        }else{AdjustTime = ""}
        AdjustTimeCode = {//调整后时间code
            weekCode:this.weekselect_2,
            dayCode:this.dayselect_2,
            sectionCode:this.sectionselect_2
        }
        objAll = {Id:this.detailsId_1,BeforeAdjustTime:BeforeAdjustTime,BeforeAdjustTimeCode:JSON.stringify(BeforeAdjustTimeCode),BeforeAdjustAddress:this.BeforeAdjustAddress_1,AdjustTime:AdjustTime,AdjustTimeCode:JSON.stringify(AdjustTimeCode),AdjustAddress:this.AdjustAddress_1};
        detailsObj.push(objAll);

        if(this.shouInfo ==1) {//两个调课信息
            BeforeAdjustTime = "第"+this.weekselect_3.name+"周"+this.dayselect_3.name+"第"+this.sectionselect_3.name+"节";//原课程时间
            BeforeAdjustTimeCode = {//原课程时间code
                weekCode:this.weekselect_3,
                dayCode:this.dayselect_3,
                sectionCode:this.sectionselect_3
            }
            if(this.weekselect_4.name.length != 0) {
                AdjustTime = "第" + this.weekselect_4.name + "周" + this.dayselect_4.name + "第" + this.sectionselect_4.name + "节";//调整后时间
            }else{AdjustTime = ""}
            AdjustTimeCode = {//调整后时间code
                weekCode:this.weekselect_4,
                dayCode:this.dayselect_4,
                sectionCode:this.sectionselect_4
            }
            objAll = {Id:this.detailsId_2,BeforeAdjustTime:BeforeAdjustTime,BeforeAdjustTimeCode:JSON.stringify(BeforeAdjustTimeCode),BeforeAdjustAddress:this.BeforeAdjustAddress_2,AdjustTime:AdjustTime,AdjustTimeCode:JSON.stringify(AdjustTimeCode),AdjustAddress:this.AdjustAddress_2};
            detailsObj.push(objAll);
        }

        let confirm = this.alertCtrl.create({
            title: '提示',
            message: '信息确认无误并提交调课申请?',
            buttons: [
                {
                    text: '我再看看'
                },
                {
                    text: '确定',
                    handler: () => {
                        //添加调课信息
                        this.http.postJSON({
                            Router: ServelUrl.Url.makeUpDetails,
                            Method: 'POST',
                            Body: {
                                Details:detailsObj//调课信息
                            }
                        }).then(
                            comments => {
                                if (comments.FeedbackCode == 0) {
                                    //如果状态为3待完善状态,修改状态为1已完成状态.
                                    //是否所有信息都填写完成
                                    var isflag = 0;//0都填写完成
                                    if(this.weekselect_2.name.length == 0 ||detailsObj[0].AdjustAddress == ""){//调课信息1填写完成
                                        isflag = 1;
                                    }
                                    if(this.shouInfo == 1) {//两个调课信息
                                        if(this.weekselect_4.name.length == 0||detailsObj[0].AdjustAddress == "") {
                                            isflag = 1;
                                        }
                                    }
                                    if (this.info.Status == "3" && isflag == 0) {
                                        this.http.postJSON({
                                            Router: ServelUrl.Url.changeAdjustCourseStatusBySelf,
                                            Method: 'POST',
                                            Body: {RecordId: this.infoId, Status: 1}
                                        }).then(
                                            comments => {
                                                if (comments.FeedbackCode == 0) {
                                                    let confirm = this.alertCtrl.create({
                                                        title: '提示',
                                                        message: '完善调课信息成功',
                                                        buttons: [
                                                            {
                                                                text: '确定',
                                                                handler: () => {
                                                                    this.navCtrl.push(ListPage);
                                                                }
                                                            }
                                                        ]
                                                    });
                                                    confirm.present();
                                                }
                                            }
                                        )
                                    } else {
                                        let confirm = this.alertCtrl.create({
                                            title: '提示',
                                            message: '修改调课信息成功',
                                            buttons: [
                                                {
                                                    text: '确定',
                                                    handler: () => {
                                                        this.navCtrl.push(ListPage);
                                                    }
                                                }
                                            ]
                                        });
                                        confirm.present();
                                }
                                }
                            });
                    }
                }
            ]
        });
        confirm.present();

    }
}

@Component({
    selector: 'page-addlesson',
    template: `
        <ion-content class="outer-content" id="def">
            <ion-list>
              <ion-list-header>
                周次选择(可多选)
              </ion-list-header>
              <ion-grid>
                   <ion-row *ngFor="let item of weeklylist;let j = index">
                        <ion-col *ngFor="let ci of item;let i = index">
                            <button (click)="zcClick(j,i,ci.Code,ci.IsSelect,ci.CodeName)" ion-button small color="light" *ngIf="ci.CodeName && ci.IsSelect ==0">第{{ci.CodeName}}周</button>
                            <button (click)="zcClick(j,i,ci.Code,ci.IsSelect,ci.CodeName)" ion-button small class="yellow" *ngIf="ci.CodeName && ci.IsSelect ==1">第{{ci.CodeName}}周</button>
                        </ion-col>
                   </ion-row>
              </ion-grid>
              <ion-list-header>
                星期选择(可多选)
              </ion-list-header>
              <ion-grid>
                  <ion-row *ngFor="let item of daylist;let j = index">
                        <ion-col *ngFor="let ci of item;let i = index">
                            <button (click)="xqClick(j,i,ci.Code,ci.IsSelect,ci.CodeName)" ion-button small color="light" *ngIf="ci.CodeName && ci.IsSelect ==0">{{ci.CodeName}}</button>
                            <button (click)="xqClick(j,i,ci.Code,ci.IsSelect,ci.CodeName)" ion-button small class="yellow" *ngIf="ci.CodeName && ci.IsSelect ==1">{{ci.CodeName}}</button>
                        </ion-col>
                   </ion-row>
              </ion-grid>
              <ion-list-header>
                节次选择(可多选)
              </ion-list-header>
              <ion-grid>
                  <ion-row *ngFor="let item of sectionlist;let j = index">
                        <ion-col *ngFor="let ci of item;let i = index">
                            <button (click)="jcClick(j,i,ci.Code,ci.IsSelect,ci.CodeName)" ion-button small color="light" *ngIf="ci.CodeName && ci.IsSelect ==0">第{{ci.CodeName}}节</button>
                            <button (click)="jcClick(j,i,ci.Code,ci.IsSelect,ci.CodeName)" ion-button small class="yellow" *ngIf="ci.CodeName && ci.IsSelect ==1">第{{ci.CodeName}}节</button>
                        </ion-col>
                   </ion-row>
              </ion-grid>
              </ion-list>
        </ion-content>
        <ion-footer>
            <ion-toolbar color="light">
                <ion-row>
                    <ion-col>
                      <button ion-button small block class="yellow" (click)="dismiss()">确定</button>
                    </ion-col>
                </ion-row>
            </ion-toolbar>
        </ion-footer>
    `
})
export class EditModalContentPage {
    character;
    weeklylist;
    daylist;
    sectionlist;


    weeklyselects = {code:[],name:[]};
    dayselects = {code:[],name:[]};
    sectionselects = {code:[],name:[]};
    constructor(public platform:Platform,
                public params:NavParams,
                public viewCtrl:ViewController,
                private http:HttpService,
                private alertCtrl:AlertController) {
        this.dayselects = this.params.get('getdayselect');
        this.weeklyselects = this.params.get('getweekselect');

        this.sectionselects = this.params.get('getsectionselect');

        //获取当前学期的周次信息
        this.http.postJSON({
            Router: ServelUrl.Url.getweekly,
            Method: 'POST',
            Body: {}
        }).then(
            comments => {
                if (comments.FeedbackCode == 0) {
                    console.log(this.weeklyselects);
                    //this.weeklylist = comments.Data;

                    //const selects = ['a84412c2-4952-4e2f-9d6d-8a83a2ca8f44','7646825d-fc07-4305-b2e6-1db703cb012e'];
                    const weeks = comments.Data || [];

                    const rn = 4;
                    var rows = [];
                    var cols = [];

                    for (var i = 0; i < weeks.length; i++) {
                        var week = weeks[i];

                        var isSelect = 0;
                        for (var j = 0; j < this.weeklyselects.code.length; j++) {
                            if (week.Code == this.weeklyselects.code[j]) {
                                isSelect = 1;
                                break;
                            }
                        }

                        week.IsSelect = isSelect;

                        cols.push(week);
                        if (cols.length == rn) {
                            rows.push(cols);
                            cols = [];
                            continue;
                        }
                    }
                    if (cols.length > 0) {
                        for (var i = 0; i < rn - cols.length; i++) {
                            cols.push({});
                        }
                        rows.push(cols);
                    }


                    this.weeklylist = rows;
                }
            });

        //获取星期数信息
        this.http.postJSON({
            Router: ServelUrl.Url.getday,
            Method: 'POST',
            Body: {}
        }).then(
            comments => {
                if (comments.FeedbackCode == 0) {
                    //this.daylist = comments.Data;
                    const selects = [];
                    const weeks = comments.Data || [];

                    const rn = 4;
                    var rows = [];
                    var cols = [];

                    for (var i = 0; i < weeks.length; i++) {
                        var week = weeks[i];

                        var isSelect = 0;
                        for (var j = 0; j < this.dayselects.code.length; j++) {
                            if (week.Code == this.dayselects.code[j]) {
                                isSelect = 1;
                                break;
                            }
                        }

                        week.IsSelect = isSelect;

                        cols.push(week);
                        if (cols.length == rn) {
                            rows.push(cols);
                            cols = [];
                            continue;
                        }
                    }
                    if (cols.length > 0) {
                        for (var i = 0; i < rn - cols.length; i++) {
                            cols.push({});
                        }
                        rows.push(cols);
                    }


                    this.daylist = rows;
                }
            });

        //获取课程节次信息
        this.http.postJSON({
            Router: ServelUrl.Url.getsection,
            Method: 'POST',
            Body: {}
        }).then(
            comments => {
                if (comments.FeedbackCode == 0) {
                    //this.sectionlist = comments.Data;
                    const selects = [];
                    const weeks = comments.Data || [];

                    const rn = 4;
                    var rows = [];
                    var cols = [];

                    for (var i = 0; i < weeks.length; i++) {
                        var week = weeks[i];

                        var isSelect = 0;
                        for (var j = 0; j < this.sectionselects.code.length; j++) {
                            if (week.Code == this.sectionselects.code[j]) {
                                isSelect = 1;
                                break;
                            }
                        }

                        week.IsSelect = isSelect;

                        cols.push(week);
                        if (cols.length == rn) {
                            rows.push(cols);
                            cols = [];
                            continue;
                        }
                    }
                    if (cols.length > 0) {
                        for (var i = 0; i < rn - cols.length; i++) {
                            cols.push({});
                        }
                        rows.push(cols);
                    }


                    this.sectionlist = rows;
                }
            });
    }

    zcClick(item,ci,code,select,name){//周次

        console.log(item+"--"+ci+"--"+code+"--"+select);
        if(this.weeklylist[item][ci].IsSelect ==0) {//模态对话框样式
            this.weeklylist[item][ci].IsSelect = 1;
            if(this.weeklyselects.code.length ==0){
                this.weeklyselects.code.push(code);
                this.weeklyselects.name.push(name);
            }
            var flag = 0;
            for(var i=0;i<this.weeklyselects.code.length;i++){
                if(this.weeklyselects.code[i]==code){
                    flag = 1;
                }
            }
            if(flag == 0){
                this.weeklyselects.code.push(code);
                this.weeklyselects.name.push(name);
            }

        }else{
            this.weeklylist[item][ci].IsSelect = 0;
            var ws = this.weeklyselects.code;
            var wsname =this.weeklyselects.name;
            var weekselectlist = {code:[],name:[]};
            for(var i=0;i<ws.length;i++){
                if(ws[i]!=code){
                    weekselectlist.code.push(ws[i]);
                    weekselectlist.name.push(wsname[i]);
                }
            }
            this.weeklyselects = weekselectlist;
        }
        console.log(this.weeklyselects);
    }
    xqClick(item,ci,code,select,name){//星期

        console.log(item+"--"+ci+"--"+code+"--"+select);
        if(this.daylist[item][ci].IsSelect ==0) {//模态对话框样式
            this.daylist[item][ci].IsSelect = 1;
            if(this.dayselects.code.length ==0){
                this.dayselects.code.push(code);
                this.dayselects.name.push(name);
            }
            var flag = 0;
            for(var i=0;i<this.dayselects.code.length;i++){
                if(this.dayselects.code[i]==code){
                    flag = 1;
                }
            }
            if(flag == 0){
                this.dayselects.code.push(code);
                this.dayselects.name.push(name);
            }

        }else{
            this.daylist[item][ci].IsSelect = 0;
            var ws = this.dayselects.code;
            var wsname =this.dayselects.name;
            var daylist = {code:[],name:[]};
            for(var i=0;i<ws.length;i++){
                if(ws[i]!=code){
                    daylist.code.push(ws[i]);
                    daylist.name.push(wsname[i]);
                }
            }
            this.dayselects = daylist;
        }
        console.log(this.dayselects);
    }
    jcClick(item,ci,code,select,name){//节次

        console.log(item+"--"+ci+"--"+code+"--"+select);
        if(this.sectionlist[item][ci].IsSelect ==0) {//模态对话框样式
            this.sectionlist[item][ci].IsSelect = 1;
            if(this.sectionselects.code.length ==0){
                this.sectionselects.code.push(code);
                this.sectionselects.name.push(name);
            }
            var flag = 0;
            for(var i=0;i<this.sectionselects.code.length;i++){
                if(this.sectionselects.code[i]==code){
                    flag = 1;
                }
            }
            if(flag == 0){
                this.sectionselects.code.push(code);
                this.sectionselects.name.push(name);
            }

        }else{
            this.sectionlist[item][ci].IsSelect = 0;
            var ws = this.sectionselects.code;
            var wsname =this.sectionselects.name;
            var daylist = {code:[],name:[]};
            for(var i=0;i<ws.length;i++){
                if(ws[i]!=code){
                    daylist.code.push(ws[i]);
                    daylist.name.push(wsname[i]);
                }
            }
            this.sectionselects = daylist;
        }
        console.log(this.sectionselects);
    }

    dismiss() {
        if(this.weeklyselects.code.length ==0){
            let confirm = this.alertCtrl.create({
                title: '提示',
                message: '请选择周次',
                buttons: [
                    {
                        text: '确定',
                        handler: () => {

                        }
                    }
                ]
            });
            confirm.present();
            return;
        }
        if(this.dayselects.code.length ==0){
            let confirm = this.alertCtrl.create({
                title: '提示',
                message: '请选择星期',
                buttons: [
                    {
                        text: '确定',
                        handler: () => {

                        }
                    }
                ]
            });
            confirm.present();
            return;
        }
        if(this.sectionselects.code.length ==0){
            let confirm = this.alertCtrl.create({
                title: '提示',
                message: '请选择节次',
                buttons: [
                    {
                        text: '确定',
                        handler: () => {

                        }
                    }
                ]
            });
            confirm.present();
            return;
        }

        var obj = {
            flag:0,
            week:this.weeklyselects,
            day:this.dayselects,
            section:this.sectionselects
        }
        this.viewCtrl.dismiss(obj);
    }
    close() {
        var obj = {
            flag:1,
            week:this.weeklyselects,
            day:this.dayselects,
            section:this.sectionselects
        }
        this.viewCtrl.dismiss(obj);
    }
}