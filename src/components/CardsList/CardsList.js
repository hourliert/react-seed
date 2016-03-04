import React, { Component, PropTypes } from 'react';

import { pureRender } from 'decorators';
import styles from './styles';

@pureRender
export default class CardsList extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    scroll: PropTypes.bool,
    flex: PropTypes.bool,
  };

  static defaultProps = {
    style: {},
  };

  _computeClasses() {
    const { flex } = this.props;

    if (flex) return 'flex layout vertical center-center';
    return 'layout vertical center-center';
  }

  _wrapWithScroll(child) {
    const { scroll } = this.props;
    if (scroll) {
      return (
        <div className="scroll">
          {child}
        </div>
      );
    }

    return child;
  }

  render() {
    const { style } = this.props;

    return this._wrapWithScroll(
      <div className={this._computeClasses()} style={{ ...styles.base, ...style }}>
        { this.props.children }
      </div>
    );
  }
}
