import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { annotator } from 'retax-components';

import pureRender from 'pure-render-decorator';
import WrapperDocumentationPage from 'routes/documentation/component/page';
import DocumentationPageSelector from 'routes/documentation/selector/page';
import UserActionsCreator from 'actions/user';

function mapDispatchToProps(dispatch, props) {
  const { userActions } = props;

  return bindActionCreators({
    ...userActions.export(),
  }, dispatch);
}

@pureRender
@annotator.RetaxComponent({ //eslint-disable-line
  actionsCreators: {
    userActions: UserActionsCreator,
  },
})
@connect(DocumentationPageSelector, mapDispatchToProps)
export default class DocumentationPage extends Component {
  static propTypes = {
    // selector
    user: PropTypes.object,
    // userActions
    updateUser: PropTypes.func,
    fetchCurrentUser: PropTypes.func,
  };

  render() {
    return (
      <WrapperDocumentationPage
        user={this.props.user}
        updateUser={this.props.updateUser}
        fetchCurrentUser={this.props.fetchCurrentUser}
      />
    );
  }
}
