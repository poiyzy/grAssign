# babel-plugin-gr-assign [![Build Status](https://travis-ci.org/poiyzy/grAssign.svg?branch=master)](https://travis-ci.org/poiyzy/grAssign)

Babel Plugin to transform method chaining to react-addons-update format.

On purpose support manipulating presist data with method chaining.

## Why?

TODO

Replace deep clone. No need to change a lot codes.

## Installation

    Add in your `package.json`

    ```json
    "devDependencies": {
      ...
      "babel-plugin-gr-assign": "git@github.com:poiyzy/grAssign.git"
    },
    ```

    `npm install`

## Feature

支持将 `$_grAssign = a.b.c.d = 2;` 转换为:

```javascript
$_grAssign = grUpdate(a, {
  b: {
    c: {
      d: {
        $set: 2
      }
    }
  }
});
```

关于 [react-addons-udpate](https://facebook.github.io/react/docs/update.html)

## Usage
TODO

### babel 插件设置

```javascript
    plugins: [
      [grAssign, {
        alias: '$_g',
        method: 'update'
      }]
    ]
```

- alias: 设置 variable 别名，默认为 `$_grAssign`
- method: 设置 update 方法别名，默认为 `grUpdate`

### 按照 index 设置数组中的元素

使用 `a[{index}]` 或 `a[[index]]` 来标记 数组 index.

```javascript
var $_grAssign;
var a = { b: [{name: 1}, {name: 2}, {name: 3}] }

let index = a.b.findIndex(function(e) { return e.name === 2 });

$_grAssign = a.b[{index}].name.set('test');
```

会转化为：

```javascript
$_grAssign = grUpdate(a, {
  b: {
    [index]: {
      name: {
        $set: 'test'
      }
    }
  }
});
```


### Example

- Assign

    `$_grAssign = a.b.c = 3;`

    转换为

    ```javascript
      $_grAssign = grUpdate(a, {
        b: {
          c: {
            $set: 3
          }
        }
      });
    ```

- $set

    `$_grAssign = a.b.c.set(3);`

    转换为

    ```javascript
      $_grAssign = grUpdate(a, {
        b: {
          c: {
            $set: 3
          }
        }
      });
    ```

- $push

    `$_grAssign = a.b.c.push(3);`

    转换为

    ```javascript
      $_grAssign = grUpdate(a, {
        b: {
          c: {
            $push: [3]
          }
        }
      });
    ```

- $merge

    `$_grAssign = a.b.c.merge(3);`

    转换为

    ```javascript
      $_grAssign = grUpdate(a, {
        b: {
          c: {
            $merge: [3]
          }
        }
      });
    ```

- $splice

    `$_grAssign = a.b.c.splice(1, 2, 3, 4);`

    转换为

    ```javascript
      $_grAssign = grUpdate(a, {
        b: {
          c: {
            $splice: [[1, 2, 3, 4]]
          }
        }
      });
    ```

- $apply

    `$_grAssign = a.b.c.apply(function(e) { return e; });`

    转换为

    ```javascript
      $_grAssign = grUpdate(a, {
        b: {
          c: {
            $apply: function(e) { return e; }
          }
        }
      });
    ```

- $unshift

    `$_grAssign = a.b.c.unshift(1);`

    转换为

    ```javascript
      $_grAssign = grUpdate(a, {
        b: {
          c: {
            $unshift: [1]
          }
        }
      });
    ```

## Tests

    npm run test

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT

