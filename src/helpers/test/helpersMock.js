import { id } from './createMock';

export function apiThunkCreator(apiName, creator) {
  return creator;
}

export const configManager = {
  get: id,
};

export const cookieManager = {
  setAuthCredentials: id,
  removeAuthCredentials: id,
};

export const api = {
  createApiConfig: id,
};
