import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/lib/avatar';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import dateformat from 'dateformat';
import warning from 'warning';

import { card, pureRender } from 'decorators';
import styles from './styles';

@pureRender
@card
export default class SessionInfo extends Component {
  static propTypes = {
    info: PropTypes.object.isRequired,
    renderTime: PropTypes.number.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    info: {},
  };

  constructor(...args) {
    super(...args);
    this.state = {
      remainingTime: undefined,
    };
  }

  componentWillMount() {
    const { renderTime } = this.props;
    this._computeRemainingTime(renderTime);
  }

  componentDidMount() {
    this._computeRemainingTime();
    this.tickInterval = window.setInterval(::this._computeRemainingTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.tickInterval);
  }

  _computeRemainingTime(now = new Date()) {
    const { validTo } = this.props.info;
    const remainingTime = new Date(new Date(validTo) - now);

    this.setState({
      remainingTime,
    });
  }

  _formatRemainingTime(time) {
    if (!time) return '';

    const months = time.getUTCMonth();
    const days = time.getUTCDate() - 1;
    const hours = time.getUTCHours();
    const minutes = time.getUTCMinutes();
    const seconds = time.getUTCSeconds();

    return `${months}M ${days}D ${hours}H ${minutes}m ${seconds}s`;
  }

  _formatDate(date) {
    try {
      return dateformat(new Date(date), 'default', true);
    } catch (e) {
      warning(true, e.message);
    }

    return '';
  }

  render() {
    const { token, validTo, created } = this.props.info;
    const { remainingTime } = this.state;

    const realValidTo = this._formatDate(validTo);
    const realCreated = this._formatDate(created);
    const realRemainingTime = this._formatRemainingTime(remainingTime);

    return (
      <div>
        <CardHeader
          title="Session Info"
          subtitle="Display basic session information"
          avatar={<Avatar style={{ color: 'blue' }}>S</Avatar>}
        />
        {
          token ? (
            <div>
              <CardTitle
                title={`Remaining: ${realRemainingTime}`}
                subtitle={`Token: ${token}`}
                style={styles.cardTitle}
              />
              <CardText>
                <p>{`Valid To: ${realValidTo} UTC`}</p>
                <p>{`Created: ${realCreated} UTC`}</p>
              </CardText>
            </div>
          ) : (
            <CardText>
              Need a GET session method to display this.
            </CardText>
          )
        }
      </div>
    );
  }
}
