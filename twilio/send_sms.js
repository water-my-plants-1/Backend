const accountSid = "ACdde384777262ef4e2ea736b0b94c8aac";
const authToken = "850ddbd5129467fce575c0ef3c7f1085";
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: "Don't forget to water your plants!",
     from: '+17037057960',
     to: '+17576460791'
   })
  .then(message => console.log(message.sid));