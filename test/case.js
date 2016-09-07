const expect = require('expect');
const compile = require('./test-script.js');

const formatCode = function(code) {
  return code.replace(/\n|\s/g, '');
}

describe('compile', () => {
  describe('=', () => {
    it('should be compiled', () => {
      expect(compile(`$_grAssign = test2.a.b.c = 3`)).toEqual(formatCode(
        `$_grAssign = grUpdate(test2, { a: { b: { c: { $set: 3 } } } });`
      ));
    });
  });

  describe('$set', () => {
    it('should be compiled', () => {
      expect(compile(`$_grAssign = test2.a.b.c.set(3)`)).toEqual(formatCode(
        `$_grAssign = grUpdate(test2, { a: { b: { c: { $set: 3 } } } });`
      ));
    });
  });

  describe('$set with expression', () => {
    it('should be compiled', () => {
      expect(compile(`$_grAssign = test2.a.b.c.set( d * 2 )`)).toEqual(formatCode(
        `$_grAssign = grUpdate(test2, { a: { b: { c: { $set: d * 2 } } } });`
      ));
    });
  });

  describe('$push', () => {
    it('should be compiled', () => {
      expect(compile(`$_grAssign = test2.a.b.c.push(2)`)).toEqual(formatCode(
        `$_grAssign = grUpdate(test2, { a: { b: { c: { $push: [2] } } } });`
      ));
    });
  });

  describe('$unshift', () => {
    it('should be compiled', () => {
      expect(compile(`$_grAssign = test2.a.b.c.unshift(2)`)).toEqual(formatCode(
        `$_grAssign = grUpdate(test2, { a: { b: { c: { $unshift: [2] } } } });`
      ));
    });
  });

  describe('$merge', () => {
    it('should be compiled', () => {
      expect(compile(`$_grAssign = test2.a.b.c.merge({ a: 1 })`)).toEqual(formatCode(
        `$_grAssign = grUpdate(test2, { a: { b: { c: { $merge: { a: 1 } } } } });`
      ));
    });
  });

  describe('$splice', () => {
    it('should be compiled', () => {
      expect(compile(`$_grAssign = test2.a.b.c.splice(1, 2, 3);`)).toEqual(formatCode(
        `$_grAssign = grUpdate(test2, { a: { b: { c: { $splice: [[1, 2, 3]] } } } });`
      ));
    });
  });

  describe('$apply', () => {
    it('should be compiled', () => {
      expect(compile(`$_grAssign = test2.a.b.c.apply(function(e) {return e;});`)).toEqual(formatCode(
        `$_grAssign = grUpdate(test2, { a: { b: { c: { $apply: function(e) {return e;} } } } });`
      ));
    });
  });

  describe('get array index with [i]', () => {
    it('should be compiled', () => {
      expect(compile(`$_grAssign = test2.a.b.c[[i]].apply(function(e) {return e;});`)).toEqual(formatCode(
        `function _defineProperty(obj,key,value){if(keyinobj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}returnobj;}

        $_grAssign = grUpdate(test2, {a: {b: {c: _defineProperty({},i,{$apply:function(e){returne;}})}}});
        `
      ));
    });
  });

  describe('get array index with {i}', () => {
    it('should be compiled', () => {
      expect(compile(`$_grAssign = test2.a.b.c[[i]].apply(function(e) {return e;});`)).toEqual(formatCode(
        `function _defineProperty(obj,key,value){if(keyinobj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}returnobj;}

        $_grAssign = grUpdate(test2, {a: {b: {c: _defineProperty({},i,{$apply:function(e){returne;}})}}});
        `
      ));
    });
  });

  describe('get array index with {i}, generate help method once.', () => {
    it('should be compiled', () => {
      expect(compile(`$_grAssign = test2.a.b.c[[i]].apply(function(e) {return e;});$_grAssign = test2.a.b.c[[index]].apply(function(e) {return e;});`)).toEqual(formatCode(
        `function _defineProperty(obj,key,value){if(keyinobj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}returnobj;}

        $_grAssign = grUpdate(test2, {a: {b: {c: _defineProperty({},i,{$apply:function(e){returne;}})}}});
        $_grAssign = grUpdate(test2, {a: {b: {c: _defineProperty({},index,{$apply:function(e){returne;}})}}});
        `
      ));
    });
  });

  describe('single level set', () => {
    it('should not be compiled', () => {
      expect(compile(`$_grAssign = test2.a;`)).toEqual(formatCode(
        `$_grAssign = test2.a;`
      ));
    });
  });

  describe('assign Func', () => {
    it('should not be compiled', () => {
      expect(compile(`$_grAssign = update(1);`)).toEqual(formatCode(
        `$_grAssign = update(1);`
      ));
    });
  });

  describe('customize alias "$_g"', () => {
    it('should be compiled', () => {
      expect(compile(`$_g = test2.a = 2;`)).toEqual(formatCode(
        `$_g = grUpdate(test2, { a: { $set: 2 } });`
      ));
    });
  });

  describe('without using special variable, $_grAssign', () => {
    it('should be compiled', () => {
      expect(compile(`g = test2.a = 2;`)).toEqual(formatCode(
        `g = test2.a = 2;`
      ));
    });
  });
});
