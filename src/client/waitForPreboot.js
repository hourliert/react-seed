import warning from 'warning';

import preboot from 'config/preboot';

export default async function waitForPreboot(store, completeFetch = true) {
  try {
    const { currentSession } = store.getState();
    const token = currentSession.getIn(['value', 'token']);

    await preboot(token, store, completeFetch);
  } catch (e) {
    warning(false, e.message);
  }
}
