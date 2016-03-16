import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('WrapperSigninPage', () => {
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
    const WrapperSigninPage = require('../WrapperSigninPage');

    const wrapper = shallow((
      <WrapperSigninPage />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const WrapperSigninPage = require('../WrapperSigninPage');

    const wrapper = shallow((
      <WrapperSigninPage />
    ));

    expect(wrapper.find('CardsList')).to.have.length(1);
    expect(wrapper.find('LoginCard')).to.have.length(1);
  });
});
