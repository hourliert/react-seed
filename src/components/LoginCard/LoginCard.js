import React, { Component, PropTypes } from 'react';

import { card, pureRender } from 'decorators';
import WithLoading from 'components/WithLoading';
import LoginForm from 'components/LoginForm';

@pureRender
@card
export default class LoginCard extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    isLoading: PropTypes.bool,
  };

  render() {
    const { onSubmit, isLoading } = this.props;

    return (
      <WithLoading
        container={<div className="flex layout vertical center-center" />}
        isLoading={isLoading}
      >
        <LoginForm
          isLoading={isLoading}
          onSubmit={onSubmit}
        />
      </WithLoading>
    );
  }
}
