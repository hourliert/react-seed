import React, { Component, PropTypes } from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ReactList from 'react-list';

import { card, pureRender } from 'decorators';
import WithLoading from 'components/WithLoading';
import CheckboxItem from 'components/CheckboxItem';

@pureRender
@card
export default class ListSelector extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    list: PropTypes.array.isRequired,

    listName: PropTypes.string,

    onToggleItem: PropTypes.func,
  };

  static defaultProps = {
    list: [],
  };

  renderItem(index, key) {
    const { onToggleItem } = this.props;
    const o = this.props.list[index];

    return (
      <CheckboxItem
        key={key}
        id={o.id}
        label={o.name}
        isChecked={o.isSelected}
        onToggle={onToggleItem}
      />
    );
  }

  render() {
    const { isLoading, list, listName } = this.props;

    return (
      <WithLoading
        container={<div className="layout vertical" />}
        isLoading={isLoading}
      >
        <List
          subheader={listName}
        >
          { list.length === 0 ?
            <ListItem>No Organisation</ListItem> :
            null
          }
          <ReactList
            itemRenderer={::this.renderItem}
            length={list.length}
            threshold={125}
          />

        </List>
      </WithLoading>
    );
  }
}
