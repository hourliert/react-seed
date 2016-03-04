import React, { Component, PropTypes } from 'react';

import { pureRender } from 'decorators';
import WrapperAdminPage from 'components/WrapperAdminPage';

@pureRender
export default class AdminPage extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;

    return (
      <WrapperAdminPage>
        {children}
      </WrapperAdminPage>
    );
  }
}
