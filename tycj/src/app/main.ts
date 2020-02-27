import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
/**
 * Created by hanzhendong on 2017/3/15.
 */
import {AppModule} from './app.module';
import {enableProdMode} from "@angular/core";
enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
