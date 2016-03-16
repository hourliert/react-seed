import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { pureRender } from 'decorators';
import WrapperAdminIndexPage from 'routes/admin/component/indexRoute';
import AdminIndexPageSelector from 'routes/admin/selector/indexRoute';
import * as AppActions from 'actions/app';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...AppActions,
  }, dispatch);
}

@pureRender
@connect(AdminIndexPageSelector, mapDispatchToProps)
export default class AdminIndexPage extends Component {
  static propTypes = {
    toggleLeftNav: PropTypes.func,
  };

  render() {
    const { toggleLeftNav } = this.props;

    return (
      <WrapperAdminIndexPage
        onToggleLeftNav={toggleLeftNav}
      />
    );
  }
}
