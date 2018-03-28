import { BASE_ENDPOINT } from './config';
import ApiService from './api.service';

const url = `${BASE_ENDPOINT}/dashboard`;

// Get the API service instance
const api = ApiService.getInstance();

export default () => ({
  fetchWorkspaces: async () => {
    const response = await api.fetch(url);
    const workspaces = await response.json();
    return workspaces;
  },

  createWorkspace: async (data) => {
    const response = await api.fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const workspace = await response.json();
    return workspace;
  },

  deleteWorkspace: async (id) => {
    const urlWithId = `${url}/${id}`;
    const response = await api.fetch(urlWithId, {
      method: 'DELETE',
    });
    return response;
  },

  // function handleResponse(response) {
  //   if (!response.ok) {
  //       return Promise.reject(response.statusText);
  //   }

  //   return response.json();
  // }
});
