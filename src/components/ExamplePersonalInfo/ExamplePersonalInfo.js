import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';

import Form from 'components/Form';

// helpers
import { formIsValid } from 'helpers/form';

// constant
import {
  NOT_NULL,
} from 'constants/regex';

@pureRender
export default class ExamplePersonalInfo extends Component {
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
      firstName: {
        component: 'TextField',
        key: `firstName_${user._key}`,
        type: 'text',
        labelText: 'First Name',
        hintText: 'Enter your First Name',
        value: user.firstName,
        regex: NOT_NULL,
        regexError: 'Required',
        error: undefined,
      },
      lastName: {
        component: 'TextField',
        key: `lastName_${user._key}`,
        type: 'text',
        labelText: 'Last Name',
        hintText: 'Enter your Last Name',
        value: user.lastName,
        regex: NOT_NULL,
        regexError: 'Required',
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
