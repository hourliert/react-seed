import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe.skip('SearchDate', () => {
  it('should exists', () => {
    const SearchDate = require('../SearchDate');

    const wrapper = shallow((
      <SearchDate />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const SearchDate = require('../SearchDate');

    const wrapper = shallow((
      <SearchDate />
    ));

    expect(wrapper.find('div')).to.have.length(1);
  });
});
