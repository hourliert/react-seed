import React, { PropTypes, Component } from 'react';

import pureRender from 'decorators/pureRender';

@pureRender
export default class WrapperUserPage extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;

    return (
      <div className="flex layout vertical">
        {children}
      </div>
    );
  }
}
