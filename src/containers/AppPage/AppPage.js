import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import pureRender from 'decorators/pureRender';

import WrapperAppPage from 'components/WrapperAppPage';

import { appPageSelector } from 'selectors';

import * as AppActions from 'actions/app';
import * as ErrorActions from 'actions/errors';

import { CURRENT_VERSION } from 'config/frontEndServer';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...AppActions,
    ...ErrorActions,
    goToLink: push,
  }, dispatch);
}

@pureRender
@connect(appPageSelector, mapDispatchToProps)
export default class AppPage extends Component {
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
  };

  static childContextTypes = {
    currentAccessLevel: PropTypes.object,
  };

  getChildContext() {
    const { currentAccessLevel } = this.props;
    return { currentAccessLevel };
  }

  render() {
    const { children } = this.props;
    const { errors, markAllErrorsAsViewed, clearErrors } = this.props;
    const { leftNavOpen, closeLeftNav, toggleLeftNav, goToLink } = this.props;
    const { menus } = this.props;
    const { appBarDepth } = this.props;

    return (
      <WrapperAppPage
        version={CURRENT_VERSION}
        appBarDepth={appBarDepth}
        menus={menus}
        errors={errors}
        markErrorsAsViewed={markAllErrorsAsViewed}
        clearErrors={clearErrors}
        leftNavOpen={leftNavOpen}
        closeLeftNav={closeLeftNav}
        toggleLeftNav={toggleLeftNav}
        goToLink={goToLink}
      >
        {children}
      </WrapperAppPage>
    );
  }
}
