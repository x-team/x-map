const assign = Object.assign || require('object.assign'); // Polyfill maybe needed for browser support

const assignToEmpty = (firstObject, secondObject, thirdObject) => {
  return assign({}, firstObject, secondObject, thirdObject);
};

export default assignToEmpty;
