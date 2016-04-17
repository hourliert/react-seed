import React, { PropTypes, Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import pureRender from 'pure-render-decorator';
import CardsList from 'components/CardsList';

@pureRender
export default class WrapperSignoutPage extends Component {
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
