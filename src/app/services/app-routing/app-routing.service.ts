import { getAppContext } from './../../store/context/context.selectors';
import { Store } from '@ngrx/store';
import { AppContext } from './../../store/context/context.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Pages } from './app-routing-paths.const';

@Injectable({
  providedIn: 'root'
})
export class AppRoutingService {

  constructor(private store: Store<any>, private router: Router) { }

  /**
   * This function will take an AppContext and formulate a route based on business logic.  Namely,
   * if the householdId has changed, it will create a segment group for sending the user to the dashboard.
   * Otherwise, it will maintain the current route and append AppContext changes to the query string.
   * @param appContext: AppContext
   */
  public GetRoute(
    requestedResource: string,
    newAppContext: AppContext,
    oldAppContext: AppContext)
  : { segments: Array<string>, queryParams: object} {
    let newSegmentGroup = [];
    let newQueryParams = {};

    if (newAppContext.householdId === oldAppContext.householdId) {
      // Don't change the base route.  Household id hasn't changed.
      switch (requestedResource) {
        case Pages.DASHBOARD:
          newSegmentGroup = ['clientprospects', 'household', newAppContext.householdId, Pages.DASHBOARD];
          newQueryParams = { 'contactId': newAppContext.contactId, 'accountId': newAppContext.accountId };
        break;
        case Pages.PEOPLE:
          newSegmentGroup = [
            'clientprospects',
            Pages.PEOPLE,
            newAppContext.householdId || newAppContext.contactId,
            newAppContext.contactId
          ];
          newQueryParams = { 'accountId': newAppContext.accountId };
        break;
        case Pages.ACCOUNT:
          newSegmentGroup = ['clientprospects', 'account', newAppContext.householdId, newAppContext.accountId];
          newQueryParams = { 'contactId': newAppContext.contactId };
        break;
        default:
          // Retrieve the route segments, because if a resource wasn't provided, we want to use
          // the one we're on.
          const currentResource = this.router.url.split('/')[2];

          newSegmentGroup.push(currentResource);

          switch (currentResource) {
            case 'household':
              newSegmentGroup = ['clientprospects', currentResource, newAppContext.householdId, Pages.DASHBOARD];
              newQueryParams = { 'contactId': newAppContext.contactId, 'accountId': newAppContext.accountId };
            break;
            case Pages.PEOPLE:
              newSegmentGroup = ['clientprospects', currentResource, newAppContext.householdId, Pages.PEOPLE, newAppContext.contactId];
              newQueryParams = { 'accountId': newAppContext.accountId };
            break;
          }
      }
    } else {
      // This is going to redirect back to the dashboard page.  The household has changed.
      newSegmentGroup.push('clientprospects');
      newSegmentGroup.push('household');
      newSegmentGroup.push(newAppContext.householdId);
      newSegmentGroup.push('dashboard');
      newQueryParams['accountId'] = newAppContext.accountId;
      newQueryParams['contactId'] = newAppContext.contactId;
    }

    return { segments: newSegmentGroup, queryParams: newQueryParams };
  }

  /**
   * This function will take the segment group, and perform application routing based on business logic.
   *
   * If we are not in a deferred state, the application will be navigated as normal.  If we are in a deferred
   * state, the this will wait for the application to leave the deferred state and only then perform the
   * navigation
   * @param segments: Array<string>
   * @param queryString: Object { key, value }
   */
  public Navigate(segments: Array<string>, queryString: object) {
    this.router.navigate(segments, { queryParams: queryString});
  }
}
