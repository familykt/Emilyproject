var express = require('express');
var app = express()
var port = process.env.port

app.get('/',function(req,res){
  res.send('hello,world')
});

app.listen(port);
