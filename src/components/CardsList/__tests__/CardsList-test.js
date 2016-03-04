import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('CardsList', () => {
  describe('Without DOM', () => {
    beforeEach(() => {
      mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false,
        useCleanCache: true,
      });
      mockery.registerMock('decorators', require('helpers/test/decoratorsMock'));
    });

    afterEach(() => {
      mockery.deregisterMock('decorators');
      mockery.disable();
    });

    it('should be defined', () => {
      const CardsList = require('../CardsList');
      const wrapper = shallow(
        <CardsList />
      );

      expect(wrapper).to.have.length(1);
    });

    it('should render a child with the correct classname', () => {
      const CardsList = require('../CardsList');
      const wrapper = shallow(
        <CardsList>
          <span>Here</span>
        </CardsList>
      );

      expect(wrapper.find('span')).to.have.length(1);
      expect(wrapper.find('span').text()).to.equal('Here');
      expect(wrapper.find('div').prop('className')).to.equal('layout vertical center-center');
    });

    it('should render a child with the correct classname', () => {
      const CardsList = require('../CardsList');
      const wrapper = shallow(
        <CardsList flex>
          <img src="test.png" />
        </CardsList>
      );

      expect(wrapper.find('img')).to.have.length(1);
      expect(wrapper.find('div').prop('className')).to.equal('flex layout vertical center-center');
    });
  });
});
