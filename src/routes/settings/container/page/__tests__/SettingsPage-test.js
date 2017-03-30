import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('SettingsPage', () => {
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
      'components/WrapperSettingsPage ',
      require('helpers/test/componentsMock').WrapperSettingsPage
    );
    mockery.registerMock(
      'react-redux',
      require('helpers/test/reactReduxMock')
    );
  });

  afterEach(() => {
    mockery.deregisterMock('decorators');
    mockery.deregisterMock('components/WrapperSettingsPage');
    mockery.deregisterMock('react-redux');
    mockery.disable();
  });

  it('should exists', () => {
    const SettingsPage = require('../SettingsPage');

    const wrapper = shallow((
      <SettingsPage />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const SettingsPage = require('../SettingsPage');

    const wrapper = shallow((
      <SettingsPage />
    ));

    expect(wrapper.find('WrapperSettingsPage')).to.have.length(1);
  });
});
