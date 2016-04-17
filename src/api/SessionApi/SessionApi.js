import { annotator, AbstractApi } from 'retax';

@annotator.Api({ // eslint-disable-line
  routes: {
    session: '',
  },
})
export default class SessionApi extends AbstractApi {
  login({ email, password }) {
    return this.post({
      url: `${this.routes.session}/signin`,
      body: { email, password },
    });
  }

  logout() {
    return this.post({ url: `${this.routes.session}/me/signout` });
  }

  getCurrent() {
    return this.get({ url: `${this.routes.session}/me/session` });
  }
}
