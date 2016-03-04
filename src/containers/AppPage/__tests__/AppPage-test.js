import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

function noop() {}

describe('AppPage', () => {
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
      'components/WrapperAppPage',
      require('helpers/test/componentsMock').WrapperAppPage
    );
    mockery.registerMock(
      'react-redux',
      require('helpers/test/reactReduxMock')
    );
  });

  afterEach(() => {
    mockery.deregisterMock('decorators/pureRender');
    mockery.deregisterMock('components/WrapperAppPage');
    mockery.deregisterMock('react-redux');
    mockery.disable();
  });

  it('should exists', () => {
    const AppPage = require('../AppPage');
    const wrapper = shallow((
      <AppPage
        shuffleQuestions={noop}
      />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render AppPage components', () => {
    const AppPage = require('../AppPage');
    const wrapper = shallow((
      <AppPage />
    ));

    expect(wrapper.find('WrapperAppPage')).to.have.length(1);
  });
});
