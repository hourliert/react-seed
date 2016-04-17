import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import pureRender from 'pure-render-decorator';
import WrapperAdminPage from 'routes/admin/component/page';
import AdminPageSelector from 'routes/admin/selector/page';

@pureRender
@connect(AdminPageSelector)
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
