import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('PasswordReset', () => {
  it('should exists', () => {
    const PasswordReset = require('../PasswordReset');

    const wrapper = shallow((
      <PasswordReset />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const PasswordReset = require('../PasswordReset');

    const wrapper = shallow((
      <PasswordReset />
    ));

    expect(wrapper.find('div')).to.have.length(1);
  });
});
