
var express = require('express');
var bodyParser = require('body-parser')


var app = express();
//var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use('/css', express.static('css'));
app.use('/img/', express.static('img'));
app.use('/js', express.static('js'));
app.use('/lib', express.static('lib'));
app.use('/os', express.static('os'));
app.get('/', function (req, res) {
  res.writeHeader(200, { 'Content-Type': 'text/html' });
  res.end(`
  <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
        <title>晓君软件</title>
        <link rel="stylesheet" href="/css/body.css" type="text/css"   />
        <link rel="stylesheet" href="/css/icon.css"  type="text/css" />
        <link rel="stylesheet" href="/css/input.css"  type="text/css"  />
        <link rel="stylesheet" href="/css/select.css"  type="text/css"  />
        <link rel="stylesheet" href="/css/gc.css"  type="text/css"  />
        <link rel="stylesheet" href="/css/card.css"  type="text/css"  />
        <link rel="stylesheet" href="/css/table.css"   type="text/css" />
        <link rel="stylesheet" href="/css/color.css"   type="text/css" />
        <link rel="icon" href="/favicon.png" />

        <script src="/lib/jquery-3.6.0.min.js"></script>
        <script src="/lib/localforage.js"></script>
        <script src="/lib/filesaver.js"></script>
        <script src="/lib/xlsx.js"></script>
        
        <script src="/js/os_source.js"></script>
        <script src="/js/os_func.js"></script>
        <script src="/js/os_card.js"></script>
        <script src="/js/os_alert.js"></script>
        <script src="/js/ajax.js"></script>
        
        
        <script src="/js/before_startup.js"></script>
        <script src="/js/index.js"></script>
        <script src="/js/os_input.js"></script>
        <script src="/js/os_editor.js"></script>
        <script src="/js/os_content.js"></script>
        <script src="/js/os_nav.js"></script>
        <script src="/js/os_mf.js"></script>

        <script src="/os/os_hmgl.js"></script>

      </head>
      <body>
       
        <div id="bar" class="">
          <div class="process"></div>
        </div>
        
      </body>
    </html>
  `)
  //res.send('Hello World');
})

app.post('/', /*urlencodedParser,*/ function (req, res) {
  var body = "";
  req
    .on("error", (err) => {
      console.error(err);
    })
    .on("data", function (chunk) {
      body += chunk;
    }).on("end", function () {
      let b = decodeURIComponent(body);
      let r = require('../os/select1.js');
      r.select1(b).then(res1 => {
        console.log(res1)
        res.end(JSON.stringify(res1))
      }).catch(err => {
        console.log(err.message);
      });
      //console.log(b)
      
    })

  /*
  
  */
  /*
  var from = req.body.d;
  var htmlData = 'Hello:' + from;
  res.send(htmlData);
  console.log(htmlData);
  */
});

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})