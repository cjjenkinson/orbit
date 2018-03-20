import { push } from 'react-router-redux';

import * as types from './actionTypes';
import * as utils from '../../utils';

import workspaceService from '../../services/workspaces.service';

// intantiate the Workspace service
const WorkspaceService = workspaceService();

/** Workspaces Actions */

export const getWorkspaces = () => async (dispatch) => {
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

export const addWorkspace = (data) => async (dispatch) => {
  try {
    const tempId = utils.generateRandomId();

    const workspaceByTempId = {
      [tempId]: {
        id: tempId,
        name: data.name,
        category: 'Codeworks',
        attributes: [],
      },
    };

    dispatch({ type: types.WORKSPACES_ADD, workspaceByTempId });

    dispatch(push(`/workspace/${tempId}`));

    // const workspace = await WorkspaceService.createWorkspace(data);

    // // normalise
    // const workspaceById = utils.keyById([workspace], 'id');
    // dispatch({ type: types.WORKSPACES_ADD_SUCCESS, workspaceById });
  } catch (err) {
    dispatch({
      type: types.WORKSPACES_ADD_FAILURE,
      error: err,
    });
  }
};

// dispatch add workspace
// make fetch with data
// then normalise data (Add id)
// dispatch success
// catch
// roll back, remove workspace
