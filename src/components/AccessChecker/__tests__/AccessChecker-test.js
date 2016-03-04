import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('AccessChecker', () => {
  const currentAccessLevel = {
    bitMask: 2,
  };

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
      const AccessChecker = require('../AccessChecker');
      const wrapper = shallow(
        <AccessChecker
          requiredAccessLevel={{ bitMask: 7 }}
        />, {
          context: { currentAccessLevel },
        }
      );

      expect(wrapper).to.have.length(1);
    });

    it('should allow access to the children', () => {
      const AccessChecker = require('../AccessChecker');
      const wrapper = shallow(
        <AccessChecker
          requiredAccessLevel={{ bitMask: 7 }}
        >
          <div id="child">User</div>
        </AccessChecker>, {
          context: { currentAccessLevel },
        }
      );

      expect(wrapper.find('#child')).to.have.length(1);
      expect(wrapper.find('#child').text()).to.equal('User');
    });

    it('should disallow access to the children', () => {
      const AccessChecker = require('../AccessChecker');
      const wrapper = shallow(
        <AccessChecker
          requiredAccessLevel={{ bitMask: 4 }}
        >
          <div id="child">Admin</div>
        </AccessChecker>, {
          context: { currentAccessLevel },
        }
      );

      expect(wrapper.find('#child')).to.have.length(0);
    });

    it('should not render the component if access is denied', () => {
      const AccessChecker = require('../AccessChecker');
      const wrapper = shallow(
        <AccessChecker
          requiredAccessLevel={{ bitMask: 4 }}
        >
          <div id="child">Admin</div>
        </AccessChecker>, {
          context: { currentAccessLevel },
        }
      );

      expect(wrapper.find('div').first().props().style.visibility).to.equal('hidden');
    });
  });
});
