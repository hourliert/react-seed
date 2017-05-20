import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';

@pureRender
export default class Tag extends Component {
  static propTypes = {
    datum: PropTypes.object,
  };

  render() {
    const { datum } = this.props;
    console.log('Tag render');
    console.log(datum);

    return (
      <span style={{ backgroundColor: 'red' }}>
        {datum.id}
      </span>
    );
  }
}
