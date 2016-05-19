require('dotenv').load();

const assert = require("assert");
const bole = require("bole"); 
const logstring = require("common-log-string");
const makeReceiver = require("@npmcorp/npm-hook-receiver");
const slack = require("@slack/client");
const restify = require("restify");

var logger = bole(process.env.SERVICE_NAME || 'hooks-bot');
bole.output({ level: 'info', stream: process.stdout });

var token = process.env.SLACK_API_TOKEN || '';
assert(token, 'you must supply a slack api token in process.env.SLACK_API_TOKEN');
var channelID = process.env.SLACK_CHANNEL;
assert(channelID, 'you must supply a slack channel ID in process.env.SLACK_CHANNEL');
var port = process.env.PORT || '6666';

// This is how we post to slack.
var web = new slack.WebClient(token)

// Make a webhooks receiver and have it act on interesting events.
// The receiver is a restify server!
var opts = {
  name:   process.env.SERVICE_NAME || 'hooks-subscriber-bot',
  secret: process.env.SHARED_SECRET,
  mount:  process.env.MOUNT_POINT || '/incoming',
};
var server = makeReceiver(opts);

server.post('/subscribe', function(request, response, next) {
  var messages = request._body.split('&')[8].split('+');
  web.chat.postMessage(channelID, "subscription request received for " + messages[1]);
  next();
});

server.get('/ping', function(req, res) {
  res.send(200, 'pong');
  next();
});

server.on('after', function logEachRequest(request, response, route, error) {
  logger.info(logstring(request, response));
});

server.listen(port, function() {
  logger.info('listening on ' + port);
  web.chat.postMessage(channelID, 'npm hooks slackbot coming on line beep boop');
});
