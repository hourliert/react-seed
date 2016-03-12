import Api from '../Api';

import configManager from 'helpers/configManager';

export default class SessionApi extends Api {
  constructor(...args) {
    super(...args);
    this.usersRoute = configManager.get('API_SERVER_USERS_ROUTE');
  }

  login({ email, password }) {
    return this.post(`${this.usersRoute}/signin`, { email, password });
  }

  logout() {
    return this.post(`${this.usersRoute}/me/signout`);
  }

  getCurrent() {
    return this.get(`${this.usersRoute}/me/session`);
  }
}
