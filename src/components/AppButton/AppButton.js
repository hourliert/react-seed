import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';

// material-ui
import Avatar from 'material-ui/Avatar';

// styles
import styles from './styles';

@pureRender
export default class AppButton extends Component {
  static propTypes = {
    backgroundColor: PropTypes.string,
    label: PropTypes.string,
  };

  render() {
    const { label, backgroundColor } = this.props;

    return (
      <div style={styles.container}>
        <Avatar backgroundColor={backgroundColor} size={50} >{label[0]}</Avatar>
        <br />
        <div style={styles.appName}>{label}</div>
      </div>
    );
  }
}
