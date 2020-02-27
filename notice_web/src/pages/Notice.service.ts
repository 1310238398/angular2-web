/**
 * Created by pillars on 2016/10/14.
 */
import { Injectable, ElementRef, EventEmitter } from '@angular/core';
import { Notice } from '../utility/Notice';
import { Group } from '../utility/Group';
import { GroupMember } from '../utility/GroupMember';
import { UserInfo } from '../utility/UserBasicInfoRequest'
import { Department } from '../utility/Department';
// import { DepartmentMember } from "../utility/DepartmentMember";
import { Attachment } from '../utility/Attachment';
// import { ChatFriend } from "../utility/ChatFriend";
import { ChatGroup } from "../utility/ChatGroup";
// import { ChatGroupMember } from "../utility/ChatGroupMember";
import { UserReply } from "../utility/UserReply";
import { NoticeReply } from "../utility/NoticeReply";
import 'rxjs/add/operator/toPromise';
import { Member } from './data-structure/Member';
import { Headers, Http, RequestOptions } from "@angular/http";
import { Version } from "../utility/sdk_version_request";
import { Webkey } from "../utility/sdk_webkey_request"
import { Observable } from 'rxjs/Rx';
import {HelpUtils} from "../app/utils/HelpUtils";
// import { antlinker } from "../antlinker.1.0.5"
// import  * as antlinker from '../antlinker.1.0.5';
declare var antlinker: any;
// declare var pcAntLinker: any;
// declare var foo_demo: any;
declare var QWebChannel: any;
declare var qt: any;
// import { }
@Injectable()
export class NoticeService {

    private noticeUrl = 'app/notices';
    private serverBase: string = "/app/must/receive/idlist";
    Contacts: Array<any> = [];
    selectedDept: number = 0;
    SelectedNum: number = 0;
    addContact: EventEmitter<object> = new EventEmitter();
    reduceContact: EventEmitter<object> = new EventEmitter();
    reduceRollContact: EventEmitter<object> = new EventEmitter();
    reduceContactAll: EventEmitter<object> = new EventEmitter();
    chekAll: EventEmitter<object> = new EventEmitter();
    constructor(private http: Http, private HelpUtils: HelpUtils) {
    }

    markOneNoticeRead() {
        // pcAntLinker.readOneNotice();
    }

    getRecieveNoticesPromise(mustId: string): Promise<Notice[]> {
        console.log("getRecieveNoticesPromise begin" + antlinker.idKey());
        console.log("getRecieveNoticesPromise begin" + JSON.stringify(antlinker.idKey()));
        if (antlinker.idKey() !== null) {
            console.log("getNoticesPromise begin");
            // 获取前十条
            return this.getRecieveNoticesIdList(mustId, 10);
        } else {
            console.log("error getRecieveNoticesPromise");
        }

    }

    getRecieveNoticesIdList(mustId: string, count: number): Promise<Notice[]> {
        console.log(antlinker.idKey());
        let headers = new Headers({ 'Content-Type': 'application/json', "IDKEY": antlinker.idKey() });

        let options = new RequestOptions({ headers: headers });

        let url: string = "/app/must/receive/idlist";

        return this.http.post(url, { MUSTID: mustId, COUNT: 10 }, options).toPromise().then(response => {
            var re = response.json().RE;
            console.log("re" + re);
            // 如果RE为0，根据IDLIST查询具体的内容
            if (re === 0) {
                console.log("getRecieveNoticesIdList" + JSON.stringify(response.json()));
                return this.getRecieveNoticesContentBatch(response.json().Data.IDLIST);
            }
            return null;
        }).catch(this.handleError);
    }

    getRecieveNoticesContentBatch(idList: any[]): Promise<Notice[]> {
        let headers = new Headers({ 'Content-Type': 'application/json', "IDKEY": antlinker.idKey() });

        let options = new RequestOptions({ headers: headers });

        let url: string = "/app/must/receive/batch";

        return this.http.post(url, { IDLIST: idList }, options).toPromise().then(response => {
            var re = response.json().RE;
            // alert("contnt" + JSON.stringify(response.json()));
            // 如果RE为0，根据IDLIST查询具体的内容
            if (re === 0) {
                return this.reorderNoticeList(response.json().Data as Notice[]);
            }
            return null;
        }).catch(this.handleError);
    }
    getPublishNoticesPromise(mustId: string): Promise<Notice[]> {
        // alert("getNoticesPromise start");
        if (antlinker.idKey() !== null) {
            // alert("getPublishNoticesPromise webkey already exists");
            return this.getPublishNoticesIdList(mustId, 10);
        } else {
            console.log("error getPublishNoticesPromise");
        }

    }

    getPublishNoticesIdList(mustId: string, count: number): Promise<Notice[]> {
        // alert(this.webkey.idKey);
        let headers = new Headers({ 'Content-Type': 'application/json', "IDKEY": antlinker.idKey() });

        let options = new RequestOptions({ headers: headers });

        let url: string = "/app/must/publish/idlist";

        return this.http.post(url, { MUSTID: mustId, COUNT: 10 }, options).toPromise().then(response => {
            var re = response.json().RE;
            // alert(JSON.stringify(response.json()));
            // 如果RE为0，根据IDLIST查询具体的内容
            if (re === 0) {
                // console.log("getPublishNoticesIdList" + JSON.stringify(response.json()));
                return this.getPublishNoticesContentBatch(response.json().Data.IDLIST);
            }
            return null;
        }).catch(this.handleError);
    }

    getPublishNoticesContentBatch(idList: any[]): Promise<Notice[]> {
        let headers = new Headers({ 'Content-Type': 'application/json', "IDKEY": antlinker.idKey() });

        let options = new RequestOptions({ headers: headers });

        let url: string = "/app/must/publish/batch";

        return this.http.post(url, { IDLIST: idList }, options).toPromise().then(response => {
            var re = response.json().RE;
            // alert("contnt" + JSON.stringify(response.json()));
            // 如果RE为0，根据IDLIST查询具体的内容
            if (re === 0) {
                return this.reorderNoticeList(response.json().Data as Notice[]);
            }
            return null;
        }).catch(this.handleError);
    }


    // getPubNotice(id: string): Promise<Notice> {
    //     return this.getPubNotices().then(notices => notices.find(notice => notice.MUSTID === id));
    // }

    // getNotice(id: string): Promise<Notice> {
    //     return this.getRecieveNoticesPromise().then(notices => notices.find(notice => notice.MUSTID === id));
    // }




    // 发布通知
    //app/must/add
    addMust(notice: Notice): Promise<string> {
        let headers = new Headers({ 'Content-Type': 'application/json', "IDKEY": antlinker.idKey() });

        let options = new RequestOptions({ headers: headers });

        let url: string = "/app/must/add";
        return this.http.post(url, notice, options).toPromise().then(response => {
            var re = response.json().RE;
            if (re === 0) {
                return response.json().Data as string;
            }
            return null;
        });

    }

    // 编辑通知
    // /app/must/edit
    editMust(notice: Notice): Promise<string> {
        let headers = new Headers({ 'Content-Type': 'application/json', "IDKEY": antlinker.idKey() });

        let options = new RequestOptions({ headers: headers });

        let url: string = "/app/must/edit";
        return this.http.post(url, notice, options).toPromise().then(response => {
            var re = response.json().RE;
            if (re === 0) {
                return response.json().Data as string;
            }
            return null;
        });

    }

    publishMust(noticePub: string): Promise<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/json', "IDKEY": antlinker.idKey() });

        let options = new RequestOptions({ headers: headers });

        let url: string = "/app/must/publish";
        return this.http.post(url, noticePub, options).toPromise().then(response => {
            var re = response.json().RE;
            if (re === 0) {
                return true;
            }
            return false;
        });
    }

    // 发布通知
    //app/must/resend
    resendMust(notice: Notice): Promise<string> {
        let headers = new Headers({ 'Content-Type': 'application/json', "IDKEY": antlinker.idKey() });

        let options = new RequestOptions({ headers: headers });

        let url: string = "/app/must/resend";
        return this.http.post(url, notice, options).toPromise().then(response => {
            var re = response.json().RE;
            if (re === 0) {
                return response.json().Data as string;
            }
            return null;
        });

    }

    // 上传文件
    // /app/file/upload
    // BuType must
    // ID FileName FileSize FileType FileLink
    uploadFile(fileUpload: ElementRef): Promise<Attachment> {
        console.log("uploadFile begin");

        var url = "/app/file/upload";
        var fileElement: HTMLInputElement = fileUpload.nativeElement;
        var formData = new FormData();
        console.log(fileElement.files)
        if(fileElement.files.item(0).size>52428800){
            this.HelpUtils.toastPop('文件大于50M，请重新上传');
            return
        }
        formData.append("Filedata", fileElement.files.item(0));
        formData.append("BuType", "must");

        let headersTemp = new Headers({ "IDKEY": antlinker.idKey() });
        let options = new RequestOptions({ headers: headersTemp });

        return this.http.post(url, formData, options).toPromise().then(response => {
            console.log(JSON.stringify(response.json()));
            var re = response.json().RE;
            this.HelpUtils.toastPop(response.json().Text);
            if (re === 0) {
                return response.json().Data as Attachment;
            }
            return null;
        });
    }

    // 删除文件
    deleteFile(mustID: string, attachID: string) {
        let headers = new Headers({ 'Content-Type': 'application/json', "IDKEY": antlinker.idKey() });

        let options = new RequestOptions({ headers: headers });

        let url: string = "/app/must/publish";
        var data: any;
        if (mustID === null) {
            data = {
                "AttachID": attachID
            }
        } else {
            data = {
                "MustID": mustID,
                "AttachID": attachID
            }
        }
        return this.http.post(url, data, options).toPromise().then(response => {
            var re = response.json().RE;
            if (re === 0) {
                return true;
            }
            return false;
        });
    }

    getGroupList(): Promise<Group[]> {
        let headers = new Headers({ 'Content-Type': 'application/json', "IDKEY": antlinker.idKey() });

        let options = new RequestOptions({ headers: headers });

        let url: string = "/app/must/group/batch";

        return this.http.post(url, {}, options).toPromise().then(response => {
            var re = response.json().RE;
            // console.log("aaa")
            if (re === 0) {
                return response.json().Data as Group[];
            }
            return null;
        });
        // return null;
    }
    // 第一页取10条数据为 UID空，Count 10，第二页取10条数据 UID为第一页数据列表中最后一条数据的UID，Count 10
    getGroupMemberList(groupId: number, uid: string, count: number): Promise<GroupMember[]> {
        ///app/must/group/member/batch
        let headers = new Headers({ 'Content-Type': 'application/json', "IDKEY": antlinker.idKey() });

        let options = new RequestOptions({ headers: headers });

        let url: string = "/app/must/group/member/batch";

        return this.http.post(url, { GroupID: groupId, UID: uid, Count: count }, options).toPromise().then(response => {
            var re = response.json().RE;
            if (re === 0) {
                let result = response.json().Data as GroupMember[];
                if (result !== null) {
                    for (let i = 0; i < result.length; ++i) {
                        result[i].STATE = 0;
                        result[i].CHECKED = false;
                    }
                }
                return result;
            }
            return null;
        });
    }

    // 新建分组，返回分组id
    addGroup(Name: string, DataType: number, IDList: string[]): Promise<string> {
        let headers = new Headers({ 'Content-Type': 'application/json', "IDKEY": antlinker.idKey() });

        let options = new RequestOptions({ headers: headers });

        let url: string = "/app/must/group/add";

        return this.http.post(url, { "Name": Name, "DataType": DataType, "IDList": IDList }, options).toPromise().then(response => {
            var re = response.json().RE;
            if (re === 0) {
                return response.json().Data.ID as string;
            }
            return null;
        });
    }

    modifyGroupName(ID: number, Name: string): Promise<boolean> {
        ///app/must/group/edit
        let headers = new Headers({ 'Content-Type': 'application/json', "IDKEY": antlinker.idKey() });

        let options = new RequestOptions({ headers: headers });

        let url: string = "/app/must/group/edit";

        return this.http.post(url, { "ID": ID, "Name": Name }, options).toPromise().then(response => {
            var re = response.json().RE;
            if (re === 0) {
                return true;
            }
            return false;
        });
    }

    //UID 学校ID
    // 获取所有department的列表
    getDepartmentList(): Promise<Department[]> {
        let headers = new Headers({ 'Content-Type': 'application/json', "IDKEY": antlinker.idKey() });

        let options = new RequestOptions({ headers: headers });

        let url: string = "/app/department/list";
        let userId: string = antlinker.userId();
        let universityCode: string = antlinker.universityCode();
        // var departmentListPost: DepartmentListPost = {
        //     UID: antlinker.userId,
        //     UNIVERSITY: antlinker.unisersityCode
        // }
        console.log("getDepartmentList service " + JSON.stringify({ "UID": userId, "UNIVERSITY": universityCode }));
        return this.http.post(url, { "UID": userId, "UNIVERSITY": universityCode }, options).toPromise().then(response => {
            var re = response.json().RE;
            if (re === 0) {
                return response.json().Data as Department[];
            }
            return null;
        });
    }

    // 查询通知分组组织机构班级数据
    getDepartmentClassList(DeptID: string): Promise<Department[]> {
        ///app/must/group/edit
        let headers = new Headers({ 'Content-Type': 'application/json', "IDKEY": antlinker.idKey() });

        let options = new RequestOptions({ headers: headers });

        let url: string = "/app/must/department/class";

        return this.http.post(url, { "DeptID": DeptID }, options).toPromise().then(response => {
            var re = response.json().RE;
            if (re === 0) {
                return response.json().Data as Department[];
            }
            return null;
        });
    }

    //查询通知分组组织机构班级成员数据
    getDepartmentClassMemberList(DeptID: string): Promise<GroupMember[]> {
        ///app/must/department/class/member
        let headers = new Headers({ 'Content-Type': 'application/json', "IDKEY": antlinker.idKey() });

        let options = new RequestOptions({ headers: headers });

        let url: string = "/app/must/department/class/member";

        return this.http.post(url, { "DeptID": DeptID }, options).toPromise().then(response => {
            var re = response.json().RE;
            if (re === 0) {
                console.log("department" + JSON.stringify(response.json().Data as GroupMember[]))
                let result = response.json().Data as GroupMember[];
                if (result !== null) {
                    for (let i = 0; i < result.length; ++i) {
                        result[i].STATE = 0;
                        result[i].CHECKED = false;
                    }
                }
                return result;
            }
            return null;
        });
    }

    // 查询通知分组聊天好友成员数据
    getChatFriendList(): Promise<Member[]> {
        //app/must/chatfriend/member
        let headers = new Headers({ 'Content-Type': 'application/json', "IDKEY": antlinker.idKey() });

        let options = new RequestOptions({ headers: headers });

        let url: string = "/app/must/chatfriend/member";

        return this.http.post(url, {}, options).toPromise().then(response => {
            var re = response.json().RE;
            if (re === 0) {
                let result = response.json().Data as Member[];
                if (result !== null) {
                    for (let i = 0; i < result.length; ++i) {
                        // result[i].STATE = 0;
                        result[i].CHECKED = false;
                    }
                }
                return result;
            }
            return [null];
        });
    }

    // 查询通知分组聊天群组数据
    getChatGroupList(): Promise<ChatGroup[]> {
        let headers = new Headers({ 'Content-Type': 'application/json', "IDKEY": antlinker.idKey() });

        let options = new RequestOptions({ headers: headers });

        let url: string = "/app/must/chatgroup";

        return this.http.post(url, {}, options).toPromise().then(response => {
            var re = response.json().RE;
            if (re === 0) {
                return response.json().Data as ChatGroup[];
            }
            return null;
        });
    }

    // 查询通知分组聊天群组成员数据
    getChatGroupMemberList(ChatGroupID: string): Promise<GroupMember[]> {
        let headers = new Headers({ 'Content-Type': 'application/json', "IDKEY": antlinker.idKey() });

        let options = new RequestOptions({ headers: headers });

        let url: string = "/app/must/chatgroup/member";

        return this.http.post(url, { "ChatGroupID": ChatGroupID }, options).toPromise().then(response => {
            var re = response.json().RE;
            if (re === 0) {

                let result = response.json().Data as GroupMember[];
                if (result !== null) {
                    for (let i = 0; i < result.length; ++i) {
                        result[i].STATE = 0;
                        result[i].CHECKED = false;
                    }
                }
                return result;
            }
            return null;
        });
    }

    // 增加分组成员
    // 数据类型（1：用户ID，2：班级ID,3：群组ID）
    addGroupMember(GroupID: number, DataType: number, IDList: string[]): Promise<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/json', "IDKEY": antlinker.idKey() });

        let options = new RequestOptions({ headers: headers });

        let url: string = "/app/must/group/member/add";

        return this.http.post(url, { "GroupID": GroupID, "DataType": DataType, "IDList": IDList }, options).toPromise().then(response => {
            var re = response.json().RE;
            if (re === 0) {
                return true;
            }
            return false;
        });
    }

    // 增加分组成员
    // 数据类型（1：用户ID，2：班级ID,3：群组ID）
    deleteGroupMember(GroupID: number, DataType: number, ID: string): Promise<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/json', "IDKEY": antlinker.idKey() });

        let options = new RequestOptions({ headers: headers });

        let url: string = "/app/must/group/member/del";

        return this.http.post(url, { "GroupID": GroupID, "DataType": DataType, "UID": ID }, options).toPromise().then(response => {
            var re = response.json().RE;
            if (re === 0) {
                return true;
            }
            return false;
        });
    }
    // 删除分组
    deleteGroup(GroupID: number) {
        let headers = new Headers({ 'Content-Type': 'application/json', "IDKEY": antlinker.idKey() });

        let options = new RequestOptions({ headers: headers });

        let url: string = "/app/must/group/del";

        return this.http.post(url, { "GroupID": GroupID }, options).toPromise().then(response => {
            var re = response.json().RE;
            if (re === 0) {
                return true;
            }
            return false;
        });
    }


    ///app/must/department/class
    //

    //查询通知回执
    //app/must/receipt
    //
    // IsReply
    // Count
    // 第一页Count为0，给你了100条数据，第二页，Count为100,又会给你下一100条数据，以此类推.
    getReceipt(mustID: string, isReply: string, count: number = 0): Promise<NoticeReply> {
        let headers = new Headers({ 'Content-Type': 'application/json', "IDKEY": antlinker.idKey() });

        let options = new RequestOptions({ headers: headers });

        let url: string = "/app/must/receipt";
        let request = { "MustID": mustID, "IsReply": isReply, "Count": count };
        console.log(JSON.stringify(request));
        return this.http.post(url, request, options).toPromise().then(response => {
            var re = response.json().RE;
            if (re === 0) {
                console.log("getReceipt success");
                console.log(JSON.stringify(response.json().Data as NoticeReply));
                return response.json().Data as NoticeReply;
            }
            console.log("getReceipt failed");

            return null;
        })
    }

    getNoticeHtml(mustID: string): Promise<string> {
        let headers = new Headers({ 'Content-Type': 'application/json', "IDKEY": antlinker.idKey() });

        let options = new RequestOptions({ headers: headers });
        // https://test.antservercampus.link:8803/static/must/100000000384/100000000384.html
        let url: string = "/static/must/" + mustID + "/" + mustID + ".html";
        // console.log(url);
        return this.http.request(url, options).toPromise().then(response => {
            console.log(response.text().toString());
            return response.text().toString();
        });
    }

    markNoticeRead(mustID: string): Promise<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/json', "IDKEY": antlinker.idKey() });

        let options = new RequestOptions({ headers: headers });

        let url: string = "/app/must/reply";
        let request = { "MUSTID": mustID, "UID": antlinker.userId() };
        console.log(JSON.stringify(request));
        return this.http.post(url, request, options).toPromise().then(response => {
            return true;
        }).catch(error => {
            return false;
        });
    }

    remind(uid: string, mustId: string): Promise<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/json', "IDKEY": antlinker.idKey() });

        let options = new RequestOptions({ headers: headers });

        let url: string = "/app/must/remind";
        let request = { "MUSTID": mustId, "UID": uid };
        console.log(JSON.stringify(request));
        return this.http.post(url, request, options).toPromise().then(response => {
            return true;
        }).catch(error => {
            return false;
        });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    // private reorderStringList(idList: string[]): string[] {
    //     if (idList === null) {
    //         return [];
    //     }
    //     let tempNumberList: number[] = [];
    //     for (let i = 0; i < idList.length; ++i) {
    //         tempNumberList.push(parseInt(idList[i]))
    //     }
    //     tempNumberList.sort();
    //     let resultList: string[] = [];
    //     for (let i = tempNumberList.length - 1; i >=0 ; --i) {
    //         resultList.push(tempNumberList[i] + "")
    //     }
    //     console.log("resultList", resultList);
    //     return resultList;
    // }

    private reorderNoticeList(noticeList: Notice[]): Notice[] {
        if (noticeList === null) {
            return [];
        }
        return noticeList.sort(this.noticeCompare);
    }
    // 若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。
    private noticeCompare(a: Notice, b: Notice) {
        let aMustId: number = parseInt(a.MUSTID);
        let bMustId: number = parseInt(b.MUSTID);
        return bMustId - aMustId;
    }
    /* 共享的已选联系人 */
    getContacts() {

        return this.Contacts;
    }
    /* 共享的已选联系人 */
    getSelectedNum() {

        return this.SelectedNum;
    }
    getPersonContacts(){
        return this.Contacts.filter(ele=>{
            return !ele.roll
        })
    }
    setContacts(Contact) {

        this.Contacts.push(Contact);
        this.addContact.emit(Contact);
    }
    removeContact(Contact) {
        this.Contacts.forEach((ele,index)=>{
            if(ele.roll){
                if(ele.URID==Contact.URID){
                    this.Contacts.splice(index, 1);
                }

            }else {
                if(ele.BuID==Contact.BuID){
                    this.Contacts.splice(index, 1);
                }
            }
        })
        this.reduceContact.emit(Contact)
    }
    removeRollContact(Contact) {
        this.Contacts.forEach((ele,index)=>{
            if(ele.roll){
                if(ele.URID==Contact.URID){
                    this.Contacts.splice(index, 1);
                }

            }else {
                if(ele.BuID==Contact.BuID){
                    this.Contacts.splice(index, 1);
                }
            }
        })
        this.reduceRollContact.emit(Contact)
    }
    deleteContact(Contact){
        this.Contacts.forEach((ele,index)=>{
            if(ele.roll){
                if(ele.URID==Contact.URID){
                    this.Contacts.splice(index, 1);
                }

            }else {
                if(ele.BuID==Contact.BuID){
                    this.Contacts.splice(index, 1);
                }
            }
        })
    }
    removeContactAll() {
        this.Contacts.splice(0, this.Contacts.length);
        this.reduceContactAll.emit({ flag: true })
    }
    checkContactAll() {
        this.chekAll.emit({ flag: true })
    }
}

class DepartmentListPost {
    UID: string;
    UNIVERSITY: string;
}
