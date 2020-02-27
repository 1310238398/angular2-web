import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../pipe/pipe.module';

import { WorkerTaskDetailPage } from './worker-task-detail';
import { HelpUtils } from '../../app/utils/HelpUtils';


@NgModule({
    declarations: [
        WorkerTaskDetailPage
    ],
    imports: [
        PipesModule,
        IonicPageModule.forChild(WorkerTaskDetailPage)
    ],
    entryComponents: [
        WorkerTaskDetailPage
    ],
    providers: [HelpUtils]
})
export class WorkerTaskDetailModule { }
