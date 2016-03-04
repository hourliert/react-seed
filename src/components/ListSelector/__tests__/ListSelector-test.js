import chai, { expect } from 'chai';
import mockery from 'mockery';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);
chai.use(sinonChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('ListSelector', () => {
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
      mockery.registerMock('components/CheckboxItem',
        require('helpers/test/componentsMock').CheckboxItem
      );
      mockery.registerMock('react-list',
        require('helpers/test/reactListMock')
      );
    });

    afterEach(() => {
      mockery.deregisterMock('decorators/pureRender');
      mockery.deregisterMock('material-ui');
      mockery.deregisterMock('react-list');
      mockery.deregisterMock('components/WithLoading');
      mockery.deregisterMock('components/CheckboxItem');
      mockery.disable();
    });

    it('should exists', () => {
      const ListSelector = require('../ListSelector');
      const wrapper = shallow(
        <ListSelector />
      );

      expect(wrapper).to.have.length(1);
    });

    it('should render the ListSelector components', () => {
      const ListSelector = require('../ListSelector');
      const wrapper = shallow(
        <ListSelector
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

      expect(wrapper.find('WithLoading')).to.have.length(1);
      expect(wrapper.find('List')).to.have.length(1);
      expect(wrapper.find('ReactList')).to.have.length(1);
    });
  });
});
