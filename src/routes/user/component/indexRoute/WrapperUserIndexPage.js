import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import Card from 'material-ui/lib/card/card';
import FlatButton from 'material-ui/lib/flat-button';

import { pureRender } from 'decorators';
import CardsList from 'components/CardsList';
import WelcomeCard from 'components/WelcomeCard';

import styles from './styles';
import logo192 from 'images/logo/logo-192x192.png';

@pureRender
export default class WrapperUserIndexPage extends Component {
  static propTypes = {
    onToggleLeftNav: PropTypes.func,
  };

  render() {
    const { onToggleLeftNav } = this.props;

    return (
      <CardsList flex>
        <Helmet title="User Home" />

        <WelcomeCard
          container={<Card style={styles.welcomeCard} />}
          title="Welcome on <%= appname %>"
          logo={logo192}
        >
          <div>
            Enjoy.
          </div>
          <FlatButton label="Get Started" primary onTouchTap={onToggleLeftNav} />
        </WelcomeCard>
      </CardsList>
    );
  }
}
