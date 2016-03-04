import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import asyncAwaitMiddleware from '../asyncAwaitMiddleware';

describe('AsyncAwaitMiddleware', () => {
  let mockStore;

  beforeEach(() => {
    mockStore = configureStore([
      thunk,
      asyncAwaitMiddleware({
        promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR'],
      }),
    ]);
  });

  afterEach(() => {
    mockStore = null;
  });

  it('should be defined', () => {
    expect(asyncAwaitMiddleware).to.be.ok();
  });

  it('should ignore a non async await action', async () => {
    const action = {
      type: 'TEST',
      payload: {
        toto: true,
      },
    };

    const store = mockStore({}, [action]);
    await store.dispatch(action);
  });

  it('should handle a successful async action', async () => {
    const asyncTask = () => (
      new Promise(resolve => {
        setTimeout(() => resolve({ resolved: true }), 40);
      })
    );

    const action = {
      type: 'TEST',
      payload: {
        asyncAwait: asyncTask(),
        onResolve(res) {
          expect(res).to.deep.equal({ resolved: true });
        },
      },
    };

    const actionPending = {
      type: 'TEST_LOADING',
    };

    const actionSuccess = {
      type: 'TEST_SUCCESS',
      payload: { resolved: true },
    };

    const store = mockStore({}, [actionPending, actionSuccess]);
    await store.dispatch(action);
  });

  it('should handle a unsuccessful async action', async () => {
    const asyncTask = () => (
      new Promise((resolve, reject) => {
        setTimeout(() => reject({ rejected: true }), 40);
      })
    );

    const action = {
      type: 'TEST',
      payload: {
        asyncAwait: asyncTask(),
        onReject(res) {
          expect(res).to.deep.equal({ rejected: true });
        },
      },
    };

    const actionPending = {
      type: 'TEST_LOADING',
    };

    const actionSuccess = {
      type: 'TEST_ERROR',
      error: true,
      payload: { rejected: true },
    };

    const store = mockStore({}, [actionPending, actionSuccess]);
    await store.dispatch(action);
  });
});
