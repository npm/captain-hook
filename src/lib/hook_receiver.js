const makeReceiver = require("npm-hook-receiver");

// hook receiver is a restify server
var opts = {
  name:   process.env.SERVICE_NAME || 'hooks-subscriber-bot',
  secret: process.env.SHARED_SECRET,
  mount:  process.env.MOUNT_POINT || '/incoming',
};
var server = makeReceiver(opts);

module.exports = server;
