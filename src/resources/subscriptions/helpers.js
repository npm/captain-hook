module.exports = {
  parseRequestBody: function (request) {
    var messages = request._body.split('&')[8].split('+');
    var command = messages[0].replace("text=", "");
    switch (command) {
      case "login":
        return {
          command: command,
          token: messages[1]
        };
      case "help":
        return {
          command: command
        };
      default:
        return {
          command: command,
          type: messages[1],
          name: messages[2],
          event: messages[3],
          secret: messages[4]
        };
    }
  },
  buildHookRequestOpts: function(info) {
    return {
      uri: 'https://registry.npmjs.org/-/npm/v1/hooks/hook',
      auth: { bearer: process.env.NPM_AUTH_TOKEN },
      json: {
        type: info.type,
        name: info.name,
        endpoint: 'http://5c19aa89.ngrok.io/incoming',
        secret: process.env.SHARED_SECRET
      }
    };
  },
  buildSubscription: function(hook_opts, body) {
    return {
      "user_id": 1, // use dummy user for now
      "hook_id": body.id,
      "name": hook_opts.json.name,
      "type": hook_opts.json.type,
      "event": hook_opts.json.event
    }
  },
  buildUser: function(userOpts, body) {
    return {
      'slack-user-id': '666',
      'slack-team-id': '667',
      'npm-token-hashed': body.token
    };
  }
}

