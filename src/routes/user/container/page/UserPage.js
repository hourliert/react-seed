import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import pureRender from 'pure-render-decorator';
import WrapperUserPage from 'routes/user/component/page';
import UserPageSelector from 'routes/user/selector/page';

@pureRender
@connect(UserPageSelector)
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
