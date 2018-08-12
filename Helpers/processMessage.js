const API_AI_TOKEN = 
'eb9ba9f9a2634efc83a747cb1924a815';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'EAAeQZAs0y7UsBAG0uqcnWQaVI1qZBc0f2DytH3NqONlh5iGsTdF5P8vDEIW3ZARtBSAgu3Mhvm45IK0ZCw01r4aZB4bT9d8AxSlabz6y3NnN79zHq1w5ZAgIwvfZCUMUZAjtMeXBmu4K6WYWw3fWq8dRCtyjlk88WZA0FbI6VD4kecJf3uRgpN8YB';
const request = require('request');
const sendTextMessage = (senderId, text) => {
 request({
 url: 'https://graph.facebook.com/v2.6/me/messages',
 qs: { access_token: FACEBOOK_ACCESS_TOKEN },
 method: 'POST',
 json: {
 recipient: { id: senderId },
 message: { text },
 }
 });
};
module.exports = (event) => {
 const senderId = event.sender.id;
 const message = event.message.text;
const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'crowdbotics_bot'});
apiaiSession.on('response', (response) => {
 const result = response.result.fulfillment.speech;
sendTextMessage(senderId, result);
 });
apiaiSession.on('error', error => console.log(error));
 apiaiSession.end();
};
