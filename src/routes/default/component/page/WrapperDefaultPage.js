import React, { Component } from 'react';

import pureRender from 'pure-render-decorator';

@pureRender
export default class WrapperDefaultPage extends Component {
  render() {
    return (
      <div className="flex layout vertical">
        <h1>Doh! 404!</h1>
        <p>These are <em>not</em> the droids you are looking for!</p>
      </div>
    );
  }
}
