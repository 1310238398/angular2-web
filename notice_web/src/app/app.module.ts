import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {HttpModule} from "@angular/http";
// import {InMemoryWebApiModule} from "angular2-in-memory-web-api";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

import {MyApp} from './app.component';

import {AddEditNotice} from '../pages/add-edit-notice/add-edit-notice';


import {NoticeMain} from '../pages/notice-main/notice-main';
import {NoticesListComponent} from '../pages/notice-list/notice-list.component';
import {NoticeService} from '../pages/Notice.service';
import {NoticeDetail} from '../pages/notice-detail/notice-detail';
import {NoticesPubList} from '../pages/notice-pub-list/notice-pub-list';
import {NoticeHtml} from '../pages/notice-html/notice-html';

import {NoticePubDetail} from '../pages/notice-pub-detail/notice-pub-detail';
import {SimpleTinyComponent} from '../pages/tinymce/tiny-component';
import {ModifyNotice} from '../pages/modify-notice/modify-notice';
import {NoticePreview} from '../pages/notice-preview/notice-preview';
import {NewGroup} from '../pages/new-group/new-group';
import {NumToStrPipe} from "../utility/NumberToString";
import {ReadUnreadMain} from '../pages/read-unread-main/read-unread-main';
import {ReadList} from '../pages/read-list/read-list';
import {UnreadList} from '../pages/unread-list/unread-list';
import {FileSizePipe} from "../utility/FileSizePipe";
import {FileNameToUrlPipe} from "../utility/FileNameToUrlPipe";
import {SanitizeHtmlPipe} from "../utility/SanitizeHtmlPipe";
import {DatePickerComponent} from "../pages/date-picker/date-picker.component";
import {StateFilterPipe} from '../pages/new-group/state-filter';
import {HelpUtils} from "../app/utils/HelpUtils";
import {HttpService} from "../http/http.Service";
import {PersonList} from "../pages/add-edit-notice/person-list/PersonList";
import {DepartmentList} from "../pages/add-edit-notice/person-list/org/Department";
import {GroupList} from "../pages/add-edit-notice/person-list/group/Group";
import {FriendList} from "../pages/add-edit-notice/person-list/friend/Friend";
import {RollPage} from "../pages/add-edit-notice/roll-list/roll";
import {KeywordPipe} from "../app/pipe/keyword.pipe";
import {PersonPipePipe} from "./pipe/person.pipe";
// import {Pipe, PipeTransform} from "@angular2/core";

//import { AddEditNotice } from '../pages/add-edit-notice/add-edit-notice';
//import { FroalaEditorDirective, FroalaViewDirective } from '../assets/lib/froala.directives';

@NgModule({

    declarations: [
        MyApp,

        AddEditNotice,
        RollPage,
        PersonList,
        DepartmentList,
        GroupList,
        FriendList,

        NoticeMain,
        NoticesListComponent,
        NoticeDetail,
        NoticesPubList,
        NoticePubDetail,
        SimpleTinyComponent,
        ModifyNotice,
        NoticePreview,
        NumToStrPipe,
        NewGroup,
        ReadUnreadMain,
        ReadList,
        UnreadList,
        FileSizePipe,
        FileNameToUrlPipe,
        NoticeHtml,
        SanitizeHtmlPipe,
        DatePickerComponent,
        StateFilterPipe,
        KeywordPipe,
        PersonPipePipe
        //FroalaEditorDirective,
        //FroalaViewDirective

    ],
    imports: [
        IonicModule.forRoot(MyApp, {}, {
            links: [
                {component: NoticeMain, name: 'NoticeMain', segment: 'NoticeMain'}

            ]
        }),
        HttpModule,
        // InMemoryWebApiModule.forRoot(InMemoryDataService),
        // InMemoryWebApiModule.forRoot(InMemoryData2Service),
        BrowserModule,
        FormsModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,

        AddEditNotice,
        RollPage,
        PersonList,
        DepartmentList,
        GroupList,
        FriendList,

        NoticeMain,
        NoticesListComponent,
        NoticeDetail,
        NoticePubDetail,
        NoticesPubList,
        SimpleTinyComponent,
        ModifyNotice,
        NoticePreview,
        NewGroup,
        ReadUnreadMain,
        ReadList,
        UnreadList,
        NoticeHtml
        //FroalaEditorDirective,
        //FroalaViewDirective


    ],
    providers: [
        NoticeService, HelpUtils, HttpService
    ]
})
export class AppModule {
}
