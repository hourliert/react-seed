import React, { Component, PropTypes } from 'react';
import Checkbox from 'material-ui/lib/checkbox';
import ListItem from 'material-ui/lib/lists/list-item';

import pureRender from 'decorators/pureRender';

@pureRender
export default class CheckboxItem extends Component {
  static propTypes = {
    id: PropTypes.string,

    label: PropTypes.string,
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
    const { label, isChecked } = this.props;

    return (
      <ListItem
        primaryText={label}
        leftCheckbox={
          <Checkbox
            checked={isChecked}
            onCheck={::this._onToggle}
          />
        }
      />
    );
  }
}
