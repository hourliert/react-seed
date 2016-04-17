import chai, { expect } from 'chai';
import mockery from 'mockery';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);
chai.use(sinonChai);

import { shallow } from 'enzyme';

import React from 'react';

function noop() {}

describe('LinkItem', () => {
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
      'react-router',
      require('helpers/test/reactRouterMock')
    );
  });

  afterEach(() => {
    mockery.deregisterMock('pure-render-decorator');
    mockery.deregisterMock('material-ui');
    mockery.deregisterMock('react-router');
    mockery.disable();
  });

  describe('Without DOM', () => {
    it('should exists', () => {
      const LinkItem = require('../LinkItem');
      const wrapper = shallow(
        <LinkItem
          item={{}}
          onLinkTouch={noop}
        />
      );
      expect(wrapper).to.have.length(1);
    });

    it('should render LinkItem components', () => {
      const LinkItem = require('../LinkItem');
      const wrapper = shallow(
        <LinkItem
          item={{
            withDivider: true,
          }}
          onLinkTouch={noop}
        />
      );
      expect(wrapper.find('MenuItem')).to.have.length(1);
      expect(wrapper.find('Divider')).to.have.length(1);
    });
  });
});
