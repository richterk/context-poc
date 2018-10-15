import { HomeResolverService } from './feature-module/home/resolvers/home-resolver.service';
import { HomeRoutingComponent } from './component/home/home.routing.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { PageNotFoundModule } from './component/page-not-found/page-not-found.module';
import { HomeRoutingModule } from './component/home/home.routing.module';
import { contextReducer } from './store/context/context.reducer';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const appRoutes: Routes = [
  {
    path: 'clientprospects/household/:householdId/dashboard',
    component: HomeRoutingComponent,
    runGuardsAndResolvers: 'always',
    resolve: { 'hhdata': HomeResolverService }
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HomeRoutingModule,
    PageNotFoundModule,
    StoreModule.forRoot({ appContext: contextReducer}),
    StoreDevtoolsModule.instrument(),
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
