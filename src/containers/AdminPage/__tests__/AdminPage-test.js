import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('AdminPage', () => {
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
      'components/WrapperAdminPage',
      require('helpers/test/componentsMock').WrapperAdminPage
    );
  });

  afterEach(() => {
    mockery.deregisterMock('decorators/pureRender');
    mockery.deregisterMock('components/WrapperAdminPage');
    mockery.disable();
  });

  it('should exists', () => {
    const AdminIndex = require('../AdminPage');

    const wrapper = shallow((
      <AdminIndex />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render admin index components', () => {
    const AdminIndex = require('../AdminPage');

    const wrapper = shallow((
      <AdminIndex />
    ));

    expect(wrapper.find('WrapperAdminPage')).to.have.length(1);
  });
});
