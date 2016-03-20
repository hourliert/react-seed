import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';

import { pureRender } from 'decorators';
import WrapperAdminIndexPage from 'routes/admin/component/indexRoute';
import AdminIndexPageSelector from 'routes/admin/selector/indexRoute';
import * as AppActions from 'actions/app';
import { fetchCounter } from 'actions/counter';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...AppActions,
  }, dispatch);
}

function fetch({ dispatch }) {
  return dispatch(fetchCounter());
}

@pureRender
@provideHooks({
  fetch,
})
@connect(AdminIndexPageSelector, mapDispatchToProps)
export default class AdminIndexPage extends Component {
  static propTypes = {
    toggleLeftNav: PropTypes.func,
    counter: PropTypes.number,
  };

  render() {
    const { toggleLeftNav, counter } = this.props;

    return (
      <WrapperAdminIndexPage
        onToggleLeftNav={toggleLeftNav}
        counter={counter}
      />
    );
  }
}
