
var express = require('express');
app = express();
port = 5050;
bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*' );
    res.header('Access-Control-Allow-Methods', '*');
    next();
  });


var routes = require('./routes/routes');
routes(app);



app.listen(port);


console.log('API server started on: ' + port);


