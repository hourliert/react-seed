import { abstractFetcher, abstractRunFetchers } from './fetcher';
import pureRender from './pureRender';
import card from './card';

export const prefetcher = abstractFetcher('prefetchers');
export const deferrer = abstractFetcher('deferrers');
export const runPrefetchers = abstractRunFetchers('prefetchers');
export const runDeferrers = abstractRunFetchers('deferrers');
export { pureRender, card };
