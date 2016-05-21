const assert = require("assert");
const slack = require("@slack/client");

var token = process.env.SLACK_API_TOKEN || '';
assert(token, 'you must supply a slack api token in process.env.SLACK_API_TOKEN');
var channelID = process.env.SLACK_CHANNEL;
assert(channelID, 'you must supply a slack channel ID in process.env.SLACK_CHANNEL');

module.exports = {
  client: new slack.WebClient(token),
  channelID: process.env.SLACK_CHANNEL
};
