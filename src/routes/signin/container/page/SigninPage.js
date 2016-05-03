import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { annotator } from 'retax-components';

import pureRender from 'pure-render-decorator';
import WrapperSigninPage from 'routes/signin/component/page';
import SigninPageSelector from 'routes/signin/selector/page';
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
@connect(SigninPageSelector, mapDispatchToProps)
export default class SigninPage extends Component {
  static propTypes = {
    signin: PropTypes.func,

    isLoading: PropTypes.bool,
  };

  render() {
    const { signin, isLoading } = this.props;

    return (
      <WrapperSigninPage
        onSignin={signin}
        isLoading={isLoading}
      />
    );
  }
}
