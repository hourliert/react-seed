import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import Immutable from 'immutable';

import appReducer from '../app';
import {
  TOGGLE_LEFTNAV,
  OPEN_LEFTNAV,
  CLOSE_LEFTNAV,
  SET_API,
} from 'constants/actions';

describe('App Reducer', () => {
  it('should exists', () => {
    expect(appReducer).to.be.ok();
  });

  it('should toggle the left nav', () => {
    let state = Immutable.fromJS({ leftNavOpen: false });
    const action = {
      type: TOGGLE_LEFTNAV,
    };

    expect(state.get('leftNavOpen')).to.be.false();
    state = appReducer(state, action);
    expect(state.get('leftNavOpen')).to.be.true();

    expect(state.get('leftNavOpen')).to.be.true();
    state = appReducer(state, action);
    expect(state.get('leftNavOpen')).to.be.false();
  });

  it('should open the left nav', () => {
    let state = Immutable.fromJS({ leftNavOpen: false });
    const action = {
      type: OPEN_LEFTNAV,
    };

    expect(state.get('leftNavOpen')).to.be.false();
    state = appReducer(state, action);
    expect(state.get('leftNavOpen')).to.be.true();
  });

  it('should close the left nav', () => {
    let state = Immutable.fromJS({ leftNavOpen: true });
    const action = {
      type: CLOSE_LEFTNAV,
    };

    expect(state.get('leftNavOpen')).to.be.true();
    state = appReducer(state, action);
    expect(state.get('leftNavOpen')).to.be.false();
  });

  it('should set an API', () => {
    let state = Immutable.fromJS({ leftNavOpen: true });
    const sessionApi = new class SessionApi {
      constructor() {
        this.token = '1234';
      }
    };
    const action = {
      type: SET_API,
      payload: {
        apiName: 'SessionApi',
        Api: sessionApi,
      },
    };

    expect(state.has('SessionApi')).to.be.false();
    state = appReducer(state, action);
    expect(state.get('SessionApi')).to.be.equal(sessionApi);
  });
});
