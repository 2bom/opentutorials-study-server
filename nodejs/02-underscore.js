/**
 * Created by diana on 16. 11. 6.
 */
const _ = require('underscore');

var arr = [3, 6, 9, 12];
let no = [...arr];

console.log(_.first(no));

console.log(arr === no);
console.log(no);

// array의 복사는 [...copiedArray]
// object의 복사는 Object.assign({}, copiedObject);