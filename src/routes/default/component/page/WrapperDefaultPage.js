import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import pureRender from 'pure-render-decorator';
import FlatButton from 'material-ui/FlatButton';

import Image404 from 'images/images/404.png'

@pureRender
export default class WrapperDefaultPage extends Component {
  render() {
    return (
      <div
        className="flex layout vertical center-center"
        style={{ width: '100%', height: '100%' }}
      >
        <div style={{ textAlign: 'center', color: '#333333' }}>
          <img src={Image404} width="250" />
          <h1>Sorry, this page flew in the deep space!</h1>
          <p>If you don't want to be aspirate by a black hole, go back on earth.</p>
          <FlatButton
            labelColor="white"
            label={ 'Go Home' }
            style={{ color: 'white' }}
            backgroundColor="#2196f3"
            hoverColor="#1976d2"
            onTouchTap={() => { browserHistory.push('/');}}
          />
        </div>
      </div>
    );
  }
}
