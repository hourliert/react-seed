import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import TextField from 'material-ui/lib/text-field';
import FontIcon from 'material-ui/lib/font-icon';

import pureRender from 'decorators/pureRender';
import styles from './styles';

@pureRender
export default class FileSelector extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
  };

  static defaultProps = {
    field: {},
  };

  _openFileDialog() {
    const fileUploadDom = findDOMNode(this.refs.fileUpload);
    fileUploadDom.click();
  }

  render() {
    const { field } = this.props;
    const currentFileName = field.value && field.value.length ?
    field.value[0].name : 'No file selected';

    return (
      <div className="layout horizontal center-center">
        <FloatingActionButton
          onTouchTap={::this._openFileDialog}
        >
          <FontIcon className="material-icons">backup</FontIcon>
        </FloatingActionButton>
        <input
          ref="fileUpload"
          type="file"
          style={{ display: 'none' }}
          {...field}
          value={null}
        />
        <TextField
          onTouchTap={::this._openFileDialog}
          style={styles.textField}
          errorText={field.error}
          value={currentFileName}
          floatingLabelText="Selected File"
        />
      </div>
    );
  }
}
