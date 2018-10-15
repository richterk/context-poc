import { AppContext } from './context.model';
import {
  CONTEXT_CHANGE_SAVED,
  ContextChangeAction,
  CONTEXT_CHANGE_VALUE,
  CONTEXT_SET_APP_CONTEXT,
  ContextSetAppContext,
  ContextChangeSaved
} from './context.action';
import { ActionReducer } from '@ngrx/store';

export function contextReducer(
  state: any = { appContext: undefined },
  action: (ContextChangeAction |
          ContextChangeSaved |
          ContextSetAppContext)) {
  switch (action.type) {

    case CONTEXT_CHANGE_VALUE:
      const castAction = <ContextChangeAction>action;           // determine the action type

      const appContext = { ...state.appContext };               // Create a new object

      appContext[castAction.key] = castAction.value;            // Set our new value (can't do this as part of
                                                                // spread)

      return new AppContext(appContext);

    case CONTEXT_SET_APP_CONTEXT:
      const setContextAction = <ContextSetAppContext>action;

      const newAppContext = { ...state.appContext, ...setContextAction.appContext };

      return newAppContext;

    case CONTEXT_CHANGE_SAVED:
      return state;
    default:
      return state;
  }
}
