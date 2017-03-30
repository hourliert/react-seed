import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('UserSession', () => {
  it('should exists', () => {
    const UserSession = require('../UserSession');

    const wrapper = shallow((
      <UserSession />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const UserSession = require('../UserSession');

    const wrapper = shallow((
      <UserSession />
    ));

    expect(wrapper.find('div')).to.have.length(1);
  });
});
