import React, { Component, PropTypes } from 'react';
import Snackbar from 'material-ui/lib/snackbar';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

import dateformat from 'dateformat';

import pureRender from 'decorators/pureRender';
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
        return errors[0].error.shortError;
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
          onActionTouchTap={::this._handleDetailsTouchTap}
        />

        <Dialog
          title="Error Details"
          actions={
            <FlatButton
              label="Ok"
              primary
              onTouchTap={::this._handleDialogClose}
            />
          }
          autoScrollBodyContent
          modal={false}
          open={dialogOpen}
          onRequestClose={::this._handleDialogClose}
        >
          <p>
            The following errors happened.
            If you think this is a bug, don't hesitate to create an issue on
            <a href="https://github.com/hourliert/react-seed" target="_blank">the repo page</a>.
          </p>
          <ul style={styles.ul}>
            {Object.keys(errors).map(key => {
              const error = errors[key].error;

              return (
                <Card key={key} style={styles.card}>
                  <CardHeader
                    title={`${dateformat(error.date, 'shortTime')} - ${error.longError}`}
                    actAsExpander
                    showExpandableButton
                  />
                  <CardText expandable>
                    <strong>Action causing the error:</strong> {key}
                  </CardText>
                  <CardText expandable>
                    <strong>Http Status:</strong> {error.message} at {error.url}
                  </CardText>
                  <CardText expandable>
                    <strong>Raw Server Error:</strong> {JSON.stringify(error.serverError)}
                  </CardText>
                  <CardText expandable>
                    <strong>Stack:</strong>:
                    <ul>
                      {
                        error.stack.map((l, i) => <li key={i}>{l}</li>)
                      }
                    </ul>
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
