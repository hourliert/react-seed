import { join } from 'path';

export const alias = {
  actions: 'actions',
  api: 'api',
  client: 'client',
  components: 'components',
  config: 'config',
  constants: 'constants',
  containers: 'containers',
  decorators: 'decorators',
  helpers: 'helpers',
  images: 'images',
  reducers: 'reducers',
  routes: 'routes',
  selectors: 'selectors',
  server: 'server',
  store: 'store',
  themes: 'themes',
};

export default function makeConfig(context) {
  const isomorphicAlias = Object.keys(alias).reduce((cur, k) => ({
    ...cur,
    [k]: join(context, alias[k]),
  }), {});

  return {
    webpackAssetsFilePath: join(context, '../build/webpack-assets.json'),
    webpackStatsFilePath: join(context, '../build/webpack-stats.json'),
    alias: isomorphicAlias,
    assets: {
      images: {
        extensions: ['png', 'jpg', 'gif', 'ico', 'svg'],
      },
    },
  };
}
