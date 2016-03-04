import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { pureRender } from 'decorators';

import { settingsPageSelector } from 'selectors';

import WrapperSettingsPage from 'components/WrapperSettingsPage';

import * as SettingsActions from 'actions/settings';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...SettingsActions,
  }, dispatch);
}

@pureRender
@connect(settingsPageSelector, mapDispatchToProps)
export default class SettingsPage extends Component {
  static propTypes = {
    isOrganisationLoading: PropTypes.bool,
    settingsList: PropTypes.array,
    organisationsList: PropTypes.array,

    // SettingsActions
    toggleSetting: PropTypes.func,
    toggleUserToRoleMapping: PropTypes.func,
    toggleColorationByMindset: PropTypes.func,
  };

  render() {
    const { settingsList, organisationsList } = this.props;
    const { isOrganisationLoading } = this.props;
    const { toggleSetting } = this.props;

    return (
      <WrapperSettingsPage
        isOrganisationLoading={isOrganisationLoading}
        settingsList={settingsList}
        organisationsList={organisationsList}

        onToggleSetting={toggleSetting}
      />
    );
  }
}
