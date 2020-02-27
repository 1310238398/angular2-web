import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentPage } from './student';
import { HelpUtils } from '../../app/utils/HelpUtils';

@NgModule({
    declarations: [
        StudentPage
    ],
    imports: [
        IonicPageModule.forChild(StudentPage)
    ],
    entryComponents: [
        StudentPage
    ],
    providers: [HelpUtils]
})
export class StudentModule { }
