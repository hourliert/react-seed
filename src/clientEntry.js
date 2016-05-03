import 'reflect-metadata';

import injectTapEventPlugin from 'react-tap-event-plugin';
import { retax } from 'retax';

import { REACT_PERF } from 'config';
import getRetaxConfig from './retax.config';

injectTapEventPlugin();

retax.config(getRetaxConfig(false));

const rootElement = document.getElementById('root');

console.log('🚀🚀🚀🚀 Bootstrapping RETAX 🚀🚀🚀🚀');
retax.bootstrap(rootElement);

if (__ONBUILD_REACT_PERF__ && REACT_PERF) {
  window.Perf = require('react-addons-perf');
}
