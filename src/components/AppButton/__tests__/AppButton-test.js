import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('AppButton', () => {
  it('should exists', () => {
    const AppButton = require('../AppButton');

    const wrapper = shallow((
      <AppButton />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const AppButton = require('../AppButton');

    const wrapper = shallow((
      <AppButton />
    ));

    expect(wrapper.find('div')).to.have.length(1);
  });
});
