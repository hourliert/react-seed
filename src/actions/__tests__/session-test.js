import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
import mockery from 'mockery';
chai.use(dirtyChai);
chai.use(sinonChai);

describe('Session Actions', () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true,
    });
    mockery.registerMock('react-router-redux', require('helpers/test/reactRouterReduxMock'));
  });

  afterEach(() => {
    mockery.deregisterMock('react-router-redux');
    mockery.disable();
  });

  it('should exists', () => {
    const SessionActionsCreator = require('../session');
    expect(SessionActionsCreator).to.be.ok();
  });
});
