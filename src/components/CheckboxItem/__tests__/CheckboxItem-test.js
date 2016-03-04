import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('CheckboxItem', () => {
  describe('Without DOM', () => {
    beforeEach(() => {
      mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false,
        useCleanCache: true,
      });
      mockery.registerMock('decorators', require('helpers/test/decoratorsMock'));
      mockery.registerMock('material-ui', require('helpers/test/materialUiMock'));
    });

    afterEach(() => {
      mockery.deregisterMock('decorators');
      mockery.deregisterMock('material-ui');
      mockery.disable();
    });

    it('should be defined', () => {
      const CheckboxItem = require('../CheckboxItem');
      const wrapper = shallow(
        <CheckboxItem />
      );

      expect(wrapper).to.have.length(1);
    });

    it('should render CheckboxItem components', () => {
      const CheckboxItem = require('../CheckboxItem');
      const wrapper = shallow(
        <CheckboxItem />
      );

      expect(wrapper.find('ListItem')).to.have.length(1);
      expect(wrapper.find('ListItem').prop('leftCheckbox').type.displayName).to.equal('Checkbox');
    });
  });
});
