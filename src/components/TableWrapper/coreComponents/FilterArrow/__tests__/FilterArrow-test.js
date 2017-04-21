import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe.skip('FilterArrow', () => {
  it('should exists', () => {
    const FilterArrow = require('../FilterArrow');

    const wrapper = shallow((
      <FilterArrow />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const FilterArrow = require('../FilterArrow');

    const wrapper = shallow((
      <FilterArrow />
    ));

    expect(wrapper.find('div')).to.have.length(1);
  });
});
