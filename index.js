const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT

const buttons = {
  type: 'buttons',
  buttons: [
    '에밀리와 대화시작',
    '정보'
  ]
};

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/keyboard',function(req,res){
  res.json(buttons)
});

app.post('/messasge',function(req,res){
  const message = req.body.content
  const id = req.body.user_key
  let data = {}

  if(message ==='에밀리와 대화시작'){
    data = {
      message:{
        text : '안녕, 난 에밀리야.'
      }
    }
  }else if(message === '정보'){
    data = {
      message:{
        text : '제가 어디서 왔는지는 아무도 몰라요.'
      },
      keyboard: buttons
  }
}
   else{
    console.log('dialogflow에 전달할 메시지:', message)
  }
res.json(data)

});

http.createServer(app).listen(port|| 9090)
