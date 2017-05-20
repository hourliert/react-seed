import React, { PropTypes, Component } from 'react';
import pureRender from 'pure-render-decorator';

// material-ui
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

// custom components
import UserSession from 'components/UserSession';
import FormPassword from 'components/FormPassword';
import FormPersonalInfo from 'components/FormPersonalInfo';

// styles
import styles from './styles';

@pureRender
export default class WrapperSettingsPage extends Component {
  static propTypes = {
    user: PropTypes.object,
    updateUser: PropTypes.func,
    refresh: PropTypes.func,
    session: PropTypes.object,
    initialRenderTime: PropTypes.number,
  };

  constructor(...args) {
    super(...args);
    this.state = {
      stepIndex: 0,
    };
  }

  getStepContent(stepIndex) {
    const {
      updateUser,
      session,
      initialRenderTime,
      user,
      refresh,
     } = this.props;

    switch (stepIndex) {
      case 0:
        return (
          [
            <FormPersonalInfo
              updateUser={updateUser}
              refresh={refresh}
              user={user}
            />,
            <FormPassword
              updatePassword={updateUser}
              refresh={refresh}
              user={user}
            />,
          ]
      );
      case 1:
        return (
        <UserSession
          info={session}
          renderTime={initialRenderTime}
        />
      );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render() {
    const {
      stepIndex,
    } = this.state;

    return (
      <div className="flex layout vertical">
        <Toolbar style={{ background: 'white', borderBottom: '1px solid #aaaaaa', height: 48 }}>
          <ToolbarGroup firstChild style={{ marginLeft: '5px', overflow: 'scroll' }}>
            <div
              style={stepIndex === 0 ? styles.menuItemSelected : styles.menuItem}
              onClick={() => { this.setState({ stepIndex: 0 }); }}
            >
              Info
            </div>
            <div
              style={stepIndex === 1 ? styles.menuItemSelected : styles.menuItem}
              onClick={() => { this.setState({ stepIndex: 1 }); }}
            >
              Session
            </div>
          </ToolbarGroup>
        </Toolbar>
        <div style={styles.container}>
            {this.getStepContent(this.state.stepIndex)}
        </div>
      </div>
    );
  }
}
