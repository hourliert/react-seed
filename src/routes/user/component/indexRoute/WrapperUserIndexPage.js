import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';

import pureRender from 'pure-render-decorator';
import CardsList from 'components/CardsList';
import Paper from 'material-ui/Paper';
import logo192 from 'images/logo/logo-192x192.png';

@pureRender
export default class WrapperUserIndexPage extends Component {
  static propTypes = {
    onToggleLeftNav: PropTypes.func,
  };

  render() {
    return (
      <CardsList flex>
        <Helmet title="User Home" />

        <Paper style={{ padding: 25, textAlign: 'center' }}>
          <img src={logo192} width={100} />
          <h2>Welcome on Retax Seed.</h2>
          <p>Use the Yo Generator to start creating pages, components, actions...</p>
          <p>Check the documentation to create your app.</p>
        </Paper>
      </CardsList>
    );
  }
}
