import fetch from 'isomorphic-fetch';
import debug from 'debug';

import { HttpError, FetchError } from 'helpers/api/Errors';
import configManager from 'helpers/configManager';

const logger = debug('ReactSeed-Api');

export default class Api {
  constructor({
    baseUrl,
    token,
  }) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  async _checkHttpStatus(response) {
    if (!response.ok) {
      let text;

      if (typeof response.text === 'function') {
        text = await response.text();
      }

      throw new HttpError(response, text);
    }
  }

  _makeFetchError(url, error) {
    return {
      error,
      url,
    };
  }

  _checkFetchError(response) {
    if (!response.status) {
      throw new FetchError(response);
    }
  }

  _makeFetchOptions({
    method,
    headers = {},
    body,
  }) {
    const isJson = typeof body === 'object' && !(body instanceof window.FormData);
    const realBody = isJson ? JSON.stringify(body) : body;
    const jsonHeader = isJson ? {
      'Content-Type': 'application/json',
    } : {};
    const authHeader = {
      [configManager.get('API_TOKEN_HEADER_KEY')]: this.token,
    };

    return {
      method,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        ...(isJson ? jsonHeader : {}),
        ...(this.token ? authHeader : {}),
        ...headers,
      },
      ...(realBody ? { body: realBody } : {}),
      timeout: 2500,
    };
  }

  _makeFetchFilter(filters = {}) {
    return `Filter=${JSON.stringify(filters)}`;
  }

  _makeFullUrl(url, filters) {
    return `${
      this.baseUrl ? this.baseUrl : ''
    }${url}?${
        this._makeFetchFilter(filters)
    }`;
  }

  _makeFetchReturn(response) {
    if (response.status === 204) {
      return {};
    }

    return response.json();
  }

  async _makeRequest(url, opts, requester) {
    let response;
    const fullUrl = this._makeFullUrl(url, opts.filters);

    logger(`_makeRequest: Fetching ${url}`);
    try {
      response = await requester(fullUrl);
    } catch (e) {
      response = this._makeFetchError(fullUrl, e);
    } finally {
      logger(`_makeRequest: Fetching Done ${url}`);
      this._checkFetchError(response);
      await this._checkHttpStatus(response);
    }

    return response;
  }

  async get(url, opts = {}) {
    const response = await this._makeRequest(url, opts, fullUrl => (
      fetch(fullUrl,
        this._makeFetchOptions({
          method: 'GET',
          ...opts,
        })
      )
    ));

    return this._makeFetchReturn(response);
  }

  async post(url, body, opts = {}) {
    const response = await this._makeRequest(url, opts, fullUrl => (
      fetch(fullUrl,
        this._makeFetchOptions({
          method: 'POST',
          body,
          ...opts,
        })
      )
    ));

    return this._makeFetchReturn(response);
  }

  async put(url, body, opts = {}) {
    const response = await this._makeRequest(url, opts, fullUrl => (
      fetch(fullUrl,
        this._makeFetchOptions({
          method: 'PUT',
          body,
          ...opts,
        })
      )
    ));

    return this._makeFetchReturn(response);
  }
}
