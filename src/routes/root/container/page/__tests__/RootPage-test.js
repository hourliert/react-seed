import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe.skip('RootPage', () => {
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
      'components/WrapperRootPage ',
      require('helpers/test/componentsMock').WrapperRootPage
    );
    mockery.registerMock(
      'react-redux',
      require('helpers/test/reactReduxMock')
    );
  });

  afterEach(() => {
    mockery.deregisterMock('decorators');
    mockery.deregisterMock('components/WrapperRootPage');
    mockery.deregisterMock('react-redux');
    mockery.disable();
  });

  it('should exists', () => {
    const RootPage = require('../RootPage');

    const wrapper = shallow((
      <RootPage />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const RootPage = require('../RootPage');

    const wrapper = shallow((
      <RootPage />
    ));

    expect(wrapper.find('WrapperRootPage')).to.have.length(1);
  });
});
