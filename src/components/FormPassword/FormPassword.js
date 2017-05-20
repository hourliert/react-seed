import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';

// material-ui
import Paper from 'material-ui/Paper';
import Check from 'material-ui/svg-icons/navigation/check';
import Close from 'material-ui/svg-icons/navigation/close';

// custom components
import LoadingButton from 'quiver-loading-button';
import Form from 'components/Form';

// helpers
import { formIsValid } from 'helpers/form';

// constant
import {
  AT_LEAST_8_CHAR,
  AT_LEAST_1_NUMERICAL_CHAR,
  AT_LEAST_1_ALPHABETICAL_CHAR,
} from 'constants/regex';

// styles
import styles from './styles';

@pureRender
export default class FormPassword extends Component {
  static propTypes = {
    user: PropTypes.object,
    updatePassword: PropTypes.func,
    refresh: PropTypes.func,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: React.PropTypes.object,
  };

  constructor(...args) {
    super(...args);
    const { user } = this.props;

    const form = {
      password: {
        component: 'TextField',
        key: `password_${user._key}`,
        type: 'password',
        labelText: 'New Password',
        hintText: 'Enter your new Password',
      },
      passwordRetype: {
        component: 'TextField',
        key: `passwordRetype_${user._key}`,
        type: 'password',
        labelText: 'New Password',
        hintText: 'Retype your new Password',
      },
      showPassword: {
        component: 'Checkbox',
        key: `showPassword_${user._key}`,
        labelText: 'Show Password',
        value: false,
      },
    };

    const regexRules = [
      {
        regex: AT_LEAST_8_CHAR,
        description: 'At least 8 characters',
      },
      {
        regex: AT_LEAST_1_NUMERICAL_CHAR,
        description: 'At least 1 numerical character',
      },
      {
        regex: AT_LEAST_1_ALPHABETICAL_CHAR,
        description: 'At least 1 alphabetical character',
      },
    ];

    this.state = {
      buttonStatus: 'editing',
      hasChanged: false,
      isValid: true,
      form,
      regexRules,
      regexResult: undefined,
    };
  }

  form() {
    const { form, hasChanged, isValid, buttonStatus } = this.state;
    const { muiTheme: { rawTheme: { palette } } } = this.context;

    return (
      <div
        onKeyPress={(e) => {
          if ((e.key === 'Enter') && isValid) {
            ::this.updatePassword();
          }
        }}
      >
        <Form
          title = {'Change your Password'}
          form = {form}
          save= {::this.save}
        />
        {
          hasChanged ?
          [<br />,
          <LoadingButton
            status={buttonStatus}
            style={{
              color: palette.alternateTextColor,
              opacity: isValid ? 1 : 0.5,
            }}
            disabled={!isValid}
            label="Save"
            onTouchTap={::this.updatePassword}
          />] : null
        }
      </div>
    );
  }

  handleShowPassword(newState, showPassword) {
    const handleState = newState;
    if (showPassword) {
      handleState.form.password.type = 'text';
      handleState.form.passwordRetype.type = 'text';
    } else {
      handleState.form.password.type = 'password';
      handleState.form.passwordRetype.type = 'password';
    }

    return handleState;
  }

  save(element, value) {
    let newState = this.state;
    newState.hasChanged = true;
    newState.buttonStatus = 'editing';

    // handle custom events
    if (element === 'showPassword') {
      newState = this.handleShowPassword(newState, value);
    }

    // We save the value
    newState.form[element].value = value;
    // Regex validation
    if (newState.form[element].regex) {
      const valueIsValid = newState.form[element].regex.test(value);
      if (!valueIsValid) {
        newState.form[element].error = newState.form[element].regexError;
        newState.isValid = false;
      } else {
        newState.form[element].error = undefined;
        newState.isValid = formIsValid(newState.form);
      }
    }

    // we set the new state
    this.setState({ newState });
    this.rulesValidator();
  }

  async updatePassword() {
    const { form } = this.state;

    const { updatePassword, refresh } = this.props;
    const body = {
      password: form.password.value,
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

  rulesValidator() {
    const { regexRules, form } = this.state;
    let JSX = [];

    let isValid = (form.password.value === form.passwordRetype.value);

    JSX.push(
      isValid ?
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
        const regexIsCorrect = rule.regex.test(form.password.value);
        isValid = isValid && regexIsCorrect;
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

    this.setState({
      regexResult: JSX,
      isValid,
    });
  }

  render() {
    const { regexResult } = this.state;

    return (
      <Paper
        style={styles.container}
      >
        {this.form()}
        {regexResult}
      </Paper>
    );
  }

}
