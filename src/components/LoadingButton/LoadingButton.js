import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';

// material-ui
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import * as Colors from 'material-ui/styles/colors';
import Check from 'material-ui/svg-icons/action/check-circle';
import Error from 'material-ui/svg-icons/alert/error';


@pureRender
export default class LoadingButton extends Component {
  static propTypes = {
    status: PropTypes.string,
    style: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: React.PropTypes.object,
  };

  render() {
    const { status } = this.props;
    const { muiTheme: { rawTheme: { palette } } } = this.context;

    let newStyle = {};

    if (this.props.style) {
      newStyle = this.props.style;
    }

    if (status === 'loading') {
      newStyle.paddingLeft = 16;
      newStyle.paddingRight = 10;
      return (
        <FlatButton
          style= {newStyle}
          backgroundColor={palette.accent1Color}
          hoverColor={palette.accent2Color}
          icon = {
              <CircularProgress
                size={0.3}
                style={{
                  width: 30,
                  height: 30,
                  marginTop: -20,
                  marginLeft: -10,
                  paddingRight: 10,
                }}
              />
          }
          {...this.props}
        />
      );
    }

    if (status === 'success') {
      return (
        <FlatButton
          backgroundColor={Colors.green500}
          hoverColor={Colors.green600}
          icon = {<Check />}
          {...this.props}
        />
      );
    }

    if (status === 'error') {
      return (
        <FlatButton
          backgroundColor={Colors.red500}
          hoverColor={Colors.red600}
          icon = {<Error />}
          {...this.props}
        />
      );
    }

    return (
      <FlatButton
        backgroundColor={palette.accent1Color}
        hoverColor={palette.accent2Color}
        {...this.props}
      />
    );
  }
}
