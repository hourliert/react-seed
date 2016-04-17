import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { annotator } from 'retax';
import { provideHooks } from 'redial';

import pureRender from 'pure-render-decorator';
import WrapperAdminIndexPage from 'routes/admin/component/indexRoute';
import AdminIndexPageSelector from 'routes/admin/selector/indexRoute';
import AppActionsCreator from 'actions/app';
import CounterActionsCreator from 'actions/counter';

function mapDispatchToProps(dispatch, props) {
  const { appActions, counterActions } = props;

  return bindActionCreators({
    ...appActions.export(),
    ...counterActions.export(),
  }, dispatch);
}

function fetch({ dispatch, counterActionsCreator }) {
  return dispatch(counterActionsCreator.fetchCounter());
}

@pureRender
@provideHooks({
  fetch,
  defer: fetch,
})
@annotator.RetaxComponent({
  actionsCreators: {
    appActions: AppActionsCreator,
    counterActions: CounterActionsCreator,
  },
})
@connect(AdminIndexPageSelector, mapDispatchToProps)
export default class AdminIndexPage extends Component {
  static propTypes = {
    toggleLeftNav: PropTypes.func,
    fetchCounter: PropTypes.func,
    counter: PropTypes.number,
  };

  render() {
    const { toggleLeftNav, counter } = this.props;

    return (
      <WrapperAdminIndexPage
        onToggleLeftNav={toggleLeftNav}
        counter={counter}
      />
    );
  }
}
