#!/usr/bin/env node

/*eslint-disable */
const semver = require('semver');
const fs = require('fs');
const cp = require('child_process');

const npmPackage = require('../package.json');

const npmPackageFile = 'package.json';
const dockerComposeFile = 'docker-compose.yml';

var nextVersion;
if (semver.valid(process.argv[2])) {
  nextVersion = process.argv[2];
} else {
  nextVersion = semver.inc(npmPackage.version, process.argv[2], process.argv[3]);
}

if (!process.argv[2]) {
  console.log('Missing version. Aborting.'); // eslint-disable-line
  process.exit(-1);
}

/*eslint-disable */
console.log(`
  Creating a new version.
  Current version: ${npmPackage.version}
  Next version: ${nextVersion}
`);

// start the release
cp.exec(
  `git flow release start ${nextVersion}`,
  function gitFlowRelease(flowError) {
    if (flowError) return console.log(flowError); // eslint-disable-line

    console.log(`Bumping package.json`); //eslint-disable-line

    // bump package.json
    fs.readFile(npmPackageFile, 'utf8', function read(readErr, data) {
      if (readErr) return console.log(readErr);//eslint-disable-line

      const result = data.replace(/.version.*$/m, `"version": "${nextVersion}",`);

      fs.writeFile(npmPackageFile, result, 'utf8', function write(writeErr) {
        if (writeErr) return console.log(writeErr); //eslint-disable-line

        console.log(`package.json bumped`); //eslint-disable-line

        console.log(`ShrinkWrap package`); //eslint-disable-line
        cp.exec(
          `npm shrinkwrap`,
          function npmShrinkWrap(shrinkError) {
            if (shrinkError) return console.log(shrinkError); //eslint-disable-line

            console.log(`ShrinkWrap done`); //eslint-disable-line
          }
        );
      });
    });

    console.log(`Bumping docker-compose.yml`); //eslint-disable-line

    // bump docker-compose.yml
    fs.readFile(dockerComposeFile, 'utf8', function read(readErr, data) {
      if (readErr) return console.log(readErr);//eslint-disable-line

      const regexp = new RegExp(`:${npmPackage.version}$`, 'm');
      const result = data.replace(regexp, `:${nextVersion}`);

      fs.writeFile(dockerComposeFile, result, 'utf8', function write(writeErr) {
        if (writeErr) return console.log(writeErr); //eslint-disable-line

        console.log(`docker-compose.yml bumped`); //eslint-disable-line
      });
    });
  }
);
