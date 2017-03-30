import { readFromEnvNumber, readFromEnvString } from 'helpers/env';

// api constants
export const API_SERVER_PORT = readFromEnvNumber('API_SERVER_PORT', 443);
export const API_SERVER_HOSTNAME = readFromEnvString(
  'API_SERVER_HOSTNAME',
  'https://versatile-api.staging.wid.la'
);

export const API_SERVER_USERS_ROUTE = readFromEnvString(
  'API_SERVER_USERS_ROUTE',
  ''
);

export const API_TOKEN_HEADER_KEY = readFromEnvString('API_TOKEN_HEADER_KEY', 'auth-server-token');
