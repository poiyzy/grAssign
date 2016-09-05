let a = { key: 1 };

let test = { a: { b: { c: 1 } } };

a.key = 2;

test.a.b.c = 2;

let test2 = { a: 1 };

var $_grAssign;

$_grAssign = test2.a.b.c = 3;
$_grAssign = test2.a.b.c.push(2);
$_grAssign = test2.a.b.c.set( 2*6 );
$_grAssign = test2.a.b.c.merge({ a: 1 });
$_grAssign = test2.a.b.c.apply(function(e) { return e });

$_grAssign = test2.a.b.c.splice(1, 2, 3);
$_grAssign = test2.a.b.c.splice([1, 2, 3]);

$_grAssign = test.a.b.c[[i]].set(2)
$_grAssign = test.a.b.c[{i}].set(2)
$_grAssign = test.set(2)

$_grAssign = set(2)
$_grAssign = test.a.b.c[{i}].kill(2)


a = test2.a.b;
$_grAssign = test2.a.b.c = 3;
$_grAssign = test2.a.b.c.set(3);
$_grAssign = test2.a.b.c.push(2);

_grAssign = test.a.b.c[{i}].set(2)

var collection = [1, 2, {a: [12, 17, 15]}];

$_grAssign = collection[2].a.splice(1, 1, 13, 14);


a = {
  b: { $set: 1},
  c: { $push: [2]}
}

$_grAssign = test2.a.b.set(3);
$_grAssign = test2.a.c.push(2);

$g = test2.a.b.c = 3;

let initialState = {}


$_g = test2.a.b.c.push(2);
$_g = test2.a.b.c.apply(function(e) {return e});

$_g = test2.a.b;

$_g = test2.a.b.push(1);

a.push(nextState);

$_grAssign = test.a.b.c = some.c
