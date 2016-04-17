import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

function noop() {}

describe('WrapperRootPage', () => {
  const appStatus = {
    leftNavOpen: true,
  };

  describe('Without DOM', () => {
    beforeEach(() => {
      mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false,
        useCleanCache: true,
      });
      mockery.registerMock(
        'material-ui',
        require('helpers/test/materialUiMock')
      );
      mockery.registerMock(
        'react-helmet',
        require('helpers/test/reactHelmetMock')
      );
      mockery.registerMock(
        'pure-render-decorator',
        require('helpers/test/decoratorsMock').pureRender
      );
      mockery.registerMock(
        'components/LeftMenuDrawer',
        require('helpers/test/componentsMock').LeftMenuDrawer
      );
      mockery.registerMock(
        'components/ErrorManager',
        require('helpers/test/componentsMock').ErrorManager
      );
    });

    afterEach(() => {
      mockery.deregisterMock('material-ui');
      mockery.deregisterMock('react-helmet');
      mockery.deregisterMock('pure-render-decorator');
      mockery.deregisterMock('components/LeftMenuDrawer');
      mockery.deregisterMock('components/ErrorManager');
      mockery.disable();
    });

    it('should work', () => {
      const WrapperRootPage = require('../WrapperRootPage');
      const wrapper = shallow(
        <WrapperRootPage
          leftNavMenuItems={[]}
          appStatus={appStatus}
          closeLeftNav={noop}
          toggleLeftNav={noop}
        >
          <div>children</div>
        </WrapperRootPage>,
        {
          context: { muiTheme: { rawTheme: { palette: {} } } },
        }
      );

      expect(wrapper).to.have.length(1);
    });

    it('should render the app Page components', () => {
      const WrapperRootPage = require('../WrapperRootPage');
      const wrapper = shallow(
        <WrapperRootPage
          leftNavMenuItems={[]}
          appStatus={appStatus}
          closeLeftNav={noop}
          toggleLeftNav={noop}
        >
          <div>children</div>
        </WrapperRootPage>,
        {
          context: { muiTheme: { rawTheme: { palette: {} } } },
        }
      );

      expect(wrapper.find('Helmet')).to.have.length(1);
      expect(wrapper.find('AppBar')).to.have.length(1);
      expect(wrapper.find('LeftMenuDrawer')).to.have.length(1);
    });

    it('should have a children', () => {
      const WrapperRootPage = require('../WrapperRootPage');
      const wrapper = shallow(
        <WrapperRootPage
          leftNavMenuItems={[]}
          appStatus={appStatus}
          closeLeftNav={noop}
          toggleLeftNav={noop}
        >
          <div>children!</div>
        </WrapperRootPage>,
        {
          context: { muiTheme: { rawTheme: { palette: {} } } },
        }
      );

      expect(wrapper.children().last().text()).to.equal('children!');
    });
  });
});
