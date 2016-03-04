import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import pureRender from 'decorators/pureRender';

import { infoPageSelector } from 'selectors';

import WrapperInfoPage from 'components/WrapperInfoPage';

@pureRender
@connect(infoPageSelector)
export default class InfoPage extends Component {
  static propTypes = {
    user: PropTypes.object,
    session: PropTypes.object,
    initialRenderTime: PropTypes.number,
  };

  render() {
    const { user, session, initialRenderTime } = this.props;

    return (
      <WrapperInfoPage
        user={user}
        session={session}
        renderTime={initialRenderTime}
      />
    );
  }
}
