import React, { Component, PropTypes } from 'react';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import pureRender from 'pure-render-decorator';
import styles from './styles';

@pureRender
export default class ErrorManager extends Component {
  static propTypes = {
    errors: PropTypes.object.isRequired,
    markErrorsAsViewed: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    timer: PropTypes.number,
  };

  static defaultProps = {
    timer: 4000,
    errors: {},
  };

  constructor(...args) {
    super(...args);
    this._handleDetailsTouchTap = ::this._handleDetailsTouchTap;
    this._handleDialogClose = ::this._handleDialogClose;
    this.state = {
      dialogOpen: false,
    };
  }

  _handleDetailsTouchTap() {
    this.setState({ dialogOpen: true });
  }

  _handleDialogClose() {
    const { clearErrors } = this.props;

    this.setState({ dialogOpen: false });
    clearErrors();
  }

  _makeSnackbarText() {
    const errors = Object.values(this.props.errors);

    switch (errors.length) {
      case 0:
        return '';
      case 1:
        return 'One Error';
      default:
        return 'Multiple Errors';
    }
  }

  render() {
    const { dialogOpen, timer } = this.state;
    const { errors } = this.props;
    const { markErrorsAsViewed } = this.props;

    const shouldDisplaySnack = Object.keys(errors).reduce((cur, e) => (
      cur || errors[e].viewed !== true
    ), false);

    return (
      <div>
        <Snackbar
          open={shouldDisplaySnack}
          message={this._makeSnackbarText()}
          autoHideDuration={timer}
          onRequestClose={markErrorsAsViewed}
          action="details"
          onActionTouchTap={this._handleDetailsTouchTap}
        />

        <Dialog
          title="Error Details"
          actions={
            <FlatButton
              label="Ok"
              primary
              onTouchTap={this._handleDialogClose}
            />
          }
          autoScrollBodyContent
          modal={false}
          open={dialogOpen}
          onRequestClose={this._handleDialogClose}
        >
          <p>
            The following errors happened.
            If you think this is a bug, don't hesitate to create an issue on
            <a href="<%= repourl %>/issues" target="_blank">the repo page</a>.
          </p>
          <ul style={styles.ul}>
            {Object.keys(errors).map(key => {
              const error = errors[key].error;

              return (
                <Card key={key} style={styles.card}>
                  <CardHeader
                    title={error.message}
                    actAsExpander
                    showExpandableButton
                  />
                  <CardText expandable>
                    <strong>Action causing the error:</strong> {key}
                  </CardText>
                  <CardText expandable>
                    <strong>Raw Server Error:</strong> {error.statusText}
                  </CardText>
                </Card>
              );
            })}
          </ul>
        </Dialog>
      </div>
    );
  }
}
