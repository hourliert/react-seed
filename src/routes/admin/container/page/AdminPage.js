import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { pureRender } from 'decorators';
import WrapperAdminPage from 'routes/admin/component/page';
import AdminPageSelector from 'routes/admin/selector/page';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

@pureRender
@connect(AdminPageSelector, mapDispatchToProps)
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
