import Api from '../Api';

export default class SessionApi extends Api {
  login({ email, password }) {
    return this.post('/users/signin', { email, password });
  }

  logout() {
    return this.post('/users/me/signout');
  }

  getCurrent() {
    return this.get('/users/me/session');
  }
}
