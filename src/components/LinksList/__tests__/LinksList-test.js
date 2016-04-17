import chai, { expect } from 'chai';
import mockery from 'mockery';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);
chai.use(sinonChai);

import { shallow } from 'enzyme';

import React from 'react';

function noop() {}

describe('LinksList', () => {
  const menuItems = [
    {
      icon: 'home',
      label: 'Home',
      url: '/home',
      withDivider: true,
      accessLevel: {
        bitMask: 7,
      },
    },
    {
      icon: 'settings',
      label: 'Settings',
      url: '/settings',
      accessLevel: {
        bitMask: 6,
      },
    },
    {
      icon: 'power_settings_new',
      label: 'Log Out',
      url: '/logout',
      accessLevel: {
        bitMask: 7,
      },
    },
  ];

  describe('Without DOM', () => {
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
      mockery.registerMock('components/AccessChecker',
        require('helpers/test/componentsMock').AccessChecker
      );
      mockery.registerMock('components/LinkItem',
        require('helpers/test/componentsMock').LinkItem
      );
    });

    afterEach(() => {
      mockery.deregisterMock('pure-render-decorator');
      mockery.deregisterMock('material-ui');
      mockery.deregisterMock('components/AccessChecker');
      mockery.deregisterMock('components/LinkItem');
      mockery.disable();
    });

    it('should exists', () => {
      const LinksList = require('../LinksList');
      const wrapper = shallow(
        <LinksList
          onLinkTouch={noop}
          links={[]}
        />
      );

      expect(wrapper).to.have.length(1);
    });

    it('should render the linkslist components', () => {
      const LinksList = require('../LinksList');
      const wrapper = shallow(
        <LinksList
          onLinkTouch={noop}
          links={[menuItems[0]]}
        />,
      );

      expect(wrapper.find('AccessChecker')).to.have.length(1);
      expect(wrapper.find('LinkItem')).to.have.length(1);
    });

    it('should render 3 menu items', () => {
      const LinksList = require('../LinksList');
      const wrapper = shallow(
        <LinksList
          onLinkTouch={noop}
          links={menuItems}
        />,
      );

      expect(wrapper.find('AccessChecker')).to.have.length(3);
      expect(wrapper.find('LinkItem')).to.have.length(3);
    });
  });
});
