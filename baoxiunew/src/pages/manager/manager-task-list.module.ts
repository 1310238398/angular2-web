import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../pipe/pipe.module';

import { ManagerTaskListPage } from './manager-task-list';

@NgModule({
    declarations: [
        ManagerTaskListPage
    ],
    imports: [
        PipesModule,
        IonicPageModule.forChild(ManagerTaskListPage)
    ],
    entryComponents: [
        ManagerTaskListPage
    ]
})
export class ManagerTaskListModule { }
