import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('UserIndex', () => {
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
      'components/WrapperUserIndex',
      require('helpers/test/componentsMock').WrapperUserIndex
    );
    mockery.registerMock(
      'react-redux',
      require('helpers/test/reactReduxMock')
    );
  });

  afterEach(() => {
    mockery.deregisterMock('decorators/pureRender');
    mockery.deregisterMock('components/WrapperUserIndex');
    mockery.deregisterMock('react-redux');
    mockery.disable();
  });

  it('should exists', () => {
    const UserIndex = require('../UserIndex');

    const wrapper = shallow((
      <UserIndex />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render UserIndex components', () => {
    const UserIndex = require('../UserIndex');

    const wrapper = shallow((
      <UserIndex />
    ));

    expect(wrapper.find('WrapperUserIndex')).to.have.length(1);
  });
});
