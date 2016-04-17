import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe.skip('AdminIndexPage', () => {
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
      'components/WrapperAdminIndexPage ',
      require('helpers/test/componentsMock').WrapperAdminIndexPage
    );
    mockery.registerMock(
      'react-redux',
      require('helpers/test/reactReduxMock')
    );
  });

  afterEach(() => {
    mockery.deregisterMock('decorators');
    mockery.deregisterMock('components/WrapperAdminIndexPage');
    mockery.deregisterMock('react-redux');
    mockery.disable();
  });

  it('should exists', () => {
    const AdminIndexPage = require('../AdminIndexPage');

    const wrapper = shallow(
      <AdminIndexPage />
    );

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const AdminIndexPage = require('../AdminIndexPage');

    const wrapper = shallow((
      <AdminIndexPage />
    ));

    expect(wrapper.find('WrapperAdminIndexPage')).to.have.length(1);
  });
});
