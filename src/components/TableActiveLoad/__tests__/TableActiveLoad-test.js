import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('TableActiveLoad', () => {
  it('should exists', () => {
    const TableActiveLoad = require('../TableActiveLoad');

    const wrapper = shallow((
      <TableActiveLoad />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const TableActiveLoad = require('../TableActiveLoad');

    const wrapper = shallow((
      <TableActiveLoad />
    ));

    expect(wrapper.find('div')).to.have.length(1);
  });
});
