import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('Wrapper User Index', () => {
  describe('Without DOM', () => {
    beforeEach(() => {
      mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false,
        useCleanCache: true,
      });
      mockery.registerMock('decorators', require('helpers/test/decoratorsMock'));
      mockery.registerMock(
        'components/CardsList',
        require('helpers/test/componentsMock').CardsList
      );
      mockery.registerMock(
        'components/WelcomeCard',
        require('helpers/test/componentsMock').WelcomeCard
      );
      mockery.registerMock(
        'react-helmet',
        require('helpers/test/reactHelmetMock')
      );
    });

    afterEach(() => {
      mockery.deregisterMock('decorators');
      mockery.deregisterMock('components/WelcomeCard');
      mockery.deregisterMock('components/CardsList');
      mockery.deregisterMock('react-helmet');
      mockery.disable();
    });

    it('should work', () => {
      const WrapperUserIndex = require('../WrapperUserIndex');
      const wrapper = shallow(
        <WrapperUserIndex />
      );
      expect(wrapper).to.have.length(1);
    });

    it('should render all the card components', () => {
      const WrapperUserIndex = require('../WrapperUserIndex');
      const wrapper = shallow(
        <WrapperUserIndex />
      );

      expect(wrapper.find('Helmet')).to.have.length(1);
      expect(wrapper.find('WelcomeCard')).to.have.length(1);
      expect(wrapper.find('FlatButton')).to.have.length(1);
    });
  });
});
