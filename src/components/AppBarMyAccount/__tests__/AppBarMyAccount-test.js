import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('AppBarMyAccount', () => {
  it('should exists', () => {
    const AppBarMyAccount = require('../AppBarMyAccount');

    const wrapper = shallow((
      <AppBarMyAccount />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const AppBarMyAccount = require('../AppBarMyAccount');

    const wrapper = shallow((
      <AppBarMyAccount />
    ));

    expect(wrapper.find('div')).to.have.length(1);
  });
});
