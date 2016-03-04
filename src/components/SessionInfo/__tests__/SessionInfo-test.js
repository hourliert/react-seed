import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
chai.use(dirtyChai);
chai.use(sinonChai);

import { shallow, mount } from 'enzyme';

import React from 'react';

describe('SessionInfo', () => {
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
    });

    afterEach(() => {
      mockery.deregisterMock('decorators');
      mockery.deregisterMock('material-ui');
      mockery.disable();
    });

    it('should work', () => {
      const SessionInfo = require('../SessionInfo');
      const wrapper = shallow(
        <SessionInfo
          info={{}}
          renderTime={1}
        />
      );
      expect(wrapper).to.have.length(1);
    });

    it('should render all the card components', () => {
      const SessionInfo = require('../SessionInfo');
      const wrapper = shallow(
        <SessionInfo
          info={{
            token: '1234',
            validTo: '1',
            created: '1',
          }}
          renderTime={+new Date()}
        />
      );

      expect(wrapper.find('CardHeader')).to.have.length(1);
      expect(wrapper.find('CardTitle')).to.have.length(1);
      expect(wrapper.find('CardText')).to.have.length(1);
    });
  });

  describe('With DOM', () => {
    let jsdom;

    beforeEach(() => {
      jsdom = require('jsdom-global')();
      mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false,
        useCleanCache: true,
      });
      mockery.registerMock(
        'decorators/pureRender',
        require('helpers/test/decoratorsMock').pureRender
      );
      mockery.registerMock(
        'material-ui',
        require('helpers/test/materialUiMock')
      );
    });

    afterEach(() => {
      mockery.deregisterMock('decorators/pureRender');
      mockery.deregisterMock('material-ui');
      mockery.disable();
      jsdom();
    });

    it('should work', () => {
      window.setInterval = sinon.stub();

      const SessionInfo = require('../SessionInfo');
      const wrapper = mount(
        <SessionInfo
          info={{}}
          renderTime={1}
        />
      );
      expect(wrapper).to.have.length(1);
    });

    it('should call the tick tock function', () => {
      window.setInterval = sinon.stub();

      const SessionInfo = require('../SessionInfo');
      const wrapper = mount(
        <SessionInfo
          info={{
            token: '1234',
            validTo: '1',
            created: '1',
          }}
          renderTime={+new Date()}
        />
      );

      expect(wrapper).to.be.ok();
      expect(window.setInterval).to.have.been.called();
    });
  });
});
