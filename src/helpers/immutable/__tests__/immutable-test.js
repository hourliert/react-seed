import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { Map } from 'immutable';

import serverToClient from '../serverToClient';

describe('Immutable conversion', () => {
  it('should be defined roles', () => {
    expect(serverToClient).to.be.ok();
  });

  it('should convert a server state to client state', () => {
    const res = serverToClient(['routing'], {
      app: { lefNavOpen: false },
      session: { userRole: 1 },
      routing: { blabla: '/' },
    });

    expect(res.app).to.be.an.instanceof(Map);
    expect(res.session).to.be.an.instanceof(Map);
    expect(res.routing).to.not.be.an.instanceof(Map);
    expect(res.app.get('lefNavOpen')).to.be.false();
    expect(res.session.get('userRole')).to.equal(1);
    expect(res.routing).to.deep.equal({ blabla: '/' });
  });
});
