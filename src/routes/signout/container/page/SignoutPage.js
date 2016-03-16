import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { pureRender } from 'decorators';
import WrapperSignoutPage from 'routes/signout/component/page';
import SignoutPageSelector from 'routes/signout/selector/page';
import * as SessionActions from 'actions/session';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...SessionActions,
  }, dispatch);
}

@pureRender
@connect(SignoutPageSelector, mapDispatchToProps)
export default class SignoutPage extends Component {
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
      <WrapperSignoutPage
        isLoading={isLoading}
      />
    );
  }
}
