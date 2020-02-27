import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { CommonService } from "../service/common.service";
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from "@angular/router";

// 组件
import { QuestionnaireComponent } from './questionnaire.component';
import { PreviewquestionnaireComponent } from './previewquestionnaire/previewquestionnaire.component';
import { QuestionanalysisComponent } from './questionanalysis/questionanalysis.component';
import { NoanswerlistComponent } from './noanswerlist/noanswerlist.component';
import { TextComponent } from './questionanalysis/text.component';
import { NodoCampusComponent } from './nodocampus/nodocampus.component';

// 路由
import { QuestionnaireRoutingModule } from './questionnaire.routing.module';

@NgModule({
  imports: [
    QuestionnaireRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule,

  ],
  declarations: [
    QuestionnaireComponent,
    PreviewquestionnaireComponent,
    QuestionanalysisComponent,
    NoanswerlistComponent,
    TextComponent,
    NodoCampusComponent,
  
  ],

  exports: [RouterModule],
  providers: [CommonService]
})
export class QuestionnaireModule { }
