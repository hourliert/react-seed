import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { pureRender } from 'decorators';
import WrapperUserPage from 'routes/user/component/page';
import UserPageSelector from 'routes/user/selector/page';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

@pureRender
@connect(UserPageSelector, mapDispatchToProps)
export default class UserPage extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;

    return (
      <WrapperUserPage>
        {children}
      </WrapperUserPage>
    );
  }
}
