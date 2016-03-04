import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);
chai.use(sinonChai);

import React from 'react';

import abstractFetcher from '../fetcher';
import abstractRunFetchers from '../runFetchers';

describe('fetch decorator', () => {
  it('should exists', () => {
    expect(abstractFetcher).to.be.ok();
  });

  it('should define a composed component with fetcher static property', () => {
    const Component = () => (
      <div>Component</div>
    );
    const fetcher = abstractFetcher('prefetch');
    const myFetcher = () => ({});

    const ComposedComponent = fetcher(myFetcher)(Component);

    expect(ComposedComponent.prefetch.fetchers).to.equal(myFetcher);
    expect(ComposedComponent.prefetch.nbRunDone).to.equal(0);
    expect(ComposedComponent.prefetch.nbRunToDo).to.equal(Infinity);
  });

  it('should run fetchers', () => {
    const Component = () => (
      <div>Component</div>
    );
    const fetcher = abstractFetcher('prefetch');
    const runFetchers = abstractRunFetchers('prefetch');
    const myFetcher = sinon.spy();

    const ComposedComponent = fetcher(myFetcher)(Component);

    runFetchers([
      ComposedComponent,
    ], 'Param');

    expect(myFetcher).to.have.been.calledWith('Param');
    expect(ComposedComponent.prefetch.nbRunDone).to.equal(1);
  });
});
