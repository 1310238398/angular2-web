import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
// import { SplashScreen } from '@ionic-native/splash-screen';
// import { StatusBar } from '@ionic-native/status-bar';
import { SignaturePadModule } from 'angular2-signaturepad';
// import { ScreenOrientation } from '@ionic-native/screen-orientation';

// Import Froala Editor.
import "froala-editor/js/froala_editor.pkgd.min.js";

// Import Angular2 plugin.
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

// nav page
import { NavPage } from '../pages/navPage';

// teacher
import { MyApp } from './app.component';
import { PromiseListPage } from '../pages/teacher/promise-list';
import { NewPage } from '../pages/teacher/new';
import { PreviewPage } from '../pages/teacher/preview';
import { TplPage } from '../pages/teacher/tpl';
import { TplDetailPage } from '../pages/teacher/tpl-detail';
import { PromiseDetailPage } from '../pages/teacher/promise-detail';
import { ProgressPage } from '../pages/teacher/progress';
// import { ＷorkerClassResultPage } from '../pages/teacher/worker-class-result';
import { MajorPage } from '../pages/teacher/non-worker-major';
import { ClassPage } from '../pages/teacher/non-worker-class';
import { StudentsPage } from '../pages/teacher/students';
import { NoSignAcademyPage } from '../pages/teacher/nosign-academy';
import { NoSignMajorPage } from '../pages/teacher/nosign-major';
import { NoSignClassPage } from '../pages/teacher/nosign-class';
import { NoSignPage } from '../pages/teacher/no-sign';

// student
import { StuListPage } from '../pages/student/list';
import { StuDetailPage } from '../pages/student/detail';
import { StuSignPage } from '../pages/student/sign';

import { HttpService } from '../pages/http/http.service';
import { PromiseService } from '../pages/promise.servise';

import { DateFormatPipe } from '../pages/pipe/date-format.pipe';

@NgModule({
  declarations: [
    MyApp,
    DateFormatPipe,
    NavPage,
    PromiseListPage,
    NewPage,
    TplPage,
    TplDetailPage,
    PromiseDetailPage,
    ProgressPage,
    PreviewPage,
    MajorPage,
    ClassPage,
    StudentsPage,
    NoSignAcademyPage,
    NoSignMajorPage,
    NoSignClassPage,
    NoSignPage,
    StuListPage,
    StuDetailPage,
    StuSignPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SignaturePadModule,
    // ScreenOrientation,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition'
    }, {
        links:
        [
          { component: PromiseListPage, name: 'PromiseListPage', segment: 'promiseListPage', defaultHistory: [] },
          { component: NewPage, name: 'NewPage', segment: 'newPage', defaultHistory: [] },
          // { component: PreviewPage, name: 'PreviewPage', segment: 'previewPage/:book', defaultHistory: [NewPage] },
          { component: PromiseDetailPage, name: 'ProDetailPage', segment: 'ProDetailPage/:id', defaultHistory: [] },
          { component: TplPage, name: 'TplPage', segment: 'tplPage', defaultHistory: [] },
          { component: TplDetailPage, name: 'TplDetailPage', segment: 'tplDetailPage/:id', defaultHistory: [] },
          { component: ProgressPage, name: 'ProgressPage', segment: 'progressPage/:id/:action', defaultHistory: [] },
          { component: NoSignPage, name: 'NoSignPage', segment: 'noSignPage/:commitid', defaultHistory: [] },
          { component: StudentsPage, name: 'StudentsPage', segment: 'studentsPage/:commitid/:classid/:classname/:status', defaultHistory: [] },
          { component: MajorPage, name: 'MajorPage', segment: 'majorPage/:commitid/:academyid/:academyname', defaultHistory: [] },
          { component: ClassPage, name: 'ClassPage', segment: 'classPage/:commitid/:majorid/:majorname', defaultHistory: [] },
          { component: NoSignAcademyPage, name: 'NoSignAcademyPage', segment: 'noSignAcademyPage/:commitid', defaultHistory: [] },
          { component: NoSignMajorPage, name: 'NoSignMajorPage', segment: 'noSignMajorPage/:commitid/:academyid/:academyname', defaultHistory: [] },
          { component: NoSignClassPage, name: 'NoSignClassPage', segment: 'noSignClassPage/:commitid/:majorid/:majorname', defaultHistory: [] },
          // { component: StuListPage, name: 'StuListPage', segment: '' },
          { component: StuDetailPage, name: 'StuDetailPage', segment: 'stuDetailPage/:commitid', defaultHistory: [StuListPage] },
          // { component: StuSignPage, name: 'StuSignPage', segment: 'stuSignPage/:commitid', defaultHistory: [StuListPage] },
        ]
      })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NavPage,
    PromiseListPage,
    NewPage,
    TplPage,
    TplDetailPage,
    PromiseDetailPage,
    ProgressPage,
    PreviewPage,
    MajorPage,
    ClassPage,
    StudentsPage,
    NoSignAcademyPage,
    NoSignMajorPage,
    NoSignClassPage,
    NoSignPage,
    StuListPage,
    StuDetailPage,
    StuSignPage
  ],
  providers: [
    HttpService,
    PromiseService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
