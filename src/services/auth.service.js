import { BASE_ENDPOINT } from './config';
import { clearReduxState } from '../helpers/local-storage-helpers';

const base64 = require('base-64');

export default () => ({
  login: async (email, password) => {
    const url = `${BASE_ENDPOINT}/log-in`;
    const encoded = base64.encode(`${email}:${password}`);
    const opts = {
      method: 'GET',
      headers: { Authorization: `Basic ${encoded}` },
    };
    const response = await fetch(url, opts);
    const user = await response.json();
    return user;
  },
  register: async (formValues) => {
    const url = `${BASE_ENDPOINT}/sign-up`;
    // const encoded = base64.encode(formValues);
    const opts = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(formValues),
    };
    const response = await fetch(url, opts);
    const user = await response.json();
    return user;
  },
  logout: async () => {
    await clearReduxState();
  },
});
