import React, { Component, PropTypes } from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';

import { pureRender } from 'decorators';
import CardsList from 'components/CardsList';

@pureRender
export default class WrapperLogoutPage extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
  };

  render() {
    const { isLoading } = this.props;

    return (
      <CardsList flex>
        { isLoading ? <CircularProgress /> : null }
      </CardsList>
    );
  }
}
