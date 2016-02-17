function noop() {
  return null;
}

require.extensions['.png'] = noop;
