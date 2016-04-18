import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import counter from '../counter';

describe('Counter Reducer', () => {
  it('should exists', () => {
    expect(counter).to.be.ok();
  });
});
