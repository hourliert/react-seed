import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe.skip('SearchField', () => {
  it('should exists', () => {
    const SearchField = require('../SearchField');

    const wrapper = shallow((
      <SearchField />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const SearchField = require('../SearchField');

    const wrapper = shallow((
      <SearchField />
    ));

    expect(wrapper.find('div')).to.have.length(1);
  });
});
