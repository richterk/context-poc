import { AppContext } from './context.model';
import { createSelector } from 'reselect';

export const getAppContext = (state) => {
  return ((state.appContext) ? state.appContext : undefined);
};

export const getHouseholdId = createSelector(
  getAppContext,
  (appContext: AppContext) => {
    return ((appContext) ? appContext.householdId : null);
  }
);

export const getContactId = createSelector(
  getAppContext,
  (appContext: AppContext) => {
    return ((appContext) ? appContext.contactId : null );
  }
)
