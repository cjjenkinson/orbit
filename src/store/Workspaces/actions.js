import * as types from './actionTypes';
import * as utils from '../utils';

import workspaceService from '../../services/workspaces';

// intantiate the Workspace service
const WorkspaceService = workspaceService();

/** Workspaces Actions */

export const getWorkspaces = () => async dispatch => {
  try {
    dispatch({ type: types.WORKSPACES_FETCHED });

    const data = await WorkspaceService.fetchWorkspaces();

    if (!data) {
      throw new Error('Workspaces fetch request failed');
    }

    const { workspaces } = data;

    // normalise workspaces
    const workspacesById = utils.keyById(workspaces, 'id');
    dispatch({ type: types.WORKSPACES_FETCHED_SUCCESS, workspacesById });
  } catch (err) {
    dispatch({
      type: types.WORKSPACES_FETCHED_FAILURE,
      error: err,
    });
  }
};
