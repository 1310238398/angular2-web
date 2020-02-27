
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

//组件
import { DormitorymanageComponent } from './dormitorymanage.component';
const routes: Routes = [
  { path: '', component: DormitorymanageComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DormitorymanageRoutingModule {
}
