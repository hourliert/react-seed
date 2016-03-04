import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import IdMapper from '../IdMapper';

describe('IdMapper', () => {
  it('should be defined', () => {
    const idGenerator = new IdMapper();
    expect(idGenerator).to.be.ok();
  });

  it('should create a new id', () => {
    const idGenerator = new IdMapper('k1uf93');
    const realId = 'entities/1';

    const mappedId = idGenerator.next(realId);

    expect(mappedId).to.equal('k1uf93_1');
  });

  it('should get or create a new id', () => {
    const idGenerator = new IdMapper('k1uf93');
    const realId = 'entities/1';

    let mappedId = idGenerator.getOrNext(realId);

    expect(mappedId).to.equal('k1uf93_1');

    mappedId = idGenerator.getOrNext(realId);

    expect(mappedId).to.equal('k1uf93_1');
  });
});
