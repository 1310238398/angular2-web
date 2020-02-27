import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../ServelUrl";
import { NzMessageService, NzModalService } from "ng-zorro-antd";



@Component({
    selector: 'app-waitindex',
    templateUrl: './waitindex.component.html',
    styleUrls: ['./waitindex.component.css']
})
export class WaitIndexComponent implements OnInit {

    dataSet = [];

    optiongrade = []
    optionclass = []
    optionstatus = [
        {Name:'待审批',Code:'0'},
        {Name:'未同步',Code:'1'},
        {Name:'已拒绝',Code:'2'},
    ]

    checkOptionsOne = [];
    allChecked = false;
    indeterminate = false;

    page = {
        Page: 1,
        PageSize: 40,
    };
    total = 0;
    searchObj = {
        UserCode: '',      //学号
        Name: '',          //姓名
        Grade: '',
        Class: '',
        Status: '',
    };

    constructor(public httpService: HttpService, private msgSrv: NzMessageService, private confirmServ: NzModalService) { }
    ngOnInit(): void {
        this.onSearch();
        this.loadGrade();

        let userJsonStr = sessionStorage.getItem('searchArr');
        let pageJsonStr = sessionStorage.getItem('pageCut');

        let GradeJsonStr = sessionStorage.getItem('optionGrade');
        let ClassJsonStr = sessionStorage.getItem('optionClass');
        let StatusJsonStr = sessionStorage.getItem('optionStatus');

        if (userJsonStr != null) {
            this.searchObj = JSON.parse(userJsonStr);
            this.page.Page = JSON.parse(pageJsonStr);
            this.optiongrade = JSON.parse(GradeJsonStr);
            this.optionclass = JSON.parse(ClassJsonStr);
            this.optionstatus = JSON.parse(StatusJsonStr);
            sessionStorage.clear();
        }
    }

    //存储缓存
    sesstionCut() {
        sessionStorage.setItem('searchArr', JSON.stringify(this.searchObj));
        sessionStorage.setItem('pageCut', JSON.stringify(this.page.Page));
        sessionStorage.setItem('optionGrade', JSON.stringify(this.optiongrade));
        sessionStorage.setItem('optionClass', JSON.stringify(this.optionclass));
        sessionStorage.setItem('optionStatus', JSON.stringify(this.optionstatus));
    }

    //获取数据列表
    onSearch(reload = false) {
        if (reload) {
            this.page.Page = 1
        }
        this.httpService.POST({
            Router: ServelUrl.Url.approvallist,
            Method: 'POST',
            Body: {
                Page: this.page.Page - 1,
                Count: 40,
                UserCode: this.searchObj.UserCode,
                Name: this.searchObj.Name,
                Grade: this.searchObj.Grade,
                Class: this.searchObj.Class,
                Status: this.searchObj.Status
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {

                this.dataSet = res.Data.Datas;
                this.total = parseInt(res.Data.Total);

                for (let i = 0; i < this.dataSet.length; i++) {
                    this.dataSet[i]['checked'] = false;
                    this.dataSet[i].LastTime = this.nowDay(this.dataSet[i].LastTime)  
                }

                for (let i = 0; i < this.dataSet.length; i++) {
                    if (this.dataSet[i].Status == '1' && this.dataSet[i].Tasking == '1') {
                        this.checkOptionsOne.push(this.dataSet[i])
                    }
                }
            }    
        })
    }


    
    //重置
    resetForm(form) {
        form.reset();
    }

    //加载年级
    loadGrade() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.allgrade,
            Method: 'POST',
            Body: {

            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.optiongrade = res.Data;
            }
        });
    }

    //加载班级
    loadClass() {

        this.httpService.postJSON({
            Router: ServelUrl.Url.classingrade,
            Method: 'POST',
            Body: {
                GradeCode: this.searchObj.Grade
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                
                this.optionclass = res.Data;
            }
        });
    }


    //帮助弹框
    info(contentTpl) {
        this.confirmServ.info({
            title: '待审批功能',
            content: contentTpl
        });
    }


    //点击开始同步
    isVisible = false;
    showModal = () => {
        var checkStudent = []; //选择同步的学生

        for (let i = 0; i < this.checkOptionsOne.length; i++) {
            if (this.checkOptionsOne[i].checked) {
                checkStudent.push(this.checkOptionsOne[i].IntelUserCode)
            }
        }

        if (checkStudent.length == 0) {
            this.msgSrv.warning('请先选择需要同步的学生');
        } else {
            this.isVisible = true;
        }

    }
    handleOk = (e) => {
        console.log('点击了确定');
        this.isVisible = false;

        var checkStudent = []; //选择同步的学生
        for (let i = 0; i < this.checkOptionsOne.length; i++) {
            if (this.checkOptionsOne[i].checked) {
                checkStudent.push(this.checkOptionsOne[i].IntelUserCode)
            }
        }

        this.httpService.postJSON({
            Router: ServelUrl.Url.syn,
            Method: 'POST',
            Body: {
                IntelUserCode: checkStudent.join(","),
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.msgSrv.success('同步成功');
                this.onSearch();  //再次请求最新数据
            }else{
                this.msgSrv.warning(res.FeedbackText);
            }
        });

    }
    handleCancel = (e) => {
        console.log(e);
        this.isVisible = false;
    }

    //全选
    updateAllChecked() {
        this.indeterminate = false;
        if (this.allChecked) {
            this.checkOptionsOne.forEach(item => item.checked = true);
        } else {
            this.checkOptionsOne.forEach(item => item.checked = false);
        }
    }

    //单选
    updateSingleChecked() {
        if (this.checkOptionsOne.every(item => item.checked === false)) {
            this.allChecked = false;
            this.indeterminate = false;
        } else if (this.checkOptionsOne.every(item => item.checked === true)) {
            this.allChecked = true;
            this.indeterminate = false;
        } else {
            this.indeterminate = true;
        }
    }


    nowDay(obj){
        const Dates = new Date(obj*1000);
        const year: number = Dates.getFullYear();
        const month: any = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
        const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
        return year + '-' + month + '-' + day
    }






}
