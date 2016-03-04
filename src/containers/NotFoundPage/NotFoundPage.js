import React, { Component } from 'react';

import pureRender from 'decorators/pureRender';

@pureRender
export default class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <h1>Doh! 404!</h1>
        <p>These are <em>not</em> the droids you are looking for!</p>
      </div>
    );
  }
}
