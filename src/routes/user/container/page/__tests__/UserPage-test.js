import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe.skip('UserPage', () => {
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
      'components/WrapperUserPage ',
      require('helpers/test/componentsMock').WrapperUserPage
    );
    mockery.registerMock(
      'react-redux',
      require('helpers/test/reactReduxMock')
    );
  });

  afterEach(() => {
    mockery.deregisterMock('decorators');
    mockery.deregisterMock('components/WrapperUserPage');
    mockery.deregisterMock('react-redux');
    mockery.disable();
  });

  it('should exists', () => {
    const UserPage = require('../UserPage');

    const wrapper = shallow((
      <UserPage />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const UserPage = require('../UserPage');

    const wrapper = shallow((
      <UserPage />
    ));

    expect(wrapper.find('WrapperUserPage')).to.have.length(1);
  });
});
