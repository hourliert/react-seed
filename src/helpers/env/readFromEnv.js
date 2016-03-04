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
