import { BASE_ENDPOINT } from './config';
import ApiService from './api.service';

const url = `${BASE_ENDPOINT}/dashboard`;

// Get the API service instance
const api = ApiService.getInstance();

export default () => ({
  createSnapshot: async (workspaceId, entryId, data) => {
    const urlWithId = `${url}/${workspaceId}/${entryId}`;
    const response = await api.fetch(urlWithId, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const snapshot = await response.json();
    return snapshot;
  },
});
