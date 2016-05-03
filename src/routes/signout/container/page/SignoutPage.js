import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { annotator } from 'retax-components';

import pureRender from 'pure-render-decorator';
import WrapperSignoutPage from 'routes/signout/component/page';
import SignoutPageSelector from 'routes/signout/selector/page';
import SessionActionsCreator from 'actions/session';

function mapDispatchToProps(dispatch, props) {
  const { sessionActions } = props;

  return bindActionCreators({
    ...sessionActions.export(),
  }, dispatch);
}

@pureRender
@annotator.RetaxComponent({
  actionsCreators: {
    sessionActions: SessionActionsCreator,
  },
})
@connect(SignoutPageSelector, mapDispatchToProps)
export default class SignoutPage extends Component {
  static propTypes = {
    signout: PropTypes.func,

    isLoading: PropTypes.bool,
  };

  componentWillMount() {
    const { signout } = this.props;

    signout();
  }

  render() {
    const { isLoading } = this.props;

    return (
      <WrapperSignoutPage
        isLoading={isLoading}
      />
    );
  }
}
