import configManager from '../configManager';

export default function createApiConfig({ url, token }) {
  const apiServerHostname = configManager.get('API_SERVER_HOSTNAME');
  const apiServerPort = configManager.get('API_SERVER_PORT');
  const baseUrl = url || `${apiServerHostname}:${apiServerPort}`;

  return { baseUrl, token };
}
