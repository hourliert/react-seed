import React, { Component, PropTypes } from 'react';
import CardTitle from 'material-ui/lib/card/card-title';
import CardActions from 'material-ui/lib/card/card-actions';
import CardText from 'material-ui/lib/card/card-text';
import CardMedia from 'material-ui/lib/card/card-media';

import { card, pureRender } from 'decorators';
import styles from './styles';

@pureRender
@card
export default class WelcomeCard extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    logo: PropTypes.string,
    title: PropTypes.string,
  };

  render() {
    const { children: [text, ...actions], logo, title } = this.props;

    return (
      <div>
        <CardTitle title={title} />
        <CardMedia style={styles.cardMedia}>
          <img src={logo} />
        </CardMedia>
        <CardText>
          {text}
        </CardText>
        <CardActions>
          {actions}
        </CardActions>
      </div>
    );
  }
}
