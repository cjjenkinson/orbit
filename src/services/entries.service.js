import { BASE_ENDPOINT } from './config';
import ApiService from './api.service';

const url = `${BASE_ENDPOINT}/dashboard`;

// Get the API service instance
const api = ApiService.getInstance();

export default () => ({
  fetchEntries: async (id) => {
    const urlWithId = `${url}/${id}`;
    const response = await api.fetch(urlWithId);
    const entries = await response.json();
    return entries;
  },

  createEntry: async (id, data) => {
    const urlWithId = `${url}/${id}`;
    const response = await api.fetch(urlWithId, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const entry = await response.json();
    return entry;
  },

  deleteEntry: async (workspaceId, id) => {
    const urlWithId = `${url}/${workspaceId}/${id}`;
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
