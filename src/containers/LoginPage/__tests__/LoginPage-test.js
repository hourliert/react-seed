import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('LoginPage', () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true,
    });
    mockery.registerMock(
      'decorators/pureRender',
      require('helpers/test/decoratorsMock').pureRender
    );
    mockery.registerMock(
      'components/WrapperLoginPage',
      require('helpers/test/componentsMock').WrapperLoginPage
    );
    mockery.registerMock(
      'react-redux',
      require('helpers/test/reactReduxMock')
    );
  });

  afterEach(() => {
    mockery.deregisterMock('decorators/pureRender');
    mockery.deregisterMock('components/WrapperLoginPage');
    mockery.deregisterMock('react-redux');
    mockery.disable();
  });

  it('should exists', () => {
    const LoginPage = require('../LoginPage');

    const wrapper = shallow((
      <LoginPage />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render LoginPage components', () => {
    const LoginPage = require('../LoginPage');

    const wrapper = shallow((
      <LoginPage />
    ));

    expect(wrapper.find('WrapperLoginPage')).to.have.length(1);
  });
});
