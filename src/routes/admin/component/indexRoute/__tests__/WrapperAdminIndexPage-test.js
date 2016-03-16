import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('WrapperAdminIndexPage', () => {
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
    const WrapperAdminIndexPage = require('../WrapperAdminIndexPage');

    const wrapper = shallow((
      <WrapperAdminIndexPage />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const WrapperAdminIndexPage = require('../WrapperAdminIndexPage');

    const wrapper = shallow((
      <WrapperAdminIndexPage />
    ));

    expect(wrapper.find('div')).to.have.length(1);
  });
});
