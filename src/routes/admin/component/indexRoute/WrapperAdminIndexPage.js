import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { Card } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import pureRender from 'pure-render-decorator';
import CardsList from 'components/CardsList';
import WelcomeCard from 'components/WelcomeCard';

import styles from './styles';
import logo192 from 'images/logo/logo-192x192.png';

@pureRender
export default class WrapperAdminIndexPage extends Component {
  static propTypes = {
    onToggleLeftNav: PropTypes.func,
    counter: PropTypes.number,
  };

  render() {
    const { onToggleLeftNav, counter } = this.props;

    return (
      <CardsList flex>
        <Helmet title="Admin Home" />

        <WelcomeCard
          container={<Card style={styles.welcomeCard} />}
          title="Welcome on RetaxSeed"
          logo={logo192}
        >
          <div>
            Enjoy.
            The counter value is {counter}
          </div>
          <FlatButton label="Get Started" primary onTouchTap={onToggleLeftNav} />
        </WelcomeCard>
      </CardsList>
    );
  }
}
