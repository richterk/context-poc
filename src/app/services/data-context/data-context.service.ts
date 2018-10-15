import { Store } from '@ngrx/store';
import { getAppContext } from './../../store/context/context.selectors';
import { AppRoutingService } from './../app-routing/app-routing.service';
import { AppContext } from './../../store/context/context.model';
import { Injectable } from '@angular/core';

/**
 * This is a mock of the DataContextService, using this.appContext to simulate SS context and what providers do.
 */
@Injectable({
  providedIn: 'root'
})
export class DataContextService {

  private appContext: any = { householdId: undefined, contactId: undefined, accountId: undefined };

  constructor (private store: Store<AppContext>, private appRoutingService: AppRoutingService) {
    this.store.select(getAppContext).subscribe( appContext => this.appContext = appContext);
  }

  /**
   * Get is a function which represents the interaction to Thomson
   */
  Get(key: string) {
    return this.appContext[key];
  }

  /**
   * Set is a function to symbolize setting something to thomson
   */
  Set(key: string, value: any) {
    const oldAppContext: AppContext = this.appContext;
    this.appContext[key] = value;

    // We aren't requesting a specific resource here, we're just setting context
    const route = this.appRoutingService.GetRoute(null, this.appContext, oldAppContext);
    this.appRoutingService.Navigate(route.segments, route.queryParams);
  }

  SetFull(appContext: AppContext) {
    const oldAppContext: AppContext = this.appContext;
    this.appContext = new AppContext({
      householdId: appContext.householdId,
      accountId: appContext.accountId,
      contactId: appContext.contactId
    });

    const route = this.appRoutingService.GetRoute(null, this.appContext, oldAppContext);

    this.appRoutingService.Navigate(route.segments, route.queryParams);
  }
}
