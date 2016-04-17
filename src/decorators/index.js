import { abstractFetcher, abstractRunFetchers } from './fetcher';

export const prefetcher = abstractFetcher('prefetchers');
export const deferrer = abstractFetcher('deferrers');
export const runPrefetchers = abstractRunFetchers('prefetchers');
export const runDeferrers = abstractRunFetchers('deferrers');
export { default as card } from './card';
