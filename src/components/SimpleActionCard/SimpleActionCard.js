import React, { Component, PropTypes } from 'react';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';

import { card, pureRender } from 'decorators';

@pureRender
@card
export default class SimpleActionCard extends Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
  };

  render() {
    const { title, children } = this.props;

    return (
      <div>
        <CardTitle
          title={title}
        />
        <CardActions>
          { children }
        </CardActions>
      </div>
    );
  }
}
