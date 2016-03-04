import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('UserInfo', () => {
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
      const UserInfo = require('../UserInfo');
      const wrapper = shallow(
        <UserInfo info={{}} />
      );
      expect(wrapper).to.have.length(1);
    });

    it('should render all the card components', () => {
      const UserInfo = require('../UserInfo');
      const wrapper = shallow(
        <UserInfo
          info={{
            firstName: 'Thomas',
            lastName: 'Hourlier',
            isAdmin: false,
            email: 'thomashourlier@',
            entityId: 'entity/1',
          }}
        />
      );

      expect(wrapper.find('CardHeader')).to.have.length(1);
      expect(wrapper.find('CardTitle')).to.have.length(1);
      expect(wrapper.find('CardText')).to.have.length(1);
      expect(wrapper.find('p')).to.have.length(2);
    });
  });
});
