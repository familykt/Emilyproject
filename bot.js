const dialogflow = require('dialogflow');
const fs = require('fs');

class Dialogflow{
  constructor(projectId,keyFile){

    this.projectId = projectId

    const keyfile = JSON.parse(fs.readFileSync(keyFile))
    let privateKey = keyfile['private_key']
    let clientEmail = keyfile['client_email']
    let config = {
      credentials : {
        private_key : privateKey,
        client_email: clientEmail
      }
    }
    this.sessionClient = new dialogflow.Sessionsclient(config)
  }
  async sendToDialogflow(text, sessionId){
    const sessionPath = this.sessionClient.sessionPath(this.projectId, sessionId)
    const request = {
      session : sessionPath,
      queryInput : {
        text : {
          text : text,
          languageCode : 'ko-KR'
        }
      }
    }
    return await this.sessionClient.detectIntent(request);
  }
};

module.export = Dialogflow
