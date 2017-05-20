import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe.skip('SearchAutoComplete', () => {
  it('should exists', () => {
    const SearchAutoComplete = require('../SearchAutoComplete');

    const wrapper = shallow((
      <SearchAutoComplete />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const SearchAutoComplete = require('../SearchAutoComplete');

    const wrapper = shallow((
      <SearchAutoComplete />
    ));

    expect(wrapper.find('div')).to.have.length(1);
  });
});
