import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../pipe/pipe.module';
import { WorkerTaskListPage } from './task-list';

@NgModule({
    declarations: [
        WorkerTaskListPage
    ],
    imports: [
        PipesModule,
        IonicPageModule.forChild(WorkerTaskListPage)
    ],
    entryComponents: [
        WorkerTaskListPage
    ]
})
export class TaskListModule { }
