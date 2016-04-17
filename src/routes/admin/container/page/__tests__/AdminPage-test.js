import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe.skip('AdminPage', () => {
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
      'components/WrapperAdminPage ',
      require('helpers/test/componentsMock').WrapperAdminPage
    );
    mockery.registerMock(
      'react-redux',
      require('helpers/test/reactReduxMock')
    );
  });

  afterEach(() => {
    mockery.deregisterMock('decorators');
    mockery.deregisterMock('components/WrapperAdminPage');
    mockery.deregisterMock('react-redux');
    mockery.disable();
  });

  it('should exists', () => {
    const AdminPage = require('../AdminPage');

    const wrapper = shallow((
      <AdminPage />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const AdminPage = require('../AdminPage');

    const wrapper = shallow((
      <AdminPage />
    ));

    expect(wrapper.find('WrapperAdminPage')).to.have.length(1);
  });
});
