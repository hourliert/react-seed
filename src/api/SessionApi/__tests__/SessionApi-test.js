import chai, { expect } from 'chai';
import mockery from 'mockery';
import sinon from 'sinon';
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';
chai.use(dirtyChai);
chai.use(sinonChai);

import fetchMock from 'fetch-mock';
import fetch from 'isomorphic-fetch';
fetchMock.useNonGlobalFetch(fetch);

describe('Session Api', () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true,
    });

    mockery.registerMock(
      'helpers/configManager',
      require('helpers/test/helpersMock').configManager
    );
  });

  afterEach(() => {
    mockery.deregisterMock('helpers/configManager');
    mockery.disable();
  });

  it('should login the user', () => {
    const credentials = { email: 'thomas', password: '1234' };

    const SessionApi = require('../SessionApi');
    const api = new SessionApi({
      baseUrl: 'http://api.server',
    });

    api.post = sinon.spy();

    expect(api.post).to.have.not.been.called();
    api.login(credentials);
    expect(api.post).to.have.been.calledWith('API_SERVER_USERS_ROUTE/signin', credentials);
  });

  it('should logout the user', () => {
    const SessionApi = require('../SessionApi');
    const api = new SessionApi({
      baseUrl: 'http://api.server',
    });

    api.post = sinon.spy();

    expect(api.post).to.have.not.been.called();
    api.logout();
    expect(api.post).to.have.been.calledWith('API_SERVER_USERS_ROUTE/me/signout');
  });

  it('should get the current session', () => {
    const SessionApi = require('../SessionApi');
    const api = new SessionApi({
      baseUrl: 'http://api.server',
    });

    api.get = sinon.spy();

    expect(api.get).to.have.not.been.called();
    api.getCurrent();
    expect(api.get).to.have.been.calledWith('API_SERVER_USERS_ROUTE/me/session');
  });
});
