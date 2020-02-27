import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';
import { SelectSearchableModule } from 'ionic-select-searchable';
// import { SelectSearchableComponent } from 'ionic-select-searchable';
// import {SelectSearchablePageComponent} from 'ionic-select-searchable';

import { BaoXiuPage } from './baoxiu';
import { HelpUtils } from '../../app/utils/HelpUtils';


@NgModule({
    declarations: [
        BaoXiuPage,
        // SelectSearchableComponent
        // SelectSearchablePageComponent
    ],
    imports: [
        IonicPageModule.forChild(BaoXiuPage),
        SelectSearchableModule
    ],
    entryComponents: [
        BaoXiuPage,
        // SelectSearchableComponent
        // SelectSearchablePageComponent
    ],
    providers: [HelpUtils],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class BaoXiuModule { }
