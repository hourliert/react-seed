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
    const counter = require('../counter');
    expect(counter).to.be.ok();
  });
});
