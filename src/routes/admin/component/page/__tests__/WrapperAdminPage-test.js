import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('WrapperAdminPage', () => {
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
  });

  afterEach(() => {
    mockery.deregisterMock('decorators');
    mockery.disable();
  });

  it('should exists', () => {
    const WrapperAdminPage = require('../WrapperAdminPage');

    const wrapper = shallow((
      <WrapperAdminPage />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const WrapperAdminPage = require('../WrapperAdminPage');

    const wrapper = shallow((
      <WrapperAdminPage />
    ));

    expect(wrapper.find('div')).to.have.length(1);
  });
});
