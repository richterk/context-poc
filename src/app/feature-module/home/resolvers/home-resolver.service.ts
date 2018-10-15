import { ContextChangeAction, ContextSetAppContext } from './../../../store/context/context.action';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AppContext } from '../../../store/context/context.model';

@Injectable({
  providedIn: 'root'
})
export class HomeResolverService implements Resolve<any> {

  constructor(private store: Store<any>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const householdId = route.queryParams['householdId'] || route.params['householdId'];
    const contactId = route.queryParams['contactId'] || route.params['contactId'];
    const accountId = route.queryParams['accountId'] || route.params['accountId'];

    const newAppContext = new AppContext({householdId, contactId, accountId});

    this.store.dispatch(new ContextSetAppContext(newAppContext));

    return new Promise((resolve) => resolve());
  }
}
