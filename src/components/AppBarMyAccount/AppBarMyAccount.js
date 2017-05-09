import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import { browserHistory } from 'react-router';

// material-ui
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

// styles
import styles from './styles'

@pureRender
export default class AppBarMyAccount extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: React.PropTypes.object,
  };

  state = {
    isOpen: false,
  }

  openMyAccount() {
    this.setState({ isOpen: true });
  }

  closeMyAccount() {
    this.setState({ isOpen: false });
  }

  isEmpty(obj) {
    if (obj === null) return true;
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;
    if (typeof obj !== 'object') return true;
    for (const key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  }

  render() {
    const { muiTheme: { rawTheme: { palette } } } = this.context;
    const { isOpen } = this.state;
    const { user } = this.props;

    if (this.isEmpty(user)) {
      return (<div></div>);
    }

    return (
      <div
        tabIndex={2}
        onBlur={::this.closeMyAccount}
      >
        <div>
          <Avatar
            style={{ cursor: 'pointer' }}
            size={30}
            onClick = {() => {
              this.openMyAccount();
            }}
          >
              {user.firstName ? user.firstName[0] : null}
            </Avatar>
          {
            isOpen ?
            <Paper
              style = {styles.container}
            >
            <div
              style = {styles.subContainer}
            >
              <div
                style = {styles.avatarContainer}
              >
                <Avatar
                  size={70}
                >
                  O
                </Avatar>
              </div>
              <div
                style = {styles.infoContainer}
              >
                <b>{user.firstName} {user.lastName}</b><br />
                <span style={styles.email}>{user.email}</span><br /><br />
                <FlatButton
                  label="My Account"
                  backgroundColor={palette.primary1Color}
                  hoverColor={palette.primary2Color}
                  style={{ color: palette.alternateTextColor }}
                  onMouseDown = {() => {
                    browserHistory.push('/settings');
                  }}
                />
              </div>
            </div>
            <div
              style = {styles.signoutContainer}
            >
              <FlatButton
                label="Sign Out"
                backgroundColor={'white'}
                hoverColor={'#e0e0e0'}
                onMouseDown = {() => {
                  browserHistory.push('/signout');
                }}
              />
              </div>
            </Paper>
            : null
          }
        </div>
      </div>
    );
  }
}
