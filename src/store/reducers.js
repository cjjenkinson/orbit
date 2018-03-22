import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import auth from './Auth/reducer';
import workspaces from './Workspaces/reducer';
import entries from './Entries/reducer';

export default combineReducers({
  auth,
  workspaces,
  entries,

  router,
});
