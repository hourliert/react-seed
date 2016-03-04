import chai, { expect } from 'chai';
import mockery from 'mockery';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);
chai.use(sinonChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('SelectorIconMenu', () => {
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
      mockery.registerMock('components/ListSelector',
        require('helpers/test/componentsMock').ListSelector
      );
    });

    afterEach(() => {
      mockery.deregisterMock('decorators/pureRender');
      mockery.deregisterMock('material-ui');
      mockery.deregisterMock('components/ListSelector');
      mockery.disable();
    });

    it('should exists', () => {
      const SelectorIconMenu = require('../SelectorIconMenu');
      const wrapper = shallow(
        <SelectorIconMenu />
      );

      expect(wrapper).to.have.length(1);
    });

    it('should render the SelectorIconMenu components', () => {
      const SelectorIconMenu = require('../SelectorIconMenu');
      const wrapper = shallow(
        <SelectorIconMenu
          list={[
            {
              id: '1',
              name: 'Org 1',
              isSelected: true,
            },
            {
              id: '2',
              name: 'Org 2',
            },
          ]}
        />
      );

      expect(wrapper.find('IconButton')).to.have.length(1);
      expect(wrapper.find('Popover')).to.have.length(1);
      expect(wrapper.find('ListSelector')).to.have.length(1);
    });
  });
});
