import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);
chai.use(sinonChai);

import { apiThunkCreator } from '../apiThunkCreator';

describe('Api Thunk Creator', () => {
  it('should exists', () => {
    expect(apiThunkCreator).to.be.ok();
  });

  it('should test the thunk', () => {
    const creator = apiThunkCreator('GraphApi', (opts) => ({
      type: 'TEST',
      payload: opts,
    }));
    const thunk = creator(1);
    const dispatchSpy = sinon.spy();
    const dispatch = (action) => {
      dispatchSpy();
      return action;
    };

    const getState = sinon.stub().returns({
      app: {
        get(name) { return { name }; },
      },
    });
    const action = thunk(dispatch, getState);

    expect(action).to.deep.equal({
      type: 'TEST',
      payload: {
        api: {
          name: 'GraphApi',
        },
      },
    });
  });
});
