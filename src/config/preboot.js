import warning from 'warning';
import debug from 'debug';

import { createApiConfig } from 'helpers/api';

import { initializeApis } from 'actions/app';
import { fetchCurrentSession } from 'actions/session';
import { fetchCurrentUser } from 'actions/user';

const logger = debug('<%= appname %>-preboot');

export default async function preboot(token, store, completeFetch = true) {
  const { dispatch } = store;
  const apiConfig = createApiConfig({ token });

  dispatch(initializeApis(apiConfig));

  if (completeFetch) {
    try {
      logger('preboot: Fetching needed resources');
      await Promise.all([
        dispatch(fetchCurrentSession()),
        dispatch(fetchCurrentUser()),
      ]);
    } catch (e) {
      warning(false, e.message);
    } finally {
      logger('preboot: Done');
    }
  }
}
