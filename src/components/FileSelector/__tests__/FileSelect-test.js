import chai, { expect } from 'chai';
import mockery from 'mockery';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);
chai.use(sinonChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('File Selector', () => {
  describe('Without DOM', () => {
    beforeEach(() => {
      mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false,
        useCleanCache: true,
      });
      mockery.registerMock(
        'decorators/pureRender',
        require('helpers/test/decoratorsMock').pureRender
      );
      mockery.registerMock('material-ui', require('helpers/test/materialUiMock'));
    });

    afterEach(() => {
      mockery.deregisterMock('material-ui');
      mockery.deregisterMock('decorators/pureRender');
      mockery.disable();
    });

    it('should be defined', () => {
      const FileSelector = require('../FileSelector');
      const wrapper = shallow(
        <FileSelector field={{}} />,
      );
      expect(wrapper).to.have.length(1);
    });

    it('should render the file selector components', () => {
      const FileSelector = require('../FileSelector');
      const wrapper = shallow(
        <FileSelector field={{}} />,
      );

      expect(wrapper.find('FloatingActionButton')).to.have.length(1);
      expect(wrapper.find('FontIcon')).to.have.length(1);
      expect(wrapper.find('input')).to.have.length(1);
      expect(wrapper.find('TextField')).to.have.length(1);

      expect(wrapper.find('FontIcon').children().text()).to.equal('backup');
    });

    it('should render the curent selected file name', () => {
      const FileSelector = require('../FileSelector');
      const wrapper = shallow(
        <FileSelector field={{ value: [{ name: 'cat.png' }] }} />,
      );

      expect(wrapper.find('TextField').prop('value')).to.equal('cat.png');
    });
  });
});
