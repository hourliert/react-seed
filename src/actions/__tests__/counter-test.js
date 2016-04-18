import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
import mockery from 'mockery';
chai.use(sinonChai);
chai.use(dirtyChai);

describe('counter Action Creators', () => {
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
    const CounterActionsCreator = require('../counter');
    expect(CounterActionsCreator).to.be.ok();
  });

  it('should create an action that fetch the counter', () => {
    const CounterActionsCreator = require('../counter');

    const ac = new CounterActionsCreator();
    expect(ac).to.be.ok();
  });
});
