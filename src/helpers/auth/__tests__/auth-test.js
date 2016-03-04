import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { buildRoles, buildAccessLevels, checkAccess } from '../auth';

describe('Auth', () => {
  const roles = [
    'public',
    'user',
    'admin',
  ];
  const levels = {
    public: '*',
    anon: ['public'],
    user: ['user', 'admin'],
    admin: ['admin'],
  };

  it('should build roles', () => {
    expect(buildRoles(roles)).to.deep.equal({
      public: {
        bitMask: 1,
        title: 'public',
      },
      user: {
        bitMask: 2,
        title: 'user',
      },
      admin: {
        bitMask: 4,
        title: 'admin',
      },
    });
  });

  it('should build access levels', () => {
    const userRoles = {
      public: {
        bitMask: 1,
        title: 'public',
      },
      user: {
        bitMask: 2,
        title: 'user',
      },
      admin: {
        bitMask: 4,
        title: 'admin',
      },
    };
    expect(buildAccessLevels(levels, userRoles)).to.deep.equal({
      public: {
        bitMask: 7,
      },
      anon: {
        bitMask: 1,
      },
      user: {
        bitMask: 6,
      },
      admin: {
        bitMask: 4,
      },
    });
  });

  it('should allow access to user to public ressource', () => {
    const role = {
      bitMask: 2,
      title: 'user',
    };
    const accessLevel = {
      bitMask: 7,
    };

    expect(checkAccess(accessLevel, role)).to.be.ok();
  });

  it('should allow access to admin to user ressource', () => {
    const role = {
      bitMask: 4,
      title: 'admin',
    };
    const accessLevel = {
      bitMask: 6,
    };

    expect(checkAccess(accessLevel, role)).to.be.ok();
  });

  it('should restrict access to public to user ressource', () => {
    const role = {
      bitMask: 1,
      title: 'public',
    };
    const accessLevel = {
      bitMask: 6,
    };

    expect(checkAccess(accessLevel, role)).to.not.be.ok();
  });

  it('should restrict access to user to admin ressource', () => {
    const role = {
      bitMask: 2,
      title: 'user',
    };
    const accessLevel = {
      bitMask: 4,
    };

    expect(checkAccess(accessLevel, role)).to.not.be.ok();
  });
});
