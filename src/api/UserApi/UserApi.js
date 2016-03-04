import Api from '../Api';

export default class UserApi extends Api {
  getCurrent() {
    return this.get('/users/me');
  }
}
