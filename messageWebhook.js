const processMessage = require('../helpers/processMessage');/*requires processMessage*/
module.exports = (req, res) => {
 if (req.body.object === 'page') { /*compares the if the body request is equal to page*/
 req.body.entry.forEach(entry => {
 entry.messaging.forEach(event => {
 if (event.message && event.message.text) { /* if message event and message.text */
 processMessage(event);
 }
 });
 }); 
 res.status(200).end(); /*checks if status is true then 200 send*/
 }
};