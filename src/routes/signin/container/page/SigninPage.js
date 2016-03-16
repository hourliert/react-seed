import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { pureRender } from 'decorators';
import WrapperSigninPage from 'routes/signin/component/page';
import SigninPageSelector from 'routes/signin/selector/page';
import * as SessionActions from 'actions/session';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...SessionActions,
  }, dispatch);
}

@pureRender
@connect(SigninPageSelector, mapDispatchToProps)
export default class SigninPage extends Component {
  static propTypes = {
    awaitSignin: PropTypes.func,

    isLoading: PropTypes.bool,
  };

  render() {
    const { awaitSignin, isLoading } = this.props;

    return (
      <WrapperSigninPage
        onSignin={awaitSignin}
        isLoading={isLoading}
      />
    );
  }
}
