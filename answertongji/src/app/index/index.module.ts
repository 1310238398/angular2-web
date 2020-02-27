import {NgModule} from '@angular/core';
import {IndexComponent} from './index.component';
import {SharedModule} from '../shared/shared.module';
import { IndexRoutes } from 'src/app/index/index.routing';
import {GradepercentPipe, StringTimePipe} from '../pipe/gradepercent.pipe';

const components = [];

@NgModule({
  imports: [
    SharedModule,
    IndexRoutes
  ],
  declarations: [ StringTimePipe,GradepercentPipe, IndexComponent, ...components
],
  entryComponents: [...components],
  providers: [],
})
export class IndexModule {
}
