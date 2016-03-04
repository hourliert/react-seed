import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
import mockery from 'mockery';
import sinon from 'sinon';
chai.use(sinonChai);
chai.use(dirtyChai);

describe('App Actions', () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true,
    });
  });

  afterEach(() => {
    mockery.disable();
  });

  it('should exists', () => {
    const AppActions = require('../app');
    expect(AppActions).to.be.ok();
  });

  it('should initialize the apis', () => {
    const constructorSpy = sinon.spy();
    const ApiMock = class {
      constructor() {
        constructorSpy();
      }
    };

    mockery.registerMock('api/apis', {
      GraphApi: ApiMock,
      UserApi: ApiMock,
    });

    const dispatchSpy = sinon.spy();
    const AppActions = require('../app');
    const creator = AppActions.initializeApis({
      baseUrl: 'http://toto',
      token: '1234',
    });

    creator(dispatchSpy);

    expect(dispatchSpy).to.have.been.calledTwice();
    expect(constructorSpy).to.have.been.calledTwice();

    mockery.deregisterMock('api/apis');
  });
});
