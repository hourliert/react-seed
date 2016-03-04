import React, { Component, PropTypes } from 'react';
import { getMuiTheme } from 'material-ui/lib/styles';
import { connect } from 'react-redux';
import Radium, { StyleRoot, Style } from 'radium';

import pureRender from 'decorators/pureRender';

import { rootAppSelector } from 'selectors';

import AppPage from 'containers/AppPage';

import styles from './styles';

export default function makeRootApp(userAgent) { // eslint-disable-line
  @pureRender
  @Radium
  @connect(rootAppSelector)
  class RootApp extends Component {
    static displayName = 'RootApp';

    static propTypes = {
      theme: PropTypes.object,
    };

    static childContextTypes = {
      muiTheme: PropTypes.object,
    };

    getChildContext() {
      return {
        muiTheme: getMuiTheme(this.props.theme, { userAgent }),
      };
    }

    render() {
      return (
        <StyleRoot radiumConfig={{ userAgent }} className="flex layout vertical">
          <Style rules={styles} />
          <AppPage {...this.props} />
        </StyleRoot>
      );
    }
  }

  return RootApp;
}
