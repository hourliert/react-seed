import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe.skip('UserIndexPage', () => {
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
      'components/WrapperUserIndexPage ',
      require('helpers/test/componentsMock').WrapperUserIndexPage
    );
    mockery.registerMock(
      'react-redux',
      require('helpers/test/reactReduxMock')
    );
  });

  afterEach(() => {
    mockery.deregisterMock('decorators');
    mockery.deregisterMock('components/WrapperUserIndexPage');
    mockery.deregisterMock('react-redux');
    mockery.disable();
  });

  it('should exists', () => {
    const UserIndexPage = require('../UserIndexPage');

    const wrapper = shallow((
      <UserIndexPage />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const UserIndexPage = require('../UserIndexPage');

    const wrapper = shallow((
      <UserIndexPage />
    ));

    expect(wrapper.find('WrapperUserIndexPage')).to.have.length(1);
  });
});
