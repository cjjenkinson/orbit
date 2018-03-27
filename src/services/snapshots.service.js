import { BASE_ENDPOINT } from './config';
import ApiService from './api.service';

const url = `${BASE_ENDPOINT}/dashboard`;

// Get the API service instance
const api = ApiService.getInstance();

export default () => ({
  createSnapshot: async (id, data) => {
    const urlWithId = `${url}/${id}`;
    const response = await api.fetch(urlWithId, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const entry = await response.json();
    return entry;
  },

  deleteSnapshot: async (id) => {
    const urlWithId = `${url}/${id}`;
    const response = await api.fetch(urlWithId, {
      method: 'DELETE',
    });
    return response;
  },
});
