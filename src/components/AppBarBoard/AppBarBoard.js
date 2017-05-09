import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import { browserHistory } from 'react-router';

// material-ui
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Apps from 'material-ui/svg-icons/navigation/apps';

import AppButton from 'components/AppButton';

// styles
import styles from './styles'

@pureRender
export default class AppBarBoard extends Component {
  static propTypes = {
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

  render() {
    const { muiTheme: { rawTheme: { palette } } } = this.context;
    const { isOpen } = this.state;

    return (
      <div
        tabIndex={1}
        onBlur={::this.closeMyAccount}
      >
        <div>
          <Apps
            style={{ color: 'white', cursor: 'pointer' }}
            onClick = {() => {
              this.openMyAccount();
            }}
          />
          {
            isOpen ?
            <Paper
              style = {styles.container}
            >
            <div
              style = {styles.subContainer}
            >
              <AppButton backgroundColor={'#9c27b0'} label={'Sales'} />
              <AppButton backgroundColor={'#673ab7'} label={'Dispatch'} />
              <AppButton backgroundColor={'#3f51b5'} label={'Scheduling'} />
              <AppButton backgroundColor={'#2196f3'} label={'Fleet'} />
              <AppButton backgroundColor={'#4caf50'} label={'Safety'} />
              <AppButton backgroundColor={'#cddc39'} label={'Accounting'} />
              <AppButton backgroundColor={'#ffc107'} label={'HR'} />
              <AppButton backgroundColor={'#00bcd4'} label={'Reports'} />
              <AppButton backgroundColor={'#e91e63'} label={'EDI'} />
              <AppButton backgroundColor={'#607d8b'} label={'Manager'} />
              <AppButton backgroundColor={'#000000'} label={'Admin'} />
            </div>
            <div
              style = {styles.moreContainer}
            >
              <FlatButton
                label="More Apps"
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
