const Request = require('request');

const slack = require('../../../lib/slack_client').client;
const channelID = require('../../../lib/slack_client').channelID;

const User = require("../../users/model");
const Subscription = require("../model");

const helpers = require("../helpers");
const messenger = require("../messenger");

var checkSub = function(info) {
  User.where({ id: 1 })
    .fetch({ withRelated: ['subscriptions'] })
    .then(function(user) {
      var subscriptions = user.related('subscriptions');
      for (var i=0; i<subscriptions.length;i++) {
        Subscription.where(subscriptions[i]).fetch()
        .then(function(record) {
          if (record.type === info.type && record.name === info.name) {
            console.log("Subscription already exists!");
          }
        })
        .catch();
      }
    });
}

// receive outgoing integration from slack `/captain-hook`
module.exports = function(request, response, next) {
  var info = helpers.parseRequestBody(request);
  var opts = {
    as_user: true,
    username: "captainhook"
  };
  slack.chat.postMessage(channelID, messenger.buildRequestMessage(info), opts);
  var hook_opts = helpers.buildHookRequestOpts(info);
//  checkSub(info);
  Request.post(hook_opts, function(err, res, body) {
    if (err) {
      console.log(err);
    } else {
      console.log('just created hook with id=' + body.id);
      var subscription = helpers.buildSubscription(hook_opts, body);
      Subscription.forge(subscription).save()
      .then(function(record) {
        if (!record) {
          slack.chat.postMessage(channelID, messenger.bookshelfCreateError, opts);
        } else {
          slack.chat.postMessage(channelID, messenger.buildSuccessMessage(record), opts);
        }
      })
      .catch();
    }
  });
  next();
};
