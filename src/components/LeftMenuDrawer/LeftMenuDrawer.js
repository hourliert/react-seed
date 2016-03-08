import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';

import pureRender from 'decorators/pureRender';
import LinksList from 'components/LinksList';

@pureRender
export default class LeftMenuDrawer extends Component {
  static propTypes = {
    open: PropTypes.bool,
    menuItems: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
    onLinkTouch: PropTypes.func.isRequired,
  };

  static contextTypes = {
    currentAccessLevel: PropTypes.object,
  };

  static defaultProps = {
    menuItems: [],
  };

  _onRequestChange(request) {
    if (!request) {
      this.props.onClose();
    }
  }

  _onLinkTouch(url) {
    this.props.onClose();
    this.props.onLinkTouch(url);
  }

  render() {
    const { open, menuItems } = this.props;
    const { currentAccessLevel } = this.context;

    return (
      <LeftNav
        open={open}
        docked={false}
        onRequestChange={::this._onRequestChange}
      >
        <AppBar title="React-Seed" showMenuIconButton={false} />
        <LinksList
          links={menuItems}
          onLinkTouch={::this._onLinkTouch}
          currentAccessLevel={currentAccessLevel}
        />
      </LeftNav>
    );
  }
}
