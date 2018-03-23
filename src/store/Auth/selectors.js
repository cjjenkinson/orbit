/** Authentication Selectors */
export const getFetchingStatus = state => state.auth.isFetching;
export const getAuthStatus = state => state.auth.isAuthenticated;
export const getAuthToken = state => state.auth.token;
