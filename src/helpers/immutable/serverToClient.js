import { fromJS } from 'immutable';
import debug from 'debug';

const logger = debug('ReactSeed-immutableHelper');

export default function serverToClient(untrackedStates, serverState) {
  logger('serverToClient: Converting state');

  let initialState = undefined;
  if (typeof serverState === 'object') {
    initialState = Object.keys(serverState).reduce((res, cur) => {
      const newRes = res;
      const shouldImmutable = !untrackedStates.includes(cur);

      newRes[cur] = shouldImmutable ? fromJS(serverState[cur]) : serverState[cur];
      return newRes;
    }, {});
  }

  logger('serverToClient: Done');

  return initialState;
}
