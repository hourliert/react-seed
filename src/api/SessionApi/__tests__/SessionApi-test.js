import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';
chai.use(dirtyChai);
chai.use(sinonChai);

import fetchMock from 'fetch-mock';
import fetch from 'isomorphic-fetch';
fetchMock.useNonGlobalFetch(fetch);

describe('Session Api', () => {
  it('should login the user', () => {
    const SessionApi = require('../SessionApi');
    expect(SessionApi).to.be.ok();
  });
});
