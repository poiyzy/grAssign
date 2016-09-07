const helpers = require('babel-helpers');

function _defineProperty(t, state, key, value) {
  return t.callExpression(state.addHelper('defineProperty'), [
    t.objectExpression([]),
    key,
    value
  ]);
}

function _buildObjectProperty(t, key, value) {
  return t.objectProperty(key, value);
};

function _buildObjectExpression(t, state, key, value) {
  if (t.isArrayExpression(key)) {
    key = t.identifier(key.elements[0].name);
    return _defineProperty(t, state, key, value);
  }

  if (t.isObjectExpression(key) && key.properties) {
    var kp = key.properties[0];
    if (kp && kp.key.name === kp.value.name) {
      key = t.identifier(kp.key.name);
      return _defineProperty(t, state, key, value);
    }
  }

  return t.objectExpression([_buildObjectProperty(t, key, value)]);
};

function generateObject(t, state, key, value, rest) {
  var exp = _buildObjectExpression(t, state, key, value);

  while (rest.object) {
    exp = _buildObjectExpression(t, state, rest.property, exp);
    rest = rest.object;
  }

  return [rest, exp];
};

module.exports = function(t, state, lhs, rhs, method_name) {
  return generateObject(t, state, t.identifier(`$${method_name}`), rhs, lhs);
};
