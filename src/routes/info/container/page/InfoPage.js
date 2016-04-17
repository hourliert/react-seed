import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import pureRender from 'pure-render-decorator';
import WrapperInfoPage from 'routes/info/component/page';
import InfoPageSelector from 'routes/info/selector/page';

@pureRender
@connect(InfoPageSelector)
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
