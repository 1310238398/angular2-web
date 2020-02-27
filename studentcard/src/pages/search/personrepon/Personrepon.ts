/**
 * Created by hanzhendong on 2016/11/29.
 */
import { Component, Injector} from '@angular/core';
import {ToastController, NavParams} from 'ionic-angular';
import {HelpUtils} from "../../../app/utils/HelpUtils";
import {NavController} from "ionic-angular";
import {ServelUrl} from "../../../app/ServelUrl";
import {HttpService} from "../../../http/http.Service";
import {FamilyAddressPage} from "../familyaddress/FamilyAddress";
import {FamilyeconomyPage} from "../familyeconomy/familyeconomy";
import { AlertController } from 'ionic-angular';


@Component({
    selector: 'page-personrepon',
    templateUrl: 'personrepon.html'
})
export class PersonreponPage {
   
    InformationFilling: any;
    reader;
    loadingPop;
    item: any;
    CityTypes: any;
    Provience: any;
    AddressT: any;
    NationTypes: any;
    AreaType: any;
    //添加数量变化
    shouInfo = 1;
    i : number = 1;
    CampusTypes = {
        Campus: '',
        Logo: ''
    };
    Family:any = [{Name: "" ,Relation: "",Political: "",Job: "",WorkAddress: "",Phone: "",}];
    Social:any =  [{Name: "" ,Relation: "",Political: "",Job: "",WorkAddress: "",Phone: "",}];
    schoolName=localStorage.getItem('schoolName');
    constructor(private params: NavParams, public toastCtrl: ToastController, private HelpUtils: HelpUtils,
                public navCtrl: NavController, private http: HttpService, public _injector:Injector,private alertCtrl: AlertController) {

        this.reader = new FileReader();
         //初始请求数据
         this.http.postJSON({
            Router: ServelUrl.Url.querytree,
            Method: 'POST',
            Body: ''
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    if(comments.Data.Family.length!=0&&comments.Data.Social.length!=0){
                    this.Family = comments.Data.Family;
                    
                    this.Social = comments.Data.Social;
                    
                }
                    // console.log( this.InformationFilling[0].Academy)
                    
                }
            });
        /*、
         * 调用jssdk
         *
         * */
        antlinker.configTitle({
            type: "label",
            title: '学籍信息采集',
            fail: function () {

            },
            success: function () {
            }
        });
        antlinker.configNavigationButton({
            type: ['more', 'close'],
            option: ["refresh"],
            buttonTitle: '更多',
            moreOption: ["refresh"],
            success: function () {
                // alert('success被调用');
                //设置右上角按钮成功
            },
            fail: function () {
                // alert('fail被调用');
                // 设置右上角按钮失败
            },
        });
        antlinker.configTitleButton({
            type: 'close',
            text: '关闭',
            fail: function () {

            },
            success: function () {
            },
            // trigger: function () {
            // }

        });
    }
//添加家庭成员
addPage(){
   
    if(this.Family.length+1<=5){
        // var resultArray:Array<any>=[] ;
        
        // this.Family.forEach(i=>{ 
        //    resultArray.push(
        //    {
        //      "name":i.name,
        //      "courseid":i.courseid
        //    });
        // });
    this.Family.push(
        {Name: this.Family.Name ,Relation: this.Family.Relation,Political:this.Family.Political,Job:this.Family.Job,WorkAddress:this.Family.WorkAddress,Phone: this.Family.Phone,});
    }else{
        this.HelpUtils.toastPop("最多只能添加5个！");
    }
    console.log(this.Family.length);
}
removePage(){
    let confirm = this.alertCtrl.create({
        title: '确定删除此项吗？',
        message: '',
        buttons: [
          {
            text: '确定',
            handler: () => {
                this.Family.pop({Name: "" ,Relation: "",Political: "",Work: "",WorkPlace: "",Phone: "",});
            }
          },
          {
            text: '取消',
          }
        ]
      });
      confirm.present()

}
//社会关系
addsoPage()
{ if(this.Social.length+1<=5){
    this.Social.push({Name: "" ,Relation: "",Political: "",Job: "",WorkAddress: "",Phone: "",});}else{
        this.HelpUtils.toastPop("最多只能添加5个！");
    }
    //this.shouInfo++;
    // this.formw.push({DadName: "" ,pro: "2"});
}
removeScoPage(){
    let confirm = this.alertCtrl.create({
        title: '确定删除此项吗？',
        message: '',
        buttons: [
          {
            text: '确定',
            handler: () => {
                this.Social.pop({Name: "" ,Relation: "",Political: "",Work: "",WorkPlace: "",Phone: "",})
            }
          },
          {
            text: '取消',
          }
        ]
      });
      confirm.present()
   
}

//提交
onDetailPage() {
        // let FamilyAddressValue = this.FamilyAddress;
        // console.log(this.FamilyAddress);
        var w;
        for(w=0;w<this.Family.length;w++){
            if (!this.Family[w].Name.trim()){
                console.log(this.Family[w].Name);
                this.HelpUtils.toastPop('请填写成员姓名！');
                return;    

            }
            if (!this.Family[w].Relation.trim()){
                this.HelpUtils.toastPop('请填写与本人关系！');
                return;    

            }
            if (!this.Family[w].Political.trim()){
                this.HelpUtils.toastPop('请填写政治面貌！');
                return;    

            }
            if (!this.Family[w].Job.trim()){
                this.HelpUtils.toastPop('请填写职业！');
                return;    

            }
            if (!this.Family[w].WorkAddress.trim()){
                this.HelpUtils.toastPop('请填写现工作单位！');
                return;    

            }
            if (!this.Family[w].Phone.trim()){
                this.HelpUtils.toastPop('请填写联系电话！');
                return;    

            }
        }    
        var t;
        for(t=0;t<this.Social.length;t++){
            if (!this.Social[t].Name){
                console.log(this.Social[t].Name.trim());
                this.HelpUtils.toastPop('请填写成员姓名！');
                return;    

            }
            if (!this.Social[t].Relation.trim()){
                this.HelpUtils.toastPop('请填写与本人关系！');
                return;    

            }
            if (!this.Social[t].Political.trim()){
                this.HelpUtils.toastPop('请填写政治面貌！');
                return;    

            }
            if (!this.Social[t].Job.trim()){
                this.HelpUtils.toastPop('请填写职业！');
                return;    

            }
            if (!this.Social[t].WorkAddress.trim()){
                this.HelpUtils.toastPop('请填写现工作单位！');
                return;    

            }
            if (!this.Social[t].Phone.trim()){
                this.HelpUtils.toastPop('请填写联系电话！');
                return;    

            }
        }            
        this.loadingPop = this.HelpUtils.loadingPop('信息正在提交。。。。。');
        this.http.postJSON({
            Router: ServelUrl.Url.savethree,
            Method: 'POST',
            Body:  {Family:this.Family,Social:this.Social}
            
        }).then(
            comments => {
                this.loadingPop.dismiss();
                if (comments.FeedbackCode == '0') {
                    this.navCtrl.push(FamilyeconomyPage);
                } else {
                    this.HelpUtils.toastPop(`${comments.FeedbackText}`);
                }
            }
            )


    }

   

    onTopPage(){
        this.navCtrl.push(FamilyAddressPage);
    }
}
