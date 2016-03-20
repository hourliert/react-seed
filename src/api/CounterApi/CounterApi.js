import Api from '../Api';

import configManager from 'helpers/configManager';

export default class CounterApi extends Api {
  constructor(...args) {
    super(...args);
    this.usersRoute = configManager.get('API_SERVER_USERS_ROUTE');
  }

  getCounter() {
    return this.get(`${this.usersRoute}/counter`);
  }
}
