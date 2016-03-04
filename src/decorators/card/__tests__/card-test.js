import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('card decorator', () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true,
    });
    mockery.registerMock(
      'material-ui',
      require('helpers/test/materialUiMock')
    );
  });

  afterEach(() => {
    mockery.deregisterMock('material-ui');
    mockery.disable();
  });

  it('should exists', () => {
    const card = require('../card');
    expect(card).to.be.ok();
  });

  it('should define a composed component wrapped by a card', () => {
    const MUI = require('material-ui');
    const card = require('../card');
    const Component = () => (
      <span className="composed-component">Component</span>
    );

    const ComposedComponent = card(Component);

    const wrapper = shallow(
      <ComposedComponent
        container={<MUI.Card />}
      />
    );

    expect(wrapper).to.have.length(1);
    expect(wrapper.find('Card')).to.have.length(1);
  });

  it('should define a composed component wrapped by a paper', () => {
    const MUI = require('material-ui');
    const card = require('../card');
    const Component = () => (
      <span className="composed-component">Component</span>
    );

    const ComposedComponent = card(Component);

    const wrapper = shallow(
      <ComposedComponent
        container={<MUI.Paper />}
      />
    );

    expect(wrapper).to.have.length(1);
    expect(wrapper.find('Paper')).to.have.length(1);
  });
});
