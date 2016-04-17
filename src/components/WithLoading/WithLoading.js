import React, { Component, PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import classNames from 'classnames';

import pureRender from 'pure-render-decorator';

@pureRender
export default class WithLoading extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,

    loader: PropTypes.node,
    container: PropTypes.node,
    children: PropTypes.node,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  static defaultProps = {
    container: <div />,
  };

  render() {
    const { container, isLoading, children, loader } = this.props;
    const { muiTheme: { rawTheme: { palette } } } = this.context;

    const realLoader = loader || <CircularProgress color={palette.accent1Color} />;

    return React.cloneElement(container, {
      className: classNames(container.props.className, {
        flex: isLoading,
        layout: isLoading,
        vertical: isLoading,
        'center-center': isLoading,
      }),
    }, isLoading ? realLoader : children);
  }
}
