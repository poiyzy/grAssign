function _defineProperty(t, key, value) {
  return t.callExpression(
    t.memberExpression(
      t.identifier('Object'),
      t.identifier('defineProperty')
    ),
    [
      t.objectExpression([]),
      key,
      value
    ]
  );
}

function _buildObjectProperty(t, key, value) {
  return t.objectProperty(key, value);
};

function _buildObjectExpression(t, key, value) {
  if (t.isArrayExpression(key)) {
    key = t.identifier(key.elements[0].name);
    return _defineProperty(t, key, value);
  }

  if (t.isObjectExpression(key) && key.properties) {
    var kp = key.properties[0];
    if (kp && kp.key.name === kp.value.name) {
      key = t.identifier(kp.key.name);
      return _defineProperty(t, key, value);
    }
  }

  return t.objectExpression([_buildObjectProperty(t, key, value)]);
};

function generateObject(t, key, value, rest) {
  var exp = _buildObjectExpression(t, key, value);

  while (rest.object) {
    exp = _buildObjectExpression(t, rest.property, exp);
    rest = rest.object;
  }

  return [rest, exp];
};

module.exports = function(t, lhs, rhs, method_name) {
  return generateObject(t, t.identifier(`$${method_name}`), rhs, lhs);
};
