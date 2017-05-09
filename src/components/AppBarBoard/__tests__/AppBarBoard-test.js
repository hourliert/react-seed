import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('AppBarBoard', () => {
  it('should exists', () => {
    const AppBarBoard = require('../AppBarBoard');

    const wrapper = shallow((
      <AppBarBoard />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const AppBarBoard = require('../AppBarBoard');

    const wrapper = shallow((
      <AppBarBoard />
    ));

    expect(wrapper.find('div')).to.have.length(1);
  });
});
