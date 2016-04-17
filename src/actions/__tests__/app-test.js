import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
chai.use(sinonChai);
chai.use(dirtyChai);

describe('App Actions', () => {
  it('should exists', () => {
    const AppActions = require('../app');
    expect(AppActions).to.be.ok();
  });
});
