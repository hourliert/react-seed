import React, { Component, PropTypes } from 'react';

import pureRender from 'decorators/pureRender';
import WrapperUserPage from 'components/WrapperUserPage';

@pureRender
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
