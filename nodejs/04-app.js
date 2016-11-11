/**
 * Created by diana on 16. 11. 7.
 */

var express = require('express');
var bodyParser = require('body-parser');  // post로 데이터를 전달받기 위해서는 body parser 모듈을 가져와야한다.

var app = express();

// router로 연결되기 전에 미들웨어(모듈)를 먼저 거치게 된다.
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.locals.pretty = true; // jade 파일 예쁘게 정렬시켜 보여줌. auto indentation.
app.set('view engine', 'jade');
app.set('views', './views');

// 06. GET vs POST
// GET 지금까지 우리가 했던 것. 사용자가 뭔가를 요청해서 그것을 가져오도록 하는 것이 바로 GET방식이다.
// POST 어떤 정보를 보낸다. 전송한다. 할 때 쓰는 것. 로그인을 하는 경우, 글을 작성하는 경우 > 사용자의 정보를 서버로 전송한다.
// ** jade 파일에 어떤 태그 안에 속성값을 넣고 싶을 때에는 괄호를 사용한다. ex) meta(charset='utf-8')
/*** $ cd nodejs 디렉토리로 들어간 후에 $ node 04-app.js 를 실행해야 한다. 그래야 jade rendering이 제대로 돌아감.*/
app.get('/form', function(req, res) {
  res.render('form');
});

// get 방식
// app.get('/form_receiver', function(req, res) {
//   var title = req.query.title;
//   var description = req.query.description;
//   res.send(title + ', ' + description);
// });

// post 방식
/* req 객체 아래에 body 객체 아래에 title 이라는 프로퍼티가 없으면 동적으로 생성하고, 거기에 form에서 이력받은 값을 전달함.
* req = {
*   body = {
*    title = '';
*    description = '';
*   }
* }
* */
app.post('/form_receiver', function(req, res) {
  var title = req.body.title;
  var description = req.body.description;
  
  res.send(title + ', ' + description);
});

// 여기서 필요한 bodyParser 라는 확장기능이 있음.
// req.body
//
// Contains key-value pairs of data submitted in the request body. By default, it is undefined, and is populated when you use body-parsing middleware such as body-parser and multer.
//
//     The following example shows how to use body-parsing middleware to populate req.body.
//
//     var app = require('express')();
// var bodyParser = require('body-parser');
// var multer = require('multer'); // v1.0.5
// var upload = multer(); // for parsing multipart/form-data
//
// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//
// app.post('/profile', upload.array(), function (req, res, next) {
//   console.log(req.body);
//   res.json(req.body);
// });

/*** 0. $ npm install body-parser --save
// 1. var bodyParser = require(body-parser);
// body-parser 모듈(미들웨어)을 추가
// 2. app.use(bodyParser.urlencoded({ extended: false }))
// use라는 메소드를 통해 연결시킴(body-parser를 붙임). 이 앱을 키면 body parser를 가장 먼저 거치게됨. 사용하게 만듬.
// body-parser 덕분에 req 객체가 가지고 있지 않은 body라는 객체를 사용할 수 있게 만들어줌.
*/



// // 05. Semantic URL(parameter 방식)
// // 참고 https://en.wikipedia.org/wiki/Semantic_URL
app.get('/topic/:id', function(req, res) {  // semantic URL는 /:something 이렇게 가져오는 것이 어떤 것인지 지정할 수 있다.
  var topics = [
    '원숭이 엉덩이는 빨개',
    '빨가면 사과 사과는 맛있어',
    '맛있으면 바나나 바나나는 길어'
  ];
  
  var output = `
    <a href="/topic/0">First</a><br>
    <a href="/topic/1">Second</a><br>
    <a href="/topic/2">Third</a><br>
    ${topics[req.params.id]}
  `; // semantic URL은 사용자에게서 받은 정보를 query string이 아니라 params(parameters)로 가져온다.

  res.send(output);
});



// 04. Pass data using express URL(query string)

// app.get('/topic', function(req, res){
//   var topics = [
//       'Javascript is ...',
//       'Nodjs is...',
//       'Express is ...'
//   ];
//   var output = `
//     <a href="/topic?id=0">JavaScript</a><br>
//     <a href="/topic?id=1">Nodejs</a><br>
//     <a href="/topic?id=2">Express</a><br>
//     ${topics[req.query.id]}`;
//
//   res.send(output);
// });

// '/topic', '/login' : path라고 부른다. path는 route에 연결되어있다.
// '/topic?id=1'에서 'id=1'은 'query string'이라고 부른다.
// query string을 사용하면 하나의 path(route)를 사용하여 여러가지 동작을 처리할 수 있다.

// Express API document's explanation about request > query.
// req.query
// This property is an object containing a property for each query string parameter in the route. If there is no query string, it is the empty object, {}.
//
// // GET /search?q=tobi+ferret
//     req.query.q
// // => "tobi ferret"
//
// // GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
// req.query.order
// // => "desc"
//
// req.query.shoe.color
// // => "blue"
//
// req.query.shoe.type
// // => "converse"





// 03. template engine

// jade와 express를 연결
// app.set('view engine', 'jade');
// app.set('views', './views');

// jade rendering
app.get('/template', function(req, res) {
  res.render('temp', {time: Date(), _title: 'jade study'}); // rendering with variable time.
});


// 02
app.use(express.static('public'));
app.get('/route', function(req, res){
  // 정적인 파일 생성.
  // res.send('Hello Router, <img src="/photo.jpg">');
  // 정적인 파일을 수정, 표시할 때는 서버를 껐다 켤 필요가 없다. 바로 적용된다.
  
  // 동적인 파일 생성.
  var list = '';
  for(var i = 0; i < 5; i++){
    list = list + '<li>coding</li>';
  }
   
  /*
    // 여러줄로 html 파일처럼 작성하는 방법 01
    // 작은 따옴표('')를 사용할 경우.
    var output = '\
    <!DOCTYPE html>\
    <html lang="en">\
      <head>\
        <meta charset="UTF-8">\
        <title>Static html file</title>\
      </head>\
      <body>\
        Hello Dynamic!\
        <ul>\
          <li>coding</li>\
        </ul>\
      </body>\
    </html>\';
  */
  
  // 여러줄로 html 파일처럼 작성하는 방법 02
  // formated text. ``를 사용해는 방법(작은따옴표 아님!!)
  var output = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Static html file</title>
    </head>
    <body>
      Hello Dynamic!
      <ul>
        ${list}
      </ul>
    </body>
  </html>`;
  
  res.send(output);
});


// 01
app.get('/', function(req, res){
  res.send('Hello home page');
}); // GET 방식으로 들어온 유저에 대해서 처리해주는 방법.

app.get('/login', function(req, res){
  res.send('Login please');
});

app.listen(3000, function(){
  console.log('Connected 3000 port!');
});

// URL을 직접 치고 들어오는 것은 GET 방식.
// .get > router라고 부른다. 길을 찾아주는 것. 연결해주는 것.
// 사용자가 어떤 요청을 하면 그 요청에 맞는 router가 응답하여 그에 맞는 동작을 연결시켜준다.
