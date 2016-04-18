import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';
chai.use(dirtyChai);
chai.use(sinonChai);

import fetchMock from 'fetch-mock';
import fetch from 'isomorphic-fetch';
fetchMock.useNonGlobalFetch(fetch);

describe('User Api', () => {
  it('should get the current user', () => {
    const UserApi = require('../UserApi');
    expect(UserApi).to.be.ok();
  });
});
