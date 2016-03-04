function noop() { return null; }

require.extensions['.png'] = noop;
require.extensions['.ico'] = noop;
require.extensions['.gif'] = noop;
require.extensions['.jpg'] = noop;
require.extensions['.svg'] = noop;
