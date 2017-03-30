import React, { PropTypes, Component } from 'react';
import pureRender from 'pure-render-decorator';

// material-ui
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

// styles
import styles from './styles';

@pureRender
export default class WrapperSettingsPage extends Component {
  static propTypes = {

  };

  constructor(...args) {
    super(...args);
    this.state = {
      stepIndex: 0,
    };
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
        <div>
          Hello
        </div>
      );
      case 1:
        return (
        <div>
          World
        </div>
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
              onClick={() => {this.setState({ stepIndex: 0 });}}
            >
              My Info
            </div>
            <div
              style={stepIndex === 1 ? styles.menuItemSelected : styles.menuItem}
              onClick={() => {this.setState({ stepIndex: 1 });}}
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
