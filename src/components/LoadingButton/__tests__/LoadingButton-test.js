import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('LoadingButton', () => {
  it('should exists', () => {
    const LoadingButton = require('../LoadingButton');

    const wrapper = shallow((
      <LoadingButton />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const LoadingButton = require('../LoadingButton');

    const wrapper = shallow((
      <LoadingButton />
    ));

    expect(wrapper.find('div')).to.have.length(1);
  });
});
