import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';

// material-ui
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

// custom components
import LoadingButton from 'components/LoadingButton';

// styles
import styles from './styles';

@pureRender
export default class PersonalInfo extends Component {
  static propTypes = {
    user: PropTypes.object,
    updateUser: PropTypes.func,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: React.PropTypes.object,
  };

  constructor(...args) {
    super(...args);
    const { user } = this.props;
    this.state = {
      buttonStatus: undefined,
      hasChanged: false,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      emailError: undefined,
    };
  }

  save(element, value) {
    const newState = this.state;
    newState.hasChanged = true;

    if ((element === 'email') && (!this.emailIsCorrect(value))) {
      newState.emailError = 'Email format is invalid';
    }
    if ((element === 'email') && (this.emailIsCorrect(value))) {
      newState.emailError = undefined;
    }

    newState[element] = value;

    this.setState({ newState });
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

  emailIsCorrect(email) {
    const check = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;
    return check.test(email);
  }

  async updateUser() {
    const { firstName, lastName, email } = this.state;

    const { updateUser } = this.props;
    const body = {
      firstName,
      lastName,
      email,
    };

    this.setState({ buttonStatus: 'loading' });
    const resp = await updateUser(body);
    if (resp.type === 'UPDATE_USER_ERROR') {
      this.setState({ buttonStatus: 'error' });
    } else {
      this.setState({ buttonStatus: 'success' });
    }
  }

  render() {
    const { hasChanged, email, buttonStatus } = this.state;
    const { muiTheme: { rawTheme: { palette } } } = this.context;

    const emailIsCorrect = this.emailIsCorrect(email);

    return (
      <Paper
        style={styles.container}
      >
        <h3>Personal info</h3>
        <TextField
          floatingLabelFixed
          floatingLabelText="First Name"
          hintText="Enter your First Name"
          value={this.state.firstName}
          onChange={
            (e) => this.save('firstName', e.target.value)
          }
        /> <br />
        <TextField
          floatingLabelFixed
          floatingLabelText="Last Name"
          hintText="Enter your Last Name"
          value={this.state.lastName}
          onChange={
            (e) => this.save('lastName', e.target.value)
          }
        />
        <br />
        <TextField
          floatingLabelFixed
          floatingLabelText="Email"
          hintText="Enter your email address"
          value={this.state.email}
          errorText={this.state.emailError}
          onChange={
            (e) => this.save('email', e.target.value)
          }
        /><br />
      {
        hasChanged ?
        [<br />,
        <LoadingButton
          status={buttonStatus}
          style={{
            color: palette.alternateTextColor,
            opacity: emailIsCorrect ? 1 : 0.5,
          }}
          disabled={!emailIsCorrect}
          backgroundColor={palette.accent1Color}
          hoverColor={palette.accent2Color}
          label="Save"
          onTouchTap={::this.updateUser}
        />] : null
      }
      </Paper>
    );
  }

}
