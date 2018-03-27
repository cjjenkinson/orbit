import { push } from 'react-router-redux';

import * as types from './actionTypes';
import * as utils from '../../utils';

import WorkspaceService from '../../services/workspaces.service';

// instantiate the Workspace service
const workspaceService = WorkspaceService();

/** Workspaces Actions */

export const getWorkspaces = () => async (dispatch) => {
  try {
    dispatch({ type: types.WORKSPACES_FETCHED });

    const data = await workspaceService.fetchWorkspaces();

    const { workspaces } = data;

    if (!workspaces.length) {
      throw new Error('Workspaces fetch request failed');
    }

    // normalise workspaces
    const workspacesById = utils.keyById(workspaces, '_id');

    dispatch({ type: types.WORKSPACES_FETCHED_SUCCESS, workspacesById });
  } catch (err) {
    dispatch({
      type: types.WORKSPACES_FETCHED_FAILURE,
      error: err,
    });
  }
};

export const addWorkspace = formData => async (dispatch) => {
  try {
    dispatch({ type: types.WORKSPACES_ADD });

    const { workspaceName, entryReference, enablers } = formData;
    const enablersWithoutNull = enablers.filter(n => n !== undefined);
    const workspaceData = {
      name: workspaceName,
      template: {
        name: entryReference,
        enablers: enablersWithoutNull,
      },
    };

    const workspace = await workspaceService.createWorkspace(workspaceData);

    const { errors, _id } = workspace;

    if (errors) {
      throw new Error('A workspace with this name already exists, please use a different name.');
    }

    // normalise
    const workspaceById = utils.keyById([workspace], '_id');

    console.log(workspaceById);

    dispatch({ type: types.WORKSPACES_ADD_SUCCESS, workspaceById });
    dispatch(push(`/workspace/${_id}`));
  } catch (err) {
    dispatch({
      type: types.WORKSPACES_ADD_FAILURE,
      error: err,
    });
    dispatch(push('/dashboard'));
  }
};

export const deleteWorkspace = id => async (dispatch) => {
  try {
    dispatch({ type: types.WORKSPACES_DELETE });
    dispatch(push('/dashboard'));

    const response = await workspaceService.deleteWorkspace(id);

    if (!response.ok) {
      throw new Error('Failed to delete workspace');
    }

    dispatch({ type: types.WORKSPACES_DELETE_SUCCESS, id });
  } catch (err) {
    dispatch({ type: types.WORKSPACES_ADD_FAILURE, error: err });
  }
};
