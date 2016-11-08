/**
 * Created by diana on 16. 11. 7.
 */

var express = require('express');
var app = express();

// 03. template engine
app.locals.pretty = true;

// jade와 express를 연결
app.set('view engine', 'jade');
app.set('views', './views');

// jade rendering
app.get('/template', function(req, res) {
  res.render('temp', {time: Date(), _title: 'jade study'}); // rendering with variable time.
});


// 02
app.use(express.static('public'));
app.get('/route', function(req, res){
  // res.send('Hello Router, <img src="/photo.jpg">'); // 정적인 파일 생성.
  // 정적인 파일을 수정, 표시할 때는 서버를 껐다 켤 필요가 없다. 바로 적용된다.
  
  // 동적인 파일 생성.
  var list = '';
  for(var i = 0; i < 5; i++){
    list = list + '<li>coding</li>';
  }
   
  /*
    // 여러줄로 html 파일처럼 작성하는 방법 01
    // 작은 따옴표를 사용할 경우.
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