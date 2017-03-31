import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import Check from 'material-ui/svg-icons/action/check-circle';
import Error from 'material-ui/svg-icons/alert/error';


@pureRender
export default class LoadingButton extends Component {
  static propTypes = {
    status: PropTypes.string,
    style: PropTypes.object,
  };

  render() {
    const { status } = this.props;

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
          icon = {<Check />}
          {...this.props}
        />
      );
    }

    if (status === 'error') {
      return (
        <FlatButton
          icon = {<Error />}
          {...this.props}
        />
      );
    }

    return (
      <FlatButton {...this.props} />
    );
  }
}
