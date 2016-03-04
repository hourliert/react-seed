import chai, { expect } from 'chai';
import mockery from 'mockery';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);
chai.use(sinonChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('GraphSettings', () => {
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
      mockery.registerMock('material-ui', require('helpers/test/materialUiMock'));
      mockery.registerMock(
        'components/ToggleItem',
        require('helpers/test/componentsMock').ToggleItem
      );
    });

    afterEach(() => {
      mockery.deregisterMock('material-ui');
      mockery.deregisterMock('decorators/pureRender');
      mockery.deregisterMock('components/ToggleItem');
      mockery.disable();
    });

    it('should be defined', () => {
      const GraphSettings = require('../GraphSettings');
      const wrapper = shallow(
        <GraphSettings settingsList={[]} />,
      );
      expect(wrapper).to.have.length(1);
    });

    it('should render the GraphSettings components', () => {
      const GraphSettings = require('../GraphSettings');
      const wrapper = shallow(
        <GraphSettings
          settingsList={[
            {
              id: 1,
              label: 'Settings 1',
              icon: 'icon 1',
              isChecked: true,
            },
            {
              id: 2,
              label: 'Settings 2',
              icon: 'icon 2',
              isChecked: true,
            },
          ]}
        />,
      );

      expect(wrapper.find('List')).to.have.length(1);
      expect(wrapper.find('ToggleItem')).to.have.length(2);
    });
  });
});
