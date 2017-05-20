import { annotator, AbstractApi } from 'retax-components';

@annotator.Api({ // eslint-disable-line
  routes: {
    session: '',
  },
})
export default class SessionApi extends AbstractApi {
  login({ email, password }) {
    return this.post({
      url: `${this.routes.session}/users/signin`,
      body: { email, password },
    });
  }

  logout() {
    return this.post({ url: `${this.routes.session}/users/me/signout` });
  }

  getCurrent() {
    return this.get({ url: `${this.routes.session}/users/me/session` });
  }
}
