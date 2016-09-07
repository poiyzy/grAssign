const replaceAssignmentExpression = require('./replaceAssignmentExpression');

module.exports = function(babel) {
  const t = babel.types;

  function grAssignMethod(update_method) {
    const expr = update_method ? t.identifier(update_method) : t.identifier('grUpdate');
    expr.isClean = true;
    return expr;
  }

  return {
    visitor: {
      AssignmentExpression(path, state) {
        const lhs = path.node.left;
        const rhs = path.node.right;

        // 判断 设定 variable 是否是指定 名称
        if (lhs.name === '$_grAssign' || lhs.name === (state && state.opts && state.opts.alias)) {

          // 当 assign 发生时的处理, $_grAssign = test.a.b.c = 1;
          if (t.isAssignmentExpression(rhs)) {
            var l = rhs.left;
            var r = rhs.right;

            path.replaceWith(
              t.assignmentExpression(
                '=',
                lhs,
                t.callExpression(
                  grAssignMethod(state && state.opts && state.opts.method),
                  replaceAssignmentExpression(t, state, l, r, 'set')
                )
              )
            );
          }

          // 当 call method 发生时的处理, $_grAssign = test.a.b.c.push(1);
          if (t.isCallExpression(rhs)) {

            // 当只是调用方法时，不调用。$_grAssign = someFunc(2);
            if (rhs.callee && rhs.callee.name) {
              return;
            }

            var l = rhs.callee;
            var args = rhs.arguments;
            var method_name = rhs.callee && rhs.callee.property && rhs.callee.property.name;

            var arg;

            // 只支持固定方法。
            if (['push', 'unshift', 'splice', 'set', 'merge', 'apply'].indexOf(method_name) === -1) {
              return;
            }

            // 按照方法 parse arguments.
            switch(method_name) {
              case 'push':
                arg = t.arrayExpression(args); // $push: [1]
                break;
              case 'unshift':
                arg = t.arrayExpression(args); // $unshift: [1]
                break;
              case 'splice':
                if (args.length > 1) {
                  arg = t.arrayExpression([t.arrayExpression(args)]); // $splice: [[1, 2, 3, 4]]
                } else {
                  arg = t.arrayExpression(args); // $splice: [[1, 2, 3, 4]]
                }
                break;
              default:
                arg = args[0];
                break;
            }

            path.replaceWith(
              t.assignmentExpression(
                '=',
                lhs,
                t.callExpression(
                  grAssignMethod(state && state.opts && state.opts.method),
                  replaceAssignmentExpression(t, state, l.object, arg, method_name)
                )
              )
            );
          }
        }
      }
    }
  };
};
