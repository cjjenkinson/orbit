import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import workspaces from './Workspaces/reducer';
import entries from './Entries/reducer';

export default combineReducers({
  workspaces,
  entries,

  router,
});
