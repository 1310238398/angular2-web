import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

//组件
import { LeaveschoolComponent } from './leaveschool.component';




const routes: Routes = [
    // {path: '',component: ClassinfoListComponent},
    {
        path: '', component: LeaveschoolComponent,
    },





];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LeaveScoolRoutingModule {
}


