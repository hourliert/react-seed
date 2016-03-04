import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('Wrapper Logout Page', () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true,
    });
    mockery.registerMock(
      'material-ui',
      require('helpers/test/materialUiMock')
    );
    mockery.registerMock(
      'decorators',
      require('helpers/test/decoratorsMock')
    );
  });

  afterEach(() => {
    mockery.deregisterMock('material-ui');
    mockery.deregisterMock('decorators/pureRender');
    mockery.disable();
  });

  it('should work', () => {
    const WrapperLogoutPage = require('../WrapperLogoutPage');
    const wrapper = shallow(
      <WrapperLogoutPage />
    );

    expect(wrapper).to.have.length(1);
  });

  it('should render the inner components', () => {
    const WrapperLogoutPage = require('../WrapperLogoutPage');
    const wrapper = shallow(
      <WrapperLogoutPage isLoading />
    );

    expect(wrapper.find('CardsList')).to.have.length(1);
    expect(wrapper.find('CircularProgress')).to.have.length(1);
  });
});
