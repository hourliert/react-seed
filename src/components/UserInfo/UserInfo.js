import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/lib/avatar';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

import { card, pureRender } from 'decorators';

@pureRender
@card
export default class UserInfo extends Component {
  static propTypes = {
    info: PropTypes.object.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    info: {},
  };

  _computeFullName() {
    const { firstName, lastName, email } = this.props.info;

    if (!firstName && !lastName) return email;
    return `${firstName} ${lastName}`;
  }

  render() {
    const { isAdmin, email, entityId } = this.props.info;

    return (
      <div>
        <CardHeader
          title="User Info"
          subtitle="Display basic user information"
          avatar={<Avatar style={{ color: 'red' }}>U</Avatar>}
        />
        <CardTitle
          title={`Name: ${this._computeFullName()}`}
          subtitle={`Role: ${isAdmin ? 'Admin' : 'User'}`}
        />
        <CardText>
          <p>Entity ID: {entityId}</p>
          <p>Email: {email}</p>
        </CardText>
      </div>
    );
  }
}
