import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import Immutable from 'immutable';

import currentUserReducer from '../currentUser';
import {
  SIGNOUT,
  GET_CURRENT_USER,
} from 'constants/actions';

describe('User Reducer', () => {
  it('should exists', () => {
    expect(currentUserReducer).to.be.ok();
  });

  it('should set the user', () => {
    let state = Immutable.fromJS({ value: {} });
    const action = {
      type: GET_CURRENT_USER.SUCCESS,
      payload: {
        firstName: 'Thomas',
        lastName: 'Hourlier',
      },
    };

    expect(state.getIn(['value', 'firstName'])).to.be.undefined();
    expect(state.getIn(['value', 'lastName'])).to.be.undefined();
    state = currentUserReducer(state, action);
    expect(state.getIn(['value', 'firstName'])).to.be.equal('Thomas');
    expect(state.getIn(['value', 'lastName'])).to.be.equal('Hourlier');
  });

  [
    SIGNOUT.SUCCESS,
    GET_CURRENT_USER.ERROR,
    SIGNOUT.ERROR,
  ].forEach(t => {
    it(`should remove the user with action ${t}`, () => {
      let state = Immutable.fromJS({
        value: {
          firstName: 'Thomas',
          lastName: 'Hourlier',
        },
      });
      const action = {
        type: t,
      };

      expect(state.getIn(['value', 'firstName'])).to.be.equal('Thomas');
      expect(state.getIn(['value', 'lastName'])).to.be.equal('Hourlier');
      state = currentUserReducer(state, action);
      expect(state.getIn(['value', 'firstName'])).to.be.undefined();
      expect(state.getIn(['value', 'lastName'])).to.be.undefined();
    });
  });
});
