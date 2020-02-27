import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

//组件
import { QuestionnaireComponent } from './questionnaire.component';
import { PreviewquestionnaireComponent } from './previewquestionnaire/previewquestionnaire.component';
import { QuestionanalysisComponent } from './questionanalysis/questionanalysis.component';
import { NoanswerlistComponent } from './noanswerlist/noanswerlist.component';
import { TextComponent } from "./questionanalysis/text.component";
import { NodoCampusComponent } from './nodocampus/nodocampus.component';
// import {AcademynodoComponent} from './academynodo/academynodo.component';
const routes: Routes = [

  { path: 'ques', component: QuestionnaireComponent },

  { path: 'academynoanswer/:id/:title/:sta', component: NodoCampusComponent },
  // { path: 'noanswerlist/:id/:title/:campus/:academy/:major/:grade/:class', component: NoanswerlistComponent },
  { path: 'noanswerlist', component: NoanswerlistComponent },
  // { path:'nodocampus',component:NodoCampusComponent},
  { path: 'analysis', component: QuestionanalysisComponent },
  { path: 'text', component:TextComponent},
  { path: 'prieview/:id/:status', component: PreviewquestionnaireComponent },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionnaireRoutingModule {
}

