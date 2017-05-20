import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe.skip('SearchSelectfield', () => {
  it('should exists', () => {
    const SearchSelectfield = require('../SearchSelectfield');

    const wrapper = shallow((
      <SearchSelectfield />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const SearchSelectfield = require('../SearchSelectfield');

    const wrapper = shallow((
      <SearchSelectfield />
    ));

    expect(wrapper.find('div')).to.have.length(1);
  });
});
