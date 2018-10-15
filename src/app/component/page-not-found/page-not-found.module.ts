import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [PageNotFoundComponent]
})
export class PageNotFoundModule { }
