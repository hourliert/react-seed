import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { Card } from 'material-ui/Card';

import pureRender from 'pure-render-decorator';
import CardsList from 'components/CardsList';
import UserInfo from 'components/UserInfo';
import SessionInfo from 'components/SessionInfo';

import styles from './styles';

@pureRender
export default class WrapperInfoPage extends Component {
  static propTypes = {
    user: PropTypes.object,
    session: PropTypes.object,
    renderTime: PropTypes.number,
  };

  static defaultProps = {
    user: {},
    session: {},
  };

  render() {
    const { user, session, renderTime } = this.props;

    return (
      <CardsList scroll>
        <Helmet title="Info" />

        <UserInfo
          container={<Card style={styles.userInfo} />}
          info={user}
        />
        <SessionInfo
          container={<Card style={styles.sessionInfo} />}
          info={session}
          renderTime={renderTime}
        />
      </CardsList>
    );
  }
}
