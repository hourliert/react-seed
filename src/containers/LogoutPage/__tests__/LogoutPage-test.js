import chai, { expect } from 'chai';
import sinon from 'sinon';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('LogoutPage', () => {
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
      'components/WrapperLogoutPage',
      require('helpers/test/componentsMock').WrapperLogoutPage
    );
    mockery.registerMock(
      'react-redux',
      require('helpers/test/reactReduxMock')
    );
  });

  afterEach(() => {
    mockery.deregisterMock('decorators/pureRender');
    mockery.deregisterMock('components/WrapperLogoutPage');
    mockery.deregisterMock('react-redux');
    mockery.disable();
  });

  it('should exists', () => {
    const signout = sinon.spy();
    const LogoutPage = require('../LogoutPage');

    const wrapper = shallow((
      <LogoutPage signout={signout} />
    ));

    expect(signout).to.have.been.called();
    expect(wrapper).to.have.length(1);
  });

  it('should render LogoutPage components', () => {
    const signout = sinon.spy();
    const LogoutPage = require('../LogoutPage');

    const wrapper = shallow((
      <LogoutPage signout={signout} />
    ));

    expect(signout).to.have.been.called();
    expect(wrapper.find('WrapperLogoutPage')).to.have.length(1);
  });
});
