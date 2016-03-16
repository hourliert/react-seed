import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import Immutable from 'immutable';

import {
  SIGNIN,
  SIGNOUT,
  GET_CURRENT_SESSION,
} from 'constants/actions';
import { userRoles } from 'config/access';

describe('Session Reducer', () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true,
    });

    mockery.registerMock('js-cookie', {
      set: () => ({}),

      get: () => ({}),

      remove: () => ({}),
    });
  });

  afterEach(() => {
    mockery.deregisterMock('js-cookie');
    mockery.disable();
  });

  it('should exists', () => {
    const sessionReducer = require('../currentSession');
    expect(sessionReducer).to.be.ok();
  });

  [
    SIGNIN.SUCCESS,
    GET_CURRENT_SESSION.SUCCESS,
  ].forEach(t => {
    it(`should set the new user role with action ${t}`, () => {
      const sessionReducer = require('../currentSession');

      let state = Immutable.fromJS({
        value: { accessLevel: userRoles.public },
      });
      const action = {
        type: t,
        payload: {
          token: '1234',
        },
      };

      expect(state.getIn(['value', 'accessLevel']).toObject()).to.deep.equal(userRoles.public);
      state = sessionReducer(state, action);
      expect(state.getIn(['value', 'accessLevel']).toObject()).to.deep.equal(userRoles.user);
    });
  });

  [
    SIGNOUT.SUCCESS,
  ].forEach(t => {
    it(`should logout the user and remove his role with action ${t}`, () => {
      const sessionReducer = require('../currentSession');

      let state = Immutable.fromJS({
        value: { accessLevel: userRoles.user },
      });
      const action = {
        type: t,
      };

      expect(state.getIn(['value', 'accessLevel']).toObject()).to.deep.equal(userRoles.user);
      state = sessionReducer(state, action);
      expect(state.getIn(['value', 'accessLevel']).toObject()).to.deep.equal(userRoles.public);
    });
  });

  [
    SIGNOUT.ERROR,
  ].forEach(t => {
    it(`should logout the user and remove his role with action ${t}`, () => {
      const sessionReducer = require('../currentSession');

      let state = Immutable.fromJS({
        value: { accessLevel: userRoles.user },
      });
      const action = {
        type: t,
        payload: new Error('test'),
        error: true,
      };

      expect(state.getIn(['value', 'accessLevel']).toObject()).to.deep.equal(userRoles.user);
      state = sessionReducer(state, action);
      expect(state.getIn(['value', 'accessLevel']).toObject()).to.deep.equal(userRoles.public);
    });
  });

  [
    GET_CURRENT_SESSION.ERROR,
  ].forEach(t => {
    it(`should logout the user and remove his role with action ${t}`, () => {
      const sessionReducer = require('../currentSession');

      let state = Immutable.fromJS({
        value: { accessLevel: userRoles.user },
      });
      const action = {
        type: t,
      };

      expect(state.getIn(['value', 'accessLevel']).toObject()).to.deep.equal(userRoles.user);
      state = sessionReducer(state, action);
      expect(state.getIn(['value', 'accessLevel']).toObject()).to.deep.equal(userRoles.public);
    });
  });
});
