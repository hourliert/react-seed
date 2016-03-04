import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/lib/avatar';
import ListItem from 'material-ui/lib/lists/list-item';
import FontIcon from 'material-ui/lib/font-icon';
import Toggle from 'material-ui/lib/toggle';

import pureRender from 'decorators/pureRender';

@pureRender
export default class ToggleItem extends Component {
  static propTypes = {
    id: PropTypes.string,

    label: PropTypes.string,
    icon: PropTypes.string,
    isChecked: PropTypes.bool,

    onToggle: PropTypes.func,
  };

  _onToggle() {
    const { onToggle, id, isChecked } = this.props;

    onToggle({
      id,
      isChecked,
    });
  }

  render() {
    const { label, icon, isChecked } = this.props;

    return (
      <ListItem
        primaryText={label}
        leftAvatar={
          <Avatar
            icon={
              <FontIcon className="material-icons">{icon}</FontIcon>
            }
          />
        }
        rightToggle={
          <Toggle
            toggled={isChecked}
            onToggle={::this._onToggle}
          />
        }
      />
    );
  }
}
