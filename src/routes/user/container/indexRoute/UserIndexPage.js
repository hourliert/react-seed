import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { annotator } from 'retax';

import pureRender from 'pure-render-decorator';
import WrapperUserIndexPage from 'routes/user/component/indexRoute';
import UserIndexPageSelector from 'routes/user/selector/indexRoute';
import AppActionsCreator from 'actions/app';

function mapDispatchToProps(dispatch, props) {
  const { appActions } = props;

  return bindActionCreators({
    ...appActions.export(),
  }, dispatch);
}

@pureRender
@annotator.RetaxComponent({
  actionsCreators: {
    appActions: AppActionsCreator,
  },
})
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
