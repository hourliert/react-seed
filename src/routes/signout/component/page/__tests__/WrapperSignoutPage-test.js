import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('WrapperSignoutPage', () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true,
    });
    mockery.registerMock(
      'decorators',
      require('helpers/test/decoratorsMock')
    );
  });

  afterEach(() => {
    mockery.deregisterMock('decorators');
    mockery.disable();
  });

  it('should exists', () => {
    const WrapperSignoutPage = require('../WrapperSignoutPage');

    const wrapper = shallow((
      <WrapperSignoutPage />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const WrapperSignoutPage = require('../WrapperSignoutPage');

    const wrapper = shallow((
      <WrapperSignoutPage />
    ));

    expect(wrapper.find('CardsList')).to.have.length(1);
  });

  it('should render inner components when loading', () => {
    const WrapperSignoutPage = require('../WrapperSignoutPage');

    const wrapper = shallow((
      <WrapperSignoutPage isLoading />
    ));

    expect(wrapper.find('CircularProgress')).to.have.length(1);
  });
});
