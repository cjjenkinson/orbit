/**
 * api.service is a Singleton pattern that is setup once to encapsulate
 * variables that need to be accessed by any service instance e.g
 * the authentication token which is stored in the Redux state
 * and is hydrated from localstorage upon user sessions
 */

let _instance = null;

class ApiService {
  static getInstance() {
    if (_instance === null) {
      _instance = new ApiService();
    }

    return _instance;
  }

  setToken(token) {
    this._token = token;
  }

  defaultHeaders(immediateHeaders) {
    const headers = {
      'Content-type': 'application/json',
      ...immediateHeaders,
    };

    if (this._token) {
      headers['Authorization'] = `Bearer ${this._token}`;
    }

    return headers;
  }

  fetch(url, options) {
    const headers = this.defaultHeaders();

    const opts = {
      ...options,
      headers,
    };

    return fetch(url, opts);
  }
}

export default ApiService;
