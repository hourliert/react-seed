import React, { Component, PropTypes } from 'react';

import LeftMenuDrawer from '../LeftMenuDrawer';

function noop() {}

export class App extends Component {
  static propTypes = {
    children: PropTypes.any,
  };

  static childContextTypes = {
    accessLevel: PropTypes.object,
  };

  getChildContext() {
    const accessLevel = { bitMask: 2 };
    return { accessLevel };
  }

  render() {
    const menuItems = [
      {
        icon: 'home',
        label: 'Home',
        url: '/home',
        withDivider: true,
        accessLevel: {
          bitMask: 7,
        },
      },
      {
        icon: 'power',
        label: 'Log Out',
        url: '/logout',
        accessLevel: {
          bitMask: 7,
        },
      },
    ];

    return (
      <div>
        <LeftMenuDrawer
          open
          onClose={noop}
          menuItems={menuItems}
        />
        <div className="router-insertion">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export class Home extends Component { // eslint-disable-line react/no-multi-comp
  render() {
    return (
      <div>Home</div>
    );
  }
}
