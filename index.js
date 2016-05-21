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

// how we post to slack
var web = new slack.WebClient(token)

// hook receiver is a restify server
var opts = {
  name:   process.env.SERVICE_NAME || 'hooks-subscriber-bot',
  secret: process.env.SHARED_SECRET,
  mount:  process.env.MOUNT_POINT || '/incoming',
};
var server = makeReceiver(opts);

// receive outgoing integration from slack `/captain-hook`
server.post('/subscribe', function(request, response, next) {
  var messages = request._body.split('&')[8].split('+');
  var package = messages[1];
  web.chat.postMessage(channelID, "subscription request received for " + package);
  next();
});

// test route
server.get('/ping', function(req, res) {
  res.send(200, 'pong');
  next();
});

// log requests that pass to next()
server.on('after', function logEachRequest(request, response, route, error) {
  logger.info(logstring(request, response));
});

server.listen(port, function() {
  logger.info('listening on ' + port);
  web.chat.postMessage(channelID, 'arrrrr :wombat: captain hook, reporting for duty');
});
