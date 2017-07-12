import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _router: Router, private _meta: Meta, private _title: Title, translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    const lang: string = translate.getBrowserLang();

    translate.use(lang);
  }

  ngOnInit() {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        switch (event.urlAfterRedirects) {
          case '/':
            this._title.setTitle('Home Page');
            this._meta.updateTag({name: 'description', content: 'Home Page Description'});
            break;
          case '/about':
            this._title.setTitle('About Page');
            this._meta.updateTag({name: 'description', content: 'About Page Description'});
            break;
        }
      }
    });
  }
}
