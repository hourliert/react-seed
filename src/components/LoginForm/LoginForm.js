import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { reduxForm } from 'redux-form';

import pureRender from 'pure-render-decorator';
import validate from './validationRules';
import styles from './styles';

const fields = ['email', 'password'];

@pureRender
@reduxForm({
  form: 'login',
  fields,
  validate,
})
export default class LoginForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func,
    resetForm: PropTypes.func,

    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    fields: {},
  };

  render() {
    const { fields: { email, password } } = this.props;
    const { handleSubmit, resetForm } = this.props;

    return (
      <form
        style={styles.form}
        className="flex layout vertical around-justified"
        onSubmit={handleSubmit}
        onReset={resetForm}
      >
        <TextField
          id="loginform-input-1"
          type="text"
          hintText="Username"
          errorText={email.error}
          {...email}
        />

        <TextField
          id="loginform-input-2"
          type="password"
          hintText="Password"
          errorText={password.error}
          {...password}
        />

        <div className="layout horizontal around-justified">
          <FlatButton
            label="Cancel"
            primary
            type="reset"
          />
          <FlatButton
            label="Submit"
            primary
            type="submit"
          />
        </div>
      </form>
    );
  }
}
