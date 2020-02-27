import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DormitorydataComponent } from './dormitorydata/dormitorydata.component';
import { DataDetailComponent } from './datadetail/datadetail.component';


const routes: Routes = [
    { path: '', component: DormitorydataComponent },
    { path: 'details', component: DataDetailComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DormitoryDataRoutingRoutingModule {
}