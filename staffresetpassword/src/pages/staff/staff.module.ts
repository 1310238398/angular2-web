import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaffPage } from './staff';
import { HelpUtils } from '../../app/utils/HelpUtils';

@NgModule({
    declarations: [
        StaffPage
    ],
    imports: [
        IonicPageModule.forChild(StaffPage)
    ],
    entryComponents: [
        StaffPage
    ],
    providers: [HelpUtils]
})
export class StaffModule { }
