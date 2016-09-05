// test-script
var babel = require('babel-core');
var grAssign = require('../src/index.js');

module.exports = function(code) {
  var out = babel.transform(code, {
    plugins: [
      [grAssign, {
        alias: '$_g'
      }]
    ]
  });

  return out.code.replace(/\n|\s/g, '');
}
