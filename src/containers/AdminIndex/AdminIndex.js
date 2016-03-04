import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import pureRender from 'decorators/pureRender';
import * as AppActions from 'actions/app';
import WrapperAdminIndex from 'components/WrapperAdminIndex';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...AppActions,
  }, dispatch);
}

@pureRender
@connect(mapStateToProps, mapDispatchToProps)
export default class AdminIndex extends Component {
  static propTypes = {
    toggleLeftNav: PropTypes.func,
  };

  render() {
    const { toggleLeftNav } = this.props;
    return (
      <WrapperAdminIndex
        onToggleLeftNav={toggleLeftNav}
      />
    );
  }
}
