import getenv from 'getenv';

export function readFromEnvBoolean(envKey, defaultValue) {
  const env = process.env[envKey];
  return typeof env !== 'undefined' ? getenv.boolish(envKey) : defaultValue;
}

export function readFromEnvNumber(envKey, defaultValue) {
  const env = process.env[envKey];
  return typeof env !== 'undefined' ? getenv.int(envKey) : defaultValue;
}

export function readFromEnvString(envKey, defaultValue) {
  const env = process.env[envKey];
  return typeof env !== 'undefined' ? getenv.string(envKey) : defaultValue;
}

export function getApiServerHostname(defaultValue) {
  const env = process.env.API_SERVER_HOSTNAME;
  if (typeof env !== 'undefined') {
    return getenv.string('API_SERVER_HOSTNAME');
  }

  try {
    if (window !== undefined) {
      const initialAppState = window.__INITIAL_STATE__.app;
      return initialAppState.API_SERVER_HOSTNAME ?
      initialAppState.API_SERVER_HOSTNAME :
      defaultValue;
    }
  } catch (err) {
    console.log('window is not defined'); // eslint-disable-line
  }

  return defaultValue;
}

export function getApiServerPort(defaultValue) {
  const env = process.env.API_SERVER_PORT;
  if (typeof env !== 'undefined') {
    return getenv.string('API_SERVER_PORT');
  }

  try {
    if (window !== undefined) {
      const initialAppState = window.__INITIAL_STATE__.app;
      return initialAppState.API_SERVER_PORT ?
      initialAppState.API_SERVER_PORT :
      defaultValue;
    }
  } catch (err) {
    console.log('window is not defined'); // eslint-disable-line
  }

  return defaultValue;
}
