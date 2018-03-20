import keys from 'lodash/keys';

/** Workspaces Selectors */

export const isFetching = (state) => {
  const fetchingStatus = state.workspaces.isFetching;
  return fetchingStatus;
};

export const getWorkspacesById = (state) => {
  const { workspacesById } = state.workspaces;
  const workspacesByIdArray = keys(workspacesById);

  return [workspacesById, workspacesByIdArray];
};
