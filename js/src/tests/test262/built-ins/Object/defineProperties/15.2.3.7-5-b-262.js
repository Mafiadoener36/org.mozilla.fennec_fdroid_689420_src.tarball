// Copyright (c) 2012 Ecma International.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es5id: 15.2.3.7-5-b-262
description: >
    Object.defineProperties - TypeError is thrown if both 'set'
    property and 'writable' property of 'descObj' are present (8.10.5
    step 9.a)
---*/

var setFun = function() {};
var obj = {};
assert.throws(TypeError, function() {
  Object.defineProperties(obj, {
    prop: {
      writable: true,
      set: setFun
    }
  });
});

reportCompare(0, 0);