import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('Wrapper Login Page', () => {
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
    mockery.registerMock(
      'components/LoginForm',
      require('helpers/test/componentsMock').LoginForm
    );
    mockery.registerMock(
      'components/CardsList',
      require('helpers/test/componentsMock').CardsList
    );
  });

  afterEach(() => {
    mockery.deregisterMock('material-ui');
    mockery.deregisterMock('decorators/pureRender');
    mockery.deregisterMock('components/LoginForm');
    mockery.deregisterMock('components/CardsList');
    mockery.disable();
  });

  it('should work', () => {
    const WrapperLoginPage = require('../WrapperLoginPage');

    const wrapper = shallow(
      <WrapperLoginPage />
    );

    expect(wrapper).to.have.length(1);
  });

  it('should render the wrapper components', () => {
    const WrapperLoginPage = require('../WrapperLoginPage');

    const wrapper = shallow(
      <WrapperLoginPage />
    );

    expect(wrapper.find('CardsList')).to.have.length(1);
    expect(wrapper.find('LoginCard')).to.have.length(1);
  });
});
