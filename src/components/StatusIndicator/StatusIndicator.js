import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';

// images
import Processing from './images/processing.png';
import Delivered from './images/delivered.png';
import EnRoute from './images/enRoute.png';
import ToPickup from './images/toPickup.png';
import ToDelivery from './images/toDelivery.png';
import Pickup from './images/pickup.png';
import Dropped from './images/dropped.png';

@pureRender
export default class StatusIndicator extends Component {
  static propTypes = {
    value: PropTypes.object,
    datum: PropTypes.any,
  };

  getStatusStepper() {
    const { value } = this.props;
    switch (value) {
      case 'Processing':
        return (
          <img src={ Processing } style={{ width: '90%' }} />
        );
      case 'Ready':
        return (
          <img src={ Processing } style={{ width: '90%' }} />
        );
      case 'To Pickup':
        return (
          <img src={ ToPickup } style={{ width: '90%' }} />
        );
      case 'Pickup':
        return (
          <img src={ Pickup } style={{ width: '90%' }} />
        );
      case 'En Route':
        return (
          <img src={ EnRoute } style={{ width: '90%' }} />
        );
      case 'Dropped':
        return (
          <img src={ Dropped } style={{ width: '90%' }} />
        );
      case 'To Delivery':
        return (
          <img src={ ToDelivery } style={{ width: '90%' }} />
        );
      case 'Delivered':
        return (
          <img src={ Delivered } style={{ width: '90%' }} />
        );
      case 'Invoiced':
        return (
          <img src={ Delivered } style={{ width: '90%' }} />
        );
      default:
        return (
          <img src={ Delivered } style={{ width: '90%' }} />
        );
    }
  }

  render() {
    return <div>{this.getStatusStepper()}</div>;
  }
}
