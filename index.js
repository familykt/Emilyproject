const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT
const button = {
  type : 'buttons',
  buttons :[
    '버튼1',
    '버튼2',
    '정보'
]
}
app.use(bodyParser.urlencoded({extented:false}));
app.use(bodyParser.json());

app.get('/keyboard',function(req,res){
  res.json(buttons);
});

app.post('/messasge',function(req,res){
  console.log(req.body);
res.json(null)
})


http.createServer(app).listen(port,function(
  console.log('server start')
));
