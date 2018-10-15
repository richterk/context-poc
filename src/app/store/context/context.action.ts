import { AppContext } from './context.model';
import { Action } from '@ngrx/store';

export const CONTEXT_PREFIX = '@@context';
export const CONTEXT_SET_APP_CONTEXT = `${CONTEXT_PREFIX}/SET_APP_CONTEXT`;
export const CONTEXT_CHANGE_VALUE = `${CONTEXT_PREFIX}/CHANGE_VALUE`;
export const CONTEXT_CHANGE_SAVED = `${CONTEXT_PREFIX}/CHANGE_SAVED`;

export class ContextChangeAction implements Action {
  public type = CONTEXT_CHANGE_VALUE;
  public isAppContextCurrent = false;

  constructor(public key: string, public value: string | number) {}
}

export class ContextSetAppContext implements Action {
  public type = CONTEXT_SET_APP_CONTEXT;

  constructor(public appContext: AppContext) {}
}

export class ContextChangeSaved implements Action {
  public type = CONTEXT_CHANGE_SAVED;
  public isAppContextCurrent = true;

  constructor() {}
}
