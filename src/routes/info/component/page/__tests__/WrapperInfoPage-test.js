import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('WrapperInfoPage', () => {
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
      'components/UserInfo',
      require('helpers/test/componentsMock').UserInfo
   );
    mockery.registerMock(
      'components/SessionInfo',
      require('helpers/test/componentsMock').SessionInfo
    );
    mockery.registerMock(
      'react-helmet',
      require('helpers/test/reactHelmetMock')
    );
  });

  afterEach(() => {
    mockery.deregisterMock('decorators');
    mockery.deregisterMock('react-helmet');
    mockery.deregisterMock('components/UserInfo');
    mockery.deregisterMock('components/CardsList');
    mockery.deregisterMock('components/SessionInfo');
    mockery.disable();
  });

  it('should work', () => {
    const WrapperInfoPage = require('../WrapperInfoPage');
    const wrapper = shallow(
      <WrapperInfoPage />
    );
    expect(wrapper).to.have.length(1);
  });

  it('should render the Wrapper components', () => {
    const WrapperInfoPage = require('../WrapperInfoPage');
    const wrapper = shallow(
      <WrapperInfoPage />
    );
    expect(wrapper.find('Helmet')).to.be.ok();
    expect(wrapper.find('CardsList')).to.be.ok();
    expect(wrapper.find('UserInfo')).to.be.ok();
    expect(wrapper.find('SessionInfo')).to.be.ok();
  });

  it('should render correctly a SessionInfo card', () => {
    const WrapperInfoPage = require('../WrapperInfoPage');
    const wrapper = shallow(
      <WrapperInfoPage session={{ session: true }} />
    );
    expect(wrapper.find('SessionInfo')).to.be.ok();
    expect(wrapper.find('SessionInfo').props().info).to.be.deep.equal({
      session: true,
    });
  });

  it('should render correctly a UserInfo card', () => {
    const WrapperInfoPage = require('../WrapperInfoPage');
    const wrapper = shallow(
      <WrapperInfoPage user={{ user: true }} />
    );
    expect(wrapper.find('UserInfo')).to.be.ok();
    expect(wrapper.find('UserInfo').props().info).to.be.deep.equal({
      user: true,
    });
  });
});
