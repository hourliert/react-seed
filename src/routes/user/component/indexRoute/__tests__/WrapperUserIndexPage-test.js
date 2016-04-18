import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('WrapperUserIndexPage', () => {
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
      'components/CardsList',
      require('helpers/test/componentsMock').CardsList
    );
    mockery.registerMock(
      'components/WelcomeCard',
      require('helpers/test/componentsMock').WelcomeCard
    );
  });

  afterEach(() => {
    mockery.deregisterMock('decorators');
    mockery.deregisterMock('components/CardsList');
    mockery.deregisterMock('components/WelcomeCard');
    mockery.disable();
  });

  it('should exists', () => {
    const WrapperUserIndexPage = require('../WrapperUserIndexPage');

    const wrapper = shallow((
      <WrapperUserIndexPage />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const WrapperUserIndexPage = require('../WrapperUserIndexPage');

    const wrapper = shallow((
      <WrapperUserIndexPage />
    ));

    expect(wrapper.find('CardsList')).to.have.length(1);
    expect(wrapper.find('WelcomeCard')).to.have.length(1);
    expect(wrapper.find('div')).to.have.length(1);
  });
});
