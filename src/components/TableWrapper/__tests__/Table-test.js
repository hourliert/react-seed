import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('Table', () => {
  it('should exists', () => {
    const Table = require('../Table');

    const wrapper = shallow((
      <Table />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const Table = require('../Table');

    const wrapper = shallow((
      <Table />
    ));

    expect(wrapper.find('div')).to.have.length(1);
  });
});
