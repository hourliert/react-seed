import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('Form', () => {
  it('should exists', () => {
    const Form = require('../Form');

    const wrapper = shallow((
      <Form />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const Form = require('../Form');

    const wrapper = shallow((
      <Form />
    ));

    expect(wrapper.find('div')).to.have.length(1);
  });
});
