/** Authentication Selectors */
export const getAuthDetails = state => state.auth.user;
export const getFetchingStatus = state => state.auth.isFetching;
export const getAuthStatus = state => state.auth.isAuthenticated;
export const getAuthToken = state => state.auth.token;
