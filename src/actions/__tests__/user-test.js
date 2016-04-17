import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);
chai.use(sinonChai);

describe('User Actions', () => {
  it('should exists', () => {
    const UserActionsCreator = require('../user');
    expect(UserActionsCreator).to.be.ok();
  });
});
