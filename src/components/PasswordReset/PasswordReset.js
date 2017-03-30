import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';

// material-ui
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Check from 'material-ui/svg-icons/navigation/check';
import Close from 'material-ui/svg-icons/navigation/close';

// styles
import styles from './styles';

@pureRender
export default class PasswordReset extends Component {
  static propTypes = {
    regexRules: PropTypes.array,
    updatePassword: PropTypes.func,
  };

  state = {
    showPassword: false,
    open: false,
    resp: undefined,
    resetIsValid: false,
    password: '',
    passwordRetype: '',
    rulesValidator: undefined,
  }

  save(element, value) {
    this.state[element] = value;
    this.rulesValidator();
  }

  closeDialog() {
    this.setState({ open: false });
  }

  openDialog() {
    this.setState({ open: true });
  }

  testRegex(regexString, string) {
    const regex = new RegExp(regexString);
    return regex.test(string);
  }

  rulesValidator() {
    const { regexRules } = this.props;
    let JSX = [];

    let resetIsValid = (this.state.password === this.state.passwordRetype);

    JSX.push(
      this.state.password === this.state.passwordRetype ?
      <div
        style={styles.validated}
      >
        <Check color={'#4caf50'} style={{ float: 'left' }} />
        <div
          style={{
            float: 'left',
            marginLeft: 15,
            marginTop: 4,
          }}
        >
          {'Passwords match'}
        </div>
      </div> :
      <div
        style={styles.rejected}
      >
        <Close color={'#f44336'} style={{ float: 'left' }} />
        <div
          style={{
            float: 'left',
            marginLeft: 15,
            marginTop: 4,
          }}
        >
          {'Passwords match'}
        </div>
      </div>
    );

    for (const k in regexRules) {
      if (regexRules.hasOwnProperty(k)) {
        const rule = regexRules[k];
        const regexIsCorrect = this.testRegex(rule.regex, this.state.password);
        resetIsValid = resetIsValid && regexIsCorrect;
        JSX.push(
          regexIsCorrect ?
          <div
            style={styles.validated}
          >
            <Check color={'#4caf50'} style={{ float: 'left' }} />
            <div
              style={{
                float: 'left',
                marginLeft: 15,
                marginTop: 4,
              }}
            >
              {rule.description}
            </div>
          </div> :
          <div
            style={styles.rejected}
          >
            <Close color={'#f44336'} style={{ float: 'left' }} />
            <div
              style={{
                float: 'left',
                marginLeft: 15,
                marginTop: 4,
              }}
            >
              {rule.description}
            </div>
          </div>
        );
      }
    }

    JSX = (
      <Paper
        style={styles.rule}
      >
        {JSX}
      </Paper>);

    this.state.resetIsValid = resetIsValid;
    this.state.rulesValidator = JSX;

    this.forceUpdate();
  }

  async updatePassword() {
    // Call your API here
    // this.setState({ resp });
  }

  render() {
    const { open, resp } = this.state;

    const closeAction = [
      <FlatButton
        label="Close"
        backgroundColor={'#2196f3'}
        hoverColor={'#1565c0'}
        style={{
          color: 'white',
        }}
        primary
        onTouchTap={::this.closeDialog}
      />,
    ];

    if (resp && (resp.type === 'UPDATE_PASSWORD_ERROR')) {
      return (
        <Dialog
          title="Reset your password"
          actions={closeAction}
          modal={false}
          open={open}
          onTouchTap={::this.closeDialog}
        >
          <br />
          Your password hasn't been reset. An error has occured. Plase contact us.
      </Dialog>);
    }

    if (resp && (resp.type === 'UPDATE_PASSWORD_SUCCESS')) {
      return (
        <Dialog
          title="Reset your password"
          actions={closeAction}
          modal={false}
          open={open}
          onTouchTap={::this.closeDialog}
        >
          <br />
          Your password has been successfully reset. You can Sign in with your new password.
      </Dialog>);
    }

    return (
      <Paper
        style={styles.container}
      >
        <h3>Change your password</h3>
        <TextField
          floatingLabelFixed
          floatingLabelText="New password"
          hintText="Enter your new password"
          value={this.state.password}
          type={this.state.showPassword ? 'text' : 'password'}
          onChange={
            (e) => this.save('password', e.target.value)
          }
        /> <br />
        <TextField
          floatingLabelFixed
          floatingLabelText="New password"
          hintText="Retype your new password"
          value={this.state.passwordRetype}
          type={this.state.showPassword ? 'text' : 'password'}
          onChange={
            (e) => this.save('passwordRetype', e.target.value)
          }
        /> <br /><br />
        <Checkbox
          label="Show Password"
          value={this.state.showPassword}
          onCheck={(e, value) => {
            this.setState({ showPassword: value });
          }}
        />
        {this.state.rulesValidator}
      </Paper>
    );
  }

}
