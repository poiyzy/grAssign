function _buildObjectProperty(t, key, value) {
  if (t.isArrayExpression(key)) {
    key = t.identifier(`[${key.elements[0].name}]`);
  }

  if (t.isObjectExpression(key) && key.properties) {
    var kp = key.properties[0];
    if (kp && kp.key.name === kp.value.name) {
      key = t.identifier(`[${kp.key.name}]`);
    }
  }

  return t.objectProperty(key, value);
};

function _buildObjectExpression(t, property) {
  return t.objectExpression([property]);
};

function generateObject(t, key, value, rest) {
  var exp = _buildObjectExpression(t, _buildObjectProperty(t, key, value));

  while (rest.object) {
    exp = _buildObjectExpression(t, _buildObjectProperty(t, rest.property, exp));
    rest = rest.object;
  }

  return [rest, exp];
};

module.exports = function(t, lhs, rhs, method_name) {
  return generateObject(t, t.identifier(`$${method_name}`), rhs, lhs);
};
