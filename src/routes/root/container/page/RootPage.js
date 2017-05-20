import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { annotator } from 'retax-components';

import pureRender from 'pure-render-decorator';
import WrapperRootPage from 'routes/root/component/page';
import RootPageSelector from 'routes/root/selector/page';
import UserActionsCreator from 'actions/user';
import AppActionsCreator from 'actions/app';
import ErrorsActionsCreator from 'actions/errors';

import { CURRENT_VERSION } from 'config/frontEndServer';

function mapDispatchToProps(dispatch, props) {
  const { appActions, errorsActions, userActions } = props;

  return bindActionCreators({
    ...userActions.export(),
    ...appActions.export(),
    ...errorsActions.export(),
    goToLink: push,
  }, dispatch);
}

@pureRender
@annotator.RetaxComponent({
  actionsCreators: {
    appActions: AppActionsCreator,
    userActions: UserActionsCreator,
    errorsActions: ErrorsActionsCreator,
  },
})
@connect(RootPageSelector, mapDispatchToProps)
export default class RootPage extends Component {
  static propTypes = {
    children: PropTypes.node,

    currentAccessLevel: PropTypes.object,
    menus: PropTypes.array,
    appBarDepth: PropTypes.number,
    leftNavOpen: PropTypes.bool,
    errors: PropTypes.object,

    closeLeftNav: PropTypes.func,
    toggleLeftNav: PropTypes.func,
    markAllErrorsAsViewed: PropTypes.func,
    clearErrors: PropTypes.func,
    goToLink: PropTypes.func,

    fetchCurrentUser: PropTypes.func,
    user: PropTypes.object,
  };

  static childContextTypes = {
    currentAccessLevel: PropTypes.object,
  };

  getChildContext() {
    const { currentAccessLevel } = this.props;
    return { currentAccessLevel };
  }

  render() {
    const { children, user } = this.props;
    const { errors, markAllErrorsAsViewed, clearErrors } = this.props;
    const { leftNavOpen, closeLeftNav, toggleLeftNav, goToLink } = this.props;
    const { menus } = this.props;
    const { appBarDepth } = this.props;

    return (
      <WrapperRootPage
        version={CURRENT_VERSION}
        appBarDepth={appBarDepth}
        menus={menus}
        user={user}
        errors={errors}
        markErrorsAsViewed={markAllErrorsAsViewed}
        clearErrors={clearErrors}
        leftNavOpen={leftNavOpen}
        closeLeftNav={closeLeftNav}
        toggleLeftNav={toggleLeftNav}
        goToLink={goToLink}
      >
        {children}
      </WrapperRootPage>
    );
  }
}
