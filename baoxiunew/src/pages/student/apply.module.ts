import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../pipe/pipe.module';

import { ApplyPage } from './apply';

@NgModule({
    declarations: [
        ApplyPage
    ],
    imports: [
        PipesModule,
        IonicPageModule.forChild(ApplyPage)
    ],
    entryComponents: [
        ApplyPage
    ]
})
export class ApplyModule { }
