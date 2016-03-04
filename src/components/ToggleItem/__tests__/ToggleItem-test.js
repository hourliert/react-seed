import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('ToggleItem', () => {
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
      'material-ui',
      require('helpers/test/materialUiMock')
    );
  });

  afterEach(() => {
    mockery.deregisterMock('decorators/pureRender');
    mockery.deregisterMock('material-ui');
    mockery.disable();
  });

  describe('Without DOM', () => {
    it('should work', () => {
      const ToggleItem = require('../ToggleItem');
      const wrapper = shallow(
        <ToggleItem />,
      );
      expect(wrapper).to.have.length(1);
    });

    it('should render the ToggleItem components', () => {
      const ToggleItem = require('../ToggleItem');
      const wrapper = shallow(
        <ToggleItem />,
      );
      expect(wrapper.find('ListItem')).to.have.length(1);
    });
  });
});
