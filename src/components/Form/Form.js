import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import pureRender from 'pure-render-decorator';

@pureRender
export default class Form extends Component {
  static propTypes = {
    title: PropTypes.string,
    form: PropTypes.object,
    save: PropTypes.func,
  };

  generateFormFields() {
    const { form, save } = this.props;
    const JSX = [];
    for (const k in form) {
      if (form.hasOwnProperty(k)) {
        const field = form[k];
        if (field.display !== false) {
          switch (field.component) {
            case 'TextField':
              JSX.push(
                <TextField
                  disabled = { field.disabled }
                  key = { field.key }
                  type = { field.type }
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
            case 'Checkbox':
              JSX.push(
                <br />
              );
              JSX.push(
                <Checkbox
                  label={ field.labelText }
                  value={ field.value }
                  onCheck={(e, value) => {
                    save(k, value);
                  }}
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
    }

    return JSX;
  }

  render() {
    const { title } = this.props;
    return (
      <div>
        <h3>{title}</h3>
        {this.generateFormFields()}
      </div>
    );
  }
}
