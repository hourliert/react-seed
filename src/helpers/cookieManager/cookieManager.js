import cookies from 'js-cookie';

import configManager from '../configManager';

export function setAuthCredentials(token) {
  if (!global.server) {
    cookies.set(configManager.get('TOKEN_COOKIE_KEY'), token);
  }
}

export function removeAuthCredentials() {
  if (!global.server) {
    cookies.remove(configManager.get('TOKEN_COOKIE_KEY'));
  }
}
