import {NgModule} from '@angular/core';

import {QuestionnairemanageRoutingModule} from './questionnairemanage-routing.module';
import {ListComponent} from './list/list.component';
import {SharedModule} from "../shared/shared.module";
import {EditComponent} from './edit/edit.component';
import { ImportComponent } from './import/import.component';
import {NgxTinymceModule} from "ngx-tinymce";

const COMPOMENTS = [EditComponent];

@NgModule({
  imports: [
    SharedModule,
    NgxTinymceModule.forRoot({
      baseURL: 'assets/lib/tinymce/'
    }),
    QuestionnairemanageRoutingModule
  ],
  declarations: [ListComponent, EditComponent, ImportComponent],
  entryComponents: [COMPOMENTS]
})
export class QuestionnairemanageModule {
}
