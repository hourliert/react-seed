import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('WithLoading', () => {
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
  });

  afterEach(() => {
    mockery.deregisterMock('decorators');
    mockery.disable();
  });

  describe('Without DOM', () => {
    it('should work', () => {
      const WithLoading = require('../WithLoading');

      const wrapper = shallow(
        <WithLoading>
          <div>test</div>
        </WithLoading>,
        {
          context: { muiTheme: { rawTheme: { palette: {} } } },
        }
      );
      expect(wrapper).to.have.length(1);
    });

    it('should render all the WithLoading components', () => {
      const WithLoading = require('../WithLoading');

      const wrapper = shallow(
        <WithLoading>
          <span>To display when loaded</span>
        </WithLoading>,
        {
          context: { muiTheme: { rawTheme: { palette: {} } } },
        }
      );

      expect(wrapper.find('div')).to.have.length(1);
    });

    it('should render all the WithLoading components when flex', () => {
      const WithLoading = require('../WithLoading');

      const wrapper = shallow(
        <WithLoading isLoading>
          <span>To display when loaded</span>
        </WithLoading>,
        {
          context: { muiTheme: { rawTheme: { palette: {} } } },
        }
      );

      expect(wrapper.find('div')).to.have.length(1);
      expect(wrapper.find('div').prop('className')).to.equal(
        'flex layout vertical center-center'
      );
    });
  });
});
