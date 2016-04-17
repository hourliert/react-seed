import { readFromEnvBoolean, readFromEnvNumber } from 'helpers/env';

// list of reducers not handled by Immutable.js
export const untrackedStates = ['routing', 'form', 'theme', 'menus'];

// enable/disable these features at runtime via env
export const REDUX_DEVTOOLS = readFromEnvBoolean('REDUX_DEVTOOLS', false);
export const SERVER_RENDERING = readFromEnvBoolean('SERVER_RENDERING', true);
export const REACT_PERF = readFromEnvBoolean('REACT_PERF', true);

// frontend server port
export const FRONTEND_SERVER_PORT = readFromEnvNumber('FRONTEND_SERVER_PORT', 5000);

// various indicators to track current version in app
export const CURRENT_VERSION = require('../../package.json').version;
