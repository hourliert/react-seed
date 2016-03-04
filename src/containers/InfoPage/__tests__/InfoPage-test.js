import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('InfoPage', () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true,
    });
    mockery.registerMock(
      'decorators/pureRender',
      require('helpers/test/decoratorsMock').pureRender
    );
    mockery.registerMock(
      'components/WrapperInfoPage',
      require('helpers/test/componentsMock').WrapperInfoPage
    );
    mockery.registerMock(
      'react-redux',
      require('helpers/test/reactReduxMock')
    );
  });

  afterEach(() => {
    mockery.deregisterMock('decorators/pureRender');
    mockery.deregisterMock('components/WrapperInfoPage');
    mockery.deregisterMock('react-redux');
    mockery.disable();
  });

  it('should exists', () => {
    const InfoPage = require('../InfoPage');

    const wrapper = shallow((
      <InfoPage />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render InfoPage components', () => {
    const InfoPage = require('../InfoPage');

    const wrapper = shallow((
      <InfoPage />
    ));

    expect(wrapper.find('WrapperInfoPage')).to.have.length(1);
  });
});
