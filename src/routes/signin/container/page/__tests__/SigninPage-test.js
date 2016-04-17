import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe.skip('SigninPage', () => {
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
    mockery.registerMock(
      'components/WrapperSigninPage ',
      require('helpers/test/componentsMock').WrapperSigninPage
    );
    mockery.registerMock(
      'react-redux',
      require('helpers/test/reactReduxMock')
    );
  });

  afterEach(() => {
    mockery.deregisterMock('decorators');
    mockery.deregisterMock('components/WrapperSigninPage');
    mockery.deregisterMock('react-redux');
    mockery.disable();
  });

  it('should exists', () => {
    const SigninPage = require('../SigninPage');

    const wrapper = shallow((
      <SigninPage />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const SigninPage = require('../SigninPage');

    const wrapper = shallow((
      <SigninPage />
    ));

    expect(wrapper.find('WrapperSigninPage')).to.have.length(1);
  });
});
