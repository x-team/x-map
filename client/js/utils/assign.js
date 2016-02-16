const assign = Object.assign || require('object.assign'); // Polyfill maybe needed for browser support

function assignToEmpty() {
  return assign.apply(null, [{}].concat(Array.prototype.slice.call(arguments)));
}

export default assignToEmpty;
