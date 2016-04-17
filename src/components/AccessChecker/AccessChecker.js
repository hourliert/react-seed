import React, { Component, PropTypes } from 'react';

import pureRender from 'pure-render-decorator';
import { checkAccess } from 'helpers/auth';

@pureRender
export default class AccessChecker extends Component {
  static propTypes = {
    currentAccessLevel: PropTypes.object,
    requiredAccessLevel: PropTypes.object.isRequired,
    children: PropTypes.node,
  };

  static contextTypes = {
    currentAccessLevel: PropTypes.object,
  };

  render() {
    const { requiredAccessLevel, children } = this.props;
    const currentAccessLevel = this.props.currentAccessLevel || this.context.currentAccessLevel;
    const accessGranted = checkAccess(requiredAccessLevel, currentAccessLevel);

    return (
      <div style={{ visibility: accessGranted ? 'visible' : 'hidden' }}>
        { accessGranted ? children : null }
      </div>
    );
  }
}
