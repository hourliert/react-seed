import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('PersonalInfo', () => {
  it('should exists', () => {
    const PersonalInfo = require('../PersonalInfo');

    const wrapper = shallow((
      <PersonalInfo />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const PersonalInfo = require('../PersonalInfo');

    const wrapper = shallow((
      <PersonalInfo />
    ));

    expect(wrapper.find('div')).to.have.length(1);
  });
});
