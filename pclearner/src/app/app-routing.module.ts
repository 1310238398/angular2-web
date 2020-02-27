import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'staff',
    loadChildren: './staff/staff.module#StaffModule',
  },
  {
    path: 'student',
    loadChildren: './student/student.module#StudentModule',
  },
  {
    path: 'poolstudent',
    loadChildren: './poolstudent/poolstudent.module#PoolstudentModule',
  },
  {
    path: 'classinfo',
    loadChildren: './classinfo/classinfo.module#ClassInfoModule',
  },
  {
    path: 'studentchangeclass',
    loadChildren: './studentchangeclass/studentchangeclass.module#StudentChangeClassModule',
  },
  {
    path: 'qingjia',
    loadChildren: './qingjia/qingjia.module#QingjiaModule',
  },
  {
    path: 'classchange',
    loadChildren: './classchange/classchange.module#ClasschangeModule',
  },
  {
    path: 'questionnaire',
    loadChildren: './questionnaire/questionnaire.module#QuestionnaireModule',
  },
  {
    path: 'questionnairemanage',
    loadChildren: './questionnairemanage/questionnairemanage.module#QuestionnairemanageModule',
  },
  {
    path: 'leaveschool',
    loadChildren: './leaveschool/leaveschool.module#LeaveschoolModule',
  },
  {
    path: 'apartmentsearch',
    loadChildren: './apartment/apartmentsearch/apartment.module#ApartmentSearchModule',
  },
  {
    path: 'dormitorymanage',
    loadChildren: './apartment/dormitorymanage/dormitorymanage.module#DormitorymanageModule',
  },
  {
    path: 'dormitorycheck',
    loadChildren: './apartment/dormitorycheck/dormitorycheck.module#DormitorycheckModule'
  },
  {
    path: 'dormitorydistribut',
    loadChildren: './apartment/dormitorydistribut/dormitorydistribut.module#DormitorydistributModule'
  },
  {
    path: 'dormitoryretreat',
    loadChildren: './apartment/dormitoryretreat/dormitoryretreat.module#DormitoryretreatModule'
  },
  {
    path: 'dormitoryadjust',
    loadChildren: './apartment/dormitoryadjust/dormitoryadjust.module#DormitoryadjustModule'
  },
  {
    path: 'dormitorydata',
    loadChildren: './apartment/dormitorydatasearch/dormitorydata.module#DormitoryDataModule',
  },
  {
    path: 'upfilestaff',
    loadChildren: './upfile/upfile.module#UpfileModule'
  },
  {
    path: 'poverty',
    loadChildren: './povertystudent/povertystudent.module#PovertyStudentModule'
  },
  {
    path: 'waitdecide',
    loadChildren: './waitdecide/waitdecide.module#WaitDecideModule'
  },
  {
    path: 'information',
    loadChildren: './information/information.module#InforMationModule'
  },
  {
    path: 'campusfunc',
    loadChildren: './campus-func/campus-func.module#CampusFuncModule'
  },
  {
    path: 'counselormanage',
    loadChildren: './counselormanage/counselormanage.module#CounselorManageModule'
  },
  {
    path: 'counselormanagecheck',
    loadChildren: './counselormanagecheck/counselormanagecheck.module#CounselorManageCheckModule'
  },
  {
    path: 'notice',
    loadChildren: './notice/notice.module#NoticeModule'
  },
  {
    path: 'activity',
    loadChildren: './activity/activity.module#ActivityModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
