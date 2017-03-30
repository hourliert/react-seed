import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import pureRender from 'pure-render-decorator';
import WrapperSettingsPage from 'routes/settings/component/page';
import SettingsPageSelector from 'routes/settings/selector/page';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

@pureRender
@connect(SettingsPageSelector, mapDispatchToProps)
export default class SettingsPage extends Component {
  static propTypes = {

  };

  render() {
    return (
      <WrapperSettingsPage

      />
    );
  }
}
