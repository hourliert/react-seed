import React, { PropTypes, Component } from 'react';
import pureRender from 'pure-render-decorator';
import Helmet from 'react-helmet';

// material-ui
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';

// custom components
import CardsList from 'components/CardsList';
import TableActiveLoad from 'components/TableActiveLoad';

// styles
import styles from './styles';

// images
import logo192 from 'images/logo/logo-192x192.png';

@pureRender
export default class WrapperUserIndexPage extends Component {
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
          <TableActiveLoad />
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
          <ToolbarGroup firstChild style={{ marginLeft: '5px', overflow: 'scroll' }}>
            <div
              style={stepIndex === 0 ? styles.menuItemSelected : styles.menuItem}
              onClick={() => { this.setState({ stepIndex: 0 }); }}
            >
              Info
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
