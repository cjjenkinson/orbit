import config from './config';

const BASE_ENDPOINT = config.dev_endpoint;

export default () => ({
  fetchWorkspaces: async () => {
    const url = `${BASE_ENDPOINT}/dashboard/id_usr001`;
    const response = await fetch(url);
    const workspaces = await response.json();
    return workspaces;
  },
});
