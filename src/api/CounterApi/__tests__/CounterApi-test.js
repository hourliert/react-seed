import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';
chai.use(dirtyChai);
chai.use(sinonChai);

import fetchMock from 'fetch-mock';
import fetch from 'isomorphic-fetch';
fetchMock.useNonGlobalFetch(fetch);

describe('CounterApi', () => {
  it('should get the current user', () => {
    const CounterApi = require('../CounterApi');
    expect(CounterApi).to.be.ok();
  });
});
