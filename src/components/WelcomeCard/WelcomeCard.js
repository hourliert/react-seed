import React, { Component, PropTypes } from 'react';
import { CardTitle, CardActions, CardText, CardMedia } from 'material-ui/Card';

import { card } from 'decorators';
import pureRender from 'pure-render-decorator';
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
