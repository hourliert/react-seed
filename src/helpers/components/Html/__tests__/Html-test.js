import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

import Html from '../Html';

class Stub extends React.Component {
  render() {
    return (
      <div>Stub</div>
    );
  }
}

describe('Html', () => {
  it('should exists', () => {
    const store = {
      getState: () => ({}),

      subscribe: () => ({}),

      dispatch: () => ({}),
    };
    const wrapper = shallow(
      <Html
        store={store}
        component={<Stub />}
        assets={{ javascript: {} }}
      />
    );

    expect(wrapper).to.be.ok();
  });
});
