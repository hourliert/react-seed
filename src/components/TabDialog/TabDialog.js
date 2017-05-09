import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';

// material-ui
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Delete from 'material-ui/svg-icons/action/delete';
import Close from 'material-ui/svg-icons/navigation/close';
import Action from 'material-ui/svg-icons/action/done';
import { Tabs, Tab } from 'material-ui/Tabs';

// open source
import SwipeableViews from 'react-swipeable-views';

@pureRender
export default class TabDialog extends Component {
  static propTypes = {
    del: PropTypes.func,
    delLabel: PropTypes.string,
    delIcon: PropTypes.any,

    action: PropTypes.func,
    actionLabel: PropTypes.string,
    actionIcon: PropTypes.any,

    close: PropTypes.func,
    closeLabel: PropTypes.string,
    closeIcon: PropTypes.any,

    open: PropTypes.bool,
    children: PropTypes.any,
    refresh: PropTypes.func,
    title: PropTypes.string,
    width: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      confirmDeleteOpen: false,
      hasChanged: false,
      slideIndex: 0,
      childCount: this.props.children.length || 1,
      callbackReceived: 0,
      actionIsDisabled: false,
      actionIsHidden: false,
    };
  }

  getTabs() {
    const childs = this.props.children;
    const JSX = [];
    let i = 0;

    if (childs.length) {
      for (const k in childs) {
        if (childs.hasOwnProperty(k)) {
          const child = childs[k];
          JSX.push(
            <Tab
              key={k}
              label={child.props.label}
              value={i}
            />
          );
          i ++;
        }

        this.state.childCount = i;
      }
    } else {
      JSX.push(
        <Tab
          key={1}
          label={childs.props.label}
          value={i}
        />
      );

      this.state.childCount = 1;
    }
    return JSX;
  }

  getChildren() {
    const childs = this.props.children;
    const JSX = [];

    if (childs.length) {
      for (const k in childs) {
        if (childs.hasOwnProperty(k)) {
          const child = childs[k];
          const childWithProps = React.cloneElement(child,
            {
              ref: `component${k}`,
              callback: ::this.callback,
            });
          JSX.push(childWithProps);
        }
      }
    } else {
      const childWithProps = React.cloneElement(childs, {
        ref: 'component1',
        callback: ::this.callback,
        setActionIsDisabled: ::this.setActionIsDisabled,
        setActionIsHidden: ::this.setActionIsHidden,
        close: this.props.close,
      });
      JSX.push(childWithProps);
    }

    return JSX;
  }

  openConfirmDelete() {
    this.setState({ confirmDeleteOpen: true });
  }

  closeConfirmDelete() {
    this.setState({ confirmDeleteOpen: false });
  }

  callback(hasChanged) {
    const { refresh } = this.props;
    console.log(`Callback ${this.state.callbackReceived}/${this.state.childCount} : ${hasChanged}`); // eslint-disable-line
    this.state.hasChanged = this.state.hasChanged || hasChanged;
    this.state.callbackReceived += 1;
    if (this.state.callbackReceived === this.state.childCount) {
      if (this.state.hasChanged) {
        console.log('TabDialog: Refresh'); // eslint-disable-line
        refresh();
        this.state.hasChanged = false;
      } else {
        console.log('TabDialog: Nothing changed'); // eslint-disable-line
      }
      this.state.callbackReceived = 0;
    }
  }

  async delete() {
    const { del, close, refresh } = this.props;
    await del();
    this.closeConfirmDelete();
    close();
    refresh();
  }

  close() {
    const { close } = this.props;
    for (const k in this.refs) {
      if (this.refs.hasOwnProperty(k)) {
        const child = this.refs[k];
        if (child.userDidCancel) {
          child.userDidCancel();
        }
      }
    }
    close();
  }

  action() {
    const { action, close } = this.props;
    const { childCount } = this.state;

    for (const k in this.refs) {
      if (this.refs.hasOwnProperty(k)) {
        const child = this.refs[k];
        if (child.userDidAction) {
          child.userDidAction();
        }
      }
    }

    if (childCount > 1) {
      close();
    }

    action();
  }

  setActionIsDisabled(val) {
    this.setState({ actionIsDisabled: val });
  }

  setActionIsHidden(val) {
    this.setState({ actionIsHidden: val });
  }

  render() {
    const {
      open,
      del,
      delLabel,
      delIcon,
      closeLabel,
      closeIcon,
      actionIcon,
      title,
      action,
      actionLabel,
      width,
    } = this.props;
    const { confirmDeleteOpen, childCount, actionIsDisabled, actionIsHidden } = this.state;

    const actions = [];

    if (del) {
      actions.push(
        <FlatButton
          labelColor="white"
          label={ (delLabel !== undefined) ? delLabel : 'Delete'}
          style={{ color: 'white', float: 'left' }}
          backgroundColor="#F44336"
          hoverColor="#D32F2F"
          onTouchTap={::this.openConfirmDelete}
          icon={ (delIcon !== undefined) ? delIcon : <Delete />}
        />
      );
    }

    actions.push(
      <FlatButton
        label={ (closeLabel !== undefined) ? closeLabel : 'Close'}
        hoverColor="#90A4AE"
        backgroundColor="#CFD8DC"
        style={{ marginRight: '15px' }}
        onTouchTap={::this.close}
        icon={ (closeIcon !== undefined) ? closeIcon : <Close />}
        primary
      />
    );

    if (action) {
      actions.push(
        <FlatButton
          labelColor="white"
          label={ (actionLabel !== undefined) ? actionLabel : 'Create'}
          style={{
            color: 'white',
            opacity: actionIsDisabled ? 0.5 : 1,
            display: actionIsHidden ? 'none' : undefined,
          }}
          disabled={actionIsDisabled}
          backgroundColor="#2196f3"
          hoverColor="#1976d2"
          icon={ (actionIcon !== undefined) ? actionIcon : <Action />}
          onTouchTap={::this.action}
        />
      );
    }

    return (
      <div>
        <Dialog
          autoScrollBodyContent
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={::this.close}
          contentStyle = {{ width: width || '70%', maxWidth: 'none', minWidth: width || 600 }}
          titleStyle={{ color: 'white', background: '#2196f3' }}
          bodyStyle={{ padding: 0 }}
          title={title}
        >
          <div
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                if (this.props.action) {
                  ::this.action();
                } else {
                  ::this.close();
                }
              }
            }}
          >
            {childCount === 1 ?
              <div style={{ padding: 15 }}>
                {this.props.children ? this.getChildren() : null}
              </div>
            : <div>
            <Tabs
              inkBarStyle = {{ background: 'white' }}
              tabItemContainerStyle = {{ background: '#333333' }}
              onChange={(value) => { this.setState({ slideIndex: value });}}
              value={this.state.slideIndex}
            >
                {this.getTabs()}
            </Tabs>
              <div
                style={{ padding: 15, minHeight: 600 }}
              >
                <SwipeableViews
                  style={{ height: '100%' }}
                  index={this.state.slideIndex}
                  onChange={(value) => {this.setState({ slideIndex: value });}}
                >
                  {this.props.children ? this.getChildren() : null}
                </SwipeableViews>
              </div>
            </div>
            }
          </div>
        </Dialog>
        <Dialog
          actions={[
            <FlatButton
              label="Cancel"
              hoverColor="#90A4AE"
              backgroundColor="#CFD8DC"
              style={{ marginRight: '15px' }}
              onTouchTap={::this.closeConfirmDelete}
              primary
            />,
            <FlatButton
              label="Confirm"
              backgroundColor="#F44336"
              hoverColor="#D32F2F"
              style={{ marginRight: '15px', color: 'white' }}
              onTouchTap={::this.delete}
            />,
          ]}
          modal={false}
          open={confirmDeleteOpen}
          onRequestClose={::this.closeConfirmDelete}
          title={'Are you sure to do this action ?'}
        >This action is non reversible</Dialog>
      </div>
    );
  }
}
