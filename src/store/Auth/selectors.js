/** Authentication Selectors */
export const getAuthStatus = state => state.auth.isAuthenticated;
export const getAuthToken = state => state.auth.token;
