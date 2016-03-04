import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import { reduxForm } from 'redux-form';

import pureRender from 'decorators/pureRender';
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
          type="text"
          hintText="Username"
          errorText={email.error}
          {...email}
        />

        <TextField
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
