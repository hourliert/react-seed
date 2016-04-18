import chai, { expect } from 'chai';
import mockery from 'mockery';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);
chai.use(sinonChai);

import { shallow } from 'enzyme';

import React from 'react';

function noop() {}

describe('LeftMenuDrawer', () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true,
    });
    mockery.registerMock(
      'pure-render-decorator',
      require('helpers/test/decoratorsMock').pureRender
    );
    mockery.registerMock(
      'material-ui',
      require('helpers/test/materialUiMock')
    );
    mockery.registerMock(
      'components/LinksList',
      require('helpers/test/componentsMock').LinksList
    );
  });

  afterEach(() => {
    mockery.deregisterMock('pure-render-decorator');
    mockery.deregisterMock('material-ui');
    mockery.deregisterMock('components/LinksList');
    mockery.disable();
  });

  describe('Without DOM', () => {
    it('should exists', () => {
      const LeftMenuDrawer = require('../LeftMenuDrawer');
      const wrapper = shallow(
        <LeftMenuDrawer
          open={false}
          onClose={noop}
          menuItems={[]}
        />
      );
      expect(wrapper).to.have.length(1);
    });

    it('should render the components of LeftMenuDrawer', () => {
      const LeftMenuDrawer = require('../LeftMenuDrawer');
      const wrapper = shallow(
        <LeftMenuDrawer
          open={false}
          onClose={noop}
          menuItems={[]}
        />
      );

      expect(wrapper.find('AppBar')).to.have.length(1);
      expect(wrapper.find('LinksList')).to.have.length(1);
    });
  });
});
