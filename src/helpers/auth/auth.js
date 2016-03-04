import warning from 'warning';

export function checkAccess(requiredLevel, currentLevel) {
  return !!(requiredLevel.bitMask & currentLevel.bitMask);
}

export function accessEquals(requiredLevel, currentLevel) {
  return requiredLevel.bitMask === currentLevel.bitMask;
}

/*
 Method to build a distinct bit mask for each role
 It starts off with "1" and shifts the bit to the left for each element in the
 roles array parameter
 */
export function buildRoles(roles) {
  let bitMask = '01';

  warning(
    roles.length <= 31, `
      You have too many roles!
      Max=31 before the bit shift pushes the accompanying integer
      out of the memory footprint for an integer
    `
  );

  // dbg
  const userRoles = roles.reduce((result, role) => {
    const intCode = parseInt(bitMask, 2);
    bitMask = (intCode << 1).toString(2);
    return {
      ...result,
      [role]: {
        bitMask: intCode,
        title: role,
      },
    };
  }, {});

  return userRoles;
}

/*
 This method builds access level bit masks based on the accessLevelDeclaration parameter which must
 contain an array for each access level containing the allowed user roles.
 */
export function buildAccessLevels(accessLevelDeclarations, userRoles) {
  const declarationsArr = Object.keys(accessLevelDeclarations)
    .map(name => ({ name, level: accessLevelDeclarations[name] }));

  let accessLevels = declarationsArr
      .filter(({ level }) => typeof level === 'string')
      .reduce((result, { level, name }) => {
        warning(
          level === '*', `
            Access Control Error: Could not parse "${level}"
            as access definition for level "${name}"
          `
        );

        const resultBitMask = Object.keys(userRoles).reduce((maxBitMask) => `${maxBitMask}1`, '');

        return {
          ...result,
          [name]: {
            bitMask: parseInt(resultBitMask, 2),
          },
        };
      }, {});

  accessLevels = declarationsArr
    .filter(({ level }) => typeof level !== 'string')
    .reduce((result, { level, name }) => {
      const levelName = name;
      const levelsArr = level;
      const resultBitMask = levelsArr.reduce((bitMask, roleName) => {
        warning(
          userRoles.hasOwnProperty(roleName) === true, `
            Access Control Error: Could not find role "${roleName}" in
            registered roles while building access for "${levelName}"
          `
        );

        return bitMask | userRoles[roleName].bitMask;
      }, 0);

      return {
        ...result,
        [name]: {
          bitMask: resultBitMask,
        },
      };
    }, accessLevels);

  return accessLevels;
}
