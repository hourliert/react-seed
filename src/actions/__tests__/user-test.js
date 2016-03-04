import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);
chai.use(sinonChai);

describe('User Actions', () => {
  it('should exists', () => {
    const UserActions = require('../user');
    expect(UserActions).to.be.ok();
  });

  it('should emit the get current user action', async () => {
    const getCurrent = sinon.stub().returns({ name: 'thomas' });
    const UserActions = require('../user');

    const action = UserActions._fetchCurrentUserCreator({
      api: {
        getCurrent,
      },
    });
    const { payload: { asyncAwait, onResolve } } = action;

    expect(getCurrent).to.have.been.called();

    const res = await asyncAwait;

    expect(action.type).to.equal('GET_CURRENT_USER');
    expect(res).to.be.deep.equal({ name: 'thomas' });

    const dispatch = sinon.spy();

    onResolve({ name: 'thomas', isAdmin: true }, { dispatch });
    expect(dispatch).to.have.been.called();
  });
});
