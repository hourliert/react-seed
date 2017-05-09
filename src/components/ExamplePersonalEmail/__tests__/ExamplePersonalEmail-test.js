import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('ExamplePersonalEmail', () => {
  it('should exists', () => {
    const ExamplePersonalEmail = require('../ExamplePersonalEmail');

    const wrapper = shallow((
      <ExamplePersonalEmail />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const ExamplePersonalEmail = require('../ExamplePersonalEmail');

    const wrapper = shallow((
      <ExamplePersonalEmail />
    ));

    expect(wrapper.find('div')).to.have.length(1);
  });
});
