import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';

import Form from 'components/Form';

// helpers
import { formIsValid } from 'helpers/form';

// constant
import {
  EMAIL,
} from 'constants/regex';

@pureRender
export default class ExamplePersonalEmail extends Component {
  static propTypes = {
    user: PropTypes.object,
    updateUser: PropTypes.func,
    callback: PropTypes.func,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: React.PropTypes.object,
  };

  constructor(...args) {
    super(...args);
    const { user } = this.props;
    const form = {
      email: {
        component: 'TextField',
        key: `email_${user._key}`,
        type: 'text',
        labelText: 'Email',
        hintText: 'Enter your Email',
        value: user.email,
        regex: EMAIL,
        regexError: 'Invalid email format',
        error: undefined,
      },
    };

    this.state = {
      hasChanged: false,
      isValid: true,
      form,
    };
  }

  userDidCancel() {
    /* this method is called when user click on the
    cancel button from TabDialog component */
    const { callback } = this.props;
    callback(false);
  }

  userDidAction() {
    /* this method is called when user click on the
    action button from TabDialog component */
    const { callback } = this.props;
    const { hasChanged } = this.state;
    if (hasChanged) {
      this.updateUser();
    } else {
      callback(false);
    }
  }

  form() {
    const { form } = this.state;

    return (
        <Form
          form = {form}
          save= {::this.save}
        />
    );
  }

  save(element, value) {
    const newState = this.state;
    newState.hasChanged = true;

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
  }

  async updateUser() {
    const { form } = this.state;
    const { updateUser, callback } = this.props;

    const body = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
    };

    await updateUser(body);
    callback(true);
  }

  render() {
    return (
      <div>
        {this.form()}
      </div>
    );
  }

}
