import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Http, HttpModule } from '@angular/http';

import {TranslateModule, TranslateLoader, MissingTranslationHandler, MissingTranslationHandlerParams} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';

export { AppComponent };


export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}

export class DefaultMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    return 'missing translation for key: ' + params.key;
  }
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: DefaultMissingTranslationHandler
      }
    }),
    BrowserModule.withServerTransition({ appId: 'cli-universal-demo' }),
    RouterModule.forRoot([
      { path: '', loadChildren: './home/home.module#HomeModule' },
      { path: 'about', loadChildren: './about/about.module#AboutModule' },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ])
  ],
  exports: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
