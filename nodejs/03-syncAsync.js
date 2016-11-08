/**
 * Created by diana on 16. 11. 7.
 */
const fs = require('fs');


// Sync
console.log(1);
var data = fs.readFileSync('03-data.txt', {encoding: 'utf8'});
console.log(data);
console.log(2);

// Async
console.log(3);
fs.readFile('03-data.txt', {encoding:'utf8'}, function(err, data) {
  console.log(4);
  console.log(data);
});
console.log(5);


// result :
// 1
// hello syncAsync
// 2
// 3
// 5
// 4
// hello syncAsync
 
