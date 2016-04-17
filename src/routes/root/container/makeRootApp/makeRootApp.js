import React, { Component, PropTypes } from 'react';
import { getMuiTheme } from 'material-ui/styles';
import { connect } from 'react-redux';
import Radium, { StyleRoot, Style } from 'radium';

import pureRender from 'pure-render-decorator';
import makeRootAppSelector from 'routes/root/selector/makeRootApp';

import styles from './styles';

export default function makeRootApp(userAgent, AppPage) { // eslint-disable-line
  @pureRender
  @Radium
  @connect(makeRootAppSelector)
  class RootPage extends Component {
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

  return RootPage;
}
