import React, { Component, PropTypes } from 'react';
import List from 'material-ui/lib/lists/list';

import { card, pureRender } from 'decorators';
import ToggleItem from 'components/ToggleItem';

@pureRender
@card
export default class GraphSettings extends Component {
  static propTypes = {
    settingsList: PropTypes.array.isRequired,

    onToggleSetting: PropTypes.func,
  };

  static defaultProps = {
    settingsList: [],
  };

  render() {
    const { settingsList } = this.props;
    const { onToggleSetting } = this.props;

    return (
      <List subheader="Graph Layout Settings">
        {
          settingsList.map(s => (
            <ToggleItem
              key={s.id}
              id={s.id}
              label={s.label}
              icon={s.icon}
              isChecked={s.value}
              onToggle={onToggleSetting}
            />
          ))
        }
      </List>
    );
  }
}
