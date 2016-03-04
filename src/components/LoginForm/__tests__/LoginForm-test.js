import chai, { expect } from 'chai';
import mockery from 'mockery';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);
chai.use(sinonChai);

import { shallow } from 'enzyme';

import React from 'react';

import validate from '../validationRules';

describe('LoginForm', () => {
  describe('Without DOM', () => {
    beforeEach(() => {
      mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false,
        useCleanCache: true,
      });
      mockery.registerMock('material-ui', require('helpers/test/materialUiMock'));
      mockery.registerMock('redux-form', require('helpers/test/reduxFormMock'));
      mockery.registerMock('decorators', require('helpers/test/decoratorsMock'));
    });

    afterEach(() => {
      mockery.deregisterMock('material-ui');
      mockery.deregisterMock('redux-form');
      mockery.deregisterMock('decorators');
      mockery.disable();
    });

    it('should validate the form', () => {
      let email = 'T';
      let password = '1';
      let errors = validate({ email, password });

      expect(errors.email).to.be.undefined();
      expect(errors.password).to.equal('Too short');

      email = 'Thomas';
      password = '1';
      errors = validate({ email, password });

      expect(errors.email).to.be.undefined();
      expect(errors.password).to.equal('Too short');

      email = '';
      password = '';
      errors = validate({ email, password });

      expect(errors.email).to.equal('Required');
      expect(errors.password).to.equal('Required');

      email = 'Thomas';
      password = '1234';
      errors = validate({ email, password });

      expect(errors.email).to.be.undefined();
      expect(errors.password).to.be.undefined();
    });

    it('should be defined', () => {
      const LoginForm = require('../LoginForm');
      const wrapper = shallow(
        <LoginForm
          fields={{ email: {}, password: {} }}
        />,
      );

      expect(wrapper).to.have.length(1);
    });

    it('should render one form with 2 TextFields and 2 FlatButton', () => {
      const LoginForm = require('../LoginForm');
      const wrapper = shallow(
        <LoginForm
          fields={{ email: {}, password: {} }}
        />,
      );

      expect(wrapper.find('TextField')).to.have.length(2);
      expect(wrapper.find('FlatButton')).to.have.length(2);
    });
  });
});
