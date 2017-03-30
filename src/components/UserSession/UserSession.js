import React, { Component, PropTypes } from 'react';
import dateformat from 'dateformat';
import warning from 'warning';
import Paper from 'material-ui/Paper';

import pureRender from 'pure-render-decorator';
import styles from './styles';

@pureRender
export default class UserSession extends Component {
  static propTypes = {
    info: PropTypes.object.isRequired,
    renderTime: PropTypes.number.isRequired,
  };

  static defaultProps = {
    info: {},
  };

  constructor(...args) {
    super(...args);
    this._computeRemainingTime = ::this._computeRemainingTime;
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
    this.tickInterval = window.setInterval(this._computeRemainingTime, 1000);
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
      <Paper
        style={styles.container}
      >
        <h3>Info about your Session</h3>
        <div style={{ paddingTop: 8 }}>
          <p>
            <label style={styles.title}>Token: </label>
            <div style={styles.body}>{token}</div>
          </p><br />
          <p>
            <label style={styles.title}>Created at: </label>
            <div style={styles.body}>{realCreated}</div>
          </p><br />
          <p>
            <label style={styles.title}>Valid to: </label>
            <div style={styles.body}>{realValidTo}</div>
          </p><br />
          <p>
            <label style={styles.title}>Remaining Time: </label>
            <div style={styles.body}>{realRemainingTime}</div>
          </p>
        </div>
      </Paper>
    );
  }
}
