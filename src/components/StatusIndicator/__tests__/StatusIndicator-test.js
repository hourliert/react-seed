import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe.skip('StatusIndicator', () => {
  it('should exists', () => {
    const StatusIndicator = require('../StatusIndicator');

    const wrapper = shallow((
      <StatusIndicator />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const StatusIndicator = require('../StatusIndicator');

    const wrapper = shallow((
      <StatusIndicator />
    ));

    expect(wrapper.find('div')).to.have.length(1);
  });
});
