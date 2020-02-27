import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http/http.service';
import {ServelUrl} from "../ServelUrl";
import {NzMessageService} from "ng-zorro-antd";


declare var Qiniu;

@Component({
  selector: 'app-upfile',
  templateUrl: './upfile.component.html',
  styleUrls: ['./upfile.component.css']
})
export class UpfileComponent implements OnInit {

    dataSet = []; //页面数据
    antBtn = 'ant-btn-able';    //上传按钮禁用
    //resetBtn = '';              // 添加按钮禁用
    values = 30;                //备注信息字数

    uuId = '';                  //hash值
    sendSchool;
    sendName;
    IsLittleHelper;                    //是否显示隐藏学校  收件人

    newSessionArr = [];  //本地存储错误数组

    searchObj = {
        UniversityName: '',
        SendName : '',
        ReceiveName: '',
        FileName : '',
        FileSize : '',
        Created : '',
        Remark : '',
        DownloadURL : '',
        disA: '',
        FileExt :''
    };


    todayTime = '';
    size = 'default'; //按钮尺寸

    //七牛上传参数
    uploader;
    upfileview = {
        AttachmentKey: '',
        AttachmentCode: ''
    }

    inputValueOne: string;
    inputValueTwo: string;

    fileName = '';  //存储文件名
    fileSizeAdd = ''; //存储文件大小
    fileNews = ''; //存储备注信息
    keepDate = '';
    keepNews = '';

    FileExt = ''; //存储文件后缀
    keepExt = ''; //

    //复选框
    optionschool = []; //学校选择框
    optionmen = [];    //收件人选择框

    seltSchool = '';   //选择学校名称
    seltMen = '';       //选择接收人名称
    selectedSchool;    //选择学校对象
    selectedMen;        //选择接收人对象
    receiveUID;        //接收人ID

    constructor(private httpService: HttpService,private _message: NzMessageService) {}

    //=============================================================================================初始化页面
    ngOnInit(): void {
        this.initQiniu();
        this.onSearch();
    }

    //==============================================================================================七牛文件上传
    initQiniu() {

        //console.log('获取uptoken1111111111111111111');
        this.uploader = Qiniu.uploader({
            runtimes: 'html5,flash,html4',
            browse_button: 'pickfiles',
            domain: 'http://qiniu-plupload.qiniudn.com/',
            uptoken_func: (file) => {    // 在需要获取uptoken时，该方法会被调用
                var uptoken = '';
                this.httpService.postXhr({
                    filename:file.name,
                    bustype :'pcfile',
                    filesize : file.size,
                    gid :'0',
                    hash:this.uuId
                }, (value) => {
                    this.upfileview.AttachmentKey = value.Data.FullKey || "";
                    this.upfileview.AttachmentCode = value.Data.Token || "";
                    uptoken = value.Data.Token;
                    file.name=value.Data.FullKey;
            },'/v1/token');
                return uptoken;
            },
            // 可以使用该参数来限制上传文件的类型，大小等，该参数以对象的形式传入，它包括三个属性：
            filters: {
                max_file_size: '50mb',
                prevent_duplicates: false,
                // mime_types: [
                //     { title: "Papers files", extensions: "pdf,doc,xls,xlsx,txt,zip" },
                // ]
            },
            save_key: false,
            unique_names: false,
            get_new_uptoken: true,
            max_file_size: '50mb',
            max_retries: 1,
            log_level: 100,
            flash_swf_url: 'assets/lib/Moxie.swf',
            multi_selection: false,
            dragdrop: false,
            chunk_size: '0mb',
            auto_start: false,
            init: {
                'Key': (up, file) => {
                    // do something with key
                    return this.upfileview.AttachmentKey || ''
                },
                'FilesAdded': (up, files) => {            
                    if(up.files.length > 1){
                        for(var i=0;i<up.files.length;i++){
                            if(up.files[i].status == 1){
                                up.files[i].status = 5;
                            }  
                        }
                        var aa = up.files.length -1;
                        up.files[aa].status = 1
                    }

                    this.uuId = this.guid();

                    this.fileName = files[0].name;  
                    this.keepDate = files[0].name.substring(0,files[0].name.lastIndexOf("."));


                    this.FileExt = files[0].name.substring(files[0].name.lastIndexOf("."));
                    this.keepExt = files[0].name.substring(files[0].name.lastIndexOf("."));
                    
                    let limit= files[0].size;
                    if(limit < 0.1 * 1024 * 1024 ){//如果小于0.1MB转化成KB  
                        this.fileSizeAdd = (limit / 1024).toFixed(2) + "KB";              
                    }else if(limit < 0.1 * 1024 * 1024 * 1024){ //如果小于0.1GB转化成MB  
                        this.fileSizeAdd = (limit / (1024 * 1024)).toFixed(2) + "MB";  
                    }

                    if(this.IsLittleHelper){
                        if(this.selectedSchool && this.selectedMen){
                            this.antBtn = '';
                        }
                    }else{
                        this.antBtn = '';
                    }
                      
                },
                'BeforeUpload': (up, file) => {
                     
                    var newObject = {
                        UniversityName: '',
                        SendName:'',
                        ReceiveName: '',
                        FileName: '',
                        FileSize: '',
                        Created : '',
                        Remark : '',
                        DownloadURL : '',
                        disA: '',
                        FileExt:''
                    };
            
            
                    if(this.IsLittleHelper){
                        newObject.UniversityName = this.seltSchool;
                        newObject.SendName = '小助手';
                        newObject.ReceiveName = this.seltMen;
                    }else{
                        newObject.UniversityName = this.sendSchool;
                        newObject.SendName = this.sendName;
                        newObject.ReceiveName = '小助手';
                    }
            
                    newObject.Created = '';
                    newObject.Remark = this.fileNews;
                    newObject.FileSize = '';
                    newObject.DownloadURL = '';
                    newObject.disA = '';
            
                    this.searchObj = newObject;
                    this.dataSet.unshift(newObject);
                },
                'UploadProgress':  (up, file) => {
                    this.searchObj.FileName = '文件已上传' + file.percent + '%';
                    this.fileName = "";  //存储的文件名设为空

                    this.fileNews = "";  //存储备注信息设为空
                    this.antBtn = 'ant-btn-able'; //上传按钮变灰
                    this.values = 30;
                },
                'FileUploaded': (up, file, info) => {
                    
                    this.searchObj.FileName = this.keepDate;      //文件名称
                    this.searchObj.FileExt = this.keepExt;
                    this.searchObj.Remark = this.keepNews;      //备注信息
                    this.searchObj.Created = this.nowDay();      //上传时间
                    this.searchObj.FileSize = this.fileSizeAdd;   //文件大小

                    this.searchObj.disA = ''; 
                    this.createMessage1('success','成功');

                    //this.resetBtn = '';    // 添加按钮禁用

                    this.httpService.Post({
                        Router: ServelUrl.Url.upfileAdd,
                        Method: 'POST',
                        Body: {
                            FileURL: this.upfileview.AttachmentKey,
                            FileName: this.keepDate + this.keepExt,
                            ReceiveUID: this.receiveUID, 
                            UniversityName: this.seltSchool,
                            Remark: this.keepNews,
                            Created: this.nowDay(),
                            FileSize : this.fileSizeAdd,
                            FileHash : this.uuId,
                        }
                    }).subscribe(res=>{
                        if (res) {
                            this.searchObj.DownloadURL = res.Data;  
                        }
                    }) 

                },
                'UploadComplete': () => {

                },
                'Error': (up, err, errTip) => {
                    
                    //this.resetBtn = '';    // 添加按钮禁用

                    if (err.code == '-600') {
                        this.createMessage2('error','报错')
                    }else{
                        this.searchObj.FileName  = this.keepDate;
                        this.searchObj.FileExt  = this.keepExt
                        this.searchObj.disA = 'dis-a'; 
                    }
                }
            }
        })
    }

    //===============================================================================================重置输入框
    resetForm(form) {
        form.reset();
        this.antBtn = 'ant-btn-able';
    }

    //===============================================================================================获取数据列表
    onSearch() {
        //获取列表
        this.httpService.Post({
            Router: ServelUrl.Url.upfileList,
            Method: 'POST',
            Body: {}
        }).subscribe(res=>{
            if (res.Data) {
                this.dataSet = res.Data;
            }
        });
        //获取学校集合
        this.httpService.Post({
            Router: ServelUrl.Url.upfileSchool,
            Method: 'POST',
            Body: {}
        }).subscribe(res=>{
            if (res.Data) {
                this.optionschool = res.Data;  
            }
        });
        //获取发送人学校 姓名
        this.httpService.Post({
            Router: ServelUrl.Url.upfileInfo,
            Method: 'POST',
            Body: {}
        }).subscribe(res=>{
            if (res.Data) {
                this.sendSchool = res.Data.UniversityName; 
                this.sendName = res.Data.UserName; 
                this.IsLittleHelper = res.Data.IsLittleHelper;
            }
            if(res.RE != 0){
                alert(res.Text)
            }

        });


    }

    //===============================================================================================开始上传文件
    upFileStart() {

        this.keepNews = this.fileNews; //将备注信息存储
        //this.uuId = this.guid();
        this.uploader.start();
        //this.resetBtn = 'ant-btn-able';    // 添加按钮禁用
    };

    //===============================================================================================获取当前时间方法
    nowDay(){
        const Dates = new Date();
        const year: number = Dates.getFullYear();
        const month: any = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
        const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
        return year + '-' + month + '-' + day
    }
    //==============================================================================================选择学校后进行保存
    setInfoschool(){
        if(this.selectedSchool){
            this.seltSchool = this.selectedSchool.UniversityName; 

            this.httpService.Post({
                Router: ServelUrl.Url.upfileMen,
                Method: 'POST',
                Body: {
                    UniversityID: this.selectedSchool.UniversityID
                }
            }).subscribe(res=>{
                if (res.Data) {
                    this.optionmen = res.Data;  
                }
            }) 
        }
        if(this.selectedSchool && this.selectedMen && this.fileName){
            this.antBtn = '';
        }
    }

    //==============================================================================================选择收件人后进行保存
    setInfomen(){
        if(this.selectedMen){
            this.seltMen = this.selectedMen.REALNAME;
            this.receiveUID = this.selectedMen.UID
        }
        if(this.selectedSchool && this.selectedMen && this.fileName){
            this.antBtn = '';
        }
    }

    //===============================================================================================  uuid 随机码  
    guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
        });
    }

    //===============================================================================================上传成功toast提醒
    createMessage1 = (type, text) => {
        this._message.create(type, `上传成功`);
    };

    //===============================================================================================上传失败toast提醒
    createMessage2 = (type, text) => {
        this._message.create(type, `请上传小于50MB文件!`);
    };

    //================================================================================================备注框字数变化
    txtChange(value: string) {
        this.values = 30 - value.length
    }

    //================================================================================================文本框禁止回车换行
    checkEnter(e){
        var et = e || window.event;
        var keycode = et.charCode || et.keyCode;
        if (keycode == 13) {
            if (window.event) {
                window.event.returnValue = false;
            } else {
                e.preventDefault(); //for firefox
            }
        }
    }






}
