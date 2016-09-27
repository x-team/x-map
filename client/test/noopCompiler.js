function noop() {
  return null;
}

require.extensions['.png'] = noop;
require.extensions['.css'] = noop;
require.extensions['.scss'] = noop;
