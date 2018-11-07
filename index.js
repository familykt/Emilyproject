const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const Bot = require('./bot.js');
const bot = new Bot('emily-d9653','emily-d9653-6d2f9f479be6.json')

const app = express();
const port = process.env.PORT

const buttons = {
  type: 'buttons',
  buttons: [
    '에밀리와 대화시작',
    '정보',
    '클럽 추천'
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
    res.send({
      message : {
        text : '안녕, 난 에밀리야!'
      }
    })
  }else if(message === '정보'){
res.send({
  message: {
    text : '나는 신의 탑 어딘가에서 있어'
  },
  keyboard:buttons
})
}else if(message === '클럽 추천'){
bot.sendToDialogflow(message,id).then(result=>{
  console.log('input context - club')
})
  res.send({
    message: {
      text : '어느 쪽으로 가실 건가요?'
    },
    keyboard: {
      type: 'buttons',
      buttons: [
        '시부야',
        '롯본기'
      ]
    }
  })
}else{
     bot.sendToDialogflow(message,id).then(result=>{
       res.send({
         message: {
           text: result[0].queryResult.fulfillmentText
         }
       })
     }).catch(error => {
       res.send({
         messge: {
           text : '아직 내가 모르는 내용이야!알려줄래?'
         }
       })
     })
  }


});

http.createServer(app).listen(port)
