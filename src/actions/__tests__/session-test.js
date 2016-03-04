import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
import mockery from 'mockery';
chai.use(dirtyChai);
chai.use(sinonChai);

import Immutable from 'immutable';

describe('Session Actions', () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true,
    });
    mockery.registerMock(
      'helpers/cookieManager',
      require('helpers/test/helpersMock').cookieManager
    );
    mockery.registerMock('react-router-redux', require('helpers/test/reactRouterReduxMock'));
    mockery.registerMock('actions/user', require('helpers/test/actionsMock').user);
    mockery.registerMock('helpers/api', require('helpers/test/helpersMock').api);
    mockery.registerMock('actions/app', require('helpers/test/actionsMock').app);
    mockery.registerMock('actions/entities', require('helpers/test/actionsMock').entities);
    mockery.registerMock(
      'actions/graphConstants',
      require('helpers/test/actionsMock').graphConstants
    );
  });

  afterEach(() => {
    mockery.deregisterMock('helpers/cookieManager');
    mockery.deregisterMock('react-router-redux');
    mockery.deregisterMock('actions/user');
    mockery.deregisterMock('helpers/api');
    mockery.deregisterMock('actions/app');
    mockery.deregisterMock('actions/entities');
    mockery.deregisterMock('actions/graphConstants');
    mockery.disable();
  });

  it('should exists', () => {
    const SessionActions = require('../session');
    expect(SessionActions).to.be.ok();
  });

  it('should emit the authenticate action', async () => {
    const login = sinon.stub().returns({ token: '1234' });

    const SessionActions = require('../session');

    const action = SessionActions._signinCreator({
      api: {
        login,
      },
      email: 'thomas',
      password: '1234',
    });

    expect(login).to.have.been.called();

    expect(action.type).to.equal('SIGNIN');
    expect(action.payload.asyncAwait).to.deep.equal({ token: '1234' });
    expect(action.payload.onResolve).to.ok();
    expect(action.payload.onReject).to.ok();

    const { onResolve, onReject } = action.payload;

    const dispatch = sinon.spy();
    const getState = sinon.stub().returns({ currentUser: Immutable.fromJS({ isAdmin: true }) });
    await onResolve({ token: '1234' }, { dispatch, getState });
    expect(dispatch.callCount).to.have.equal(3);
    expect(dispatch.getCall(0).args[0]).to.deep.equal({ token: '1234' });
    expect(dispatch.lastCall.args[0]).to.deep.equal('/');

    onReject();
  });

  it('should emit the logout action', () => {
    const logout = sinon.stub().returns({ token: '1234' });

    const SessionActions = require('../session');

    const action = SessionActions._signoutCreator({
      api: {
        logout,
      },
    });

    expect(logout).to.have.been.called();

    expect(action.type).to.equal('SIGNOUT');
    expect(action.payload.asyncAwait).to.deep.equal({ token: '1234' });
    expect(action.payload.onResolve).to.ok();
    expect(action.payload.onReject).to.ok();

    const { onResolve, onReject } = action.payload;

    const dispatch = sinon.spy();
    onResolve({ token: '1234' }, { dispatch });
    expect(dispatch.callCount).to.have.equal(2);
    expect(dispatch.firstCall.args[0]).to.deep.equal('/signin');

    onReject({ token: '1234' }, { dispatch });
  });

  it('should emit the get current session action', async () => {
    const getCurrent = sinon.stub().returns({ token: '1234' });

    const SessionActions = require('../session');

    const action = SessionActions._fetchCurrentSessionCreator({
      api: {
        getCurrent,
      },
    });

    expect(getCurrent).to.have.been.called();

    expect(action.type).to.equal('GET_CURRENT_SESSION');
    expect(action.payload.asyncAwait).to.deep.equal({ token: '1234' });
  });
});
