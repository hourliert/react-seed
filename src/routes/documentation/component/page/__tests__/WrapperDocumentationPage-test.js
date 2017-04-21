import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('WrapperDocumentationPage', () => {
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
    const WrapperDocumentationPage = require('../WrapperDocumentationPage');

    const wrapper = shallow((
      <WrapperDocumentationPage />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const WrapperDocumentationPage = require('../WrapperDocumentationPage');

    const wrapper = shallow((
      <WrapperDocumentationPage />
    ));

    expect(wrapper.find('div')).to.have.length(1);
  });
});
