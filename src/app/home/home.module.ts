import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {TranslateModule} from '@ngx-translate/core';

import {HomePageComponent} from './home-page/home-page.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    RouterModule.forChild([
      {path: '', component: HomePageComponent, pathMatch: 'full'}
    ])
  ],
  declarations: [HomePageComponent]
})
export class HomeModule {}
