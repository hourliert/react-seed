import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('Wrapper Settings Page', () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true,
    });
    mockery.registerMock('decorators', require('helpers/test/decoratorsMock'));
    mockery.registerMock(
      'components/CardsList',
      require('helpers/test/componentsMock').CardsList
   );
    mockery.registerMock(
      'components/GraphSettings',
      require('helpers/test/componentsMock').GraphSettings
    );
    mockery.registerMock(
      'components/OrganisationsSelector',
      require('helpers/test/componentsMock').OrganisationsSelector
    );
    mockery.registerMock(
      'react-helmet',
      require('helpers/test/reactHelmetMock')
    );
  });

  afterEach(() => {
    mockery.deregisterMock('decorators');
    mockery.deregisterMock('react-helmet');
    mockery.deregisterMock('components/CardsList');
    mockery.deregisterMock('components/GraphSettings');
    mockery.deregisterMock('components/OrganisationsSelector');
    mockery.disable();
  });

  it('should work', () => {
    const WrapperSettingsPage = require('../WrapperSettingsPage');
    const wrapper = shallow(
      <WrapperSettingsPage />
    );
    expect(wrapper).to.have.length(1);
  });

  it('should render the Wrapper components', () => {
    const WrapperSettingsPage = require('../WrapperSettingsPage');
    const wrapper = shallow(
      <WrapperSettingsPage />
    );
    expect(wrapper.find('Helmet')).to.be.ok();
    expect(wrapper.find('CardsList')).to.be.ok();
    expect(wrapper.find('OrganisationsSelector')).to.be.ok();
    expect(wrapper.find('GraphSettings')).to.be.ok();
  });
});
