import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassPage } from './class';
import { HelpUtils } from '../../../app/utils/HelpUtils';

@NgModule({
    declarations: [
        ClassPage
    ],
    imports: [
        IonicPageModule.forChild(ClassPage)
    ],
    entryComponents: [
        ClassPage
    ],
    providers:[HelpUtils]
})
export class ClassModule { }
