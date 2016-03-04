import { buildRoles, buildAccessLevels } from 'helpers/auth';

const roles = [
  'public',
  'user',
  'admin',
];

const levels = {
  public: '*',
  anon: ['public'],
  authentified: ['user', 'admin'],
  user: ['user'],
  admin: ['admin'],
};

export const userRoles = buildRoles(roles);
export const accessLevels = buildAccessLevels(levels, userRoles);
