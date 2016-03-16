import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { pureRender } from 'decorators';
import WrapperUserIndexPage from 'routes/user/component/indexRoute';
import UserIndexPageSelector from 'routes/user/selector/indexRoute';
import * as AppActions from 'actions/app';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...AppActions,
  }, dispatch);
}

@pureRender
@connect(UserIndexPageSelector, mapDispatchToProps)
export default class UserIndexPage extends Component {
  static propTypes = {
    toggleLeftNav: PropTypes.func,
  };

  render() {
    const { toggleLeftNav } = this.props;
    return (
      <WrapperUserIndexPage
        onToggleLeftNav={toggleLeftNav}
      />
    );
  }
}
