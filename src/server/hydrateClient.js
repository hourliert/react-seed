import debug from 'debug';
import warning from 'warning';

import configManager from 'helpers/configManager';
import preboot from 'config/preboot';
import { runPrefetchers } from 'decorators';

const logger = debug('versatile-buildApp');

export async function waitForPreboot(
  store,
  cookies,
) {
  logger('waitForPreboot: Prebooting');
  try {
    const token = cookies[configManager.get('TOKEN_COOKIE_KEY')];

    if (!token) {
      throw new Error(`Missing ${configManager.get('TOKEN_COOKIE_KEY')} from cookies`);
    }

    await preboot(token, store);
  } catch (e) {
    warning(false, e.message);
  } finally {
    logger('waitForPreboot: Done');
  }
}

export async function getInitialState(
  components,
  { dispatch },
) {
  logger('getInitialState: Running prefetchers');

  try {
    await runPrefetchers(components, {
      dispatch,
    });
  } catch (e) {
    warning(false, e.message);
  } finally {
    logger('getInitialState: Done');
  }
}
