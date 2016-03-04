import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import Paper from 'material-ui/lib/paper';

import { pureRender } from 'decorators';
import CardsList from 'components/CardsList';
import GraphSettings from 'components/GraphSettings';
import styles from './styles';

@pureRender
export default class WrapperSettingsPage extends Component {
  static propTypes = {
    isOrganisationLoading: PropTypes.bool,
    settingsList: PropTypes.array,

    onToggleSetting: PropTypes.func,
  };

  static defaultProps = {
    settingsList: [],
  };

  render() {
    const { settingsList } = this.props;
    const { onToggleSetting } = this.props;

    return (
      <CardsList scroll>
        <Helmet title="Settings" />

        <GraphSettings
          container={<Paper style={styles.graphSettings} />}
          settingsList={settingsList}
          onToggleSetting={onToggleSetting}
        />
      </CardsList>
    );
  }
}
