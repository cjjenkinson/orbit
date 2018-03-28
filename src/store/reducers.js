import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import alert from './Alert/reducer';
import auth from './Auth/reducer';
import workspaces from './Workspaces/reducer';
import entries from './Entries/reducer';

export default combineReducers({
  alert,
  auth,
  workspaces,
  entries,

  router,
});
