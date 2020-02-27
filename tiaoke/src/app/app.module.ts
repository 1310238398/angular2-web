import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from "@angular/http";
import { HelpUtils } from "./utils/HelpUtils";
import { HttpService } from "../http/http.Service";
import { ListPage } from "../pages/apply/List";
import { AddLessonPage } from "../pages/apply/AddLesson";
import { AddModalContentPage } from "../pages/apply/AddLesson";
import { EditLessonPage } from "../pages/apply/EditLesson";
import { EditModalContentPage } from "../pages/apply/EditLesson";
import { ImperfectPage } from "../pages/apply/Imperfect";
import { ViewLessonPage } from "../pages/apply/ViewLesson";

import { WaitListPage } from "../pages/examine/List";
import { ApprovalPage } from "../pages/examine/Approval";
import { ReasonPage } from "../pages/examine/Reason";
import { ViewApprovalPage } from "../pages/examine/ViewApproval";

import { NoticeListPage } from "../pages/notice/List";
import { ViewNoticePage } from "../pages/notice/ViewNotice";
import { MenuPage } from "../pages/Menu";
import { NoPage } from "../pages/NoPage";

import { FormsModule } from "@angular/forms";
import { OptData } from "./service/OptData";
import { ColData } from "./service/ColData";
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
    declarations: [
        MyApp,
        ListPage,
        AddLessonPage,
        AddModalContentPage,
        EditLessonPage,
        EditModalContentPage,
        ImperfectPage,
        ViewLessonPage,
        WaitListPage,
        ApprovalPage,
        ReasonPage,
        ViewApprovalPage,
        NoticeListPage,
        ViewNoticePage,
        MenuPage,
        NoPage
    ],
    imports: [
        HttpModule,
        FormsModule,
        BrowserModule,
        IonicModule.forRoot(MyApp, {
            mode: 'ios',
            iconMode: 'ios',
            modalEnter: 'modal-slide-in',
            modalLeave: 'modal-slide-out',
            tabsPlacement: 'bottom',
            pageTransition: 'ios'
        }, {
            links: [
                {component: NoPage, name: 'noPage', segment: 'noPage'},//无调课权限页面
                {component: MenuPage, name: 'menuPage', segment: 'menuPage'},//菜单页面
                {component: ListPage, name: 'applyList', segment: 'applyList', defaultHistory: []},//调课申请列表
                {component: AddLessonPage, name: 'addLessonPage', segment: 'addLessonPage'},//调课申请
                {component: EditLessonPage, name: 'editLessonPage', segment: 'editLessonPage/:rid'},//编辑调课申请
                {component: ImperfectPage, name: 'imperfectPage', segment: 'imperfectPage'},//审批完成后待完善页面
                {component: ViewLessonPage, name: 'viewLessonPage', segment: 'viewLessonPage/:rid'},//查看调课申请
                {component: WaitListPage, name: 'waitList', segment: 'waitList'},//要审批的调课列表
                {component: ApprovalPage, name: 'approvalPage', segment: 'approvalPage/:rid'},//审批页面
                {component: ReasonPage, name: 'reasonPage', segment: 'reasonPage/:rid'},//审批原因输入框
                {component: ViewApprovalPage, name: 'viewApprovalPage', segment: 'viewApprovalPage/:rid'},//审批后查看详情页面
                {component: NoticeListPage, name: 'noticeList', segment: 'noticeList'},//调课消息推送列表
                {component: ViewNoticePage, name: 'viewNoticePage', segment: 'viewNoticePage'},//查看调课

            ]
        }),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        ListPage,
        AddLessonPage,
        AddModalContentPage,
        EditLessonPage,
        EditModalContentPage,
        ImperfectPage,
        ViewLessonPage,
        WaitListPage,
        ApprovalPage,
        ReasonPage,
        ViewApprovalPage,
        NoticeListPage,
        ViewNoticePage,
        MenuPage,
        NoPage
    ],
    providers: [HttpService, HelpUtils, OptData,ColData, {
        provide: ErrorHandler,
        useClass: IonicErrorHandler
    }]
})
export class AppModule {
}
