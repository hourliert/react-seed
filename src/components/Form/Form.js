import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import pureRender from 'pure-render-decorator';

@pureRender
export default class Form extends Component {
  static propTypes = {
    form: PropTypes.object,
    save: PropTypes.object,
  };

  generateFormFields() {
    const { form, save } = this.props;
    const JSX = [];
    for (const k in form) {
      if (form.hasOwnProperty(k)) {
        const field = form[k];

        switch (field.type) {
          case 'TextField':
            JSX.push(
              <TextField
                key = { field.key }
                floatingLabelFixed
                floatingLabelText = { field.labelText }
                hintText = { field.hintText }
                value = { field.value }
                onChange={
                  (e) => save(k, e.target.value)
                }
                errorText = { field.error }
              />
            );
            JSX.push(
              <br />
            );
            break;
          default:

        }
      }
    }

    return JSX;
  }

  render() {
    return (
      <div>
        {this.generateFormFields()}
      </div>
    );
  }
}
