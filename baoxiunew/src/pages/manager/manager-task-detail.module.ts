import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../pipe/pipe.module';

import { ManagerTaskDetailPage } from './manager-task-detail';
import { HelpUtils } from '../../app/utils/HelpUtils';


@NgModule({
    declarations: [
        ManagerTaskDetailPage
    ],
    imports: [
        PipesModule,
        IonicPageModule.forChild(ManagerTaskDetailPage)
    ],
    entryComponents: [
        ManagerTaskDetailPage
    ],
    providers: [HelpUtils]
})
export class ManagerTaskDetailModule { }
