import React, { Component } from 'react';

import { pureRender } from 'decorators';
import WrapperDefaultPage from 'routes/default/component/page';

@pureRender
export default class DefaultPage extends Component {
  render() {
    return (
      <WrapperDefaultPage />
    );
  }
}
