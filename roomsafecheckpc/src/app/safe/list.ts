import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd';

import * as moment from 'moment';
import { SafeService } from './safe.service';
import { element } from '@angular/core/src/render3/instructions';


declare const Viewer: any;
declare var $: any
@Component({
    templateUrl: './list.html',
    styleUrls: ['./list.css']
})
export class ListComponent implements OnInit {
    loading = false;
    violationKeyWords = '';// 违纪关键词
    violationKeyWodsInValid = false;
    isViolationManageVisible = false;
    isViolationVisible = false;
    violationData = [];
    staicViolationData = [];
    selecedViolation = [];
    selecedViolationCode = [];
    selecedViolationName = [];

    articleKeyWords = ''; // 没收关键词  
    articleKeyWodsInValid = false;
    isArticleManageVisible = false;
    isArticleVisible = false;
    articleData = [];
    selecedArticle = [];
    selecedArticleCode = [];
    selecedArticleName = [];

    roomData = [];
    academyData = [];
    dormRoomData = [];
    startDate: Date = null;
    endDate: Date = null;
    total = 0;
    pageIndex = 1;
    pageSize = 40;
    search = {
        academy: null,
        dormitory: null,
        room: null,
        start: '',
        end: '',
        discipline: '',
        contraband: ''
    };
    dataSet = [];
    annexData = [];
    constructor(
        private message: NzMessageService,
        private modalService: NzModalService,
        private safeService: SafeService) { }

    ngOnInit() {
        this.getUnSafeList();
        this.getDormRoomList();
        this.getAcademyList();
        this.getViolationList();
        this.getArticleList();

    }


    // 请求违纪列表
    getUnSafeList() {
        this.search.discipline = this.selecedViolationCode.join(',');
        this.search.contraband = this.selecedArticleCode.join(',');
        this.search.start = this.startDate ? moment(this.startDate).format('YYYY-MM-DD') : '';
        this.search.end = this.endDate ? moment(this.endDate).format('YYYY-MM-DD') : '';
        this.loading = true;
        this.safeService.queryUnSafeList(this.pageIndex, this.pageSize, this.search).subscribe(res => {
            console.log(`res+${res}`)
            this.loading = false;
            if (res.FeedbackCode === 0) {
                this.dataSet = res.data.data || [];
                this.dataSet.forEach(element => {
                    element.showAnnex = false;
                    element.annexData = [];
                });
                this.total = res.data.total;
            } else {
                this.dataSet = [];
                this.total = 0;
                this.message.create('error', res.FeedbackText);
            }
        });
    }

    // 请求违纪列表
    getUnSafeListPageChange(page) {
        console.log('page' + page);
        if (!page || page === 0 || page === this.pageIndex) {
            return;
        }
        this.pageIndex = page;
        this.getUnSafeList();
    }

    // 查询
    searchFunc() {
        this.pageIndex = 1;
        this.getUnSafeList();
    }

    // 重置
    reset() {
        this.search = {
            academy: null,
            dormitory: null,
            room: null,
            start: '',
            end: '',
            discipline: '',
            contraband: ''
        };
        this.startDate = undefined;
        this.endDate = undefined;
        this.selecedArticleCode = [];
        this.selecedArticleName = [];
        this.selecedViolationCode = [];
        this.selecedViolationName = [];
        this.roomData=[];
    }

    // 删除
    cancel(): void {

    }

    confirm(type: string, record: string): void {
        this.deleteUnSafe(type, record)
    }

    deleteUnSafe(type: string, record: string) {
        this.safeService.deleteUnSafe(type, record).subscribe(res => {
            if (res.data.data === 'ok') {
                this.message.create('success', `删除成功`);
                this.getUnSafeList();
            }
        });
    }

    // 学院列表
    getAcademyList() {
        this.safeService.queryAcademyList().subscribe(res => {
            res.data.total && res.data.total > 0 ? this.academyData = res.data.data : this.academyData = [];
        });
    }

    // 宿舍楼列表
    getDormRoomList() {
        this.safeService.queryDormRoomList().subscribe(res => {
            res.data.total && res.data.total > 0 ? this.dormRoomData = res.data.data : this.dormRoomData = [];
        });
    }

    // 宿舍楼选中
    dormitoryOnChange(value) {
        this.search.room = null;
        this.roomData = [];
        if (!value) {
            console.log(`value--${value}`);
            return;
        }
        this.getRoomList(value);
    }

    // 宿舍列表
    getRoomList(dormitorycode: string) {
        this.safeService.queryRoomList(dormitorycode).subscribe(res => {
            this.roomData = [];
            res.data.total && res.data.total > 0 ? this.roomData = res.data.data : this.roomData = [];
        });
    }

    // 附件查看
    showImgs(data: any, i: number) {
        if (data.showAnnex) {
            $("#a" + i + "0").click();
        } else {
            this.safeService.queryAnnexList(data.type, data.RecordId).subscribe(res => {
                data.showAnnex = true;
                res.data.total && res.data.total > 0 ? this.dataSet[i].annexData = res.data.data : this.dataSet[i].annexData = [];
                setTimeout(() => {
                    $("#a" + i + "0").click();
                }, 500);
            });
        }
    }

    //点击查看大图
    viewBigImg(i) {
        $('.jq22' + i).viewer()
    }

    // 违纪关键词列表
    getViolationList() {
        this.safeService.queryViolationList().subscribe(res => {
            res.data.total && res.data.total > 0 ? this.violationData = res.data.data : this.violationData = [];
        });
    }

    // 违纪选择
    showViolationModal(): void {
        this.isViolationVisible = true;
        if (this.selecedViolationCode.length === 0) {
            this.selecedViolation = [];
        } else {
            this.selecedViolation = [];
            this.selecedViolationCode.forEach((value, index) => {
                this.selecedViolation.push({
                    KeyCode: value,
                    KeyName: this.selecedViolationName[index]
                });
            });
        }
    }

    // 违纪选择
    violationleHandleOk(): void {
        this.isViolationVisible = false;
        this.selecedViolationCode = [];
        this.selecedViolationName = [];
        this.selecedViolation.forEach(element => {
            this.selecedViolationCode.push(element.KeyCode);
            this.selecedViolationName.push(element.KeyName);
        });
    }

    // 违纪选择
    violationHandleCancel(): void {
        this.isViolationVisible = false;
        // this.selecedViolationCode = [];
        // this.selecedViolationName = [];
        // this.selecedViolation.forEach(element => {
        //     this.selecedViolationCode.push(element.KeyCode);
        //     this.selecedViolationName.push(element.KeyName);
        // });
    }

    // 选中违纪
    selectedViolationFunc(words: any, index: number) {
        let hasExist = this.selecedViolation.find(element => element.KeyCode === words.KeyCode);
        if (!hasExist) {
            this.selecedViolation.push(words);
        }
        // this.violationData.splice(index, 1);
        // console.log(this.staicViolationData);
    }

    // 取消选中违纪
    cancleSelectedViolationFunc(index: number) {
        this.selecedViolation.splice(index, 1);
        this.selecedViolationCode = [];
        this.selecedViolationName = [];
        this.selecedViolation.forEach(element => {
            this.selecedViolationCode.push(element.KeyCode);
            this.selecedViolationName.push(element.KeyName);
        });
    }

    // 重置违纪
    resetViolation() {
        this.selecedViolation = [];
        this.selecedViolationCode = [];
        this.selecedViolationName = [];
    }

    // 违纪关键词管理
    showViolationManageModal() {
        this.isViolationManageVisible = !this.isViolationManageVisible;
        this.violationKeyWords = '';
        this.violationKeyWodsInValid = false;
    }

    // 停用关键词 关键词类型 "discipline"违纪关键词 或 "contraband"没收物品关键词 
    deleteKeyWods(type: string, key: string, index: number) {
        this.modalService.confirm({
            nzTitle: '停用该关键词后，该关键词将不会在移动端显示，确定要停用吗?',
            nzContent: '',
            nzOkText: '确定',
            nzOkType: 'info',
            nzOnOk: () => {
                this.safeService.deleteKeyWods(type, key).subscribe(res => {
                    if (res.data.data === 'ok') {
                        if (type === 'discipline') {
                            this.getViolationList();
                        } else {
                            this.getArticleList();
                        }
                    }
                });
            },
            nzCancelText: '取消',
            nzOnCancel: () => console.log('Cancel')
        });
    }

    // 复用关键词 关键词类型 "discipline"违纪关键词 或 "contraband"没收物品关键词 
    relivekKeyWods(type: string, key: string, index: number) {
        this.safeService.relivekKeyWods(type, key).subscribe(res => {
            if (res.data.data === 'ok') {
                if (type === 'discipline') {
                    this.getViolationList();
                } else {
                    this.getArticleList();
                }
            }
        });
    }

    // 违纪关键词管理
    keyWordsHandleOk(): void {
        console.log('Button ok clicked!');
        this.isViolationManageVisible = false;
    }

    // 违纪关键词管理
    keyWodsHandleCancel(): void {
        console.log('11');
        this.isViolationManageVisible = false;
    }

    // 违纪关键词管理
    violationKeyWordsOnChange(value) {
        value && value.trim().length > 0 ? this.violationKeyWodsInValid = false : this.violationKeyWodsInValid = true;
    }

    // 添加违纪
    addViolation(): void {
        if (this.violationKeyWords.trim().length <= 0) {
            this.violationKeyWodsInValid = true;
            return;
        }
        if (this.violationKeyWords.trim().length > 15) {
            return;
        }
        this.safeService.addWeiJiWords(this.violationKeyWords.trim(), '1').subscribe(res => {
            if (res.data.data && res.data.data.KeyCode) {
                this.violationKeyWords = '';
                this.violationData.unshift({
                    KeyCode: res.data.data.KeyCode,
                    KeyName: res.data.data.KeyName,
                    Status: '1'
                });
            } else {
                this.message.create('error', res.data.data);
            }
        })
    }

    // 没收关键词列表
    getArticleList() {
        this.safeService.queryAwayList().subscribe(res => {
            res.data.total && res.data.total > 0 ? this.articleData = res.data.data : this.articleData = [];
        });
    }

    // 没收选择
    showArticleModal(): void {
        this.isArticleVisible = true;
        if (this.selecedArticleCode.length === 0) {
            this.selecedArticle = [];
        } else {
            this.selecedArticle = [];
            this.selecedArticleCode.forEach((value, index) => {
                this.selecedArticle.push({
                    KeyCode: value,
                    KeyName: this.selecedArticleName[index]
                });
            });
        }
    }

    // 没收选择
    articleHandleOk(): void {
        this.isArticleVisible = false;
        this.selecedArticleCode = [];
        this.selecedArticleName = [];
        this.selecedArticle.forEach(element => {
            this.selecedArticleCode.push(element.KeyCode);
            this.selecedArticleName.push(element.KeyName);
        });
    }

    // 没收选择
    articleHandleCancel(): void {
        this.isArticleVisible = false;
    }

    // 选中没收
    selectedArticleFunc(words: any) {
        let hasExist = this.selecedArticle.find(element => element.KeyCode === words.KeyCode);
        if (!hasExist) {
            this.selecedArticle.push(words);
        }
    }

    // 取消选中没收
    cancleSelectedArticleFunc(index: number) {
        this.selecedArticle.splice(index, 1);
        this.selecedArticleCode = [];
        this.selecedArticleName = [];
        this.selecedArticle.forEach(element => {
            this.selecedArticleCode.push(element.KeyCode);
            this.selecedArticleName.push(element.KeyName);
        });
    }
    // 重置没收
    resetArticle() {
        this.selecedArticle = [];
        this.selecedArticleCode = [];
        this.selecedArticleName = [];
    }
    // 没收关键词管理
    showAricleManageModal() {
        this.isArticleManageVisible = !this.isArticleManageVisible;
        this.articleKeyWords = '';
        this.articleKeyWodsInValid = false;
    }

    // 没收关键词管理
    articleKeyWordsOnChange(value) {
        value && value.trim().length > 0 ? this.articleKeyWodsInValid = false : this.articleKeyWodsInValid = true;
    }

    // 添加没收
    addArticle(): void {
        if (this.articleKeyWords.trim().length <= 0) {
            this.articleKeyWodsInValid = true;
            return;
        }
        if (this.articleKeyWords.trim().length > 15) {
            return;
        }
        this.safeService.addWuPinWords(this.articleKeyWords.trim(), '1').subscribe(res => {
            if (res.data.data && res.data.data.KeyCode) {
                this.articleKeyWords = '';
                this.articleData.unshift({
                    KeyCode: res.data.data.KeyCode,
                    KeyName: res.data.data.KeyName,
                    Status: '1'
                });
            } else {
                this.message.create('error', res.data.data);
            }
        })
    }


    disabledStartDate = (startValue: Date): boolean => {
        if (!startValue || !this.endDate) {
            return false;
        }
        return startValue.getTime() > this.endDate.getTime();
    };

    disabledEndDate = (endValue: Date): boolean => {
        if (!endValue || !this.startDate) {
            return false;
        }
        return endValue.getTime() <= this.startDate.getTime();
    };
}