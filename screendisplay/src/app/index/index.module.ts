import {NgModule} from '@angular/core';
import {IndexComponent} from './index.component';
import {SharedModule} from '../shared/shared.module';
import { IndexRoutes } from 'src/app/index/index.routing';

const components = [];

@NgModule({
  imports: [
    SharedModule,
    IndexRoutes
  ],
  declarations: [IndexComponent, ...components
],
  entryComponents: [...components],
  providers: [],
})
export class IndexModule {
}
