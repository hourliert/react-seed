import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('tag', () => {
  it('should exists', () => {
    const tag = require('../tag');

    const wrapper = shallow((
      <tag />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const tag = require('../tag');

    const wrapper = shallow((
      <tag />
    ));

    expect(wrapper.find('div')).to.have.length(1);
  });
});
