import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('ExamplePersonalInfo', () => {
  it('should exists', () => {
    const ExamplePersonalInfo = require('../ExamplePersonalInfo');

    const wrapper = shallow((
      <ExamplePersonalInfo />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const ExamplePersonalInfo = require('../ExamplePersonalInfo');

    const wrapper = shallow((
      <ExamplePersonalInfo />
    ));

    expect(wrapper.find('div')).to.have.length(1);
  });
});
