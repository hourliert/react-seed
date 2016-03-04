import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import mockery from 'mockery';
chai.use(dirtyChai);

import fetchMock from 'fetch-mock';
import fetch from 'isomorphic-fetch';
fetchMock.useNonGlobalFetch(fetch);

describe('Api', function apiTest() {
  class HttpError {
  }

  this.timeout(5000);

  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true,
    });
    mockery.registerMock('helpers/api/Errors', {
      HttpError,
    });
    mockery.registerMock('helpers/configManager', {
      get(value) {
        return value;
      },
    });
  });

  afterEach(() => {
    mockery.deregisterMock('helpers/api/Errors');
    mockery.deregisterMock('helpers/configManager');
    mockery.disable();
    fetchMock.restore();
  });

  it('should be defined', () => {
    const Api = require('../Api');
    const api = new Api({ baseUrl: 'toto', token: '1234' });

    expect(api).to.be.ok();
    expect(api.baseUrl).to.be.equal('toto');
    expect(api.token).to.be.equal('1234');
  });

  it('should validate the result of the response', async () => {
    const Api = require('../Api');
    const api = new Api({ baseUrl: 'toto', token: '1234' });

    const response = {
      status: 200,
      text: new Promise((resolve) => {
        resolve(true);
      }),
      ok: true,
    };

    try {
      await api._checkHttpStatus(response);
    } catch (e) {
      expect(false).to.be.ok();
    }
  });

  it('should throw an exception on bad result', async () => {
    const Api = require('../Api');
    const api = new Api({ baseUrl: 'toto', token: '1234' });

    const response = {
      status: 404,
      statusText: 'Not found',
      ok: false,
      text() {
        return new Promise((resolve) => {
          resolve('Error');
        });
      },
    };

    try {
      await api._checkHttpStatus(response);
    } catch (e) {
      expect(e).to.be.instanceof(HttpError);
    }
  });

  it('should make the fetch options for a get', () => {
    const Api = require('../Api');
    const api = new Api({
      baseUrl: 'http://api.server',
    });
    let res;

    res = api._makeFetchOptions({
      method: 'GET',
      headers: {
        toto: 'titi',
      },
    });

    expect(res).to.deep.equal({
      credentials: 'include',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        toto: 'titi',
      },
      timeout: 2500,
    });

    res = api._makeFetchOptions({
      method: 'GET',
    });

    expect(res).to.deep.equal({
      credentials: 'include',
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      timeout: 2500,
    });
  });

  it('should make the fetch options for a post', () => {
    const Api = require('../Api');
    const api = new Api({
      baseUrl: 'http://api.server',
    });

    global.window = { FormData: class FormDta {} };

    const res = api._makeFetchOptions({
      method: 'POST',
      headers: {
        toto: 'titi',
      },
      body: { here: true },
    });

    expect(res).to.deep.equal({
      credentials: 'include',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        toto: 'titi',
      },
      timeout: 2500,
      body: '{"here":true}',
    });

    delete global.window;
  });

  it('should make the fetch options for a get on server', () => {
    const Api = require('../Api');
    const api = new Api({
      baseUrl: 'http://api.server',
      token: '1234',
    });

    global.window = { FormData: class FormDta {} };

    const res = api._makeFetchOptions({
      method: 'GET',
      headers: {
        toto: 'titi',
      },
      body: { here: true },
    });

    expect(res).to.deep.equal({
      credentials: 'include',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        toto: 'titi',
        API_TOKEN_HEADER_KEY: '1234',
      },
      timeout: 2500,
      body: '{"here":true}',
    });

    delete global.window;
  });

  it('should make the fetch options for a post on server', () => {
    const Api = require('../Api');
    const api = new Api({
      baseUrl: 'http://api.server',
      token: '1234',
    });

    const res = api._makeFetchOptions({
      method: 'POST',
      headers: {
        toto: 'titi',
      },
    });

    expect(res).to.deep.equal({
      credentials: 'include',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        toto: 'titi',
        API_TOKEN_HEADER_KEY: '1234',
      },
      timeout: 2500,
    });
  });

  it('should get a ressource', async () => {
    mockery.registerMock('isomorphic-fetch', fetchMock.mock((url, opts) => {
      expect(url).to.equal('http://api.server/ressource?Filter={}');
      expect(opts.method).to.equal('GET');
      return true;
    },

    'GET', {
      status: 200,
      body: { ressource: '1234' },
    }).getMock());

    const Api = require('../Api');
    const api = new Api({
      baseUrl: 'http://api.server',
    });

    api._makeFetchOptions = () => ({
      method: 'GET',
    });

    try {
      const res = await api.get('/ressource');
      expect(res).to.deep.contain({ ressource: '1234' });
    } catch (e) {
      expect(false).to.be.true();
    }

    mockery.deregisterMock('isomorphic-fetch');
  });

  it('should post a ressource', async () => {
    mockery.registerMock('isomorphic-fetch', fetchMock.mock((url, opts) => {
      expect(url).to.equal('http://api.server/ressource?Filter={}');
      expect(opts.method).to.equal('POST');
      return true;
    },

    'POST', {
      status: 200,
      body: { ressource: '1234' },
    }).getMock());

    const Api = require('../Api');
    const api = new Api({
      baseUrl: 'http://api.server',
    });

    api._makeFetchOptions = ({ method, body }) => ({
      method,
      body: JSON.stringify(body),
    });

    try {
      const res = await api.post('/ressource', { item: '1' });
      expect(res).to.deep.contain({ ressource: '1234' });
    } catch (e) {
      expect(false).to.be.true();
    }

    mockery.deregisterMock('isomorphic-fetch');
  });
});
