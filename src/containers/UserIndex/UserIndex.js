import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import pureRender from 'decorators/pureRender';
import WrapperUserIndex from 'components/WrapperUserIndex';
import * as AppActions from 'actions/app';

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
export default class UserIndex extends Component {
  static propTypes = {
    toggleLeftNav: PropTypes.func,
  };

  render() {
    const { toggleLeftNav } = this.props;
    return (
      <WrapperUserIndex
        onToggleLeftNav={toggleLeftNav}
      />
    );
  }
}
