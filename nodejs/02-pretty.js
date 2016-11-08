/**
 * Created by diana on 16. 11. 6.
 */

function hello(name){
  console.log('Hi, ' + name);
}
hello('egoing');

// $ uglifyjs 02-pretty.js
// function hello(name){console.log("Hi, "+name)}hello("egoing");

// $ uglifyjs 02-pretty.js -m
// function hello(o){console.log("Hi, "+o)}hello("egoing");
// '-m' means mangle. Mangle changes variables into unspecified short letter.

// $ uglifyjs 02-pretty.js -o 02-pretty.min.js -m
// Save the code of uglified 02-pretty.js file into 02-pretty.min.js file.