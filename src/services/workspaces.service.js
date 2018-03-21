import { DEV_ENDPOINT } from '../constants';

const BASE_ENDPOINT = DEV_ENDPOINT;

const url = `${BASE_ENDPOINT}/dashboard`;

// TODO: Refactor for auth
const getOpts = {
  headers: {
    'content-type': 'application/json',
    authorization: 'Bearer bbb4be20-2cfe-11e8-bc91-d5c8ecaad095',
  },
};

export default () => ({
  fetchWorkspaces: async () => {
    const response = await fetch(url, getOpts);
    const workspaces = await response.json();
    return workspaces;
  },

  createWorkspace: async (data) => {
    const opts = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer bbb4be20-2cfe-11e8-bc91-d5c8ecaad095',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, opts);
    const workspace = await response.json();
    return workspace;
  },

  deleteWorkspace: async (id) => {
    const urlWithId = `${BASE_ENDPOINT}/dashboard/${id}`;
    const opts = {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer bbb4be20-2cfe-11e8-bc91-d5c8ecaad095',
      },
    };
    const response = await fetch(urlWithId, opts);
    return response;
  },
});
