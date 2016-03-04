import React, { Component, PropTypes } from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Divider from 'material-ui/lib/divider';
import { Link } from 'react-router';

import pureRender from 'decorators/pureRender';

@pureRender
export default class LinkItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onLinkTouch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    item: {},
  };

  _onLinkClick(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  _onItemTouched() {
    const { onLinkTouch, item } = this.props;

    onLinkTouch(item.url);
  }

  render() {
    const { item } = this.props;

    return (
      <div>
        <MenuItem
          linkButton
          containerElement={
            <Link to={item.url} onClick={::this._onLinkClick} />
          }
          onTouchTap={::this._onItemTouched}
          disabled={item.disabled}
          leftIcon={
            <FontIcon className="material-icons">{item.icon}</FontIcon>
          }
        >
          {item.label}
        </MenuItem>
        {item.withDivider ? <Divider /> : null}
      </div>
    );
  }
}
