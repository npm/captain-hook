// load the env file
require('dotenv').load();
var port = process.env.PORT || '6666';

// how we log
const logger = require("./src/lib/logger").logger;
const logHandler = require("./src/lib/logger").logHandler;

// how we receive npm hooks
const server = require("./src/lib/hook_receiver");

// how we post to slack
const slack = require('./src/lib/slack_client').client;
const channelID = require('./src/lib/slack_client').channelID;

// routes live in a separate place
const routes = require('./src/routes');

server.get('/ping', routes.ping);
server.post('/slack', routes.subscriptions.slack);
server.on('after', logHandler);

// All hook events, with special handling for some.
server.on('hook', function onIncomingHook(hook) {
  var pkg = hook.name.replace('/', '%2F');
  var type = hook.type;
  var change = hook.event.replace(type + ':', '');

  var message;
  console.log(hook.event);
  var user = hook.change ? hook.change.user : '';

  switch (hook.event) {
    case 'package:star':
      message = `★ \<https://www.npmjs.com/~${user}|${user}\> starred :package: \<https://www.npmjs.com/package/${pkg}|${hook.name}\>`;
      break;

    case 'package:unstar':
      message = `✩ \<https://www.npmjs.com/~${user}|${user}\> unstarred :package: \<https://www.npmjs.com/package/${pkg}|${hook.name}\>`;
      break;

    case 'package:publish':
      message = `:package: \<https://www.npmjs.com/package/${pkg}|${hook.name}\>@${hook.change.version} published!`;
      break;

    case 'package:unpublish':
      message = `:package: \<https://www.npmjs.com/package/${pkg}|${hook.name}\>@${hook.change.version} unpublished`;
      break;

    case 'package:dist-tag':
      message = `:package: \<https://www.npmjs.com/package/${pkg}|${hook.name}\>@${hook.change.version} new dist-tag: \`${hook.change['dist-tag']}\``;
      break;

    case 'package:dist-tag-rm':
      message = `:package: \<https://www.npmjs.com/package/${pkg}|${hook.name}\>@${hook.change.version} dist-tag removed: \`${hook.change['dist-tag']}\``;
      break;

    case 'package:owner':
      message = `:package: \<https://www.npmjs.com/package/${pkg}|${hook.name}\> owner added: \`${hook.change.user}\``;
      break;

    case 'package:owner-rm':
      message = `:package: \<https://www.npmjs.com/package/${pkg}|${hook.name}\> owner removed: \`${hook.change.user}\``;
      break;

    default:
      message = [
        `:package: \<https://www.npmjs.com/package/${pkg}|${hook.name}\>`,
        '*event*: ' + change,
        '*type*: ' + type,
      ].join('\n');
  }

  var opts = {
    as_user: true,
    username: "captainhook"
  };
  slack.chat.postMessage(channelID, message, opts);
});

server.on('hook:error', function(message) {
  var opts = {
    as_user: true,
    username: "captainhook"
  }
  slack.chat.postMessage(channelID, '*error handling web hook:* ' + message);
});



// start the server
server.listen(port, function() {
  logger.info('listening on ' + port);
  var opts = {
    as_user: true,
    username: "captainhook"
  }
  slack.chat.postMessage(channelID, "arrrr captain hook reporting for duty", opts);
});
