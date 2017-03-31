import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { annotator } from 'retax-components';
import { connect } from 'react-redux';

import pureRender from 'pure-render-decorator';
import WrapperSettingsPage from 'routes/settings/component/page';
import SettingsPageSelector from 'routes/settings/selector/page';
import UserActionsCreator from 'actions/user';

function mapDispatchToProps(dispatch, props) {
  const { userActions } = props;

  return bindActionCreators({
    ...userActions.export(),
  }, dispatch);
}

@pureRender
@annotator.RetaxComponent({ //eslint-disable-line
  actionsCreators: {
    userActions: UserActionsCreator,
  },
})
@connect(SettingsPageSelector, mapDispatchToProps)
export default class SettingsPage extends Component { //eslint-disable-line
  static propTypes = {
    // selector
    user: PropTypes.object,
    session: PropTypes.object,
    initialRenderTime: PropTypes.number,
    // userActions
    updateUser: PropTypes.func,
    fetchCurrentUser: PropTypes.func,
  };

  render() {
    const {
      user,
      updateUser,
      session,
      initialRenderTime,
    } = this.props;

    return (
      <WrapperSettingsPage
        user={user}
        updateUser={updateUser}
        session={session}
        initialRenderTime={initialRenderTime}
      />
    );
  }
}
