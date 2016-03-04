import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import pureRender from 'decorators/pureRender';

import { loginPageSelector } from 'selectors';

import WrapperLoginPage from 'components/WrapperLoginPage';

import * as SessionActions from 'actions/session';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...SessionActions,
  }, dispatch);
}

@pureRender
@connect(loginPageSelector, mapDispatchToProps)
export default class LoginPage extends Component {
  static propTypes = {
    awaitSignin: PropTypes.func,

    isLoading: PropTypes.bool,
  };

  render() {
    const { awaitSignin, isLoading } = this.props;

    return (
      <WrapperLoginPage
        onSignin={awaitSignin}
        isLoading={isLoading}
      />
    );
  }
}
