import React, { PropTypes, Component } from 'react';

import pureRender from 'pure-render-decorator';

@pureRender
export default class WrapperAdminPage extends Component {
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
