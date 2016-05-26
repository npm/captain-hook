const Request = require('request');

const slack = require('../../../lib/slack_client').client;
const channelID = require('../../../lib/slack_client').channelID;

const User = require("../../users/model");
const Subscription = require("../model");

const helpers = require("../helpers");
const messenger = require("../messenger");

const opts = {
  as_user: true,
  username: "captainhook"
};

var subscribe = function(info) { 
  var hook_opts = helpers.buildHookRequestOpts(info);
  Request.post(hook_opts, function(err, res, body) {
    if (err) {
      slack.chat.postMessage(channelID, err.toString(), opts);
    } else {
      console.log('just created hook with id=' + body.id);
      var subscription = helpers.buildSubscription(hook_opts, body);
      Subscription.forge(subscription).save()
      .then(function(record) {
        if (!record) {
          slack.chat.postMessage(channelID, messenger.bookshelf, opts);
        } else {
          var message =  messenger.buildSuccessMessage(record);
          slack.chat.postMessage(channelID, message, opts);
        }
      })
      .catch();
    }
  });
};

var help = function() {
  var message = "arrrr! i'm captain hook\n" +
         "*usage:* \n" +
         "`/captain-hook <command> <type> <name> <event>`\n" +
         "\n" +
         "\t\t*command*: `subscribe` (create a new webhook), `help`\n" +
         "\t\t*type*: `package` or `scope`\n" +
         "\t\t*name*: the name of the package or scope, e.g. `lodash`\n" +
         "\t\t*event*: this doesn't actually work yet :grimacing: :sweat_smile:\n";
  slack.chat.postMessage(channelID, message, opts);
};

// receive outgoing integration from slack `/captain-hook`
module.exports = function(request, response, next) {
  var info = helpers.parseRequestBody(request);
  var command = info.command.slice(5);
  var message;
  switch(command) {
    case "subscribe":
      subscribe(info);
      break;
    case "help":
      help();
      break;
    default:
      help();
      break;
  }
  next();
};
