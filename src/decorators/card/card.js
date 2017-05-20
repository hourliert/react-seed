import React, { Component, PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics';

import styles from './styles';

export default function card(ComposedComponent) {
  class Wrapper extends Component {
    static displayName = `Card(${
      ComposedComponent.displayName || ComposedComponent.name || 'Component'
    })`;

    static propTypes = {
      cardToolbar: PropTypes.node,
      container: PropTypes.element,
    };

    static defaultProps = {
      container: <div />,
    };

    render() {
      const { container, cardToolbar, ...other } = this.props; //eslint-disable-line

      return React.cloneElement(container, {
        style: {
          ...styles.card,
          ...container.props.style,
        },
      }, [
        cardToolbar ? React.cloneElement(cardToolbar, { key: 0 }) : undefined,
        <ComposedComponent key={1} {...other} />,
      ]);
    }
  }

  return hoistStatics(Wrapper, ComposedComponent);
}
