import chai, { expect } from 'chai';
import mockery from 'mockery';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);
chai.use(sinonChai);

import { shallow } from 'enzyme';

import React from 'react';

function noop() {}

describe('Error Manager', () => {
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
      mockery.registerMock('material-ui', require('helpers/test/materialUiMock'));
    });

    afterEach(() => {
      mockery.deregisterMock('material-ui');
      mockery.deregisterMock('pure-render-decorator');
      mockery.disable();
    });

    it('should be defined', () => {
      const ErrorManager = require('../ErrorManager');
      const markErrorAsViewed = () => ({});
      const wrapper = shallow(
        <ErrorManager
          errors={{}}
          clearErrors={noop}
          markErrorsAsViewed={noop}
          markErrorAsViewed={markErrorAsViewed}
        />,
      );
      expect(wrapper).to.have.length(1);
    });

    it('should render the error manager components', () => {
      const ErrorManager = require('../ErrorManager');
      const now = new Date();

      const wrapper = shallow(
        <ErrorManager
          errors={{
            ACTION: {
              error: {
                message: 'One Error',
                description: 'My description',
                stack: ['High'],
                url: 'google.com',
                date: now,
                shortError: 'One Error',
                longError: 'One Error',
              },
              viewed: false,
            },
          }}
          clearErrors={noop}
          markErrorsAsViewed={noop}
        />,
      );

      expect(wrapper.find('Snackbar')).to.have.length(1);
      expect(wrapper.find('Dialog')).to.have.length(1);

      expect(wrapper.find('Snackbar').prop('message')).to.equal('One Error');
      expect(wrapper.find('Snackbar').prop('open')).to.equal(true);

      expect(wrapper.find('CardHeader')).to.have.length(1);
      expect(wrapper.find('CardHeader').prop('title')).to.contain('One Error');
      expect(wrapper.find('CardText')).to.have.length(2);
    });
  });
});
