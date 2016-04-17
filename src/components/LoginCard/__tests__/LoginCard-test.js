import chai, { expect } from 'chai';
import mockery from 'mockery';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);
chai.use(sinonChai);

import { shallow } from 'enzyme';

import React from 'react';

function noop() {}

describe('LoginCard', () => {
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
      mockery.registerMock('components/WithLoading',
        require('helpers/test/componentsMock').WithLoading
      );
      mockery.registerMock('components/LoginForm',
        require('helpers/test/componentsMock').LoginForm
      );
    });

    afterEach(() => {
      mockery.deregisterMock('pure-render-decorator');
      mockery.deregisterMock('material-ui');
      mockery.deregisterMock('components/WithLoading');
      mockery.deregisterMock('components/LoginForm');
      mockery.disable();
    });

    it('should exists', () => {
      const LoginCard = require('../LoginCard');
      const wrapper = shallow(
        <LoginCard
          onLinkTouch={noop}
          links={[]}
        />
      );

      expect(wrapper).to.have.length(1);
    });

    it('should render the LoginCard components', () => {
      const LoginCard = require('../LoginCard');
      const wrapper = shallow(
        <LoginCard
          onLinkTouch={noop}
          links={[]}
        />
      );

      expect(wrapper.find('WithLoading')).to.have.length(1);
      expect(wrapper.find('LoginForm')).to.have.length(1);
    });
  });
});
