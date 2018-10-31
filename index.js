const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const Bot = require('./bot.js')
const bot = new Bot('emily-24faf','./emily-24faf-092bc8fffccb.json')

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

app.post('/message',function(req,res){
  const message = req.body.content
  const id = req.body.user_key
  let data = {}

  if(message ==='에밀리와 대화시작'){
    res.send = {
      message:{
        text : '안녕, 난 에밀리야.'
      }
    }
  }else if(message === '정보'){
    res.send = {
      message:{
        text : '나는 신의탑에서 왔어.'
      },
      keyboard: buttons
  }
}
   else{
     bot.sendToDialogflow(message,id).then(result=>{
       res.send({
         message:{
           text: result[0].queryResult.fulfillmentText
         }
       })
     }).catch(e => {
       res.send({
         messge: {
           text : '아직 내가 모르는 내용이야!알려줄래?'
         }
       })
     })
  }


});

http.createServer(app).listen(port)
