var express = require('express');
var app = express();

app.use(express.static( __dirname +"" ));

app.listen(8090);
console.log('listening on 8090');
