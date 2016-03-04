import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('AdminIndex', () => {
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
      'components/WrapperAdminIndex',
      require('helpers/test/componentsMock').WrapperAdminIndex
    );
    mockery.registerMock(
      'react-redux',
      require('helpers/test/reactReduxMock')
    );
  });

  afterEach(() => {
    mockery.deregisterMock('decorators/pureRender');
    mockery.deregisterMock('components/WrapperAdminIndex');
    mockery.deregisterMock('react-redux');
    mockery.disable();
  });

  it('should exists', () => {
    const AdminIndex = require('../AdminIndex');

    const wrapper = shallow((
      <AdminIndex />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render admin index components', () => {
    const AdminIndex = require('../AdminIndex');

    const wrapper = shallow((
      <AdminIndex />
    ));

    expect(wrapper.find('WrapperAdminIndex')).to.have.length(1);
  });
});
