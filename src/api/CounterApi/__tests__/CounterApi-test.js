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

describe('CounterApi', () => {
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

  it('should get the current user', () => {
    const CounterApi = require('../CounterApi');
    const api = new CounterApi({
      baseUrl: 'http://api.server',
    });

    api.get = sinon.spy();

    expect(api.get).to.have.not.been.called();
    api.getCounter();
    expect(api.get).to.have.been.calledWith('API_SERVER_USERS_ROUTE/counter');
  });
});
