import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('Welcome Card', () => {
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

  describe('Without DOM', () => {
    it('should work', () => {
      const WelcomeCard = require('../WelcomeCard');

      const wrapper = shallow(
        <WelcomeCard>
          <div>test</div>
        </WelcomeCard>
      );
      expect(wrapper).to.have.length(1);
    });

    it('should render all the card components', () => {
      const WelcomeCard = require('../WelcomeCard');

      const wrapper = shallow(
        <WelcomeCard>
          <div>test</div>
          <div>Action</div>
        </WelcomeCard>
      );

      expect(wrapper.find('CardMedia')).to.have.length(1);
      expect(wrapper.find('CardTitle')).to.have.length(1);
      expect(wrapper.find('CardText')).to.have.length(1);
      expect(wrapper.find('CardActions')).to.have.length(1);
    });
  });
});
