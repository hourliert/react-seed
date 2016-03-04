import chai, { expect } from 'chai';
import mockery from 'mockery';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);
chai.use(sinonChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('SimpleActionCard', () => {
  describe('Without DOM', () => {
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
        'material-ui',
        require('helpers/test/materialUiMock')
      );
    });

    afterEach(() => {
      mockery.deregisterMock('decorators');
      mockery.deregisterMock('material-ui');
      mockery.disable();
    });

    it('should be defined', () => {
      const SimpleActionCard = require('../SimpleActionCard');
      const wrapper = shallow(
        <SimpleActionCard />,
      );
      expect(wrapper).to.have.length(1);
    });

    it('should render the SimpleActionCard components', () => {
      const SimpleActionCard = require('../SimpleActionCard');
      const wrapper = shallow(
        <SimpleActionCard title="test">
          <span>Here</span>
        </SimpleActionCard>,
      );
      expect(wrapper.find('CardTitle')).to.have.length(1);
      expect(wrapper.find('CardActions')).to.have.length(1);
      expect(wrapper.find('span')).to.have.length(1);
      expect(wrapper.find('span').text()).to.equal('Here');
    });
  });
});
