import chai, { expect } from 'chai';
import sinon from 'sinon';
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';
chai.use(dirtyChai);
chai.use(sinonChai);

import fetchMock from 'fetch-mock';
import fetch from 'isomorphic-fetch';
fetchMock.useNonGlobalFetch(fetch);

describe('User Api', function sessionAction() {
  this.timeout(5000);

  it('should get the current user', () => {
    const UserApi = require('../UserApi');
    const api = new UserApi({
      baseUrl: 'http://api.server',
    });

    api.get = sinon.spy();

    expect(api.get).to.have.not.been.called();
    api.getCurrent();
    expect(api.get).to.have.been.calledWith('/users/me');
  });
});
