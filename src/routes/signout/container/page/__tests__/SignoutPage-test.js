import chai, { expect } from 'chai';
import sinon from 'sinon';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';
chai.use(dirtyChai);
chai.use(sinonChai);

import { shallow } from 'enzyme';

import React from 'react';

const noop = () => {};

describe.skip('SignoutPage', () => {
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
      'components/WrapperSignoutPage ',
      require('helpers/test/componentsMock').WrapperSignoutPage
    );
    mockery.registerMock(
      'react-redux',
      require('helpers/test/reactReduxMock')
    );
  });

  afterEach(() => {
    mockery.deregisterMock('decorators');
    mockery.deregisterMock('components/WrapperSignoutPage');
    mockery.deregisterMock('react-redux');
    mockery.disable();
  });

  it('should exists', () => {
    const SignoutPage = require('../SignoutPage');

    const wrapper = shallow((
      <SignoutPage signout={noop} />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const signout = sinon.spy();
    const SignoutPage = require('../SignoutPage');

    const wrapper = shallow((
      <SignoutPage signout={signout} />
    ));

    expect(wrapper.find('WrapperSignoutPage')).to.have.length(1);
    expect(signout).to.have.been.called();
  });
});
