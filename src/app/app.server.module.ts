/// <reference types="node" />

import {NgModule, NgModuleFactory, NgModuleFactoryLoader} from '@angular/core';
import {ServerModule} from '@angular/platform-server';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';

import {Observable} from 'rxjs/Observable';

import {AppModule, AppComponent} from './app.module';

export class ServerFactoryLoader extends NgModuleFactoryLoader {
  load(path: string): Promise<NgModuleFactory<any>> {
    return new Promise((resolve, reject) => {
      const [file, className] = path.split('#');
      const classes = require('../../dist/ngfactory/src/app' + file.slice(1) + '.ngfactory');
      resolve(classes[className + 'NgFactory']);
    });
  }
}

const fs = require('fs');

export class TranslateUniversalLoader implements TranslateLoader {
  public getTranslation(lang: string): Observable<any> {
    return Observable.create(observer => {

      const file = `dist/assets/i18n/${lang}.json`;
      let content = '';

      if (!fs.existsSync(file)) {
        console.log(`Localization file '${file}' not found!`);
      } else {
        content = JSON.parse(fs.readFileSync(file, 'utf8'))
      }

      observer.next(content);

      observer.complete();
    });
  }
}

@NgModule({
  imports: [
    ServerModule,
    AppModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateUniversalLoader
      }
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: NgModuleFactoryLoader, useClass: ServerFactoryLoader}
  ]
})
export class AppServerModule {}
