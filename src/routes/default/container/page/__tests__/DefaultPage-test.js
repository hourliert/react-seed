import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('DefaultPage', () => {
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
      'components/WrapperDefaultPage ',
      require('helpers/test/componentsMock').WrapperDefaultPage
    );
  });

  afterEach(() => {
    mockery.deregisterMock('decorators');
    mockery.deregisterMock('components/WrapperDefaultPage');
    mockery.disable();
  });

  it('should exists', () => {
    const DefaultPage = require('../DefaultPage');

    const wrapper = shallow((
      <DefaultPage />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const DefaultPage = require('../DefaultPage');

    const wrapper = shallow((
      <DefaultPage />
    ));

    expect(wrapper.find('WrapperDefaultPage')).to.have.length(1);
  });
});
