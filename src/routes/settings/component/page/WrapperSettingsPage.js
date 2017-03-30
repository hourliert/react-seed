import React, { PropTypes, Component } from 'react';
import pureRender from 'pure-render-decorator';

// material-ui
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

// custom components
import UserInfo from 'components/UserInfo';
import UserSession from 'components/UserSession';

// styles
import styles from './styles';

@pureRender
export default class WrapperSettingsPage extends Component {
  static propTypes = {
    user: PropTypes.object,
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
      session,
      initialRenderTime,
     } = this.props;

    switch (stepIndex) {
      case 0:
        return (
        <UserInfo />
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
        <Toolbar style={{ background: 'white', borderBottom: '1px solid #aaaaaa' }}>
          <ToolbarGroup firstChild style={{ marginLeft: '5px' }}>
            <div
              style={stepIndex === 0 ? styles.menuItemSelected : styles.menuItem}
              onClick={() => { this.setState({ stepIndex: 0 }); }}
            >
              My Info
            </div>
            <div
              style={stepIndex === 1 ? styles.menuItemSelected : styles.menuItem}
              onClick={() => { this.setState({ stepIndex: 1 }); }}
            >
              My Session
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
