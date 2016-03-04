import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/lib/icon-button';
import Popover from 'material-ui/lib/popover/popover';

import { pureRender } from 'decorators';
import ListSelector from 'components/ListSelector';

import styles from './styles';

@pureRender
export default class SelectorIconMenu extends Component {
  static propTypes = {
    icon: PropTypes.string,
    selectorName: PropTypes.string,

    isLoading: PropTypes.bool,
    list: PropTypes.array,

    toggleItem: PropTypes.func,
    listSelectorContainer: PropTypes.node,
  };

  static defaultProps = {
    listSelectorContainer: (
      <div style={styles.organisationsSelector} className="scroll" />
    ),
  };

  constructor(...args) {
    super(...args);
    this.state = { open: false };
  }

  _onButtonTouchTap(e) {
    e.preventDefault();
    this.setState({ open: true, anchorEl: e.currentTarget });
  }

  _onPopoverClose() {
    this.setState({ open: false });
  }

  render() {
    const { selectorName, icon, isLoading, list } = this.props;
    const { toggleItem } = this.props;

    const { listSelectorContainer } = this.props;

    const { open, anchorEl } = this.state;

    return (
      <IconButton
        iconClassName="material-icons"
        onTouchTap={::this._onButtonTouchTap}
      >
        {icon}
        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={::this._onPopoverClose}
        >
          <ListSelector
            listName={selectorName}
            container={listSelectorContainer}
            isLoading={isLoading}
            list={list}
            onToggleItem={toggleItem}
          />
        </Popover>
      </IconButton>
    );
  }
}
