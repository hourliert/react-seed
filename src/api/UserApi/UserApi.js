import Api from '../Api';

import configManager from 'helpers/configManager';

export default class UserApi extends Api {
  constructor(...args) {
    super(...args);
    this.usersRoute = configManager.get('API_SERVER_USERS_ROUTE');
  }

  getCurrent() {
    return this.get(`${this.usersRoute}/me`);
  }
}
