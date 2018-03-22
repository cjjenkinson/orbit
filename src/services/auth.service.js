import { DEV_ENDPOINT } from '../constants';
import { clearReduxState } from '../helpers/local-storage-helpers';

const base64 = require('base-64');

const BASE_ENDPOINT = DEV_ENDPOINT;

export default () => ({
  login: async (email, password) => {
    const url = `${BASE_ENDPOINT}/log-in`;
    const encoded = base64.encode(`${email}:${password}`);
    const opts = {
      method: 'GET',
      headers: { Authorization: `Basic ${encoded}` },
    };
    const response = await fetch(url, opts);
    const auth = await response.json();
    return auth;
  },
  logout: async () => {
    await clearReduxState();
  },
});
