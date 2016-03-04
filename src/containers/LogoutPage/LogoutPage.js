import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import pureRender from 'decorators/pureRender';

import { logoutPageSelector } from 'selectors';

import WrapperLogoutPage from 'components/WrapperLogoutPage';

import * as SessionActions from 'actions/session';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...SessionActions,
  }, dispatch);
}

@pureRender
@connect(logoutPageSelector, mapDispatchToProps)
export default class LogoutPage extends Component {
  static propTypes = {
    signout: PropTypes.func,

    isLoading: PropTypes.bool,
  };

  componentWillMount() {
    const { signout } = this.props;
    signout();
  }

  render() {
    const { isLoading } = this.props;

    return (
      <WrapperLogoutPage
        isLoading={isLoading}
      />
    );
  }
}
