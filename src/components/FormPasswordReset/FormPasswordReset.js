import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';

// material-ui
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Check from 'material-ui/svg-icons/navigation/check';
import Close from 'material-ui/svg-icons/navigation/close';

// custom components
import LoadingButton from 'components/LoadingButton';

// styles
import styles from './styles';

@pureRender
export default class FormPasswordReset extends Component {
  static propTypes = {
    regexRules: PropTypes.array,
    user: PropTypes.object,
    updatePassword: PropTypes.func,
    refresh: PropTypes.func,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: React.PropTypes.object,
  };

  state = {
    buttonStatus: undefined,
    hasChanged: false,
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
    this.state.hasChanged = true;
    this.state.buttonStatus = 'editing';
    this.rulesValidator();
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
        </Paper>
    );

    this.state.resetIsValid = resetIsValid;
    this.state.rulesValidator = JSX;
    this.state.hasChanged = true;

    this.forceUpdate();
  }

  async updatePassword() {
    const { password } = this.state;

    const { updatePassword, refresh } = this.props;
    const body = {
      password,
    };

    this.setState({ buttonStatus: 'loading' });
    const resp = await updatePassword(body);
    if (resp.type === 'UPDATE_USER_ERROR') {
      this.setState({ buttonStatus: 'error' });
    } else {
      this.setState({ buttonStatus: 'success' });
      refresh();
    }
  }

  render() {
    const { hasChanged, buttonStatus, resetIsValid } = this.state;
    const { muiTheme: { rawTheme: { palette } } } = this.context;

    return (
      <Paper
        style={styles.container}
      >
        <h3>Change your password</h3>
          <div
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                ::this.updatePassword();
              }
            }}
          >
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
          {
            hasChanged ?
            [<br />,
            <LoadingButton
              status={buttonStatus}
              style={{
                color: palette.alternateTextColor,
                opacity: resetIsValid ? 1 : 0.5,
              }}
              disabled={!resetIsValid}
              label="Save"
              onTouchTap={::this.updatePassword}
            />] : null
          }
        </div>
      </Paper>
    );
  }

}
